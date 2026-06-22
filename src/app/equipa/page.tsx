"use client";

import Navbar from "@/components/Navbar";
import TeamGrid from "@/components/TeamGrid";
import SuccessStories from "@/components/SuccessStories";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import Link from "next/link";

export default function EquipaPage() {
  const { t } = useLanguage();

  // Split headline around the highlight word
  const headline = t.team.headline;
  const highlight = t.team.headlineHighlight;
  const highlightIndex = headline
    .toLowerCase()
    .indexOf(highlight.toLowerCase());

  let headlineBefore = headline;
  let headlineAfter = "";
  if (highlightIndex >= 0) {
    headlineBefore = headline.slice(0, highlightIndex);
    headlineAfter = headline.slice(highlightIndex + highlight.length);
  }

  return (
    <main className="relative">
      <Navbar />

      {/* Hero section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background: hero gradient + dot grid + glow orbs */}
        <div className="absolute inset-0 bg-hero-gradient">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent-700/10 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent-500/8 blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <p className="text-xs font-semibold tracking-widest text-accent-400 uppercase mb-4">
              {t.team.eyebrow}
            </p>
            <h1 className="text-4xl lg:text-7xl font-bold text-white tracking-tight mb-6">
              {headlineBefore}
              <span className="text-accent-400">{highlight}</span>
              {headlineAfter}
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              {t.team.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <div className="bg-brand-900">
        <TeamGrid />
      </div>

      {/* Success Stories */}
      <SuccessStories />

      {/* CTA Section */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-brand-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-700/10 blur-[120px]" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              {t.success.ctaHeadline}
            </h2>
            <p className="text-white/60 text-lg mb-10">
              {t.success.ctaSubheading}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center px-8 py-4 bg-accent-700 text-white rounded-2xl font-semibold shadow-2xl shadow-accent-700/30 hover:bg-accent-600 hover:-translate-y-0.5 transition-all"
            >
              {t.success.ctaButton}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
