"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MiniSimulator from "@/components/MiniSimulator";
import BankPartners from "@/components/BankPartners";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import VideoShowcase from "@/components/VideoShowcase";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import TeamPreview from "@/components/TeamPreview";
import LatestNews from "@/components/LatestNews";
import Contact from "@/components/Contact";
import PreQualification from "@/components/PreQualification";
import CreditForm from "@/components/CreditForm";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import { useAudience } from "@/lib/AudienceContext";

export default function Home() {
  const { audience } = useAudience();
  const [qualified, setQualified] = useState(false);
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
      {isClient && (
        <>
          <PreQualification onQualified={() => setQualified(true)} />
          <CreditForm visible={qualified} />
        </>
      )}
      <LatestNews />
      <Contact />
      <Footer />
    </main>
  );
}
