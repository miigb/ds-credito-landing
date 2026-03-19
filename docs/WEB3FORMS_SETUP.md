# Web3Forms Setup Guide

Both the B2B contact form and B2C credit request form use [Web3Forms](https://web3forms.com) to deliver submissions via email.

## 1. Get an Access Key

1. Go to https://web3forms.com
2. Enter the email address where you want to receive form submissions
3. Check your inbox and click the verification link
4. Copy the **Access Key** from the dashboard

## 2. Configure Vercel (Production)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add a new variable:
   - **Key:** `NEXT_PUBLIC_WEB3FORMS_KEY`
   - **Value:** *(paste your access key)*
   - **Environment:** Production, Preview, Development
4. Click **Save**
5. Redeploy the project (Settings > Deployments > Redeploy)

## 3. Configure Local Development

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key-here
```

This file is gitignored and won't be committed.

## 4. Test

1. Start the dev server: `npm run dev`
2. Submit the B2B contact form (PT or EN mode)
3. Submit the B2C credit request form (PT mode > "Sou Particular" > pass quiz)
4. Check your email for both submissions

## How It Works

- Both forms POST to `https://api.web3forms.com/submit`
- The access key is included as a hidden `access_key` field
- Web3Forms sends the form data to the registered email
- B2B submissions have subject: "New contact from DS Crédito website"
- B2C submissions have subject: "Novo pedido de crédito -- meuintermediario.com"
- A hidden `botcheck` field provides basic spam protection

## Troubleshooting

- **Forms show success but no email:** Check spam folder. Verify the access key is correct.
- **Forms show error:** Check browser console. The key might not be set in environment variables.
- **Key not working after deploy:** Redeploy the project after adding the env var — Next.js bakes `NEXT_PUBLIC_*` vars at build time.
