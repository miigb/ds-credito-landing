"use client";

import { useEffect, useRef, useState } from "react";

const CDN_URL =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || appRef.current) return;

    let mounted = true;

    (async () => {
      try {
        const mod = await new Function(
          "url",
          "return import(url)"
        )(CDN_URL);
        if (!mounted) return;
        const TubesCursorFn = mod.default;
        appRef.current = TubesCursorFn(canvas, {
          tubes: {
            colors: ["#E85D91", "#C4135F", "#A30F4F"],
            lights: {
              intensity: 200,
              colors: ["#ffaedb", "#f051bb", "#86056c", "#5B0A2E"],
            },
          },
        });
        // Fade in after a brief delay to let the first frame render
        requestAnimationFrame(() => {
          if (mounted) setLoaded(true);
        });
      } catch (err) {
        console.warn("TubesCursor failed to load:", err);
      }
    })();

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      mounted = false;
      observer.disconnect();
      if (appRef.current?.dispose) {
        appRef.current.dispose();
      }
      appRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out"
      style={{
        pointerEvents: "auto",
        opacity: loaded ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
      }}
    />
  );
}
