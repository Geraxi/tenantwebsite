'use client'

import { Button } from '@/components/ui/button'
import { Rocket } from 'lucide-react'
import Link from 'next/link'
import { PropertiesFilter } from '@/components/crm/properties/properties-filter'

// Demo properties data
const demoProperties = [
  {
    id: '1',
    title: 'Appartamento Via Roma 15',
    name: 'Appartamento Via Roma 15',
    type: 'rent' as const,
    price: 1200,
    rent: 1200,
    city: 'Milano',
    address: 'Via Roma 15, Milano',
    details: 'Centro • 2 Camere, 1 Bagno',
    status: 'active' as const,
    owner_name: 'Mario Rossi',
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'],
    square_meters: 75,
  },
  {
    id: '2',
    title: 'Ufficio Corso Garibaldi 42',
    name: 'Ufficio Corso Garibaldi 42',
    type: 'rent' as const,
    price: 850,
    rent: 850,
    city: 'Milano',
    address: 'Corso Garibaldi 42, Milano',
    details: 'Business District • 80 mq',
    status: 'active' as const,
    owner_name: 'Luigi Bianchi',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'],
    square_meters: 80,
  },
  {
    id: '3',
    title: 'Negozio Piazza Duomo 8',
    name: 'Negozio Piazza Duomo 8',
    type: 'rent' as const,
    price: 2100,
    rent: 2100,
    city: 'Milano',
    address: 'Piazza Duomo 8, Milano',
    details: 'Centro Storico • 120 mq',
    status: 'active' as const,
    owner_name: 'Anna Verdi',
    images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80'],
    square_meters: 120,
  },
  {
    id: '4',
    title: 'Villa Via dei Pini 25',
    name: 'Villa Via dei Pini 25',
    type: 'sale' as const,
    price: 450000,
    city: 'Milano',
    address: 'Via dei Pini 25, Milano',
    details: 'Zona Residenziale • 200 mq',
    status: 'active' as const,
    owner_name: 'Giuseppe Neri',
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'],
    square_meters: 200,
  },
  {
    id: '5',
    title: 'Appartamento Via Manzoni 10',
    name: 'Appartamento Via Manzoni 10',
    type: 'rent' as const,
    price: 950,
    rent: 950,
    city: 'Milano',
    address: 'Via Manzoni 10, Milano',
    details: 'Centro • 1 Camera, 1 Bagno',
    status: 'active' as const,
    owner_name: 'Maria Rossi',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
    square_meters: 50,
  },
]

export default function DemoPropertiesPage() {

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Stai visualizzando una demo</h3>
            <p className="text-sm text-blue-700">
              Questi sono dati di esempio. Iscriviti per iniziare a gestire le tue proprietà reali.
            </p>
          </div>
          <Link href="/signup">
            <Button size="sm">
              <Rocket className="mr-2 h-4 w-4" />
              Inizia Gratis
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Proprietà</h1>
        <p className="text-muted-foreground">Gestisci i tuoi annunci immobiliari</p>
      </div>

      {/* Properties Cards */}
      <PropertiesFilter properties={demoProperties} isDemo={true} />
    </div>
  )
}

