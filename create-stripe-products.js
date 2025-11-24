// Create Stripe products and prices
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
})

async function createProducts() {
  console.log('🚀 Creating Stripe products...\n')

  try {
    // Create Pro Plan
    console.log('Creating Pro Plan...')
    const proProduct = await stripe.products.create({
      name: 'Pro Plan',
      description: 'Pro subscription for Tenant CRM - Proprietà illimitate, gestione completa inquilini e proprietari, caricamento documenti illimitato, report e analytics, supporto prioritario',
    })

    const proPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 19900, // €199.00 in cents
      currency: 'eur',
      recurring: {
        interval: 'month',
      },
    })

    console.log('✅ Pro Plan created!')
    console.log(`   Product ID: ${proProduct.id}`)
    console.log(`   Price ID: ${proPrice.id}\n`)

    // Create Enterprise Plan
    console.log('Creating Enterprise Plan...')
    const enterpriseProduct = await stripe.products.create({
      name: 'Enterprise Plan',
      description: 'Enterprise subscription for Tenant CRM - Tutto incluso in Pro, multi-utente e permessi, API access, account manager dedicato, supporto 24/7',
    })

    const enterprisePrice = await stripe.prices.create({
      product: enterpriseProduct.id,
      unit_amount: 49900, // €499.00 in cents
      currency: 'eur',
      recurring: {
        interval: 'month',
      },
    })

    console.log('✅ Enterprise Plan created!')
    console.log(`   Product ID: ${enterpriseProduct.id}`)
    console.log(`   Price ID: ${enterprisePrice.id}\n`)

    console.log('='.repeat(50))
    console.log('✅ All products created successfully!\n')
    console.log('Add these to your .env.local:')
    console.log(`STRIPE_PRICE_ID_PRO=${proPrice.id}`)
    console.log(`STRIPE_PRICE_ID_ENTERPRISE=${enterprisePrice.id}\n`)

    return {
      proPriceId: proPrice.id,
      enterprisePriceId: enterprisePrice.id,
    }
  } catch (error) {
    console.error('❌ Error creating products:', error.message)
    if (error.type === 'StripeAuthenticationError') {
      console.error('   Check your Stripe secret key')
    }
    throw error
  }
}

createProducts()
  .then(({ proPriceId, enterprisePriceId }) => {
    // Update .env.local
    const fs = require('fs')
    let envContent = fs.readFileSync('.env.local', 'utf8')
    
    // Update or add Price IDs
    if (envContent.includes('STRIPE_PRICE_ID_PRO=')) {
      envContent = envContent.replace(
        /STRIPE_PRICE_ID_PRO=.*/,
        `STRIPE_PRICE_ID_PRO=${proPriceId}`
      )
    } else {
      envContent += `\nSTRIPE_PRICE_ID_PRO=${proPriceId}`
    }
    
    if (envContent.includes('STRIPE_PRICE_ID_ENTERPRISE=')) {
      envContent = envContent.replace(
        /STRIPE_PRICE_ID_ENTERPRISE=.*/,
        `STRIPE_PRICE_ID_ENTERPRISE=${enterprisePriceId}`
      )
    } else {
      envContent += `\nSTRIPE_PRICE_ID_ENTERPRISE=${enterprisePriceId}`
    }
    
    fs.writeFileSync('.env.local', envContent)
    console.log('✅ Updated .env.local with Price IDs')
  })
  .catch((error) => {
    console.error('Failed to create products:', error)
    process.exit(1)
  })

