"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { teamMembers } from "@/lib/teamData";

function TeamCard({
  member,
  index,
  locale,
}: {
  member: (typeof teamMembers)[number];
  index: number;
  locale: "pt" | "en";
}) {
  const [imgError, setImgError] = useState(false);
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div variants={fadeUp} custom={index}>
      <Link
        href={`/equipa/${member.id}`}
        className="block bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:bg-white/10 transition-all duration-300 cursor-pointer"
      >
        {/* Photo */}
        <div className="aspect-[3/4] w-full overflow-hidden">
          {imgError ? (
            <div className="w-full h-full bg-accent-700/20 flex items-center justify-center text-white font-bold text-3xl">
              {initials}
            </div>
          ) : (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              style={{ objectPosition: member.photoPosition || 'center' }}
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
          <p className="text-accent-400 text-sm font-semibold mb-3">
            {member.role[locale]}
          </p>
          <p className="text-white/50 text-sm leading-relaxed">
            {member.bio[locale]}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function TeamPreview() {
  const { locale, t } = useLanguage();

  const sorted = [...teamMembers].sort((a, b) => a.order - b.order);
  const previewMembers = sorted.slice(0, 3);

  // Split headline
  const headline = t.team.headline;
  const highlight = t.team.headlineHighlight;
  const idx = headline.toLowerCase().indexOf(highlight.toLowerCase());
  let before = headline;
  let after = "";
  if (idx >= 0) {
    before = headline.slice(0, idx);
    after = headline.slice(idx + highlight.length);
  }

  return (
    <section id="team" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-900">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-700/10 blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-accent-400 uppercase mb-4">
            {t.team.eyebrow}
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            {before}
            <span className="text-accent-400">{highlight}</span>
            {after}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t.team.subheading}
          </p>
        </motion.div>

        {/* Team Cards — Paulo, Armanda, Patrícia */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {previewMembers.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
              locale={locale}
            />
          ))}
        </motion.div>

        {/* CTA — subtle link variant; primary CTAs live in adjacent sections */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/equipa"
            className="group inline-flex items-center gap-1.5 text-accent-400 text-sm font-semibold hover:text-accent-300 underline-offset-4 hover:underline transition-colors"
          >
            {t.team.cta}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
