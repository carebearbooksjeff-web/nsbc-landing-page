import { CONFIRMATION_EMAIL, type LeadRecord } from "./lead-schema";

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!,
  );
}

export function buildLeadEmail(lead: LeadRecord, createdAt: string) {
  const fields = [
    ["Full name", lead.full_name],
    ["Firm name", lead.firm_name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["State", lead.state],
    ["Number of bookkeeping clients", lead.client_count],
    ["Accounting platform", lead.platform],
    ["What's taking the most time?", lead.notes || "Not provided"],
    ["Submitted at (UTC)", createdAt],
  ];

  const rows = fields
    .map(
      ([label, value]) => `
        <tr>
          <th style="padding:12px;text-align:left;vertical-align:top;border-bottom:1px solid #E3EBE4">
            ${escapeHtml(label)}
          </th>
          <td style="padding:12px;white-space:pre-wrap;border-bottom:1px solid #E3EBE4">
            ${escapeHtml(value)}
          </td>
        </tr>
      `,
    )
    .join("");

  return {
    subject: `New bookkeeping lead: ${lead.firm_name}, ${lead.state}`,
    text: fields
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n\n"),
    html: `
      <div style="font-family:Arial,sans-serif;color:#102016;max-width:640px;margin:auto">
        <h1 style="font-size:24px;color:#0E2A17">New bookkeeping lead</h1>
        <table style="border-collapse:collapse;width:100%">
          ${rows}
        </table>
      </div>
    `,
  };
}

export function buildConfirmationEmail() {
  return {
    subject: "We received your details",
    text: CONFIRMATION_EMAIL,
    html: `
      <div style="font-family:Arial,sans-serif;color:#102016;line-height:1.6;max-width:600px;margin:auto">
        <p>${escapeHtml(CONFIRMATION_EMAIL)}</p>
      </div>
    `,
  };
}
