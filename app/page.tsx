import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PlatformStrip from "@/components/PlatformStrip";
import Proof from "@/components/Proof";
import Problem from "@/components/Problem";
import WhatWeDo from "@/components/WhatWeDo";
import Included from "@/components/Included";
import Pricing from "@/components/Pricing";
import KeepClient from "@/components/KeepClient";
import HowToStart from "@/components/HowToStart";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PlatformStrip />
        <Proof />
        <Problem />
        <WhatWeDo />
        <Included />
        <Pricing />
        <KeepClient />
        <HowToStart />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
