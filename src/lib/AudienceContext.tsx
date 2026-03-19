"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Audience = "partner" | "client" | null;

interface AudienceContextType {
  audience: Audience;
  setAudience: (audience: Audience) => void;
}

const AudienceContext = createContext<AudienceContextType>({
  audience: null,
  setAudience: () => {},
});

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>(null);

  return (
    <AudienceContext.Provider value={{ audience, setAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  return useContext(AudienceContext);
}
