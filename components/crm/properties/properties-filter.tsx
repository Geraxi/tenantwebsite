'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Home, MapPin, Rocket, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Property {
  id: string | number
  name?: string
  title?: string
  address?: string
  city?: string
  type?: string | 'rent' | 'sale'
  status?: string
  rent?: number
  price?: number
  details?: string
  images?: string[]
  image?: string
  tenant_id?: string | null
  size?: number
  area?: number
  square_meters?: number
  owner?: {
    id?: string
    full_name?: string
    name?: string
    first_name?: string
    last_name?: string
  } | null
  owner_id?: string | null
  owner_name?: string
}

interface PropertiesFilterProps {
  properties: Property[]
  isDemo?: boolean
}

export function PropertiesFilter({ properties, isDemo = false }: PropertiesFilterProps) {
  const [filter, setFilter] = useState<'all' | 'rent' | 'sale'>('all')

  const filteredProperties = properties.filter((property) => {
    if (filter === 'all') return true
    const propertyType = property.type?.toLowerCase() || ''
    if (filter === 'rent') {
      return propertyType === 'rent' || propertyType === 'affitto' || propertyType === 'rental'
    }
    if (filter === 'sale') {
      return propertyType === 'sale' || propertyType === 'vendita'
    }
    return true
  })

  const rentProperties = properties.filter((p) => {
    const type = p.type?.toLowerCase() || ''
    return type === 'rent' || type === 'affitto' || type === 'rental'
  })

  const saleProperties = properties.filter((p) => {
    const type = p.type?.toLowerCase() || ''
    return type === 'sale' || type === 'vendita'
  })

  const getPropertyImage = (property: Property): string => {
    if (property.images && property.images.length > 0) {
      return property.images[0]
    }
    if (property.image) {
      return property.image
    }
    return 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop&q=80'
  }

  const getPropertyName = (property: Property): string => {
    return property.name || property.title || `Proprietà ${property.id}`
  }

  const getPropertyRent = (property: Property): number => {
    if (property.type === 'sale' || property.type === 'Vendita' || property.type === 'vendita') {
      return property.price || 0
    }
    return property.rent || property.price || 0
  }

  const isOccupied = (property: Property): boolean => {
    // Check if property has a tenant_id or if status indicates it's rented
    return !!property.tenant_id || 
           property.status === 'Affittato' || 
           property.status === 'Occupied' ||
           property.status === 'affittato' ||
           (property as any).tenant_id !== null
  }

  const getStatusLabel = (property: Property): string => {
    if (property.type === 'sale' || property.type === 'Vendita') {
      return 'In Vendita'
    }
    if (isOccupied(property)) {
      return 'Affittato'
    }
    return 'Disponibile'
  }

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-sm text-muted-foreground mb-4">Nessuna proprietà ancora.</p>
          <Link href={isDemo ? '/signup' : '/crm/properties/new'}>
            <Button>
              {isDemo ? (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Inizia Gratis
                </>
              ) : (
                'Aggiungi Prima Proprietà'
              )}
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant={filter === 'all' ? 'default' : 'ghost'}
          onClick={() => setFilter('all')}
          className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Tutte ({properties.length})
        </Button>
        <Button
          variant={filter === 'rent' ? 'default' : 'ghost'}
          onClick={() => setFilter('rent')}
          className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          In Affitto ({rentProperties.length})
        </Button>
        <Button
          variant={filter === 'sale' ? 'default' : 'ghost'}
          onClick={() => setFilter('sale')}
          className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          In Vendita ({saleProperties.length})
        </Button>
      </div>

      {/* Properties Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => {
          const isRented = isOccupied(property)
          const imageUrl = getPropertyImage(property)
          const propertyName = getPropertyName(property)
          const hasImage = property.images && property.images.length > 0 || property.image
          const size = property.size || property.area || property.square_meters

          return (
            <Card
              key={property.id}
              className="bg-white border overflow-hidden relative shadow-sm hover:shadow-md transition-shadow rounded-lg !p-0 !py-0 !gap-0"
            >
              <CardContent className="!p-0 !m-0 !px-0">
                {/* Property Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
                  {hasImage ? (
                    <>
                      <Image
                        src={imageUrl}
                        alt={propertyName}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <Home className="h-16 w-16 text-gray-300" strokeWidth={1} />
                    </div>
                  )}

                  {/* Property Name Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">{propertyName}</h3>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge
                      variant={isRented ? 'default' : 'secondary'}
                      className={isRented ? 'bg-green-500 text-white' : 'bg-orange-500 text-white px-3 py-1'}
                    >
                      {getStatusLabel(property)}
                    </Badge>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold mb-3 text-foreground">{propertyName}</h3>
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{property.details || property.address || property.city || 'Indirizzo non disponibile'}</span>
                    {size && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{size} mq</span>
                      </>
                    )}
                  </div>
                  {(() => {
                    const ownerName = property.owner?.full_name || 
                                     property.owner?.name || 
                                     (property.owner?.first_name && property.owner?.last_name 
                                       ? `${property.owner.first_name} ${property.owner.last_name}` 
                                       : null) ||
                                     property.owner_name ||
                                     null
                    return ownerName ? (
                      <div className="flex items-center gap-1.5 text-muted-foreground mb-4 text-sm">
                        <User className="h-4 w-4" />
                        <span>Proprietario: {ownerName}</span>
                      </div>
                    ) : null
                  })()}

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {property.type === 'sale' || property.type === 'Vendita' ? 'Prezzo di Vendita' : 'Affitto Mensile'}
                        </p>
                        <p className="text-2xl font-bold text-foreground">€{formatNumber(getPropertyRent(property))}</p>
                      </div>
                    </div>
                  </div>

                  {/* View Details Link */}
                  <div className="mt-4">
                    <Link href={isDemo ? '/signup' : `/crm/properties/${property.id}`}>
                      <Button variant="outline" className="w-full">
                        Visualizza Dettagli
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-sm text-muted-foreground">Nessuna proprietà trovata con i filtri selezionati.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

