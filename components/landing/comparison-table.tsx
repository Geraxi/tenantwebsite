import { Check, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function ComparisonTable() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50/30 py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Confronta i Costi
            </h2>
            <p className="text-xl text-muted-foreground">
              Vedi quanto puoi risparmiare consolidando i tuoi strumenti
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <Card className="border-2 border-gray-200 flex flex-col">
              <CardContent className="p-8 flex flex-col flex-1">
                <div className="mb-6 min-h-[60px]">
                  <div className="h-6 mb-3"></div>
                  <h3 className="text-2xl font-semibold mb-2">Strumenti Attuali</h3>
                  <p className="text-muted-foreground">Software separati per ogni funzione</p>
                </div>
                <div className="space-y-4 mb-6 flex-1">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-destructive flex-shrink-0" />
                    <span className="text-sm">Software gestione affitti: €50-80/mese</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-destructive flex-shrink-0" />
                    <span className="text-sm">CRM separato: €40-60/mese</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-destructive flex-shrink-0" />
                    <span className="text-sm">Software contabilità: €60-80/mese</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-destructive flex-shrink-0" />
                    <span className="text-sm">Strumenti documenti: €30-50/mese</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-destructive flex-shrink-0" />
                    <span className="text-sm">Altri strumenti: €40-80/mese</span>
                  </div>
                </div>
                <div className="pt-6 border-t mt-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Totale Mensile</span>
                    <span className="text-3xl font-bold text-destructive">€220-350</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Totale Annuale</span>
                    <span className="text-xl font-semibold text-destructive">€2.640-4.200</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-400 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
              <CardContent className="p-8 flex flex-col flex-1">
                <div className="mb-6 min-h-[60px]">
                  <Badge className="mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Raccomandato</Badge>
                  <h3 className="text-2xl font-semibold mb-2 text-blue-900">Tenant CRM</h3>
                  <p className="text-muted-foreground">Tutto in un'unica piattaforma</p>
                </div>
                <div className="space-y-4 mb-6 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-blue-600 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm">Gestione affitti inclusa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-blue-600 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm">CRM unificato incluso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-blue-600 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm">Pagamenti e fatture inclusi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-blue-600 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm">Generatore documenti incluso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-blue-600 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm">Supporto dedicato incluso</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-blue-200 mt-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-blue-900">Totale Mensile</span>
                    <span className="text-3xl font-bold text-blue-600">€199</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Totale Annuale</span>
                    <span className="text-xl font-semibold text-blue-600">€2.388</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg">
              <span className="text-2xl font-bold text-white">Risparmio fino a €1.812/anno</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
