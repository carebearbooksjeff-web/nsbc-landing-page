import { Check } from "lucide-react";

export default function Nav() {
  return (
    <header className="site-header">
      <div className="page-container nav-inner">
        <a href="#top" className="brand" aria-label="NSBC home">
          <span className="brand-mark">
            <Check size={20} strokeWidth={2.6} aria-hidden="true" />
          </span>
          <span>NSBC</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#start" className="button button-green nav-cta">
            See if your clients fit
          </a>
        </nav>
      </div>
    </header>
  );
}