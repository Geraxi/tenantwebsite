'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Building2 } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="bg-gradient-to-b from-white to-blue-50/30 py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Contattaci
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Prova subito la demo interattiva o richiedi una demo personalizzata.
            </p>
            <Link href="/demo">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all">
                <Building2 className="h-5 w-5 mr-2" />
                Prova Demo CRM Ora
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-100 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-blue-900">Richiedi una Demo Personalizzata</CardTitle>
                </div>
                <CardDescription>
                  Compila il modulo e ti contatteremo entro 24 ore per organizzare una demo personalizzata con un nostro esperto.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">Nome</Label>
                      <Input id="firstName" placeholder="Mario" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Cognome</Label>
                      <Input id="lastName" placeholder="Rossi" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="mario@esempio.com" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="company">Nome Agenzia</Label>
                    <Input id="company" placeholder="La Tua Agenzia Immobiliare" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefono (opzionale)</Label>
                    <Input id="phone" type="tel" placeholder="+39 123 456 7890" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="message">Messaggio</Label>
                    <Textarea
                      id="message"
                      placeholder="Raccontaci le tue esigenze e come possiamo aiutarti..."
                      rows={4}
                      className="mt-2"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" size="lg">
                    Invia Richiesta
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Perché Richiedere una Demo Personalizzata?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Vedi la Piattaforma in Azione</h4>
                    <p className="text-sm text-muted-foreground">
                      Una dimostrazione live delle funzionalità più importanti per la tua agenzia.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Personalizzata per Te</h4>
                    <p className="text-sm text-muted-foreground">
                      Mostriamo esattamente come Tenant CRM può risolvere le tue esigenze specifiche.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Risposte alle Tue Domande</h4>
                    <p className="text-sm text-muted-foreground">
                      Rispondiamo a tutte le tue domande e ti aiutiamo a valutare se Tenant CRM è giusto per te.
                    </p>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
