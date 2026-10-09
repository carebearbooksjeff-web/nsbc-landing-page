import { handleLeadRequest } from "@/lib/lead-handler";
import {
  logLeadError,
  saveLead,
  sendLeadEmails,
} from "@/lib/lead-services.server";
export const maxDuration = 60;

export async function POST(request: Request) {
  return handleLeadRequest(request, {
    saveLead,
    sendEmails: sendLeadEmails,
    logError: logLeadError,
  });
}
