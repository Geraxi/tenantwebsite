'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { User, Mail, Phone, MapPin, Plus, FileText } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'

interface CreateOwnerTenantProps {
  type: 'owner' | 'tenant'
  propertyId?: string
  onSuccess?: (id: string) => void
}

export function CreateOwnerTenant({ type, propertyId, onSuccess }: CreateOwnerTenantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    // Add property_id if provided
    if (propertyId) {
      if (type === 'tenant') {
        formData.append('property_id', propertyId)
      }
    }

    try {
      const endpoint = type === 'owner' ? '/api/owners/create' : '/api/tenants/create'
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Errore durante la creazione')
      }

      const data = await response.json()
      
      // If property is for sale and we're creating an owner, link it
      if (type === 'owner' && propertyId) {
        await fetch(`/api/properties/${propertyId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ owner_id: data.id }),
        })
      }

      setIsOpen(false)
      e.currentTarget.reset()
      
      if (onSuccess) {
        onSuccess(data.id)
      } else {
        // Redirect to the new profile page where they can upload documents
        router.push(`/crm/${type === 'owner' ? 'owners' : 'tenants'}/${data.id}`)
      }
      
      // Refresh the current page if we're on a property page
      if (propertyId) {
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante la creazione')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          {type === 'owner' ? 'Crea Nuovo Proprietario' : 'Crea Nuovo Inquilino'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type === 'owner' ? 'Crea Nuovo Proprietario' : 'Crea Nuovo Inquilino'}
          </DialogTitle>
          <DialogDescription>
            {type === 'owner' 
              ? 'Aggiungi un nuovo proprietario. Potrai caricare i documenti dopo la creazione.'
              : 'Aggiungi un nuovo inquilino per questa proprietà. Potrai caricare i documenti dopo la creazione.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${type}_full_name`}>
                Nome Completo *
              </Label>
              <Input
                id={`${type}_full_name`}
                name="full_name"
                placeholder={type === 'owner' ? 'Mario Rossi' : 'Marco Bianchi'}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${type}_email`}>Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id={`${type}_email`}
                  name="email"
                  type="email"
                  placeholder="email@esempio.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${type}_phone`}>Telefono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id={`${type}_phone`}
                  name="phone"
                  type="tel"
                  placeholder="+39 333 1234567"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${type}_address`}>Indirizzo</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id={`${type}_address`}
                  name="address"
                  placeholder="Via Roma 15, Milano"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {type === 'tenant' && (
            <div className="space-y-2">
              <Label htmlFor="rental_status">Stato Affitto</Label>
              <select
                id="rental_status"
                name="rental_status"
                defaultValue="prospective"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="prospective">Prospettiva</option>
                <option value="pending">In Attesa</option>
                <option value="active">Attivo</option>
                <option value="past">Passato</option>
              </select>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creazione...' : 'Crea e Vai al Profilo'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

