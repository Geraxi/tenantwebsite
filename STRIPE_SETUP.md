# Stripe Setup Guide

## ✅ Current Status

- ✅ Stripe Secret Key: Configured (Live key)
- ⏳ Products: Need to be created
- ⏳ Price IDs: Need to be obtained
- ⏳ Webhook: Need to be set up after deployment

## 📝 Step 1: Create Stripe Products

1. Go to Stripe Dashboard: https://dashboard.stripe.com/products

2. Create **Pro Plan** product:
   - Click "Add product"
   - Name: `Pro Plan`
   - Description: `Pro subscription for Tenant CRM`
   - Pricing model: `Recurring`
   - Price: `€199.00`
   - Billing period: `Monthly`
   - Click "Save product"
   - **Copy the Price ID** (starts with `price_...`)

3. Create **Enterprise Plan** product:
   - Click "Add product"
   - Name: `Enterprise Plan`
   - Description: `Enterprise subscription for Tenant CRM`
   - Pricing model: `Recurring`
   - Price: `€499.00`
   - Billing period: `Monthly`
   - Click "Save product"
   - **Copy the Price ID** (starts with `price_...`)

## 📋 Step 2: Update Environment Variables

Once you have the Price IDs, update `.env.local`:

```bash
STRIPE_PRICE_ID_PRO=price_xxxxx  # Replace with actual Pro Price ID
STRIPE_PRICE_ID_ENTERPRISE=price_xxxxx  # Replace with actual Enterprise Price ID
```

Or run:
```bash
./update-stripe-env.sh
```

## 🔗 Step 3: Set Up Webhook (After Deployment)

After deploying to Vercel:

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click "Add endpoint"
6. **Copy the webhook signing secret** (starts with `whsec_...`)
7. Add to `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

## 🧪 Step 4: Test Locally

```bash
npm run dev
```

Test the subscription flow:
1. Go to Settings page
2. Click "Passa a Pro" or "Passa a Enterprise"
3. Complete checkout
4. Verify subscription is created

## 📝 Quick Reference

- **Stripe Dashboard:** https://dashboard.stripe.com
- **Products:** https://dashboard.stripe.com/products
- **Webhooks:** https://dashboard.stripe.com/webhooks
- **API Keys:** https://dashboard.stripe.com/apikeys

---

**Current Configuration:**
- Secret Key: ✅ Configured (Live)
- Products: ⏳ Need to create
- Price IDs: ⏳ Need to add
- Webhook: ⏳ Set up after deployment

