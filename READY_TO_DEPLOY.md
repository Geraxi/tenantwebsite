# 🚀 Ready to Deploy!

## ✅ Everything is Set Up

### Database
- ✅ All tables created
- ✅ RLS policies configured
- ✅ Triggers working
- ✅ Indexes created

### Supabase
- ✅ Connection configured
- ✅ Storage bucket needed (create `documents` bucket)

### Stripe
- ✅ Secret key configured
- ✅ Products created:
  - **Pro Plan**: €199/month (Price ID: `price_1SWxGZEaPIdEDikv5ROYh5Ie`)
  - **Enterprise Plan**: €499/month (Price ID: `price_1SWxGaEaPIdEDikvdXGr5dxc`)
- ⏳ Webhook: Set up after deployment

## 🧪 Test Locally First

```bash
npm run dev
```

Visit http://localhost:3000 and test:
1. Sign up a new account
2. Login
3. Navigate to Settings
4. Try upgrading to Pro or Enterprise (will open Stripe checkout)

## 📦 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xrcnmlgecafyvtxqupza.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   STRIPE_PRICE_ID_PRO=price_1SWxGZEaPIdEDikv5ROYh5Ie
   STRIPE_PRICE_ID_ENTERPRISE=price_1SWxGaEaPIdEDikvdXGr5dxc
   ```
5. Click "Deploy"

### Step 3: Set Up Stripe Webhook
After deployment, get your Vercel URL and:
1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-app.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy webhook secret and add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

## 📋 Environment Variables Summary

**Local (.env.local):**
- ✅ All configured

**Vercel (add these):**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- STRIPE_SECRET_KEY
- STRIPE_PRICE_ID_PRO
- STRIPE_PRICE_ID_ENTERPRISE
- STRIPE_WEBHOOK_SECRET (after webhook setup)

## 🎯 Final Checklist

- [x] Database set up
- [x] Supabase configured
- [x] Stripe products created
- [ ] Storage bucket created
- [ ] Test locally
- [ ] Deploy to Vercel
- [ ] Set up webhook
- [ ] Test production

---

**You're almost there!** Just need to:
1. Create storage bucket
2. Test locally
3. Deploy!

