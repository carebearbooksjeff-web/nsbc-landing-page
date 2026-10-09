import Image from "next/image";

export default function Problem() {
  return (
    <section
      className="section-space bg-mist"
      aria-labelledby="problem-heading"
    >
      <div className="page-container two-columns problem-grid">
        <div className="problem-left">
          <h2 id="problem-heading">
            Bookkeeping is easy to sell. It&apos;s hard to deliver
            profitably.
          </h2>

          <div className="photo photo-stressed">
            <Image
              src="/images/stressed.jpg"
              alt="A frustrated professional resting his head on his hand at his desk"
              fill
              sizes="(max-width: 991px) calc(100vw - 64px), 540px"
            />
          </div>
        </div>

        <div className="problem-copy">
          <p>
            Most firms don&apos;t lose money on bookkeeping because the
            work is complicated. They lose it in the gaps: statements
            that arrive late, transactions nobody can explain,
            reconciliations that slip to the last week, and owners who
            end up reviewing everything themselves.
          </p>

          <p>
            Every month that happens, a profitable bookkeeping client
            quietly becomes a break-even one.
          </p>

          <div className="comparison-grid">
            <div className="comparison-card without-card">
              <h3>Without NSBC</h3>
              <ul>
                <li>Statements arrive late</li>
                <li>Your team chases clients</li>
                <li>Reconciliations slip to the last week</li>
                <li>The owner reviews everything</li>
              </ul>
            </div>

            <div className="comparison-card with-card">
              <h3>With NSBC</h3>
              <ul>
                <li>We request and follow up</li>
                <li>The close is prepared every month</li>
                <li>Only real questions reach you</li>
                <li>Clear status for every account</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
