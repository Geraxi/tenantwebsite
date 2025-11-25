'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'

interface Payment {
  id: string
  amount: number
  due_date: string
  paid_date: string | null
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'overdue'
  property_id?: string
  tenant_id?: string
  properties?: {
    id: string
    title: string
    address?: string
  } | null
  tenants?: {
    id: string
    full_name?: string
    name?: string
  } | null
}

interface PaymentsTableProps {
  payments: Payment[]
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  if (payments.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-sm text-muted-foreground">Nessun pagamento ancora.</p>
        </CardContent>
      </Card>
    )
  }

  const getStatusBadge = (status: string, dueDate: string, paidDate: string | null) => {
    const due = new Date(dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Check if overdue
    if (status === 'pending' && due < today && !paidDate) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1.5">
          <XCircle className="h-3.5 w-3.5" />
          Scaduto
        </Badge>
      )
    }

    switch (status) {
      case 'completed':
        return (
          <Badge 
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 flex items-center gap-1.5"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Completato
          </Badge>
        )
      case 'pending':
        return (
          <Badge 
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 flex items-center gap-1.5"
          >
            <Clock className="h-3.5 w-3.5" />
            In Attesa
          </Badge>
        )
      case 'failed':
        return (
          <Badge variant="destructive" className="flex items-center gap-1.5">
            <XCircle className="h-3.5 w-3.5" />
            Fallito
          </Badge>
        )
      case 'refunded':
        return (
          <Badge variant="outline" className="flex items-center gap-1.5">
            Rimborsato
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        )
    }
  }

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('it-IT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  return (
    <Card>
      <CardContent className="p-0">
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
            {payments.map((payment) => {
              const tenantName = payment.tenants?.full_name || payment.tenants?.name || 'N/A'
              const propertyName = payment.properties?.title || payment.properties?.address || 'N/A'

              return (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    {payment.tenant_id ? (
                      <Link 
                        href={`/crm/tenants/${payment.tenant_id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {tenantName}
                      </Link>
                    ) : (
                      tenantName
                    )}
                  </TableCell>
                  <TableCell>
                    {payment.property_id ? (
                      <Link 
                        href={`/crm/properties/${payment.property_id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {propertyName}
                      </Link>
                    ) : (
                      propertyName
                    )}
                  </TableCell>
                  <TableCell>€{formatNumber(Number(payment.amount))}</TableCell>
                  <TableCell>
                    {new Date(payment.due_date).toLocaleDateString('it-IT')}
                  </TableCell>
                  <TableCell>
                    {payment.paid_date 
                      ? new Date(payment.paid_date).toLocaleDateString('it-IT')
                      : '-'
                    }
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(payment.status, payment.due_date, payment.paid_date)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

