import {
  List,
  Mail,
  CircleAlert,
  ChartNoAxesColumn,
} from "lucide-react";

const services = [
  {
    icon: List,
    title: "Do the bookkeeping",
    body: "We categorize transactions, reconcile bank and credit card accounts, and prepare the month-end close inside your systems.",
  },
  {
    icon: Mail,
    title: "Chase what's missing",
    body: "We request statements, receipts and explanations from your clients under your firm's name, and follow up until we have them.",
  },
  {
    icon: CircleAlert,
    title: "Escalate only what needs you",
    body: "Anything that needs professional judgment reaches your reviewer as a short, specific question, not a pile of work.",
  },
  {
    icon: ChartNoAxesColumn,
    title: "Report every month",
    body: "Each account gets a status report: what's closed, what's waiting on the client, and what needs your decision.",
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="how"
      className="section-space services-section"
      aria-labelledby="services-heading"
    >
      <div className="page-container">
        <h2 id="services-heading" className="services-heading">
          We do the monthly work. You make the calls.
        </h2>

        <div className="four-columns service-grid">
          {services.map(({ icon: Icon, title, body }) => (
            <article className="service-card" key={title}>
              <span className="icon-tile">
                <Icon
                  size={24}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
