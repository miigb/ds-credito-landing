"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  Share2,
  UserPlus,
  MessageCircle,
  Linkedin,
  Clock,
  Globe,
  Award,
  Check,
  Copy,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { teamMembers } from "@/lib/teamData";
import { siteConfig } from "@/lib/siteConfig";
import { downloadVCard } from "@/lib/vcard";
import { useLanguage } from "@/lib/LanguageContext";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function useAvailability() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const isWeekday = day >= 1 && day <= 5;
      const isBusinessHours = hour >= 9 && hour < 18;
      setAvailable(isWeekday && isBusinessHours);
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  return available;
}

function CopyableContact({
  href,
  icon: Icon,
  text,
  displayText,
  copiedLabel,
}: {
  href: string;
  icon: typeof Phone;
  text: string;
  displayText?: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    },
    [text]
  );

  return (
    <div className="flex items-center gap-3 group">
      <a
        href={href}
        className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm flex-1"
      >
        <Icon size={16} className="text-accent-400/60 shrink-0" />
        {displayText || text}
      </a>
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10"
        title="Copy"
      >
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} className="text-white/40" />
        )}
      </button>
      {copied && (
        <span className="absolute right-8 text-xs text-green-400 animate-fade-in">
          {copiedLabel}
        </span>
      )}
    </div>
  );
}

export default function AgentProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale, t } = useLanguage();
  const isAvailable = useAvailability();

  const member = slug ? teamMembers.find((m) => m.id === slug) : undefined;

  if (!member) {
    return (
      <main className="min-h-screen bg-brand-900 flex items-center justify-center">
        <p className="text-white/50">Loading...</p>
      </main>
    );
  }

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  useEffect(() => {
    setProfileUrl(`${window.location.origin}/equipa/${member.id}`);

    // Auto-fullscreen if running as PWA (Add to Home Screen)
    const standalone = window.matchMedia("(display-mode: standalone)").matches
      || (navigator as any).standalone === true;
    if (standalone) {
      setIsStandalone(true);
      setIsFullscreen(true);
    }
  }, [member.id]);

  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${member.name} — ${siteConfig.name}`,
        url: profileUrl,
      });
    } else {
      await navigator.clipboard.writeText(profileUrl);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  const officePhone = "+351 265 117 175";
  const displayPhone = "265 117 175";

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}`
  )}`;

  return (
    <main className={`relative min-h-screen bg-brand-900 ${isFullscreen ? "fixed inset-0 z-50 overflow-y-auto" : ""}`}>
      {!isFullscreen && <Navbar />}

      <div className={`relative ${isFullscreen ? "pt-4 pb-8" : "pt-28 pb-20"}`}>
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-700/10 blur-[120px]" />
        </div>

        <div className={`relative mx-auto px-6 ${isFullscreen ? "max-w-lg px-4" : "max-w-lg"}`}>
          {/* Back link + fullscreen toggle */}
          {!isFullscreen && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <Link
                href="/equipa"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              {t.profile.backToTeam}
            </Link>
          </motion.div>
          )}

          {/* Profile Card */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={`bg-white/5 border border-white/10 overflow-hidden ${isFullscreen ? "rounded-none border-0 bg-transparent" : "rounded-3xl"}`}
          >
            {/* Hero gradient header with blurred photo */}
            <div className={`relative overflow-hidden ${isFullscreen ? "h-36" : "h-44"}`}>
              {/* Blurred photo background */}
              <img
                src={member.photo}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40"
                style={{ objectPosition: member.photoPosition || "center" }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-700/80 to-accent-900/90" />
              {/* Fullscreen toggle — subtle icon top-right */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-black/20 hover:bg-black/40 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 size={14} className="text-white/50" />
                ) : (
                  <Maximize2 size={14} className="text-white/30 hover:text-white/60" />
                )}
              </button>
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            {/* Photo — overlapping hero */}
            <motion.div
              variants={fadeUp}
              className="relative z-10 flex justify-center -mt-26"
            >
              <div className="relative">
                <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-accent-700/50 shadow-2xl">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center top" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.parentElement!.innerHTML = `<div class="w-full h-full bg-accent-700/30 text-white font-bold text-2xl flex items-center justify-center">${getInitials(member.name)}</div>`;
                    }}
                  />
                </div>
                {/* Availability indicator */}
                {member.showAvailability !== false && (
                  <div
                    className={`absolute bottom-3 right-3 w-5 h-5 rounded-full border-3 border-brand-900 ${
                      isAvailable ? "bg-green-500" : "bg-white/30"
                    }`}
                    title={isAvailable ? t.profile.availableNow : t.profile.unavailable}
                  />
                )}
              </div>
            </motion.div>

            {/* Name & Role */}
            <motion.div variants={fadeUp} className="text-center px-8 pt-4 pb-2">
              <h1 className="text-2xl font-bold text-white">{member.name}</h1>
              <p className="text-accent-400 font-semibold text-sm mt-1">
                {member.role[locale]}
              </p>
              <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">
                <span className="font-bold">LETRA</span>
                <span className="font-normal">PERFEIÇOADA</span>
              </p>
              {/* Availability badge */}
              {member.showAvailability !== false && (
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isAvailable ? "bg-green-500 animate-pulse" : "bg-white/30"
                    }`}
                  />
                  <span className="text-xs text-white/40">
                    {isAvailable ? t.profile.availableNow : t.profile.unavailable}
                    {" · "}
                    {t.profile.officeHours}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center gap-0.5 sm:gap-1 px-2 sm:px-6 py-4"
            >
              <a
                href={`tel:${officePhone}`}
                className="flex flex-col items-center gap-1.5 py-3 px-2 sm:px-4 rounded-xl hover:bg-white/5 transition-colors min-w-0"
              >
                <div className="w-10 h-10 rounded-full bg-accent-700/20 flex items-center justify-center">
                  <Phone size={18} className="text-accent-400" />
                </div>
                <span className="text-white/60 text-xs">{t.profile.call}</span>
              </a>
              {member.whatsapp && (
                <a
                  href={`https://wa.me/${member.whatsapp.replace(/\+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 py-3 px-2 sm:px-4 rounded-xl hover:bg-white/5 transition-colors min-w-0"
                >
                  <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                    <MessageCircle size={18} className="text-green-400" />
                  </div>
                  <span className="text-white/60 text-xs">{t.profile.whatsapp}</span>
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex flex-col items-center gap-1.5 py-3 px-2 sm:px-4 rounded-xl hover:bg-white/5 transition-colors min-w-0"
                >
                  <div className="w-10 h-10 rounded-full bg-accent-700/20 flex items-center justify-center">
                    <Mail size={18} className="text-accent-400" />
                  </div>
                  <span className="text-white/60 text-xs">{t.profile.email}</span>
                </a>
              )}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 py-3 px-2 sm:px-4 rounded-xl hover:bg-white/5 transition-colors min-w-0"
              >
                <div className="w-10 h-10 rounded-full bg-accent-700/20 flex items-center justify-center">
                  <MapPin size={18} className="text-accent-400" />
                </div>
                <span className="text-white/60 text-xs">{t.profile.directions}</span>
              </a>
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-1.5 py-3 px-2 sm:px-4 rounded-xl hover:bg-white/5 transition-colors min-w-0"
              >
                <div className="w-10 h-10 rounded-full bg-accent-700/20 flex items-center justify-center">
                  <Share2 size={18} className="text-accent-400" />
                </div>
                <span className="text-white/60 text-xs">{t.profile.shareProfile}</span>
              </button>
            </motion.div>

            {/* Save Contact button */}
            <motion.div variants={fadeUp} className="px-6 pb-6">
              <button
                onClick={() => downloadVCard(member)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-accent-700 text-white rounded-xl font-semibold hover:bg-accent-600 transition-colors shadow-lg shadow-accent-700/30"
              >
                <UserPlus size={18} />
                {t.profile.saveContact}
              </button>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Specializations */}
            {member.specializations.length > 0 && (
              <motion.div variants={fadeUp} className="px-8 py-5">
                <h2 className="text-xs font-semibold tracking-widest text-accent-400 uppercase mb-3 flex items-center gap-2">
                  <Award size={14} />
                  {t.profile.specializations}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {member.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 text-xs rounded-full bg-accent-700/15 text-accent-300 border border-accent-700/20"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Languages */}
            {member.languages.length > 0 && (
              <motion.div variants={fadeUp} className="px-8 pb-5">
                <h2 className="text-xs font-semibold tracking-widest text-accent-400 uppercase mb-3 flex items-center gap-2">
                  <Globe size={14} />
                  {t.profile.languages}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {member.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/60 border border-white/10"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* About */}
            <motion.div variants={fadeUp} className="px-8 py-5">
              <h2 className="text-xs font-semibold tracking-widest text-accent-400 uppercase mb-3">
                {t.profile.about}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {member.bio[locale]}
              </p>
            </motion.div>

            {/* Contact details with copy */}
            <motion.div variants={fadeUp} className="px-8 pb-5 space-y-3 relative">
              <h2 className="text-xs font-semibold tracking-widest text-accent-400 uppercase mb-3">
                {t.profile.contactAgent}
              </h2>
              <CopyableContact
                href={`tel:${officePhone}`}
                icon={Phone}
                text={officePhone}
                displayText={displayPhone}
                copiedLabel={t.profile.copied}
              />
              {member.email && (
                <CopyableContact
                  href={`mailto:${member.email}`}
                  icon={Mail}
                  text={member.email}
                  copiedLabel={t.profile.copied}
                />
              )}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"
              >
                <MapPin size={16} className="text-accent-400/60 shrink-0" />
                {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}
              </a>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Linkedin size={16} className="text-accent-400/60 shrink-0" />
                  LinkedIn
                </a>
              )}
              {member.showAvailability !== false && (
                <div className="flex items-center gap-3 text-white/40 text-sm">
                  <Clock size={16} className="text-accent-400/60 shrink-0" />
                  {t.profile.officeHours}
                </div>
              )}
            </motion.div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* QR Code */}
            <motion.div variants={fadeUp} className="px-8 py-8 text-center">
              <div className="inline-block p-4 bg-white rounded-2xl">
                {profileUrl ? (
                  <QRCodeSVG
                    value={profileUrl}
                    size={160}
                    level="M"
                    imageSettings={{
                      src: "/ds-credito-logo.png",
                      x: undefined,
                      y: undefined,
                      height: 30,
                      width: 30,
                      excavate: true,
                    }}
                  />
                ) : (
                  <div className="w-[160px] h-[160px]" />
                )}
              </div>
              <p className="text-white/40 text-xs mt-4">
                {t.profile.scanQR}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {!isFullscreen && <Footer />}

      {/* Share toast */}
      {showShareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white text-sm flex items-center gap-2 animate-fade-in">
          <Check size={14} className="text-green-400" />
          {t.profile.copied}
        </div>
      )}
    </main>
  );
}
