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

function isValidAudience(value: unknown): value is Audience {
  return value === "partner" || value === "client";
}

interface AudienceContextType {
  audience: Audience;
  setAudience: (audience: Audience) => void;
}

const AudienceContext = createContext<AudienceContextType>({
  audience: "client",
  setAudience: () => {},
});

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>("client");

  // Read from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (isValidAudience(stored)) {
        setAudience(stored);
      }
    }
  }, []);

  // Write to sessionStorage when audience changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, audience);
    }
  }, [audience]);

  return (
    <AudienceContext.Provider value={{ audience, setAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  return useContext(AudienceContext);
}
