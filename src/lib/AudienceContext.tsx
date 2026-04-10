"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Audience = "partner" | "client";

const STORAGE_KEY = "ds-credito-audience";

interface AudienceContextType {
  audience: Audience;
  setAudience: (audience: Audience) => void;
}

const AudienceContext = createContext<AudienceContextType>({
  audience: "client",
  setAudience: () => {},
});

export function AudienceProvider({ children }: { children: ReactNode }) {
  // Always default to "client" on fresh page load so the hero shows
  // the B2C simulator. Context state persists across client-side
  // navigation automatically — no storage needed.
  const [audience, setAudience] = useState<Audience>("client");

  // Clear any stale session from previous visits on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <AudienceContext.Provider value={{ audience, setAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  return useContext(AudienceContext);
}
