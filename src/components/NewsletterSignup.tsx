"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterSignup() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscribe failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="max-w-3xl mx-auto px-6 py-16"
    >
      <div className="bg-brand-900 rounded-2xl p-8 text-center">
        <Mail className="w-10 h-10 text-accent-400 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-white mb-2">
          {t.newsletter.title}
        </h2>
        <p className="text-white/60 mb-6">
          {t.newsletter.description}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@exemplo.com"
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-base focus:outline-none focus:ring-2 focus:ring-accent-400"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 rounded-xl bg-accent-700 text-white font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "..." : t.newsletter.subscribe ?? "Subscrever"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-sm text-green-400">{t.newsletter.success}</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-400">{t.newsletter.error}</p>
        )}

        <p className="mt-4 text-xs text-white/30">{t.newsletter.privacy}</p>
      </div>
    </motion.section>
  );
}
