"use client";

import { useEffect, useRef } from "react";
import type Hls from "hls.js";

/*
 * Background HLS video. Safari plays .m3u8 natively; other browsers get
 * hls.js (dynamic import, code-split). Muted/looping/inline — ambience only.
 * CSP: stream.mux.com allowed in connect-src (segments) + media-src incl.
 * blob: (hls.js attaches via MediaSource object URLs).
 */

interface HlsVideoProps {
  src: string;
  className?: string;
  /** Pause/resume externally (e.g. inactive slide in a deck). Default true. */
  playing?: boolean;
}

export default function HlsVideo({ src, className = "", playing = true }: HlsVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let hls: Hls | null = null;
    let cancelled = false;

    // Prefer MSE/hls.js when available (some Chromium builds claim native HLS
    // support but fail to play it); native <video src> path is for Safari/iOS.
    // Worker disabled: CSP script-src has no blob: for worker bootstrapping.
    import("hls.js").then(({ default: HlsLib }) => {
      if (cancelled) return;
      if (HlsLib.isSupported()) {
        hls = new HlsLib({ enableWorker: false });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(HlsLib.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.play().catch(() => {});
      }
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (playing) video.play().catch(() => {});
    else video.pause();
  }, [playing]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
