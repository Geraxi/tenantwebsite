# Final Setup Steps

## ✅ What's Done

- ✅ Supabase connection configured
- ✅ Environment variables set up
- ✅ Database SQL file ready (`setup-database.sql`)
- ✅ All code is ready

## 🚀 What You Need to Do Now

### Step 1: Run Database SQL (2 minutes)

1. **Open Supabase SQL Editor:**
   https://supabase.com/dashboard/project/xrcnmlgecafyvtxqupza/sql/new

2. **Open the file `setup-database.sql`** in this project folder

3. **Copy ALL contents** (278 lines)

4. **Paste into SQL Editor** and click "Run" (or Cmd/Ctrl + Enter)

5. **Verify it worked:**
   ```bash
   node verify-database-setup.js
   ```

### Step 2: Create Storage Bucket (1 minute)

1. Go to: https://supabase.com/dashboard/project/xrcnmlgecafyvtxqupza/storage/buckets

2. Click "New bucket"

3. Name: `documents`

4. **Important:** Set to **Private** (not public)

5. Click "Create bucket"

### Step 3: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and:
- Try signing up a new account
- Login
- You should see the CRM dashboard

### Step 4: Provide Stripe Credentials

Once database is set up, provide:
- Stripe Secret Key (`sk_test_...` or `sk_live_...`)
- After creating products: Price IDs for Pro and Enterprise plans

## 📝 Notes

- The JWT secret you provided is used for token verification
- For automated database setup, we'd need the **Service Role Key** (different from JWT secret)
- Manual SQL setup is actually safer and more reliable
- The SQL file includes everything: tables, RLS policies, triggers, indexes

## 🎯 Quick Commands

```bash
# Verify database setup
node verify-database-setup.js

# Test Supabase connection
node test-supabase-connection.js

# Start development server
npm run dev
```

---

**Once you've run the SQL, let me know and I'll:**
1. Verify everything is set up correctly
2. Help configure Stripe
3. Prepare for deployment

