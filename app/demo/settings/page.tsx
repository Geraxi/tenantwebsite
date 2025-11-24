import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Bell, Shield, CreditCard, Rocket } from 'lucide-react'

export default function DemoSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Stai visualizzando una demo</h3>
            <p className="text-sm text-blue-700">
              Questa è una versione demo. Iscriviti per accedere alle impostazioni complete.
            </p>
          </div>
          <Link href="/signup">
            <Button size="sm">
              <Rocket className="mr-2 h-4 w-4" />
              Inizia Gratis
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Impostazioni</h1>
        <p className="text-muted-foreground">Gestisci le impostazioni del tuo account e dell'agenzia</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Profilo</CardTitle>
            </div>
            <CardDescription>Gestisci le informazioni del tuo profilo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Modifica nome, email e altre informazioni personali.
            </p>
            <Button variant="outline" disabled>Disponibile dopo l'iscrizione</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifiche</CardTitle>
            </div>
            <CardDescription>Configura le tue preferenze di notifica</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Scegli come e quando ricevere le notifiche.
            </p>
            <Button variant="outline" disabled>Disponibile dopo l'iscrizione</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Sicurezza</CardTitle>
            </div>
            <CardDescription>Gestisci password e sicurezza account</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Modifica password e gestisci la sicurezza del tuo account.
            </p>
            <Button variant="outline" disabled>Disponibile dopo l'iscrizione</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <CardTitle>Abbonamento</CardTitle>
            </div>
            <CardDescription>Gestisci il tuo piano di abbonamento</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Visualizza e gestisci il tuo piano di abbonamento.
            </p>
            <Link href="/signup">
              <Button>
                <Rocket className="mr-2 h-4 w-4" />
                Inizia Gratis
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



