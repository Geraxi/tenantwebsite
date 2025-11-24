import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { getTenants } from '@/lib/actions/tenants'
import { TenantsTable } from '@/components/crm/tenants/tenants-table'

export default async function TenantsPage() {
  const tenants = await getTenants()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inquilini</h1>
          <p className="text-muted-foreground">Crea e gestisci i profili degli inquilini, documenti e stato degli affitti</p>
        </div>
        <Link href="/crm/tenants/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi Inquilino
          </Button>
        </Link>
      </div>

      <TenantsTable tenants={tenants} />
    </div>
  )
}
