import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of service | NSBC",
  robots: { index: false, follow: false },
};

export default function Terms() {
  return (
    <>
      <main className="page-container legal-page">
        <Link href="/" className="brand">NSBC</Link>
        <h1>Terms of service</h1>
        <p>
          Placeholder: the NSBC terms of service will be added here
          before launch.
        </p>
      </main>
      <Footer />
    </>
  );
}
