'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronLeft, ChevronRight, LayoutDashboard, MapPin, Rocket, User, Home } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Property {
  id: string | number
  name?: string
  title?: string
  address?: string
  type?: string | 'rent' | 'sale'
  status?: string
  rent?: number
  price?: number
  details?: string
  leaseEnds?: string
  available?: string
  gradient?: string
  image?: string
  images?: string[]
  tenant_id?: string | null
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

interface PropertiesCarouselProps {
  properties: Property[]
  isDemo?: boolean
}

export function PropertiesCarousel({ properties, isDemo = false }: PropertiesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const gradients = [
    'from-purple-500 to-blue-500',
    'from-green-500 to-blue-500',
    'from-orange-500 to-yellow-500',
    'from-pink-500 to-rose-500',
    'from-indigo-500 to-purple-500',
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const cardWidth = 384 // w-96 = 384px
    const gap = 16 // gap-4 = 16px
    const scrollAmount = cardWidth + gap
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      setCurrentIndex(Math.max(0, currentIndex - 1))
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setCurrentIndex(Math.min(properties.length - 1, currentIndex + 1))
    }
  }

  const getPropertyImage = (property: Property): string => {
    // Use first image from images array, or image field, or placeholder
    if (property.images && property.images.length > 0) {
      return property.images[0]
    }
    if (property.image) {
      return property.image
    }
    
    // Get property type to determine relevant image
    const propertyType = property.type?.toLowerCase() || ''
    const propertyName = (property.name || property.title || '').toLowerCase()
    
    // Use relevant images based on property type
    if (propertyType.includes('negozio') || propertyType.includes('shop') || propertyType.includes('retail') || propertyName.includes('negozio')) {
      // Retail/Shop images
      return `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80`
    } else if (propertyType.includes('ufficio') || propertyType.includes('office') || propertyName.includes('ufficio')) {
      // Office images
      return `https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80`
    } else if (propertyType.includes('villa') || propertyType.includes('house') || propertyName.includes('villa')) {
      // Villa/House images
      return `https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop&q=80`
    } else if (propertyType.includes('appartamento') || propertyType.includes('apartment') || propertyName.includes('appartamento')) {
      // Apartment images
      return `https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=80`
    }
    
    // Default high-quality property images based on ID for variety
    const defaultImages = [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop&q=80', // Modern apartment
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80', // Office space
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80', // Retail shop
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=80', // Apartment interior
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop&q=80', // Modern home
    ]
    
    const index = typeof property.id === 'number' ? (property.id - 1) % defaultImages.length : 0
    return defaultImages[index] || defaultImages[0]
  }

  const getPropertyName = (property: Property): string => {
    return property.name || property.title || 'Proprietà'
  }

  const getPropertyRent = (property: Property): number => {
    return property.rent || property.price || 0
  }

  const formatNumber = (num: number): string => {
    // Use consistent formatting to avoid hydration errors
    // Format with dots as thousand separators (Italian format)
    if (!isMounted) {
      // Return a placeholder during SSR to avoid hydration mismatch
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
    return new Intl.NumberFormat('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const isOccupied = (property: Property): boolean => {
    // Sales properties are never "occupied" in the rental sense
    if (property.type === 'sale' || property.type === 'Vendita') {
      return false
    }
    return property.status === 'Affittato' || property.status === 'Occupied' || !!property.tenant_id
  }

  const getStatusLabel = (property: Property): string => {
    if (property.type === 'sale' || property.type === 'Vendita') {
      return property.status === 'Affittato' || property.status === 'Occupied' ? 'Venduto' : 'Disponibile'
    }
    return property.status === 'Affittato' || property.status === 'Occupied' || !!property.tenant_id ? 'Affittato' : 'Disponibile'
  }

  const propertiesLink = isDemo ? '/demo/properties' : '/crm/properties'

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
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Proprietà</h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={currentIndex === 0}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={currentIndex >= properties.length - 1}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Link href={propertiesLink}>
            <Button variant="outline">
              Vedi Tutte
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {properties.map((property) => {
          const isRented = isOccupied(property)
          const imageUrl = getPropertyImage(property)
          const propertyName = getPropertyName(property)
          const hasImage = property.images && property.images.length > 0 || property.image
          const size = (property as any).size || (property as any).area || (property as any).square_meters
          
          return (
            <Link
              href={isDemo ? `/demo/properties/${property.id}` : `/crm/properties/${property.id}`}
              key={property.id}
              className="block"
            >
            <Card
              className="bg-white border overflow-hidden relative flex-shrink-0 w-96 snap-start shadow-sm !p-0 !py-0 !gap-0 rounded-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
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
                        sizes="(max-width: 768px) 100vw, 384px"
                        priority
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
                    <span>{property.details || property.address || 'Indirizzo non disponibile'}</span>
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
                        <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">€{formatNumber(getPropertyRent(property))}</p>
                      </div>
                      {!(property.type === 'sale' || property.type === 'Vendita') && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Disponibile</p>
                          <p className="font-semibold text-foreground">
                            {property.available || property.leaseEnds ? (property.available || property.leaseEnds) : 'Immediatamente'}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Visualizza dettagli</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Link>
          )
        })}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

