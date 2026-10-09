import { FORM_ERROR, leadSchema, type LeadRecord } from "./lead-schema";

export type SavedLead = {
  id: string;
  created_at: string;
};

export type LeadDependencies = {
  saveLead: (lead: LeadRecord) => Promise<SavedLead>;
  sendEmails: (lead: LeadRecord, saved: SavedLead) => Promise<void>;
  logError: (event: string, error: unknown, leadId?: string) => void;
};

const MAX_BODY_BYTES = 24 * 1024;

const json = (value: unknown, status = 200) =>
  Response.json(value, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

const failure = (status: number, fields?: string[]) =>
  json(
    {
      error: FORM_ERROR,
      ...(fields ? { fields } : {}),
    },
    status,
  );

class BodyTooLarge extends Error {}

async function readBody(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    throw new BodyTooLarge();
  }

  if (!request.body) {
    throw new SyntaxError("No body");
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let count = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      count += value.byteLength;

      if (count > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new BodyTooLarge();
      }

      text += decoder.decode(value, { stream: true });
    }

    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }

  return JSON.parse(text);
}

export async function handleLeadRequest(
  request: Request,
  dependencies: LeadDependencies,
): Promise<Response> {
  const origin = request.headers.get("origin");

  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return failure(403);
  }

  if (origin && origin !== new URL(request.url).origin) {
    return failure(403);
  }

  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();

  if (contentType !== "application/json") {
    return failure(415);
  }

  let body: unknown;

  try {
    body = await readBody(request);
  } catch (error) {
    return failure(error instanceof BodyTooLarge ? 413 : 400);
  }

  // Ignore submissions that fill the hidden spam-trap field.
  if (
    body &&
    typeof body === "object" &&
    "company_website" in body &&
    typeof body.company_website === "string" &&
    body.company_website.trim()
  ) {
    return json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    const fields = [
      ...new Set(
        parsed.error.issues.map((issue) => String(issue.path[0])),
      ),
    ];

    return failure(400, fields);
  }

  const { company_website: _honeypot, ...lead } = parsed.data;

  let saved: SavedLead;

  try {
    saved = await dependencies.saveLead(lead);
  } catch (error) {
    dependencies.logError("LEAD_INSERT_FAILED", error);
    return failure(500);
  }

  // A saved enquiry remains successful even if email delivery fails.
  try {
    await dependencies.sendEmails(lead, saved);
  } catch (error) {
    dependencies.logError("LEAD_EMAIL_FAILED", error, saved.id);
  }

  return json({ ok: true });
}
