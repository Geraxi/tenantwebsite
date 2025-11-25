# Setup Instructions

## ✅ Step 1: Environment Variables (COMPLETED)
Environment variables have been set up in `.env.local` with your Supabase credentials.

## 📝 Step 2: Set Up Database

### Option A: Via Supabase Dashboard (Recommended)

1. Go to your Supabase SQL Editor:
   https://supabase.com/dashboard/project/xrcnmlgecafyvtxqupza/sql/new

2. Copy the entire contents of `setup-database.sql` file

3. Paste it into the SQL Editor

4. Click "Run" to execute

This will create:
- All database tables (agencies, users, owners, properties, tenants, payments, tasks, documents)
- Row Level Security (RLS) policies
- Automatic user/agency creation trigger
- Indexes for performance

### Option B: Via Supabase CLI (If you have it installed)

```bash
supabase db push
```

## 🗄️ Step 3: Set Up Storage Bucket

1. Go to Supabase Dashboard > Storage
2. Click "New bucket"
3. Name it: `documents`
4. Set it to **Private** (not public)
5. Click "Create bucket"

The storage policies are already included in the SQL setup.

## 💳 Step 4: Set Up Stripe (Next)

Once you provide your Stripe credentials, I'll:
1. Update `.env.local` with Stripe keys
2. Help you create the products in Stripe
3. Set up webhooks

## 🚀 Step 5: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and test:
- Sign up a new user
- Login
- Create properties, owners, tenants

## 📦 Step 6: Deploy to Vercel

Once everything works locally:
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

---

**Current Status:**
- ✅ Supabase credentials configured
- ✅ Environment variables set up
- ⏳ Database setup (run SQL file)
- ⏳ Storage bucket creation
- ⏳ Stripe configuration (waiting for credentials)

