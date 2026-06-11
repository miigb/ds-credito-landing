"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { FadeIn, RevealLine } from "@/components/fx/RevealText";
import { useLanguage } from "@/lib/LanguageContext";
import { usePrototype } from "@/lib/PrototypeContext";

/*
 * VideoShowcase (B2B only — parent gates it) — the cinema screen
 * (see docs/redesign/DESIGN-BRIEF.md §6): ink surround, thin ember rule,
 * oversized tracking eyebrow, ember ambient glow behind the frame.
 * All video behaviour (hover-play w/ sound→muted fallback, tap-to-play,
 * mute toggle, pause out-of-view, error fallback) is unchanged.
 */
export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const inView = useInView(containerRef, { amount: 0.4 });
  const { t } = useLanguage();
  const { direction } = usePrototype();

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
    <section className="relative py-20 md:py-24 lg:py-28 overflow-hidden bg-ink">
      {/* cinema: a faint dawn wash behind the screening room */}
      {direction === "cinema" && (
        <div aria-hidden className="absolute inset-0 bg-dawn-radial-dark opacity-50" />
      )}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="text-center mb-12 lg:mb-16">
          <FadeIn>
            <p className="text-xs lg:text-sm font-semibold uppercase tracking-[0.45em] text-accent-400 mb-6">
              {t.video.eyebrow}
            </p>
          </FadeIn>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-5 text-balance">
            <RevealLine>{t.video.headline}</RevealLine>
          </h2>
          <FadeIn delay={0.15}>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              {t.video.description}
            </p>
          </FadeIn>
        </div>

        {/* ── The screen ── */}
        <div className="relative max-w-5xl mx-auto">
          {/* ember ambient glow behind the frame */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-accent-700/10 blur-[120px] pointer-events-none"
          />

          {/* thin ember rule above the screen */}
          <FadeIn delay={0.1}>
            <div
              aria-hidden
              className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-accent-700/80 to-transparent"
            />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              ref={containerRef}
              className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_30px_90px_rgba(16,11,6,0.5)] group cursor-pointer"
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
                onError={() => setVideoError(true)}
              >
                <track kind="captions" />
              </video>

              {/* Fallback when video fails to load */}
              {videoError && (
                <div className="absolute inset-0 bg-brand-800 flex items-center justify-center">
                  <div className="text-center px-8">
                    <Play size={48} className="text-white/20 mx-auto mb-4" />
                    <p className="text-white/40 text-sm">{t.video.headline}</p>
                  </div>
                </div>
              )}

              {/* Overlay — fades out on hover/play */}
              <div
                className={`absolute inset-0 bg-ink/45 transition-opacity duration-500 flex items-center justify-center ${
                  hovering ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-[0.25em]">
                    {t.video.hover}
                  </span>
                </div>
              </div>

              {/* Mute/Unmute button — visible while playing */}
              <button
                onClick={toggleMute}
                className={`absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-ink/70 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-ink/90 transition-all duration-300 ${
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
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink/30 to-transparent pointer-events-none" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
