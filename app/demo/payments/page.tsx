'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle2, Rocket } from 'lucide-react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PaymentCharts } from '@/components/crm/payments/payment-charts'
import { useState, useEffect } from 'react'

// Demo payments data
const demoPayments = [
  {
    id: '1',
    tenant: 'Marco Bianchi',
    property: 'Via Roma 15, Milano',
    amount: 1200,
    dueDate: '2024-11-01',
    paidDate: '2024-11-01',
    status: 'completed' as const,
  },
  {
    id: '2',
    tenant: 'Sara Rossi',
    property: 'Piazza Duomo 8, Milano',
    amount: 2100,
    dueDate: '2024-11-01',
    paidDate: '2024-11-02',
    status: 'completed' as const,
  },
  {
    id: '3',
    tenant: 'Luca Verdi',
    property: 'Via Manzoni 10, Milano',
    amount: 950,
    dueDate: '2024-11-05',
    paidDate: null,
    status: 'pending' as const,
  },
  {
    id: '4',
    tenant: 'Giulia Neri',
    property: 'Corso Garibaldi 42, Milano',
    amount: 850,
    dueDate: '2024-11-01',
    paidDate: '2024-10-28',
    status: 'completed' as const,
  },
  {
    id: '5',
    tenant: 'Marco Bianchi',
    property: 'Via Roma 15, Milano',
    amount: 1200,
    dueDate: '2024-12-01',
    paidDate: null,
    status: 'pending' as const,
  },
]

// Consistent number formatting to avoid hydration mismatches
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Consistent date formatting to avoid hydration mismatches
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export default function DemoPaymentsPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const totalCompleted = demoPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)
  
  const totalPending = demoPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Stai visualizzando una demo</h3>
            <p className="text-sm text-blue-700">
              Questi sono dati di esempio. Iscriviti per iniziare a tracciare i tuoi pagamenti reali.
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

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pagamenti</h1>
          <p className="text-muted-foreground">Traccia i pagamenti degli affitti e genera fatture</p>
        </div>
        <Button variant="outline" disabled>
          Esporta CSV
        </Button>
      </div>

      <PaymentCharts payments={demoPayments.map(p => ({
        id: p.id,
        amount: p.amount,
        due_date: p.dueDate,
        status: p.status === 'completed' ? 'paid' : 'unpaid',
        paid_date: p.paidDate,
        property: p.property,
        tenant: p.tenant,
      }))} />

      <Card>
        <CardHeader>
          <CardTitle>Storico Pagamenti</CardTitle>
          <CardDescription>Lista di tutti i pagamenti</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inquilino</TableHead>
                <TableHead>Proprietà</TableHead>
                <TableHead>Importo</TableHead>
                <TableHead>Scadenza</TableHead>
                <TableHead>Pagato il</TableHead>
                <TableHead>Stato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoPayments.map((payment) => {
                const formattedAmount = isMounted
                  ? new Intl.NumberFormat('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(payment.amount)
                  : formatNumber(payment.amount)
                
                const formattedDueDate = isMounted
                  ? new Date(payment.dueDate).toLocaleDateString('it-IT')
                  : formatDate(payment.dueDate)
                
                const formattedPaidDate = payment.paidDate 
                  ? (isMounted 
                      ? new Date(payment.paidDate).toLocaleDateString('it-IT')
                      : formatDate(payment.paidDate))
                  : '-'
                
                return (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.tenant}</TableCell>
                    <TableCell>{payment.property}</TableCell>
                    <TableCell>€{formattedAmount}</TableCell>
                    <TableCell>{formattedDueDate}</TableCell>
                    <TableCell>{formattedPaidDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`flex items-center gap-1.5 ${
                        payment.status === 'completed' 
                          ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
                      }`}
                    >
                      {payment.status === 'completed' ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Completato
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          In Attesa
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

