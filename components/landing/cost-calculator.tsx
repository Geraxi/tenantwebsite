'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calculator, Sparkles } from 'lucide-react'

export function CostCalculator() {
  const [properties, setProperties] = useState('')
  const [currentMonthlyCost, setCurrentMonthlyCost] = useState('')
  const [hasCalculated, setHasCalculated] = useState(false)

  const tenantCost = 199
  const currentCost = Number(currentMonthlyCost) || 0
  const savings = currentCost > 0 ? currentCost - tenantCost : 0
  const savingsPercent = currentCost > 0 ? ((savings / currentCost) * 100).toFixed(0) : '0'
  const annualSavings = savings * 12

  // Recommend plan based on properties
  const propertyCount = Number(properties) || 0
  const recommendedPlan = propertyCount <= 25 ? 'Starter' : propertyCount <= 100 ? 'Professional' : 'Enterprise'

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault()
    if (currentMonthlyCost && Number(currentMonthlyCost) > 0) {
      setHasCalculated(true)
    }
  }

  const handleReset = () => {
    setProperties('')
    setCurrentMonthlyCost('')
    setHasCalculated(false)
  }

  return (
    <section id="calculator" className="bg-gradient-to-b from-white to-blue-50/50 py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Calcola i Tuoi Risparmi
            </h2>
            <p className="text-xl text-muted-foreground">
              Inserisci i tuoi dati e scopri quanto puoi risparmiare con Tenant CRM
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-2 border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  La Tua Situazione
                </CardTitle>
                <CardDescription>Inserisci i dati della tua agenzia e calcola i risparmi</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div>
                    <Label htmlFor="properties">Numero di Proprietà</Label>
                    <Input
                      id="properties"
                      type="number"
                      min="1"
                      placeholder="es. 50"
                      value={properties}
                      onChange={(e) => setProperties(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentCost">Costo Mensile Attuale (€)</Label>
                    <Input
                      id="currentCost"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="es. 280"
                      value={currentMonthlyCost}
                      onChange={(e) => setCurrentMonthlyCost(e.target.value)}
                      className="mt-2"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Includi tutti i costi mensili: software affitti, CRM, contabilità, ecc.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      size="lg"
                    >
                      <Calculator className="mr-2 h-4 w-4" />
                      Calcola Risparmi
                    </Button>
                    {hasCalculated && (
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        size="lg"
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className={`border-2 shadow-xl transition-all ${hasCalculated ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50' : 'border-gray-200 bg-white'}`}>
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  {hasCalculated && <Sparkles className="h-5 w-5 text-yellow-500" />}
                  I Tuoi Risparmi
                </CardTitle>
                <CardDescription>
                  {hasCalculated ? 'Ecco quanto puoi risparmiare con Tenant CRM' : 'Inserisci i dati e clicca "Calcola Risparmi" per vedere i risultati'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {hasCalculated ? (
                  <>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-blue-200">
                        <span className="text-muted-foreground">Costo Mensile Attuale</span>
                        <span className="text-2xl font-bold">€{Number(currentMonthlyCost).toLocaleString('it-IT')}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-blue-200">
                        <span className="text-muted-foreground">Costo Tenant CRM</span>
                        <span className="text-2xl font-bold text-blue-600">€{tenantCost}</span>
                      </div>
                      <div className="pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-lg">Risparmio Mensile</span>
                          <span className="text-3xl font-bold text-green-600">€{savings.toLocaleString('it-IT')}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Risparmia {savingsPercent}% ogni mese
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="text-sm text-muted-foreground mb-2">Risparmio Annuale</div>
                        <div className="text-3xl font-bold text-green-600">€{annualSavings.toLocaleString('it-IT')}</div>
                      </div>
                    </div>

                    <div className="pt-6 border-t space-y-4">
                      {propertyCount > 0 && (
                        <div>
                          <Label className="text-sm text-muted-foreground">Piano Consigliato</Label>
                          <div className="mt-2">
                            <Badge variant="secondary" className="text-base px-3 py-1">
                              {recommendedPlan}
                            </Badge>
                          </div>
                        </div>
                      )}
                      <Link href="/signup" className="block">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" size="lg">
                          Iscriviti Ora e Inizia a Risparmiare
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      Completa il modulo a sinistra e clicca "Calcola Risparmi" per vedere i risultati
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
