# Resend Auto-Reply Email Setup

Both forms send branded auto-reply confirmation emails to the person who submitted the form via [Resend](https://resend.com). Emails are bilingual — PT for Portuguese users, EN for English users.

## 1. Create Resend Account

1. Go to [resend.com/signup](https://resend.com/signup)
2. Sign up (free plan: 100 emails/day, 3,000/month)
3. Verify your email

## 2. Add Domain

1. Go to [resend.com/domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter: `meuintermediario.com`
4. Region: **EU (Frankfurt)**
5. Click **"Auto configure"** if using Vercel DNS — it adds the records automatically

If auto-configure isn't available, manually add the 3 DNS records (DKIM, SPF, MX) to [Vercel DNS](https://vercel.com/account/domains).

## 3. Verify Domain

1. Back on [resend.com/domains](https://resend.com/domains), click **"Verify"**
2. Wait 1–30 minutes for DNS propagation
3. Status should change to **Verified** ✓

## 4. Create API Key

1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Name: `ds-credito-landing`
4. Permission: **Sending access**
5. Domain: `meuintermediario.com`
6. Copy the key (starts with `re_`)

## 5. Configure Environment Variables

### Vercel (Production)

1. Go to [Vercel project settings → Environment Variables](https://vercel.com/miigb/ds-credito-landing/settings/environment-variables)
2. Add: `RESEND_API_KEY` = your `re_` key
3. Environment: Production, Preview, Development
4. Redeploy

### Local Development

Add to `.env.local`:
```
RESEND_API_KEY=re_your_key_here
```

## How It Works

- After successful Web3Forms submission, the form also calls `/api/auto-reply`
- The API route detects the user's locale and sends the appropriate EN or PT email
- From address: `DS Crédito <noreply@meuintermediario.com>`
- B2B contact form → partnership-focused confirmation
- B2C credit form → credit-specific confirmation with next steps
- Fire-and-forget: if Resend is down, the form still works

## Email Subjects

| Form | PT Subject | EN Subject |
|------|-----------|-----------|
| B2B Contact | Recebemos o seu contacto — DS Crédito | We received your message — DS Crédito |
| B2C Credit | Pedido de crédito recebido — DS Crédito | Credit request received — DS Crédito |

## Monitoring

View sent emails and delivery status at [resend.com/emails](https://resend.com/emails).
