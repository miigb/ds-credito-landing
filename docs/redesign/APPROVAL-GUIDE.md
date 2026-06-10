# Amanhecer 2026 Redesign — Guia de Aprovação

Branch: `redesign/amanhecer-2026` · worktree `.claude/worktrees/redesign-amanhecer`.
**O site live (main) não foi tocado.**

## Como rever

```bash
cd .claude/worktrees/redesign-amanhecer
npm run dev
```

Abrir http://localhost:3000. No canto inferior esquerdo há um botão **"Opções"**
(painel de protótipo — só desktop, removido na versão final). Permite alternar ao vivo:

| Controlo | Opções | O que muda |
|---|---|---|
| **Direção de design** | Cinema · Editorial | A direção de arte completa da página |
| **Logótipo** | Oficial · Sol + Mont · Monoline · Assinatura | Variante do logo em todo o site |
| **Textura** | Grão on/off | Grão de filme global |
| **Vista** | Cliente/Parceiro + PT/EN | Atalhos de audiência e idioma |

## As duas direções

- **Cinema** — "golden-hour escuro": hero com shader mesh dourado sobre ink, a página
  abre escura e vai "amanhecendo" até ao finale do footer no horizonte. Tipo branco
  gigante, ember como luz.
- **Editorial** — "papel quente": revista financeira premium em papel quente, tipografia
  ink com contraste de pesos (300/800), sol radial a nascer da dobra, chips bronze.

## Variantes de logótipo

1. **Oficial** — lockup horizontal da Particula Digital (sol gradiente + Brown Sugar). Zero risco.
2. **Sol + Mont** — sol oficial + wordmark Montserrat LETRA(bold)PERFEIÇOADA(light). Moderno, mantém o sol.
3. **Monoline** — sol redesenhado em traço (stroke, adapta a qualquer fundo) + Montserrat. O mais "novo".
4. **Assinatura** — wordmark Brown Sugar (fonte licenciada do logo) + sol ember flat. O mais pessoal.

## O que NÃO mudou (garantias)

- Todo o copy (translations.ts intocado) PT/EN, cliente/parceiro.
- Formulários: Web3Forms + backup Notion (`/api/lead`) + auto-reply Resend — endpoints e payloads idênticos.
- Wizard de pré-qualificação: mesmos 7 passos, mesma lógica de qualificação, mesma validação (testado em walkthrough automatizado até ao passo final sem submeter).
- Parágrafo regulatório do Banco de Portugal no footer — verbatim, caracter a caracter.
- Cartões digitais /equipa (QR, vCard, PWA, WhatsApp) — funcionalidade intacta; cores PWA atualizadas para a marca nova.
- SEO/JSON-LD/sitemap/robots/CSP — sem alterações estruturais; sem novos hosts externos.

## Screenshots

`docs/redesign/screens/` (não commitado, ~51MB local; regenerável com `/tmp/shotbot/shoot.js`).
Cobertura: 2 direções × 9 secções + parceiro + mobile + 8 variações de logo + equipa.

## Pendentes para a versão final (pós-aprovação)

1. Escolher direção (ou mistura) + variante de logo → remover `src/components/proto/` +
   `src/lib/PrototypeContext.tsx` + montes no `layout.tsx`, hardcode das escolhas.
2. `og-image.jpg`, `favicon/icon.svg`, `apple-touch-icon` ainda são da marca antiga — regenerar.
3. `/privacidade` e `/termos` herdam tokens novos mas merecem um pass tipográfico.
4. Decidir se Lenis (smooth scroll) fica — implementado com bridge para `scrollIntoView`.
5. Aviso dev-only do framer-motion ("non-static position") — benigno, não aparece em produção.
