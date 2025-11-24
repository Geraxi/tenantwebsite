# Deployment Guide

This guide will help you deploy the Tenant CRM platform to production.

## Prerequisites

1. **Supabase Account** - [Sign up](https://supabase.com)
2. **Stripe Account** - [Sign up](https://stripe.com)
3. **Vercel Account** (recommended) - [Sign up](https://vercel.com)

## Step 1: Set Up Supabase

1. Create a new Supabase project at https://supabase.com
2. Go to Settings > API to get your:
   - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   - Anon/Public Key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
3. Run the database schema:
   - Go to SQL Editor in Supabase
   - Run the SQL from `database/schema.sql`
4. Set up Storage:
   - Go to Storage in Supabase
   - Create a bucket named `documents`
   - Set it to private
   - Add RLS policies for authenticated users

## Step 2: Set Up Stripe

1. Create a Stripe account at https://stripe.com
2. Go to Products in Stripe Dashboard
3. Create two products:
   - **Pro Plan**: €199/month
   - **Enterprise Plan**: €499/month
4. Copy the Price IDs for each product
5. Set up Webhooks:
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy the webhook signing secret

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   STRIPE_PRICE_ID_PRO=price_your_pro_price_id
   STRIPE_PRICE_ID_ENTERPRISE=price_your_enterprise_price_id
   ```
6. Click "Deploy"

### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add STRIPE_PRICE_ID_PRO
vercel env add STRIPE_PRICE_ID_ENTERPRISE

# Deploy to production
vercel --prod
```

## Step 4: Update Stripe Webhook URL

After deployment, update your Stripe webhook endpoint to:
```
https://your-domain.vercel.app/api/stripe/webhook
```

## Step 5: Test the Deployment

1. Visit your deployed site
2. Test signup/login
3. Test subscription checkout
4. Verify webhooks are working in Stripe Dashboard

## Environment Variables

All environment variables should be set in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `STRIPE_SECRET_KEY` - Your Stripe secret key (use `sk_live_` for production)
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook signing secret
- `STRIPE_PRICE_ID_PRO` - Stripe Price ID for Pro plan
- `STRIPE_PRICE_ID_ENTERPRISE` - Stripe Price ID for Enterprise plan

## Database Setup

Make sure to run all migrations in order:
1. `database/schema.sql` - Main schema
2. `supabase-migrations/documents-schema.sql` - Documents table

## Troubleshooting

- **Auth not working**: Check Supabase URL and keys are correct
- **Stripe checkout not working**: Verify Price IDs are correct
- **Webhooks not working**: Check webhook URL and secret in Stripe
- **Build errors**: Check all environment variables are set

