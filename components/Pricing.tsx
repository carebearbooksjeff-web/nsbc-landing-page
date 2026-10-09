export default function Pricing() {
  return (
    <section
      id="pricing"
      className="section-space pricing-section"
      aria-labelledby="pricing-heading"
    >
      <div className="page-container two-columns">
        <div className="pricing-copy">
          <h2 id="pricing-heading">
            One price for every account.
          </h2>

          <p>
            No tiers, no hourly billing, no surprise invoices. You set
            your own price to your client, and the margin stays with
            your firm.
          </p>
        </div>

        <div className="pricing-card">
          <div className="price-line">
            <span className="price-number">$100</span>
            <span>per client account, per month</span>
          </div>

          <ul>
            <li>No setup fee</li>
            <li>Month-to-month, 30 days&apos; notice</li>
            <li>
              Catch-up work for accounts that are behind is quoted first
            </li>
          </ul>

          <a href="#start" className="button button-forest">
            See if your clients fit
          </a>
        </div>
      </div>
    </section>
  );
}
