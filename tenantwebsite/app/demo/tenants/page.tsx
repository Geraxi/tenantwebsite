import { Button } from '@/components/ui/button'
import { Plus, Rocket } from 'lucide-react'
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

// Demo tenants data
const demoTenants = [
  {
    id: '1',
    name: 'Marco Bianchi',
    email: 'marco.bianchi@email.com',
    phone: '+39 333 1234567',
    property: 'Via Roma 15, Milano',
    status: 'active' as const,
    rent: 1200,
  },
  {
    id: '2',
    name: 'Sara Rossi',
    email: 'sara.rossi@email.com',
    phone: '+39 334 2345678',
    property: 'Piazza Duomo 8, Milano',
    status: 'active' as const,
    rent: 2100,
  },
  {
    id: '3',
    name: 'Luca Verdi',
    email: 'luca.verdi@email.com',
    phone: '+39 335 3456789',
    property: 'Via Manzoni 10, Milano',
    status: 'active' as const,
    rent: 950,
  },
  {
    id: '4',
    name: 'Giulia Neri',
    email: 'giulia.neri@email.com',
    phone: '+39 336 4567890',
    property: 'Corso Garibaldi 42, Milano',
    status: 'active' as const,
    rent: 850,
  },
]

export default function DemoTenantsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Stai visualizzando una demo</h3>
            <p className="text-sm text-blue-700">
              Questi sono dati di esempio. Iscriviti per iniziare a gestire i tuoi inquilini reali.
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
        <h1 className="text-3xl font-bold">Inquilini</h1>
        <p className="text-muted-foreground">Gestisci i profili degli inquilini e lo stato degli affitti</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inquilini</CardTitle>
          <CardDescription>Gestisci i profili degli inquilini</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefono</TableHead>
                <TableHead>Proprietà</TableHead>
                <TableHead>Affitto</TableHead>
                <TableHead>Stato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.email}</TableCell>
                  <TableCell>{tenant.phone}</TableCell>
                  <TableCell>{tenant.property}</TableCell>
                  <TableCell>€{tenant.rent}/mese</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={tenant.status === 'active' 
                        ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }
                    >
                      {tenant.status === 'active' ? 'Attivo' : 'Inattivo'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

