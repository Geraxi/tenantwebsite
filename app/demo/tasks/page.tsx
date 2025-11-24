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
import { Badge } from '@/components/ui/badge'

// Demo tasks data
const demoTasks = [
  {
    id: '1',
    title: 'Rinnovo contratto Via Roma 15',
    description: 'Contratto in scadenza a fine mese',
    priority: 'high' as const,
    status: 'todo' as const,
    dueDate: '2024-11-20',
    assignedTo: 'Marco Bianchi',
  },
  {
    id: '2',
    title: 'Controllo manutenzione Corso Garibaldi',
    description: 'Verifica impianto di riscaldamento',
    priority: 'medium' as const,
    status: 'in_progress' as const,
    dueDate: '2024-11-22',
    assignedTo: 'Giulia Neri',
  },
  {
    id: '3',
    title: 'Raccolta documenti nuovo inquilino',
    description: 'Completare documentazione per Via Manzoni',
    priority: 'high' as const,
    status: 'todo' as const,
    dueDate: '2024-11-18',
    assignedTo: 'Luca Verdi',
  },
  {
    id: '4',
    title: 'Revisione canone affitto',
    description: 'Rivedere canone per Piazza Duomo',
    priority: 'low' as const,
    status: 'todo' as const,
    dueDate: '2024-11-25',
    assignedTo: 'Sara Rossi',
  },
]

const priorityLabels = {
  high: 'Alta',
  medium: 'Media',
  low: 'Bassa',
}

const statusLabels = {
  todo: 'Da Fare',
  in_progress: 'In Corso',
  completed: 'Completata',
}

export default function DemoTasksPage() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Stai visualizzando una demo</h3>
            <p className="text-sm text-blue-700">
              Questi sono dati di esempio. Iscriviti per iniziare a gestire le tue attività reali.
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
        <h1 className="text-3xl font-bold">Attività</h1>
        <p className="text-muted-foreground">Gestisci le attività e le scadenze</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attività</CardTitle>
          <CardDescription>Gestisci le tue attività e scadenze</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titolo</TableHead>
                <TableHead>Descrizione</TableHead>
                <TableHead>Priorità</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Scadenza</TableHead>
                <TableHead>Assegnato a</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell className="text-muted-foreground">{task.description}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        task.priority === 'high' ? 'destructive' : 
                        task.priority === 'medium' ? 'default' : 
                        'secondary'
                      }
                    >
                      {priorityLabels[task.priority]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={task.status === 'completed' ? 'default' : 'outline'}>
                      {statusLabels[task.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString('it-IT')}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

