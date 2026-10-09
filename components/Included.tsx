import { Check } from "lucide-react";

const included = [
  "Transaction categorization and coding",
  "Bank and credit card reconciliations",
  "Month-end close preparation",
  "Client document requests and follow-up",
  "Monthly financial statements ready for your review",
  "A status and exceptions report for each account",
];

const extras = [
  "Catch-up and cleanup of past months",
  "Payroll processing",
  "Sales tax and other filings",
  "Accounts payable and receivable management",
];

export default function Included() {
  return (
    <section
      className="included-section"
      aria-labelledby="included-heading"
    >
      <div className="page-container included-grid">
        <div className="included-card">
          <h2 id="included-heading" className="small-heading">
            Included every month
          </h2>

          <ul>
            {included.map((item) => (
              <li key={item}>
                <span className="check-circle">
                  <Check
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="included-right">
          <div className="extras-card">
            <h2 className="small-heading">
              Quoted separately, before we start
            </h2>

            <ul>
              {extras.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="platform-card">
            <h3>Platforms</h3>
            <p>
              QuickBooks Online, Xero and ZipBooks. Clients without
              accounting software can send their bank statements, and
              we build and keep their books for them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
