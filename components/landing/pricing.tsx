import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

const features = [
  'Gestione affitti e vendite',
  'CRM unificato per inquilini e proprietari',
  'Tracciamento pagamenti automatico',
  'Generazione fatture e ricevute',
  'Profili completi clienti',
  'Generatore documenti',
  'Dashboard unificata',
  'Esportazione report CSV',
  'Supporto prioritario',
  'Aggiornamenti automatici',
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-16 md:py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Prezzo Unico, Valore Completo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tutto quello di cui hai bisogno in un unico piano. Nessun costo nascosto, nessuna sorpresa.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="border border-gray-200 shadow-2xl bg-white relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
              {/* Subtle gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
              
              <CardHeader className="text-center pb-4 pt-6 px-6">
                <div className="inline-flex items-center justify-center mb-3">
                  <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                    PIANO UNICO
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold mb-2 text-gray-900">
                  Tenant CRM
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  La piattaforma completa per agenzie immobiliari
                </CardDescription>
                
                {/* Price */}
                <div className="mt-6 mb-3">
                  <div className="inline-flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-bold text-gray-900">€199</span>
                    <span className="text-lg text-gray-500 font-medium">/mese</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Fatturazione mensile • Cancella quando vuoi
                </p>
              </CardHeader>

              <CardContent className="px-6 pb-8">
                {/* Features List */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-4 text-base text-gray-900">Tutto incluso:</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {features.map((feature) => (
                      <div 
                        key={feature} 
                        className="flex items-start gap-3 group/item"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
                            <Check className="h-3 w-3 text-white stroke-[3]" />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900 transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-gray-100">
                  <Link href="/signup" className="block">
                    <Button 
                      size="lg" 
                      className="w-full text-sm h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-semibold rounded-lg"
                    >
                      Inizia la Prova Gratuita
                    </Button>
                  </Link>
                  <p className="text-center text-xs text-gray-500 mt-3">
                    ✨ Prova gratuita di 14 giorni • Nessuna carta di credito richiesta
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Hai domande?{' '}
                <Link href="/#contact" className="text-blue-600 hover:text-blue-700 font-medium underline">
                  Contattaci
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
