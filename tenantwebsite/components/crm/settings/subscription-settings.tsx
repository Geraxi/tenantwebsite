'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Check, Loader2 } from 'lucide-react'
import { STRIPE_PLANS } from '@/lib/stripe'
import { useRouter } from 'next/navigation'

interface SubscriptionSettingsProps {
  subscriptionTier: string
  subscriptionStatus: string
}

export function SubscriptionSettings({ subscriptionTier, subscriptionStatus }: SubscriptionSettingsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleUpgrade = async (plan: 'pro' | 'enterprise') => {
    setIsLoading(plan)
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout:', error)
      alert('Errore durante la creazione della sessione di pagamento')
      setIsLoading(null)
    }
  }

  const handleManageSubscription = async () => {
    setIsLoading('manage')
    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to create portal session')
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating portal session:', error)
      alert('Errore durante l\'accesso al portale di gestione')
      setIsLoading(null)
    }
  }

  const currentPlan = STRIPE_PLANS[subscriptionTier as keyof typeof STRIPE_PLANS] || STRIPE_PLANS.free

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Abbonamento</CardTitle>
              <CardDescription>Gestisci il tuo piano di abbonamento</CardDescription>
            </div>
            <Badge 
              variant={subscriptionStatus === 'active' ? 'default' : 'destructive'}
            >
              {subscriptionStatus === 'active' ? 'Attivo' : 
               subscriptionStatus === 'cancelled' ? 'Cancellato' : 'Scaduto'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Piano Attuale</p>
            <p className="text-2xl font-bold">{currentPlan.name}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {currentPlan.price === 0 ? 'Gratuito' : `€${currentPlan.price}/mese`}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Funzionalità Incluse:</p>
            <ul className="space-y-1">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {subscriptionTier !== 'free' && (
            <Button
              variant="outline"
              onClick={handleManageSubscription}
              disabled={isLoading === 'manage'}
              className="w-full"
            >
              {isLoading === 'manage' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Caricamento...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Gestisci Abbonamento
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {subscriptionTier === 'free' && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>€199/mese</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                {STRIPE_PLANS.pro.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleUpgrade('pro')}
                disabled={isLoading !== null}
                className="w-full"
              >
                {isLoading === 'pro' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Caricamento...
                  </>
                ) : (
                  'Passa a Pro'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>€499/mese</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                {STRIPE_PLANS.enterprise.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleUpgrade('enterprise')}
                disabled={isLoading !== null}
                variant="outline"
                className="w-full"
              >
                {isLoading === 'enterprise' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Caricamento...
                  </>
                ) : (
                  'Passa a Enterprise'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

