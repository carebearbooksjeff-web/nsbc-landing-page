import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-grid">
        <div>
          <a className="brand footer-brand" href="/#top">
            <span className="footer-mark" aria-hidden="true" />
            <span>NSBC</span>
          </a>
          <p>
            Bookkeeping delivered behind accounting firms, nationwide.
          </p>
        </div>

        <address>
          <a href="tel:+12535445121">(253) 544-5121</a>
          <a href="mailto:nsbc.bookkeeping@gmail.com">
            nsbc.bookkeeping@gmail.com
          </a>
        </address>

        <nav aria-label="Legal">
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms of service</Link>
        </nav>
      </div>
    </footer>
  );
}
