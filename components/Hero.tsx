import { Check } from "lucide-react";

const rows = [
  {
    client: "Riverside Dental Group",
    note: "3 accounts reconciled",
    status: "Closed",
    statusClass: "status-closed",
  },
  {
    client: "Cedar Home Care LLC",
    note: "2 accounts reconciled",
    status: "Closed",
    statusClass: "status-closed",
  },
  {
    client: "Northline Landscaping",
    note: "Missing August card statement",
    status: "Waiting on client",
    statusClass: "status-waiting",
  },
  {
    client: "Bluewater Cafe",
    note: "Owner draw or payroll? 1 question",
    status: "Needs your decision",
    statusClass: "status-decision",
  },
  {
    client: "Summit Auto Repair",
    note: "4 accounts reconciled",
    status: "Closed",
    statusClass: "status-closed",
  },
];

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <div className="page-container hero-grid">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            Bookkeeping for accounting firms, in every state
          </span>

          <h1 id="hero-heading">
            Your clients&apos; books, closed every month. Without you
            chasing them.
          </h1>

          <p>
            NSBC delivers monthly bookkeeping behind your firm for a flat
            $100 per client account per month. You keep the client, the
            relationship and the final review.
          </p>

          <div className="hero-actions">
            <a href="#start" className="button button-forest">
              See if your clients fit
            </a>
            <a href="#pricing" className="button button-glass">
              How pricing works
            </a>
          </div>

          <div className="hero-notes">
            <span>No setup fee</span>
            <span>Month-to-month</span>
            <span>Start with a few accounts</span>
          </div>
        </div>

        <div className="report-stage">
          <div className="ready-pill">
            <Check size={16} strokeWidth={3} aria-hidden="true" />
            Close ready for review
          </div>

          <figure className="report-card">
            <figcaption className="report-heading">
              <span>September close</span>
              <span className="sample-badge">
                Sample monthly report
              </span>
            </figcaption>

            <ul className="report-rows">
              {rows.map((row) => (
                <li key={row.client} className="report-row">
                  <div>
                    <span className="report-client">{row.client}</span>
                    <span className="report-note">{row.note}</span>
                  </div>

                  <span className={`status-badge ${row.statusClass}`}>
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>

            <div className="status-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <p className="report-caption">
              3 closed, 1 waiting on client, 1 needs your decision
            </p>
          </figure>

          <div
            className="question-card"
            aria-label="Illustrative reviewer question"
          >
            <span className="question-label">
              Question for your reviewer
            </span>

            <p>
              Bluewater Cafe: $2,400 transfer to the owner on Sep 14.
              Owner draw or payroll?
            </p>

            <div className="question-actions">
              <button
                type="button"
                className="sample-button sample-green"
                disabled
                tabIndex={-1}
              >
                Owner draw
              </button>
              <button
                type="button"
                className="sample-button sample-glass"
                disabled
                tabIndex={-1}
              >
                Payroll
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}