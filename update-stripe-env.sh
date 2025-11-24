#!/bin/bash

# Update .env.local with Stripe secret key
STRIPE_KEY="${STRIPE_SECRET_KEY:-your_stripe_secret_key_here}"

# Read existing .env.local and update Stripe key
if [ -f .env.local ]; then
  # Remove old Stripe key line and add new one
  grep -v "STRIPE_SECRET_KEY" .env.local > .env.local.tmp
  echo "STRIPE_SECRET_KEY=$STRIPE_KEY" >> .env.local.tmp
  mv .env.local.tmp .env.local
  echo "✅ Updated STRIPE_SECRET_KEY in .env.local"
else
  echo "⚠️  .env.local not found. Creating it..."
  cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xrcnmlgecafyvtxqupza.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw

# Stripe Configuration
STRIPE_SECRET_KEY=$STRIPE_KEY
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_PRO=
STRIPE_PRICE_ID_ENTERPRISE=

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
  echo "✅ Created .env.local with Stripe key"
fi

echo ""
echo "Next steps:"
echo "1. Create Stripe products in Stripe Dashboard"
echo "2. Get the Price IDs for Pro and Enterprise plans"
echo "3. Update STRIPE_PRICE_ID_PRO and STRIPE_PRICE_ID_ENTERPRISE in .env.local"

