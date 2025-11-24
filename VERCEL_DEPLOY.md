# Vercel Deployment Guide

## ✅ Code is on GitHub

Repository: https://github.com/Geraxi/tenantwebsite

## 🚀 Deploy to Vercel

### Step 1: Import Project

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select `Geraxi/tenantwebsite`
4. Click "Import"

### Step 2: Configure Project

1. **Framework Preset**: Next.js (should auto-detect)
2. **Root Directory**: `./` (default)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)

### Step 3: Add Environment Variables

Click "Environment Variables" and add these **one by one**:

#### Supabase
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://xrcnmlgecafyvtxqupza.supabase.co`
- **Environment**: Production, Preview, Development

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw`
- **Environment**: Production, Preview, Development

#### Stripe
- **Name**: `STRIPE_SECRET_KEY`
- **Value**: `your_stripe_secret_key_here` (use your actual Stripe secret key)
- **Environment**: Production, Preview, Development

- **Name**: `STRIPE_PRICE_ID_PRO`
- **Value**: `price_1SWxGZEaPIdEDikv5ROYh5Ie`
- **Environment**: Production, Preview, Development

- **Name**: `STRIPE_PRICE_ID_ENTERPRISE`
- **Value**: `price_1SWxGaEaPIdEDikvdXGr5dxc`
- **Environment**: Production, Preview, Development

- **Name**: `STRIPE_WEBHOOK_SECRET`
- **Value**: (Leave empty for now - add after webhook setup)
- **Environment**: Production only

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your site will be live at: `https://your-project.vercel.app`

### Step 5: Set Up Stripe Webhook

After deployment:

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-project.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_...`)
7. Go back to Vercel → Settings → Environment Variables
8. Update `STRIPE_WEBHOOK_SECRET` with the signing secret
9. Redeploy (or it will auto-redeploy)

## ✅ That's It!

Your site should now be live and fully functional!

