"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BankPartners from "@/components/BankPartners";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import VideoShowcase from "@/components/VideoShowcase";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import TeamPreview from "@/components/TeamPreview";
import Contact from "@/components/Contact";
import CreditWizard from "@/components/CreditWizard";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import { useAudience } from "@/lib/AudienceContext";

export default function Home() {
  const { audience } = useAudience();
  const isClient = audience === "client";

  return (
    <main className="relative">
      <StickyBar />
      <Navbar />
      <Hero />
      <BankPartners />
      <Stats />
      <Services />
      {!isClient && <VideoShowcase />}
      <Process />
      <WhyUs />
      <TeamPreview />
      {isClient && <CreditWizard />}
      <Contact />
      <Footer />
    </main>
  );
}
