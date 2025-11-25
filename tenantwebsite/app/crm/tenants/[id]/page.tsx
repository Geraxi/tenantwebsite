import { notFound } from 'next/navigation'
import { getTenant } from '@/lib/actions/tenants'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { DocumentsSection } from '@/components/crm/documents/documents-section'

export default async function TenantDetailPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const tenant = await getTenant(params.id)

    if (!tenant || Array.isArray(tenant) || tenant.length === 0) {
      notFound()
    }

    const tenantData = Array.isArray(tenant) ? tenant[0] : tenant

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/crm/tenants">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{tenantData.full_name || tenantData.name || 'Inquilino'}</h1>
            <p className="text-muted-foreground">Profilo inquilino - Gestito dall'agenzia</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Tenant Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Personali</CardTitle>
              <CardDescription>Dettagli di contatto e informazioni dell'inquilino</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{tenantData.email || 'N/A'}</p>
                </div>
              </div>
              {tenantData.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefono</p>
                    <p className="font-medium">{tenantData.phone}</p>
                  </div>
                </div>
              )}
              {tenantData.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Indirizzo</p>
                    <p className="font-medium">{tenantData.address}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Badge 
                  variant="outline"
                  className={
                    tenantData.rental_status === 'active' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }
                >
                  {tenantData.rental_status === 'active' ? 'Attivo' : 
                   tenantData.rental_status === 'pending' ? 'In Attesa' :
                   tenantData.rental_status === 'past' ? 'Passato' : 'Prospettiva'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Rental Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Affitto</CardTitle>
              <CardDescription>Dettagli del contratto e condizioni di affitto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tenantData.monthly_rent && (
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Affitto Mensile</p>
                    <p className="font-medium">€{Number(tenantData.monthly_rent).toLocaleString('it-IT')}</p>
                  </div>
                </div>
              )}
              {tenantData.contract_start && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Inizio Contratto</p>
                    <p className="font-medium">
                      {new Date(tenantData.contract_start).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                </div>
              )}
              {tenantData.contract_end && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fine Contratto</p>
                    <p className="font-medium">
                      {new Date(tenantData.contract_end).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                </div>
              )}
              {tenantData.deposit && (
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Deposito</p>
                    <p className="font-medium">€{Number(tenantData.deposit).toLocaleString('it-IT')}</p>
                  </div>
                </div>
              )}
              {tenantData.properties && Array.isArray(tenantData.properties) && tenantData.properties.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Proprietà</p>
                  {tenantData.properties.map((property: any) => (
                    <Link key={property.id} href={`/crm/properties/${property.id}`}>
                      <Badge variant="outline" className="mr-2">
                        {property.title || property.address || `Proprietà ${property.id}`}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        {tenantData.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Note</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{tenantData.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Documents Section - Prominent placement */}
        <div className="border-t pt-6">
          <DocumentsSection entityType="tenant" entityId={params.id} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching tenant:', error)
    notFound()
  }
}

