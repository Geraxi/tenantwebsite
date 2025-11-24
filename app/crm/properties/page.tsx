import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { getProperties } from '@/lib/actions/properties'
import { PropertiesFilter } from '@/components/crm/properties/properties-filter'

export default async function PropertiesPage() {
  const properties = await getProperties()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Proprietà</h1>
          <p className="text-muted-foreground">Gestisci i tuoi annunci immobiliari</p>
        </div>
        <Link href="/crm/properties/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi Proprietà
          </Button>
        </Link>
      </div>

      <PropertiesFilter properties={properties} />
    </div>
  )
}
