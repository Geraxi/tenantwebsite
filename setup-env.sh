#!/bin/bash

# Setup script for environment variables
echo "Setting up environment variables..."

cat > .env.local << EOF
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

echo "✅ Environment variables created in .env.local"
echo ""
echo "Next steps:"
echo "1. Run the SQL files in Supabase SQL Editor:"
echo "   - database/schema.sql"
echo "   - database/triggers.sql"
echo "   - supabase-migrations/documents-schema.sql"
echo ""
echo "2. Create a Storage bucket named 'documents' in Supabase"
echo "3. Provide Stripe credentials to continue"

