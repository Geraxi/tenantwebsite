import { notFound } from 'next/navigation'
import { getProperty } from '@/lib/actions/properties'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, DollarSign, Home, User, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { DocumentsSection } from '@/components/crm/documents/documents-section'
import { CreateOwnerTenant } from '@/components/crm/properties/create-owner-tenant'

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const property = await getProperty(params.id)

    if (!property || Array.isArray(property) || property.length === 0) {
      notFound()
    }

    const propertyData = Array.isArray(property) ? property[0] : property

    const propertyImage = propertyData.images && propertyData.images.length > 0 
      ? propertyData.images[0] 
      : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'

    const owner = propertyData.owners
    const ownerName = owner?.full_name || owner?.name || null
    const tenants = propertyData.tenants || []
    const currentTenant = Array.isArray(tenants) && tenants.length > 0 ? tenants[0] : null

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/crm/properties">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{propertyData.title || 'Proprietà'}</h1>
            <p className="text-muted-foreground">Dettagli proprietà</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Property Image */}
          <Card className="overflow-hidden">
            <CardContent className="!p-0">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
                <Image
                  src={propertyImage}
                  alt={propertyData.title || 'Property'}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </CardContent>
          </Card>

          {/* Property Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Proprietà</CardTitle>
              <CardDescription>Dettagli della proprietà</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Indirizzo</p>
                  <p className="font-medium">
                    {propertyData.address || 'N/A'}
                    {propertyData.city && `, ${propertyData.city}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {propertyData.type === 'sale' || propertyData.listing_type === 'sale' ? 'Prezzo di Vendita' : 'Affitto Mensile'}
                  </p>
                  <p className="font-medium">€{Number(propertyData.price || 0).toLocaleString('it-IT')}</p>
                </div>
              </div>
              {propertyData.size && (
                <div className="flex items-center gap-3">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Dimensione</p>
                    <p className="font-medium">{propertyData.size} mq</p>
                  </div>
                </div>
              )}
              {propertyData.rooms && (
                <div className="flex items-center gap-3">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Camere</p>
                    <p className="font-medium">{propertyData.rooms}</p>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                {ownerName ? (
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Proprietario</p>
                      <Link href={`/crm/owners/${propertyData.owner_id}`} className="font-medium hover:underline">
                        {ownerName}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Proprietario</p>
                    <CreateOwnerTenant type="owner" propertyId={params.id} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline"
                  className={
                    propertyData.status === 'active' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }
                >
                  {propertyData.status === 'active' ? 'Attivo' : 
                   propertyData.status === 'rented' ? 'Affittato' :
                   propertyData.status === 'sold' ? 'Venduto' :
                   propertyData.status === 'maintenance' ? 'In Manutenzione' : 'Fuori Mercato'}
                </Badge>
                <Badge variant="outline">
                  {propertyData.type === 'sale' || propertyData.listing_type === 'sale' ? 'Vendita' : 'Affitto'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        {propertyData.description && (
          <Card>
            <CardHeader>
              <CardTitle>Descrizione</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{propertyData.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Owner and Tenant Management */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Proprietario</CardTitle>
                  <CardDescription>Gestisci il proprietario della proprietà</CardDescription>
                </div>
                {!ownerName && (
                  <CreateOwnerTenant type="owner" propertyId={params.id} />
                )}
              </div>
            </CardHeader>
            <CardContent>
              {ownerName ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Proprietario Attuale</p>
                    <Link 
                      href={`/crm/owners/${propertyData.owner_id}`}
                      className="text-lg font-medium hover:underline flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      {ownerName}
                    </Link>
                  </div>
                  <Link href={`/crm/owners/${propertyData.owner_id}`}>
                    <Button variant="outline" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Vai al Profilo Proprietario
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Nessun proprietario associato a questa proprietà
                  </p>
                  <CreateOwnerTenant type="owner" propertyId={params.id} />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inquilino</CardTitle>
                  <CardDescription>Gestisci l'inquilino della proprietà</CardDescription>
                </div>
                <CreateOwnerTenant type="tenant" propertyId={params.id} />
              </div>
            </CardHeader>
            <CardContent>
              {currentTenant ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Inquilino Attuale</p>
                    <Link 
                      href={`/crm/tenants/${currentTenant.id}`}
                      className="text-lg font-medium hover:underline flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      {currentTenant.full_name || currentTenant.name || `Inquilino ${currentTenant.id.slice(0, 8)}`}
                    </Link>
                  </div>
                  <Link href={`/crm/tenants/${currentTenant.id}`}>
                    <Button variant="outline" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Vai al Profilo Inquilino
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Nessun inquilino associato a questa proprietà
                  </p>
                  <CreateOwnerTenant type="tenant" propertyId={params.id} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Documents Section */}
        <DocumentsSection entityType="property" entityId={params.id} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching property:', error)
    notFound()
  }
}

