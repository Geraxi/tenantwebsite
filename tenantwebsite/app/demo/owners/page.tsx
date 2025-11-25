import { Button } from '@/components/ui/button'
import { Rocket } from 'lucide-react'
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

// Demo owners data
const demoOwners = [
  {
    id: '1',
    name: 'Mario Rossi',
    email: 'mario.rossi@email.com',
    phone: '+39 333 1112233',
    properties: 3,
  },
  {
    id: '2',
    name: 'Luigi Bianchi',
    email: 'luigi.bianchi@email.com',
    phone: '+39 334 2223344',
    properties: 2,
  },
  {
    id: '3',
    name: 'Anna Verdi',
    email: 'anna.verdi@email.com',
    phone: '+39 335 3334455',
    properties: 1,
  },
  {
    id: '4',
    name: 'Giuseppe Neri',
    email: 'giuseppe.neri@email.com',
    phone: '+39 336 4445566',
    properties: 1,
  },
  {
    id: '5',
    name: 'Maria Rossi',
    email: 'maria.rossi@email.com',
    phone: '+39 337 5556677',
    properties: 2,
  },
]

export default function DemoOwnersPage() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Stai visualizzando una demo</h3>
            <p className="text-sm text-blue-700">
              Questi sono dati di esempio. Iscriviti per iniziare a gestire i tuoi proprietari reali.
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
        <h1 className="text-3xl font-bold">Proprietari</h1>
        <p className="text-muted-foreground">Gestisci i profili dei proprietari immobiliari</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proprietari</CardTitle>
          <CardDescription>Gestisci i profili dei proprietari</CardDescription>
        </CardHeader>
        <CardContent>
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
              {demoOwners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell className="font-medium">{owner.name}</TableCell>
                  <TableCell>{owner.email}</TableCell>
                  <TableCell>{owner.phone}</TableCell>
                  <TableCell>{owner.properties} proprietà</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}



