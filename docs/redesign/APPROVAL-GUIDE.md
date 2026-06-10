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
| **Hero · Cinema** | Vídeo 1 · Vídeo 2 · Vídeo 3 · Shader | Tratamento do hero na direção Cinema: **Vídeo 1** = vídeo ambiente (sol entre monólitos) com blur inferior em máscara e entradas blur-fade-up escalonadas; **Vídeo 2** = minimal liquid-glass (vídeo da esfera, conteúdo em baixo-esquerda, sem animações de entrada, navbar vira pill de vidro central); **Vídeo 3** = stream HLS adaptativo (Mux, via hls.js fora do Safari), header glassmórfico flutuante, composição centrada, simulador ancorado em baixo-direita; **Shader** = mesh gradient golden-hour |
| **Textura** | Grão on/off | Grão de filme global |
| **Vista** | Cliente/Parceiro + PT/EN | Atalhos de audiência e idioma |

> Nota (heros Vídeo): os ficheiros em `public/hero/*.mp4` estão em .gitignore —
> se faltarem após um checkout novo, refazer o download:
> `curl -o public/hero/hero-ambient.mp4 "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"` (Vídeo 1, 9,4 MB)
> `curl -o public/hero/hero-ambient-2.mp4 "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4"` (Vídeo 2, 5,8 MB)
> Sem o ficheiro, o hero mostra o gradiente warm-ink de fallback (igual ao reduced-motion).
> O **Vídeo 3** faz stream de `stream.mux.com` (HLS) — exigiu adicionar `stream.mux.com`
> a `connect-src` e `media-src` (+ `blob:`) no CSP em `next.config.ts`, e a dependência `hls.js`.
> Para produção: comprimir/recortar o vídeo escolhido, gerar poster, verificar licença
> (são assets de demonstração) e servi-lo do próprio domínio ou manter Mux com conta própria.

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
