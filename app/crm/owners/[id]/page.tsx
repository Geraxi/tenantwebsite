import { notFound } from 'next/navigation'
import { getOwner } from '@/lib/actions/owners'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, Phone, MapPin, Plus } from 'lucide-react'
import Link from 'next/link'
import { DocumentsSection } from '@/components/crm/documents/documents-section'
import { getOwnerProperties } from '@/lib/actions/owners'

export default async function OwnerDetailPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const owner = await getOwner(params.id)
    const properties = await getOwnerProperties(params.id)

    if (!owner) {
      notFound()
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/crm/owners">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{owner.full_name || owner.name || 'Proprietario'}</h1>
            <p className="text-muted-foreground">Dettagli proprietario</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Personali</CardTitle>
              <CardDescription>Dettagli di contatto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {owner.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{owner.email}</p>
                  </div>
                </div>
              )}
              {owner.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefono</p>
                    <p className="font-medium">{owner.phone}</p>
                  </div>
                </div>
              )}
              {owner.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Indirizzo</p>
                    <p className="font-medium">{owner.address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Properties Owned */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Proprietà</CardTitle>
                <CardDescription>Proprietà di questo proprietario</CardDescription>
              </div>
              <Link href={`/crm/properties/new?ownerId=${params.id}`}>
                <Button size="sm" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Aggiungi
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {properties.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nessuna proprietà associata</p>
              ) : (
                <div className="space-y-2">
                  {properties.map((property: any) => (
                    <Link
                      key={property.id}
                      href={`/crm/properties/${property.id}`}
                      className="block p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <p className="font-medium">{property.title || property.address || `Proprietà ${property.id}`}</p>
                      {property.address && (
                        <p className="text-sm text-muted-foreground">{property.address}</p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        {owner.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Note</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{owner.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Documents Section */}
        <DocumentsSection entityType="owner" entityId={params.id} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching owner:', error)
    notFound()
  }
}

