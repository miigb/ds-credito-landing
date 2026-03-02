"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [muted, setMuted] = useState(false);
  const inView = useInView(containerRef, { amount: 0.4 });
  const { t } = useLanguage();

  // Pause when scrolled out of view
  useEffect(() => {
    if (!inView && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [inView]);

  const handleMouseEnter = () => {
    setHovering(true);
    if (videoRef.current && inView) {
      videoRef.current.muted = muted;
      videoRef.current.play().catch(() => {
        // Autoplay with sound blocked — fall back to muted
        if (videoRef.current) {
          videoRef.current.muted = true;
          setMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
      setHasPlayed(true);
    }
  };

  const handleMouseLeave = () => {
    setHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !muted;
      videoRef.current.muted = newMuted;
      setMuted(newMuted);
    }
  };

  // On mobile: tap to toggle play/pause
  const handleTap = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.muted = muted;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
      setHovering(true);
      setHasPlayed(true);
    } else {
      videoRef.current.pause();
      setHovering(false);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-brand-50" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent-700 text-sm font-semibold tracking-widest uppercase mb-4">
            {t.video.eyebrow}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight mb-5">
            {t.video.headline}
          </h2>
          <p className="text-lg text-brand-500 max-w-2xl mx-auto">
            {t.video.description}
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/10 border border-brand-100 group cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleTap}
        >
          {/* Video */}
          <video
            ref={videoRef}
            src="/partner-video.mp4"
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="w-full aspect-video object-cover"
          />

          {/* Overlay — fades out on hover/play */}
          <div
            className={`absolute inset-0 bg-brand-900/40 transition-opacity duration-500 flex items-center justify-center ${
              hovering ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play size={32} className="text-white ml-1" />
              </div>
              <span className="text-white/70 text-sm font-medium tracking-wide">
                {t.video.hover}
              </span>
            </div>
          </div>

          {/* Mute/Unmute button — visible while playing */}
          <button
            onClick={toggleMute}
            className={`absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all duration-300 ${
              hovering ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX size={18} className="text-white" />
            ) : (
              <Volume2 size={18} className="text-white" />
            )}
          </button>

          {/* Subtle gradient at bottom for polish */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-900/20 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
