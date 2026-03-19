# Auto-Reply Emails + Better Notification Subjects

## Context

Form submissions via Web3Forms send a notification email to the business, but the submitter gets no confirmation. The notification subjects are also too generic to filter in Gmail. We need:
1. Structured subjects on Web3Forms notifications for Gmail rules
2. Branded auto-reply emails to the person who submitted the form, bilingual (EN/PT)

## Architecture

```
User submits form
  → Web3Forms (notification to business — improved subject)
  → /api/lead (Notion backup — existing)
  → /api/auto-reply (Resend → branded HTML email to user) ← NEW
```

## 1. Web3Forms Subject Improvements

| Form | New Subject Pattern |
|------|-------------------|
| B2B Contact | `[B2B] Novo contacto: {name} — {role}` |
| B2C Credit | `[B2C] Pedido de crédito: {name} — {operation_type}` |

Gmail rules: filter `[B2B]` → label "Parceiros", filter `[B2C]` → label "Crédito".

## 2. Auto-Reply via Resend

### API Route: `/api/auto-reply`

Receives `{ name, email, locale, formType }`, sends branded HTML via Resend.

- From: `DS Crédito <noreply@meuintermediario.com>`
- 4 templates: B2B×{EN,PT} + B2C×{EN,PT}
- Fire-and-forget from the form components (same pattern as Notion backup)

### Email Template

Dark header (#0F172A) with LETRAPERFEIÇOADA wordmark, body with confirmation message and next steps, footer with contact details and BdP registration. Matches the landing page aesthetic.

## Files to Create/Modify

- `src/app/api/auto-reply/route.ts` — new
- `src/lib/emailTemplates.ts` — new (HTML template functions)
- `src/components/Contact.tsx` — add auto-reply call + dynamic subject
- `src/components/CreditForm.tsx` — add auto-reply call + dynamic subject
- `.env.example` — add RESEND_API_KEY
- `docs/RESEND_SETUP.md` — new setup guide

## Resend Setup Guide

### Step 1: Create Resend Account

1. Go to [resend.com/signup](https://resend.com/signup)
2. Sign up with your email (free plan: 100 emails/day, 3,000/month)
3. Verify your email address

### Step 2: Add Your Domain

1. Go to [resend.com/domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter: `meuintermediario.com`
4. Select region: **EU (Frankfurt)** — closest to Portugal, GDPR-compliant
5. Resend will show you **3 DNS records** to add:
   - **MX record** — for bounce handling
   - **TXT record** — SPF (authorizes Resend to send on your behalf)
   - **CNAME record** — DKIM (cryptographic email signature)

### Step 3: Add DNS Records in Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project → **Settings** → **Domains**
3. Click on `meuintermediario.com` to manage DNS
4. Or go directly to [vercel.com/domains](https://vercel.com/account/domains) → click your domain

For each record Resend gave you:

**MX Record:**
- Type: `MX`
- Name: `feedback-smtp` (or whatever Resend specifies — usually a subdomain like `feedback-smtp`)
- Value: the mail server Resend provides (e.g., `feedback-smtp.meuintermediario.com`)
- Priority: `10`

**TXT Record (SPF):**
- Type: `TXT`
- Name: `@` or blank (root domain) — or the specific subdomain Resend specifies
- Value: the SPF string Resend provides (e.g., `v=spf1 include:amazonses.com ~all`)

**CNAME Record (DKIM):**
- Type: `CNAME`
- Name: the DKIM selector Resend provides (e.g., `resend._domainkey`)
- Value: the DKIM value Resend provides

**Important:** Copy the exact values from the Resend domains page — don't guess. Each domain gets unique values.

### Step 4: Verify Domain

1. Go back to [resend.com/domains](https://resend.com/domains)
2. Click **"Verify"** next to `meuintermediario.com`
3. DNS propagation typically takes 1–5 minutes with Vercel
4. Status should change to **"Verified"** ✓
5. If it doesn't verify immediately, wait 15 minutes and try again

### Step 5: Create API Key

1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Name: `ds-credito-landing`
4. Permission: **"Sending access"** (not full access)
5. Domain: select `meuintermediario.com`
6. Copy the API key (starts with `re_`)

### Step 6: Add to Vercel Environment Variables

1. Go to your Vercel project → [Settings → Environment Variables](https://vercel.com/miigb/ds-credito-landing/settings/environment-variables)
2. Add:
   - **Key:** `RESEND_API_KEY`
   - **Value:** paste your `re_` key
   - **Environment:** Production, Preview, Development
3. Click **Save**
4. Trigger a redeploy

### Step 7: Local Development

Add to `.env.local`:
```
RESEND_API_KEY=re_your_key_here
```

## Verification

- Submit B2B form → check Gmail for `[B2B]` subject notification + check submitter inbox for branded auto-reply
- Submit B2C form → check Gmail for `[B2C]` subject notification + check submitter inbox for branded auto-reply
- Switch language to EN → submit → auto-reply should be in English
- Check Resend dashboard at [resend.com/emails](https://resend.com/emails) for delivery logs
