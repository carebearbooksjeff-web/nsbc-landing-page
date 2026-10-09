import { z } from "zod";

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "District of Columbia",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana",
  "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina",
  "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
  "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
] as const;

export const CLIENT_COUNTS = [
  "1–5", "6–15", "16–40", "More than 40",
] as const;

export const PLATFORMS = [
  "QuickBooks Online",
  "Xero",
  "ZipBooks",
  "No software (bank statements)",
  "Other",
] as const;

const singleLine = z.string()
  .trim()
  .min(1)
  .max(160)
  .regex(/^[^\u0000-\u001f\u007f]+$/);

export const leadSchema = z.object({
  full_name: singleLine,
  firm_name: singleLine,
  email: z.string().trim().max(254).email(),
  phone: z.string()
    .trim()
    .min(7)
    .max(40)
    .regex(/^[+()\d\s.\-]+$/)
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }),
  state: z.enum(US_STATES),
  client_count: z.enum(CLIENT_COUNTS),
  platform: z.enum(PLATFORMS),
  notes: z.string().trim().max(5000).default(""),
  company_website: z.string().max(500).default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadRecord = Omit<LeadInput, "company_website">;

export const FORM_SUCCESS =
  "Thanks, we've got your details. Someone from our team will contact you within one business day.";

export const FORM_ERROR =
  "Something went wrong and your details weren't sent. Please try again or call (253) 544-5121.";

export const CONFIRMATION_EMAIL =
  "Thanks for reaching out to NSBC. We'll review your bookkeeping clients and contact you within one business day. Questions in the meantime? Call (253) 544-5121.";
