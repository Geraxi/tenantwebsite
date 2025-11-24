# Tenant CRM Platform

A comprehensive property management platform built with Next.js, TypeScript, TailwindCSS, ShadCN UI, and Supabase.

## Features

### Landing Page
- Clean SaaS design
- CRM value proposition
- Comparison table (agencies using 4+ tools vs Tenant CRM)
- Interactive cost-savings calculator
- Pricing page
- Contact / demo request form
- Login redirect into CRM

### Authentication
- Email/password authentication
- Magic link authentication
- Google OAuth
- Apple OAuth (placeholder)

### CRM Dashboard
- **Properties**: Add property (rent or sale), manage listings, photo uploads, linked tenants/owners
- **Owners**: Owner profiles, attach properties
- **Tenants**: Tenant profiles, rental status, contract details
- **Payments**: Rent tracking, invoice/receipt generator, reminders, export CSV
- **Tasks**: Maintenance, reminders
- **Messaging**: Phase 2 placeholder

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: ShadCN UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for payments)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   STRIPE_PRICE_ID_PRO=price_your_pro_price_id
   STRIPE_PRICE_ID_ENTERPRISE=price_your_enterprise_price_id
   ```

4. Set up the database:
   - Go to your Supabase project SQL Editor
   - Run the SQL script from `database/schema.sql`
   - Run `supabase-migrations/documents-schema.sql` for documents table

5. Set up Supabase Storage:
   - Create a bucket named `documents`
   - Set it to private
   - Add RLS policies for authenticated users

6. Set up Stripe:
   - Create products in Stripe Dashboard (Pro: €199/month, Enterprise: €499/month)
   - Copy the Price IDs
   - Set up webhook endpoint (see DEPLOYMENT.md)

7. Run the development server:
   ```bash
   npm run dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
├── app/
│   ├── crm/              # CRM dashboard routes
│   │   ├── layout.tsx     # CRM layout with sidebar
│   │   ├── page.tsx       # Dashboard home
│   │   ├── properties/    # Properties module
│   │   ├── owners/        # Owners module
│   │   ├── tenants/       # Tenants module
│   │   ├── payments/      # Payments module
│   │   ├── tasks/         # Tasks module
│   │   └── messaging/     # Messaging (placeholder)
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── auth/              # Auth callbacks
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── landing/           # Landing page components
│   ├── auth/              # Authentication components
│   ├── crm/               # CRM components
│   └── ui/                # ShadCN UI components
├── lib/
│   ├── supabase/          # Supabase client setup
│   └── utils.ts           # Utility functions
├── types/
│   └── database.types.ts  # Database type definitions
├── database/
│   └── schema.sql         # Database schema
└── middleware.ts          # Route protection middleware
```

## Database Schema

The platform uses the following main tables:
- `users` - User accounts
- `agencies` - Agency/organization data
- `properties` - Property listings
- `owners` - Property owners
- `tenants` - Tenant profiles
- `payments` - Payment records
- `tasks` - Tasks and reminders
- `files` - File metadata (Supabase Storage)

See `database/schema.sql` for the complete schema.

## Development

### Adding New Features

1. Create components in `components/` directory
2. Add routes in `app/` directory following App Router conventions
3. Use server components where possible
4. Implement database queries using Supabase client
5. Protect routes with middleware

### Code Style

- Use TypeScript for all files
- Follow Next.js App Router conventions
- Use ShadCN UI components
- Keep components modular and reusable
- Use server components by default, client components when needed

## Next Steps

The boilerplate is set up. Next steps:
1. Implement authentication logic with Supabase
2. Add database queries for each module
3. Implement file uploads to Supabase Storage
4. Add form validation and error handling
5. Implement RLS policies in Supabase
6. Add real-time features if needed

## License

Private - All rights reserved
