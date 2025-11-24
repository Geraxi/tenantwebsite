import { Home, Users, DollarSign, FileText, UserCheck } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Home,
    title: 'Gestione Affitti',
    description: 'Gestisci tutti i tuoi contratti di affitto in un unico posto. Traccia scadenze, rinnovi e pagamenti mensili con facilità.',
  },
  {
    icon: Home,
    title: 'Gestione Vendite',
    description: 'Organizza le tue vendite immobiliari. Monitora offerte, contratti e documentazione per ogni proprietà in vendita.',
  },
  {
    icon: Users,
    title: 'CRM Unificato',
    description: 'Un unico sistema per gestire tutte le relazioni. Inquilini, proprietari e agenti tutti in una piattaforma centralizzata.',
  },
  {
    icon: DollarSign,
    title: 'Pagamenti e Fatture',
    description: 'Tracciamento automatico dei pagamenti, generazione fatture e ricevute. Esporta report finanziari con un click.',
  },
  {
    icon: UserCheck,
    title: 'Profili Inquilini/Proprietari',
    description: 'Profili completi con storico contratti, comunicazioni e documenti. Tutto organizzato e facilmente accessibile.',
  },
  {
    icon: FileText,
    title: 'Generatore Documenti',
    description: 'Crea contratti, fatture, ricevute e report automaticamente. Template personalizzabili e conformi alle normative.',
  },
]

export function ValueProposition() {
  return (
    <section id="features" className="bg-gradient-to-b from-blue-50/50 to-white py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Tutto Quello che Ti Serve
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Una piattaforma completa per gestire affitti, vendite, pagamenti e relazioni con clienti.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-2 border-blue-100 hover:border-blue-400 hover:shadow-lg transition-all bg-white">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-900">{feature.title}</CardTitle>
                  <CardDescription className="text-base mt-2">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

