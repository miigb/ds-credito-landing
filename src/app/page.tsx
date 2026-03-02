"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import VideoShowcase from "@/components/VideoShowcase";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <VideoShowcase />
      <Process />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  );
}
