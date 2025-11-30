'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Clock, CheckCircle2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Payment {
  id: string
  amount: number
  due_date: string
  status: 'paid' | 'unpaid'
  paid_date: string | null
  property?: string
  tenant?: string
}

interface PaymentChartsProps {
  payments: Payment[]
}

// Consistent number formatting to avoid hydration mismatches
const formatNumber = (num: number): string => {
  // Use consistent formatting that works the same on server and client
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function PaymentCharts({ payments }: PaymentChartsProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)
  
  const totalPending = payments
    .filter(p => p.status === 'unpaid')
    .reduce((sum, p) => sum + p.amount, 0)

  const paidCount = payments.filter(p => p.status === 'paid').length
  const pendingCount = payments.filter(p => p.status === 'unpaid').length

  // Use consistent formatting during SSR to match client
  const formattedPaid = isMounted 
    ? new Intl.NumberFormat('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(totalPaid)
    : formatNumber(totalPaid)
  
  const formattedPending = isMounted
    ? new Intl.NumberFormat('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(totalPending)
    : formatNumber(totalPending)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Totale Incassato</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{formattedPaid}</div>
          <p className="text-xs text-muted-foreground">
            {paidCount} pagamento{paidCount !== 1 ? 'i' : ''} completato{paidCount !== 1 ? 'i' : ''}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Attesa</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{formattedPending}</div>
          <p className="text-xs text-muted-foreground">
            {pendingCount} pagamento{pendingCount !== 1 ? 'i' : ''} in attesa
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasso di Pagamento</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {payments.length > 0 
              ? Math.round((paidCount / payments.length) * 100) 
              : 0}%
          </div>
          <p className="text-xs text-muted-foreground">
            {paidCount} su {payments.length} pagamenti
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

