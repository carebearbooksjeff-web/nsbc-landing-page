const steps = [
  {
    title: "Tell us about your clients",
    text: "Share how many accounts you have, the platforms they use and where the work gets stuck.",
  },
  {
    title: "Confirm the fit",
    text: "We review each account to make sure it's current and ready for monthly service before anything is signed.",
  },
  {
    title: "Agree the setup",
    text: "Access, review steps and client communication are set in writing.",
  },
  {
    title: "We start the next close",
    text: "Your first status report arrives within 10 business days of month-end.",
  },
];

export default function HowToStart() {
  return (
    <section
      className="section-space bg-mist"
      aria-labelledby="start-steps-heading"
    >
      <div className="page-container">
        <h2 id="start-steps-heading">
          Start with a few accounts. Add more when you&apos;re ready.
        </h2>

        <ol className="four-columns steps-grid">
          {steps.map(({ title, text }, index) => (
            <li className="step-card" key={title}>
              <span className="step-number" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
