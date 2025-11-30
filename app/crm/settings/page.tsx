import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { UserSettings } from '@/components/crm/settings/user-settings'
import { SubscriptionSettings } from '@/components/crm/settings/subscription-settings'
import { IntegrationSettings } from '@/components/crm/settings/integration-settings'
import { listApiKeys } from '@/lib/actions/integrations'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get agency subscription info
  let subscriptionTier = 'free'
  let subscriptionStatus = 'active'

  if (userData?.agency_id) {
    const { data: agency } = await supabase
      .from('agencies')
      .select('subscription_tier, subscription_status')
      .eq('id', userData.agency_id)
      .single()

    if (agency) {
      subscriptionTier = agency.subscription_tier || 'free'
      subscriptionStatus = agency.subscription_status || 'active'
    }
  }

  // Fetch API Keys
  const apiKeysResult = await listApiKeys()
  const apiKeys = apiKeysResult.success && apiKeysResult.data ? apiKeysResult.data : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Impostazioni</h1>
        <p className="text-muted-foreground">Gestisci le tue impostazioni account e preferenze</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profilo Utente</CardTitle>
            <CardDescription>Modifica le informazioni del tuo profilo</CardDescription>
          </CardHeader>
          <CardContent>
            <UserSettings user={user} userData={userData} />
          </CardContent>
        </Card>

        <SubscriptionSettings
          subscriptionTier={subscriptionTier}
          subscriptionStatus={subscriptionStatus}
        />

        <IntegrationSettings initialKeys={apiKeys} />
      </div>
    </div>
  )
}

