# Quick Setup Guide

## ✅ Current Status

- ✅ Supabase connection verified (both keys work)
- ✅ Environment variables configured
- ✅ Database SQL file ready
- ⏳ Database tables need to be created
- ⏳ Storage bucket needs to be created
- ⏳ Stripe configuration pending

## 🚀 Next Steps (5 minutes)

### 1. Create Database Tables (2 minutes)

**Option A: Via Supabase Dashboard (Easiest)**
1. Open: https://supabase.com/dashboard/project/xrcnmlgecafyvtxqupza/sql/new
2. Open the file `setup-database.sql` in this project
3. Copy ALL the contents
4. Paste into Supabase SQL Editor
5. Click "Run" (or Cmd/Ctrl + Enter)

**Option B: If you have Service Role Key**
- I can automate this for you - just provide the service role key

### 2. Create Storage Bucket (1 minute)

1. Go to: https://supabase.com/dashboard/project/xrcnmlgecafyvtxqupza/storage/buckets
2. Click "New bucket"
3. Name: `documents`
4. Set to **Private** (important!)
5. Click "Create bucket"

### 3. Test Locally (1 minute)

```bash
npm run dev
```

Visit http://localhost:3000 and try:
- Sign up a new account
- Login
- You should be redirected to `/crm/dashboard`

### 4. Stripe Setup (After database is ready)

Once you provide Stripe credentials, I'll:
- Configure Stripe products
- Set up webhooks
- Complete the payment flow

## 📋 What You Need

1. **Supabase Service Role Key** (optional - for automation)
   - Or just run the SQL manually as shown above

2. **Stripe Credentials:**
   - Secret Key (`sk_test_...` or `sk_live_...`)
   - After creating products: Price IDs
   - Webhook secret (after deployment)

## 🎯 Current Configuration

- **Supabase URL:** https://xrcnmlgecafyvtxqupza.supabase.co
- **Anon Key:** ✅ Configured and working
- **Database:** ⏳ Ready to create (run SQL)
- **Storage:** ⏳ Ready to create (create bucket)

---

**Ready to proceed?** Run the SQL file in Supabase and let me know when it's done, or provide the service role key for automation!

