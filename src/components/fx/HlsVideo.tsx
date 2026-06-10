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
}

export default function HlsVideo({ src, className = "" }: HlsVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let hls: Hls | null = null;
    let cancelled = false;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      import("hls.js").then(({ default: HlsLib }) => {
        if (cancelled || !HlsLib.isSupported()) return;
        hls = new HlsLib({ enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
      });
    }

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src]);

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
