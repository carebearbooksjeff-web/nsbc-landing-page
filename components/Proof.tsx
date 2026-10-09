import Image from "next/image";

export default function Proof() {
  return (
    <section className="section-space" aria-labelledby="proof-heading">
      <div className="page-container two-columns proof-grid">
        <div className="photo photo-team">
          <Image
            src="/images/team.jpg"
            alt="Two team members discussing work at a desk"
            fill
            sizes="(max-width: 991px) calc(100vw - 64px), 540px"
          />
        </div>

        <div className="proof-copy">
          <div>
            <div className="proof-number">145+</div>
            <div className="proof-rule" />
            <p className="proof-caption">
              businesses supported by the team behind NSBC
            </p>
          </div>

          <h2 id="proof-heading" className="small-heading">
            Delivered by a team already doing this work every month.
          </h2>

          <p>
            NSBC runs recurring accounting operations for Carebearbooks
            AFH and Marting Accounting Services, across bookkeeping,
            payroll, tax, business registration, IRS matters and state
            audit support. The same team and processes now work behind
            your firm.
          </p>

          <div className="proof-tags">
            <span>Carebearbooks AFH</span>
            <span>Marting Accounting Services</span>
          </div>
        </div>
      </div>
    </section>
  );
}
