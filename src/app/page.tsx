"use client";

import { useState } from "react";
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
import PreQualification from "@/components/PreQualification";
import CreditForm from "@/components/CreditForm";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";

export default function Home() {
  const { locale } = useLanguage();
  const { audience, setAudience } = useAudience();
  const [qualified, setQualified] = useState(false);
  const isPt = locale === "pt";
  const isClient = audience === "client";
  const showB2C = isPt && isClient;
  const showB2B = !showB2C;

  const handleFail = () => {
    setAudience("partner");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="relative">
      <StickyBar />
      <Navbar />
      <Hero />
      <BankPartners />
      <Stats />
      <Services />
      <VideoShowcase />
      <Process />
      <WhyUs />
      <TeamPreview />
      {showB2C && (
        <PreQualification
          onQualified={() => setQualified(true)}
          onFail={handleFail}
        />
      )}
      {showB2C && <CreditForm visible={qualified} />}
      {showB2B && <Contact />}
      <Footer />
    </main>
  );
}
