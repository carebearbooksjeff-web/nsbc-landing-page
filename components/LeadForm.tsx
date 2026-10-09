"use client";

import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CLIENT_COUNTS,
  FORM_ERROR,
  FORM_SUCCESS,
  leadSchema,
  PLATFORMS,
  US_STATES,
} from "@/lib/lead-schema";
import { HEADSHOTS } from "@/lib/headshots";

export default function LeadForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [invalid, setInvalid] = useState<string[]>([]);
  const inFlight = useRef(false);
  const successRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const parsed = leadSchema.safeParse(values);

    if (!parsed.success) {
      const fields = parsed.error.issues.map((issue) =>
        String(issue.path[0])
      );

      setInvalid(fields);
      setStatus("error");

      const first = form.elements.namedItem(fields[0]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }

    setInvalid([]);
    setStatus("sending");
    inFlight.current = true;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result: { ok?: boolean; fields?: string[] } =
        await response.json();

      if (!response.ok || result.ok !== true) {
        setInvalid(result.fields ?? []);
        throw new Error("Submission was not saved");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  const fieldProps = (name: string) => ({
    "aria-invalid": invalid.includes(name),
    "aria-describedby": invalid.includes(name)
      ? "lead-form-error"
      : undefined,
  });

  return (
    <section
      id="start"
      className="section-space lead-section"
      aria-labelledby="lead-heading"
    >
      <div className="page-container two-columns lead-grid">
        <div className="lead-copy">
          <h2 id="lead-heading">
            Which bookkeeping clients are taking more time than
            they pay for?
          </h2>

          <p>
            Tell us how many accounts you have and where the work
            gets stuck. We&apos;ll tell you which accounts are a fit.
            Each one is $100 a month.
          </p>

          <div className="reply-team">
            <div className="headshots">
              {HEADSHOTS.map((person, index) => (
                <span className="headshot" key={index}>
                  {person.src ? (
                    <Image
                      src={person.src}
                      alt={person.alt}
                      fill
                      sizes="64px"
                    />
                  ) : (
                    <UserRound
                      size={28}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  )}
                </span>
              ))}
            </div>

            <p>
              A real person on our team replies within one business day.
            </p>
          </div>

          <p className="call-note">
            Prefer to talk? Call{" "}
            <a href="tel:+12535445121">(253) 544-5121</a>
          </p>
        </div>

        <div className="form-card">
          {status === "success" ? (
            <p
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="form-success"
            >
              {FORM_SUCCESS}
            </p>
          ) : (
            <form
              method="post"
              action="/api/leads"
              onSubmit={onSubmit}
              aria-labelledby="form-heading"
              aria-busy={status === "sending"}
            >
              <h3 id="form-heading">
                Tell us about your bookkeeping clients
              </h3>

              <div className="honeypot" aria-hidden="true">
                <label htmlFor="company_website">Company website</label>
                <input
                  id="company_website"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  maxLength={500}
                />
              </div>

              <div className="fields-grid">
                <div className="field">
                  <label htmlFor="full_name">Full name</label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={160}
                    {...fieldProps("full_name")}
                  />
                </div>

                <div className="field">
                  <label htmlFor="firm_name">Firm name</label>
                  <input
                    id="firm_name"
                    name="firm_name"
                    type="text"
                    required
                    autoComplete="organization"
                    maxLength={160}
                    {...fieldProps("firm_name")}
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={254}
                    {...fieldProps("email")}
                  />
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    minLength={7}
                    maxLength={40}
                    {...fieldProps("phone")}
                  />
                </div>

                <div className="field">
                  <label htmlFor="state">State</label>
                  <select
                    id="state"
                    name="state"
                    required
                    defaultValue=""
                    autoComplete="address-level1"
                    {...fieldProps("state")}
                  >
                    <option value="" disabled>Select your state</option>
                    {US_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="client_count">
                    Number of bookkeeping clients
                  </label>
                  <select
                    id="client_count"
                    name="client_count"
                    required
                    defaultValue=""
                    {...fieldProps("client_count")}
                  >
                    <option value="" disabled>Select a range</option>
                    {CLIENT_COUNTS.map((count) => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                </div>

                <div className="field field-wide">
                  <label htmlFor="platform">Accounting platform</label>
                  <select
                    id="platform"
                    name="platform"
                    required
                    defaultValue=""
                    {...fieldProps("platform")}
                  >
                    <option value="" disabled>Select a platform</option>
                    {PLATFORMS.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field field-wide">
                  <label htmlFor="notes">
                    What&apos;s taking the most time? (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    maxLength={5000}
                    {...fieldProps("notes")}
                  />
                </div>
              </div>

              {status === "error" && (
                <p
                  id="lead-form-error"
                  role="alert"
                  className="form-error"
                >
                  {FORM_ERROR}
                </p>
              )}

              <button
                type="submit"
                className="button button-forest form-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send my details"}
              </button>

              <p className="form-note">
                We reply within one business day. By sending, you agree
                to our <Link href="/privacy">privacy policy</Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
