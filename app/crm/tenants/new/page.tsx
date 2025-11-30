import { redirect } from 'next/navigation'
import { createTenant } from '@/lib/actions/tenants'
import { getProperties } from '@/lib/actions/properties'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, DollarSign, FileText, Upload } from 'lucide-react'
import Link from 'next/link'

export default async function NewTenantPage() {
  const properties = await getProperties()

  async function handleSubmit(formData: FormData) {
    'use server'
    try {
      await createTenant(formData)
      redirect('/crm/tenants')
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/crm/tenants">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Nuovo Profilo Inquilino</h1>
          <p className="text-muted-foreground">Crea un nuovo profilo inquilino per l'agenzia</p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informazioni Personali
              </CardTitle>
              <CardDescription>Dettagli di contatto dell'inquilino</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nome Completo *</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder="Mario Rossi"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="mario.rossi@email.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+39 333 1234567"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Indirizzo</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    name="address"
                    placeholder="Via Roma 15, Milano"
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rental Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informazioni Affitto
              </CardTitle>
              <CardDescription>Dettagli del contratto di affitto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="property_id">Proprietà</Label>
                <select
                  id="property_id"
                  name="property_id"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Nessuna proprietà</option>
                  {properties.map((property: any) => (
                    <option key={property.id} value={property.id}>
                      {property.title || property.address || `Proprietà ${property.id}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rental_status">Stato Affitto</Label>
                <select
                  id="rental_status"
                  name="rental_status"
                  defaultValue="prospective"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="prospective">Prospettiva</option>
                  <option value="pending">In Attesa</option>
                  <option value="active">Attivo</option>
                  <option value="past">Passato</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly_rent">Affitto Mensile (€)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="monthly_rent"
                    name="monthly_rent"
                    type="number"
                    step="0.01"
                    placeholder="1200"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deposit">Deposito (€)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="deposit"
                    name="deposit"
                    type="number"
                    step="0.01"
                    placeholder="2400"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lease_start">Inizio Contratto</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lease_start"
                      name="lease_start"
                      type="date"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lease_end">Fine Contratto</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lease_end"
                      name="lease_end"
                      type="date"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Note</CardTitle>
            <CardDescription>Note aggiuntive sull'inquilino</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Aggiungi note, osservazioni o informazioni aggiuntive sull'inquilino..."
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Documenti
            </CardTitle>
            <CardDescription>Carica documenti dell'inquilino (ID, contratto, ecc.)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="documents">Documenti (max 10MB per file)</Label>
              <Input
                id="documents"
                name="documents"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Puoi selezionare più file contemporaneamente. Formati accettati: PDF, DOC, DOCX, immagini
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/crm/tenants">
            <Button type="button" variant="outline">
              Annulla
            </Button>
          </Link>
          <Button type="submit">
            Crea Profilo Inquilino
          </Button>
        </div>
      </form>
    </div>
  )
}

