"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { teamMembers } from "@/lib/teamData";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function MemberPhoto({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-5">
      {!failed ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="w-full h-full bg-accent-700/30 text-white font-bold text-xl flex items-center justify-center">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}

export default function TeamPreview() {
  const { locale, t } = useLanguage();

  const featuredMembers = teamMembers
    .filter((m) => m.featured)
    .sort((a, b) => a.order - b.order);

  // Split headline around the highlight word
  const headline = t.team.headline;
  const highlight = t.team.headlineHighlight;
  const highlightIndex = headline.toLowerCase().indexOf(highlight.toLowerCase());

  let headlineBefore = headline;
  let headlineAfter = "";
  if (highlightIndex >= 0) {
    headlineBefore = headline.slice(0, highlightIndex);
    headlineAfter = headline.slice(highlightIndex + highlight.length);
  }

  return (
    <section id="team" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-900">
        {/* Grid dot overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-700/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">
            {t.team.eyebrow}
          </p>
          <h2 className="text-white text-3xl lg:text-5xl font-bold tracking-tight mb-5">
            {headlineBefore}
            <span className="text-accent-400">{highlight}</span>
            {headlineAfter}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t.team.subheading}
          </p>
        </motion.div>

        {/* 3 cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {featuredMembers.map((member, i) => (
            <motion.div
              key={member.id}
              variants={fadeUp}
              custom={i}
              className="group bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-300"
            >
              <MemberPhoto src={member.photo} name={member.name} />
              <h3 className="text-white font-bold text-lg mb-1">
                {member.name}
              </h3>
              <p className="text-accent-400 text-sm font-semibold">
                {member.role[locale]}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/equipa"
            className="inline-block bg-accent-700 text-white rounded-2xl px-8 py-4 font-semibold shadow-2xl shadow-accent-700/30 hover:bg-accent-600 hover:-translate-y-0.5 transition-all"
          >
            {t.team.cta} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
