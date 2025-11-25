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
import Link from 'next/link'
import { Mail, Phone, FileText } from 'lucide-react'

interface Tenant {
  id: string
  full_name?: string
  name?: string
  email?: string
  phone?: string
  rental_status?: string
  monthly_rent?: number
  property_id?: string
  properties?: any[]
}

interface TenantsTableProps {
  tenants: Tenant[]
}

export function TenantsTable({ tenants }: TenantsTableProps) {
  if (tenants.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-sm text-muted-foreground">Nessun inquilino ancora.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefono</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead>Affitto</TableHead>
              <TableHead>Proprietà</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((tenant) => {
              const tenantName = tenant.full_name || tenant.name || 'N/A'
              const property = tenant.properties && Array.isArray(tenant.properties) && tenant.properties.length > 0
                ? tenant.properties[0]
                : null

              return (
                <TableRow key={tenant.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <Link href={`/crm/tenants/${tenant.id}`} className="hover:underline flex items-center gap-2">
                      {tenantName}
                      <FileText className="h-3 w-3 text-muted-foreground" title="Visualizza profilo e documenti" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {tenant.email && <Mail className="h-3 w-3 text-muted-foreground" />}
                      <span>{tenant.email || 'N/A'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {tenant.phone && <Phone className="h-3 w-3 text-muted-foreground" />}
                      <span>{tenant.phone || 'N/A'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        tenant.rental_status === 'active' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }
                    >
                      {tenant.rental_status === 'active' ? 'Attivo' : 
                       tenant.rental_status === 'pending' ? 'In Attesa' :
                       tenant.rental_status === 'past' ? 'Passato' : 'Prospettiva'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {tenant.monthly_rent 
                      ? `€${Number(tenant.monthly_rent).toLocaleString('it-IT')}` 
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {property ? (
                      <Link 
                        href={`/crm/properties/${property.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {property.title || property.address || `Proprietà ${property.id}`}
                      </Link>
                    ) : (
                      'N/A'
                    )}
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

