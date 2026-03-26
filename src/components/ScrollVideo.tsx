"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 96;
const FRAME_PATH = "/frames/frame-";
const AUTOPLAY_DURATION = 2000; // ms to play forward
const AUTOREVERSE_DURATION = 1500; // ms to reverse back

function getFrameSrc(index: number): string {
  const num = String(index + 1).padStart(4, "0");
  return `${FRAME_PATH}${num}.webp`;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface ScrollVideoProps {
  className?: string;
  scrollTarget: React.RefObject<HTMLElement | null>;
  style?: React.CSSProperties;
}

export default function ScrollVideo({ className = "", scrollTarget, style }: ScrollVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentFrameRef = useRef(-1);
  const autoplayDoneRef = useRef(false);
  const isAutoplayingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start start", "end start"],
  });

  const rawFrameIndex = useTransform(
    scrollYProgress,
    [0, 0.4],
    [0, TOTAL_FRAMES - 1],
    { clamp: true }
  );

  const smoothFrameIndex = useSpring(rawFrameIndex, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !images.length) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
    const img = images[clamped];
    if (!img || !img.complete) return;

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.drawImage(img, 0, 0);
  }, []);

  // Autoplay on load: play forward then reverse back
  const runAutoplay = useCallback(() => {
    if (autoplayDoneRef.current) return;
    autoplayDoneRef.current = true;
    isAutoplayingRef.current = true;

    const lastFrame = TOTAL_FRAMES - 1;
    let startTime: number | null = null;

    // Phase 1: play forward
    function playForward(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / AUTOPLAY_DURATION, 1);
      const easedProgress = easeInOutCubic(progress);
      const frame = Math.round(easedProgress * lastFrame);

      currentFrameRef.current = frame;
      drawFrame(frame);

      if (progress < 1) {
        requestAnimationFrame(playForward);
      } else {
        // Brief pause at end, then reverse
        setTimeout(() => {
          startTime = null;
          requestAnimationFrame(playReverse);
        }, 300);
      }
    }

    // Phase 2: reverse back to frame 0
    function playReverse(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / AUTOREVERSE_DURATION, 1);
      const easedProgress = easeInOutCubic(progress);
      const frame = Math.round((1 - easedProgress) * lastFrame);

      currentFrameRef.current = frame;
      drawFrame(frame);

      if (progress < 1) {
        requestAnimationFrame(playReverse);
      } else {
        isAutoplayingRef.current = false;
      }
    }

    // Small delay before starting
    setTimeout(() => requestAnimationFrame(playForward), 400);
  }, [drawFrame]);

  // Preload all frames
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    const loadedSet = new Set<number>();

    function markLoaded(index: number) {
      loadedSet.add(index);
      if (!cancelled && loadedSet.size === TOTAL_FRAMES) {
        imagesRef.current = images;
        setLoaded(true);
        drawFrame(0);
        currentFrameRef.current = 0;
        runAutoplay();
      }
    }

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = i;
      img.onload = () => markLoaded(idx);
      img.onerror = () => markLoaded(idx);
      img.src = getFrameSrc(i);
      images.push(img);
    }

    return () => {
      cancelled = true;
    };
  }, [drawFrame, runAutoplay]);

  // Scroll-driven updates (only when not autoplaying)
  useMotionValueEvent(smoothFrameIndex, "change", (latest) => {
    if (isAutoplayingRef.current) return;
    const index = Math.round(latest);
    if (index === currentFrameRef.current) return;
    currentFrameRef.current = index;
    drawFrame(index);
  });

  return (
    <div className={className} style={style}>
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover scale-110 transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
