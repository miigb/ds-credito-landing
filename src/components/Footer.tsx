"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.whyUs, href: "#why-us" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="relative bg-brand-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
            {/* Brand — Combined mark: LETRAPERFEIÇOADA wordmark + DS Crédito badge */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-start">
                <span className="text-white text-sm tracking-wide">
                  <span className="font-bold">LETRA</span>
                  <span className="font-light">PERFEI&Ccedil;OADA</span>
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-white/30 text-[10px] tracking-wider">Intermediários de Crédito</span>
                  <img
                    src="/ds-credito-logo.png"
                    alt="DS Crédito"
                    className="h-5 w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Links */}
            <nav aria-label="Footer navigation" className="flex items-center gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/40 text-sm hover:text-white/70 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/30 hover:text-white/60 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/30 hover:text-white/60 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/30 hover:text-white/60 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* ANICA membership */}
          <div className="flex justify-center w-full">
            <a
              href="https://anica.org.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <img
                src="/anica-logo.png"
                alt="ANICA"
                className="h-6 w-auto brightness-0 invert opacity-50"
              />
              <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium">
                Membro ANICA
              </span>
            </a>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs border-t border-white/5 pt-6 w-full">
            <a
              href="/privacidade"
              className="text-white/40 hover:text-white/60 underline underline-offset-2 transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="/termos"
              className="text-white/40 hover:text-white/60 underline underline-offset-2 transition-colors"
            >
              Termos e Condições
            </a>
            <a
              href="https://www.livroreclamacoes.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/60 underline underline-offset-2 transition-colors"
            >
              Livro de Reclamações
            </a>
            <a
              href={siteConfig.regulation.registryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/60 underline underline-offset-2 transition-colors"
            >
              Registo Banco de Portugal
            </a>
          </div>

          {/* Regulatory notice */}
          <div className="text-white/20 text-[10px] text-center w-full mt-4 leading-relaxed max-w-4xl mx-auto">
            <p>
              A <strong className="text-white/30">LETRAPERFEIÇOADA — UNIPESSOAL LDA</strong> é um Intermediário de Crédito Vinculado, com o registo nº{" "}
              <a
                href={siteConfig.regulation.registryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/50 underline underline-offset-2 transition-colors"
              >
                0007470
              </a>
              , autorizado pelo Banco de Portugal para a prestação de serviços de consultoria e autorizado para a prestação de serviços de intermediação de crédito (Apresentação ou proposta de contratos de crédito a consumidores; Assistência a consumidores, mediante a realização de atos preparatórios ou de outros trabalhos de gestão pré-contratual relativamente a contratos de crédito que não tenham sido por si apresentados ou propostos). Contratos de crédito abrangidos: Crédito à Habitação e Crédito aos Consumidores. Mutuantes ou grupos de mutuantes com quem mantém contrato de vinculação: CAIXA GERAL DE DEPÓSITOS, S.A., BANCO SANTANDER TOTTA, S.A., NOVO BANCO, S.A., BANCO BPI, S.A., BANKINTER, S.A. — SUCURSAL EM PORTUGAL, BANCO CTT, S.A., ABANCA PORTUGAL, S.A., BNI EUROPA, S.A., UCI — UNIÃO DE CRÉDITOS IMOBILIÁRIOS, S.A., UNICRE — INSTITUIÇÃO FINANCEIRA DE CRÉDITO, S.A. Informação verificável em{" "}
              <a
                href={siteConfig.regulation.registryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/50 underline underline-offset-2 transition-colors"
              >
                bportugal.pt
              </a>
              .
            </p>
            <p className="pt-2">
              &copy; {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
