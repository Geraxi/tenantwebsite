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
import Link from 'next/link'
import { Mail, Phone, FileText } from 'lucide-react'

interface Owner {
  id: string
  full_name?: string
  name?: string
  email?: string
  phone?: string
  address?: string
  properties?: any[]
  properties_count?: number
}

interface OwnersTableProps {
  owners: Owner[]
}

export function OwnersTable({ owners }: OwnersTableProps) {
  if (owners.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-sm text-muted-foreground">Nessun proprietario ancora.</p>
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
              <TableHead>Proprietà</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {owners.map((owner) => {
              const ownerName = owner.full_name || owner.name || 'N/A'
              const propertiesCount = owner.properties_count || 
                                    (owner.properties && Array.isArray(owner.properties) ? owner.properties.length : 0) ||
                                    0

              return (
                <TableRow 
                  key={owner.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => window.location.href = `/crm/owners/${owner.id}`}
                >
                  <TableCell className="font-medium">
                    <Link 
                      href={`/crm/owners/${owner.id}`} 
                      className="hover:underline flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {ownerName}
                      <FileText className="h-3 w-3 text-muted-foreground" title="Visualizza profilo e documenti" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {owner.email && <Mail className="h-3 w-3 text-muted-foreground" />}
                      <span>{owner.email || 'N/A'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {owner.phone && <Phone className="h-3 w-3 text-muted-foreground" />}
                      <span>{owner.phone || 'N/A'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {propertiesCount > 0 ? (
                      <span className="text-sm">{propertiesCount} {propertiesCount === 1 ? 'proprietà' : 'proprietà'}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Nessuna proprietà</span>
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

