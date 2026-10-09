import Image from "next/image";
import { Shield } from "lucide-react";

const promises = [
  "Your firm owns the client relationship and the billing.",
  "We contact your clients only as agreed, under your firm's name.",
  "NSBC never solicits your clients.",
  "Your reviewer approves the books before anything goes to the client.",
  "Access, responsibilities and review steps are agreed in writing first.",
  "A person approves every accounting decision. Software speeds up the work; it doesn't make the calls.",
];

export default function KeepClient() {
  return (
    <section className="section-space" aria-labelledby="keep-heading">
      <div className="page-container">
        <div className="two-columns keep-top">
          <h2 id="keep-heading">
            We work behind your firm. Never around it.
          </h2>

          <div className="photo photo-consult">
            <Image
              src="/images/consult.jpg"
              alt="An advisor meeting with a client by a window"
              fill
              sizes="(max-width: 991px) calc(100vw - 64px), 540px"
            />
          </div>
        </div>

        <ul className="promise-grid">
          {promises.map((promise) => (
            <li key={promise}>
              <Shield
                size={20}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span>{promise}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
