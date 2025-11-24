import { Button } from '@/components/ui/button'
import { Plus, Download } from 'lucide-react'
import Link from 'next/link'
import { getPayments } from '@/lib/actions/payments'
import { PaymentsTable } from '@/components/crm/payments/payments-table'
import { PaymentCharts } from '@/components/crm/payments/payment-charts'

export default async function PaymentsPage() {
  const payments = await getPayments()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pagamenti</h1>
          <p className="text-muted-foreground">Traccia i pagamenti degli affitti, vendite e commissioni</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Esporta CSV
          </Button>
          <Link href="/crm/payments/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuovo Pagamento
            </Button>
          </Link>
        </div>
      </div>

      <PaymentCharts payments={payments.map(p => ({
        id: p.id,
        amount: p.amount,
        due_date: p.due_date,
        status: p.status === 'paid' ? 'paid' : 'unpaid',
        paid_date: p.paid_date,
        property: p.properties?.title,
      }))} />

      <PaymentsTable payments={payments} />
    </div>
  )
}
