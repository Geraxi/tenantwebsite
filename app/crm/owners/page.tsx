import { Button } from '@/components/ui/button'
// @ts-ignore - TypeScript definitions are out of sync, but icons exist at runtime
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { getOwners } from '@/lib/actions/owners'
import { OwnersTable } from '@/components/crm/owners/owners-table'

export default async function OwnersPage() {
  const owners = await getOwners()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Proprietari</h1>
          <p className="text-muted-foreground">Gestisci i profili dei proprietari immobiliari</p>
        </div>
        <Link href="/crm/owners/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi Proprietario
          </Button>
        </Link>
      </div>

      <OwnersTable owners={owners} />
    </div>
  )
}
