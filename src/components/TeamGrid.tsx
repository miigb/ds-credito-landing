"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { teamMembers } from "@/lib/teamData";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TeamMemberCard({ member, index }: { member: (typeof teamMembers)[number]; index: number }) {
  const { locale } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const isTBD = member.name === "A anunciar";

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`bg-white/5 border border-white/10 rounded-xl p-8 transition-all duration-300 group ${
        isTBD ? "opacity-50" : "hover:bg-white/10"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-44 h-44 rounded-full overflow-hidden mb-6">
          {imgError || isTBD ? (
            <div className="w-full h-full bg-accent-700/30 text-white font-bold text-xl flex items-center justify-center">
              {isTBD ? "?" : getInitials(member.name)}
            </div>
          ) : (
            <Image
              src={member.photo}
              alt={member.name}
              width={176}
              height={176}
              className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <h3 className="text-white font-bold text-xl">{member.name}</h3>
        <p className="text-accent-400 text-sm font-semibold mb-4">{member.role[locale]}</p>
        <p className="text-white/50 text-sm leading-relaxed mb-6">{member.bio[locale]}</p>

        {member.linkedin && !isTBD && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
            className="text-white/30 hover:text-accent-400 transition-colors"
          >
            <Linkedin size={20} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function TeamGrid() {
  const sorted = [...teamMembers].sort((a, b) => a.order - b.order);

  return (
    <section className="py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
