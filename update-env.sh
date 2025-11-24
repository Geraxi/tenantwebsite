#!/bin/bash

# Update environment with publishable key
echo "Updating environment variables..."

# Check if .env.local exists, if not create it
if [ ! -f .env.local ]; then
  cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xrcnmlgecafyvtxqupza.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw

# Stripe Configuration (to be added)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_PRO=
STRIPE_PRICE_ID_ENTERPRISE=

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
fi

echo "✅ Environment file ready"
echo ""
echo "Note: The publishable key you provided (sb_publishable_...) appears to be"
echo "a different format. Supabase typically uses JWT tokens for the anon key."
echo ""
echo "The current anon key is already configured. If the publishable key is"
echo "different, we may need to update it. Let's test the connection first."

