import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy policy | NSBC",
  robots: { index: false, follow: false },
};

export default function Privacy() {
  return (
    <>
      <main className="page-container legal-page">
        <Link href="/" className="brand">NSBC</Link>
        <h1>Privacy policy</h1>
        <p>
          Placeholder: the NSBC privacy policy will be added here
          before launch.
        </p>
      </main>
      <Footer />
    </>
  );
}
