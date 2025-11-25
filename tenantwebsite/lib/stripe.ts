import Stripe from 'stripe'

// Lazy initialization to avoid build-time errors when env var is missing
let stripeClient: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeClient) {
    const secret = process.env.STRIPE_SECRET_KEY
    if (!secret) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    stripeClient = new Stripe(secret, {
      apiVersion: '2025-11-17.acacia' as any,
      typescript: true,
    })
  }
  return stripeClient
}

// Export getter function - call getStripe() in your API routes instead of using stripe directly
// This prevents module-level initialization during build
export { getStripe as stripe }

export const STRIPE_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: null,
    features: ['Fino a 10 proprietà', 'Gestione base inquilini', 'Supporto email'],
  },
  pro: {
    name: 'Pro',
    price: 199,
    priceId: process.env.STRIPE_PRICE_ID_PRO || 'price_pro_monthly',
    features: [
      'Proprietà illimitate',
      'Gestione completa inquilini e proprietari',
      'Caricamento documenti illimitato',
      'Report e analytics',
      'Supporto prioritario',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    price: 499,
    priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE || 'price_enterprise_monthly',
    features: [
      'Tutto incluso in Pro',
      'Multi-utente e permessi',
      'API access',
      'Account manager dedicato',
      'Supporto 24/7',
    ],
  },
}

