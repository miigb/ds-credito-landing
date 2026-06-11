"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** Surface tone — re-tints the track for ink (dark) canvases. */
  tone?: "light" | "dark";
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className = "", tone = "light", ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={`relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50 ${className}`}
    {...props}
  >
    <SliderPrimitive.Track
      className={`relative grow h-2 overflow-hidden rounded-full ${
        tone === "dark" ? "bg-white/[0.12]" : "bg-brand-100"
      }`}
    >
      <SliderPrimitive.Range className="absolute h-full bg-accent-700" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={`block h-5 w-5 rounded-full border-2 border-accent-700 bg-white shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 ${
        tone === "dark"
          ? "focus-visible:ring-accent-400/50"
          : "focus-visible:ring-accent-700/40"
      } data-[disabled]:cursor-not-allowed`}
      aria-label="Slider handle"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";

export { Slider };
