const questions = [
  {
    question: "Do you work with firms in every state?",
    answer: "Yes. Monthly bookkeeping works the same way across states, so we support firms and their clients nationwide. State tax filings are scoped separately.",
  },
  {
    question: "Will my clients know you're involved?",
    answer: "Only if you want them to. We work under your firm's name and follow your communication rules.",
  },
  {
    question: "What if a client's books are behind?",
    answer: "We quote catch-up work separately, then move the account onto monthly service once it's current.",
  },
  {
    question: "Does the price change if an account gets busier?",
    answer: "No. Every account is $100 a month. The only extra cost is catch-up work for books that are behind, and we quote that before we start.",
  },
  {
    question: "Can we stop at any time?",
    answer: "Yes. Service is month-to-month with 30 days' notice, and we hand back everything in an organized state.",
  },
  {
    question: "How do you protect client data?",
    answer: "We use individual logins that your firm grants and can remove at any time. Client documents move through secure portals, not personal email. Every team member signs a confidentiality agreement before touching client files.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="section-space"
      aria-labelledby="faq-heading"
    >
      <div className="page-container faq-reference">
        <h2 id="faq-heading">Questions firms ask us</h2>

        <dl>
          {questions.map(({ question, answer }) => (
            <div className="faq-item" key={question}>
              <dt>{question}</dt>
              <dd>{answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
