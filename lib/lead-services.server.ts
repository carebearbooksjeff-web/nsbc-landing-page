import "server-only";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import {
  buildConfirmationEmail,
  buildLeadEmail,
} from "./email-content";
import type { LeadRecord } from "./lead-schema";
import type { SavedLead } from "./lead-handler";

function required(name: string): string {
  const value = process.env[name]?.trim();

  if (!value || value.startsWith("YOUR_")) {
    throw new Error(`Missing configuration: ${name}`);
  }

  return value;
}

// Log error codes without exposing contact details or credentials.
export function logLeadError(
  event: string,
  error: unknown,
  leadId?: string,
) {
  const candidate =
    error && typeof error === "object" ? error : {};

  const code =
    "code" in candidate
      ? String(candidate.code)
      : "name" in candidate
        ? String(candidate.name)
        : "unknown";

  console.error(`[NSBC] ${event}`, {
    code: code.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 60),
    ...(leadId ? { leadId } : {}),
  });
}

export async function saveLead(
  lead: LeadRecord,
): Promise<SavedLead> {
  const url = z.url().parse(
    required("NEXT_PUBLIC_SUPABASE_URL"),
  );

  const supabase = createClient(
    url,
    required("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            signal: AbortSignal.timeout(12000),
          }),
      },
    },
  );

  const { data, error } = await supabase
    .from("leads")
    .insert(lead)
    .select("id, created_at")
    .single();

  if (error) throw error;

  if (!data?.id || !data?.created_at) {
    throw new Error("Database did not confirm the insertion");
  }

  return {
    id: data.id,
    created_at: data.created_at,
  };
}

export async function sendLeadEmails(
  lead: LeadRecord,
  saved: SavedLead
): Promise<void> {
  const response = await fetch(
    "https://formspree.io/f/xoejdkgq",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        full_name: lead.full_name,
        firm_name: lead.firm_name,
        email: lead.email,
        phone: lead.phone,
        state: lead.state,
        client_count: lead.client_count,
        platform: lead.platform,
        notes: lead.notes || "Not provided",
        submitted_at: saved.created_at,
        enquiry_id: saved.id,
      }),
      signal: AbortSignal.timeout(15000),
    }
  );

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.ok !== true) {
    const error = new Error("Formspree did not accept the enquiry");
    Object.assign(error, {
      code: `FORMSPREE_HTTP_${response.status}`,
    });
    throw error;
  }

  console.info("[NSBC] FORMSPREE_ACCEPTED", {
    leadId: saved.id,
  });
}