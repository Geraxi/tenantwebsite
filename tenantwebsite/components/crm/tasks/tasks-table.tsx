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
import { AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'

interface Task {
  id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled'
  due_date?: string
  assigned_to?: string
  property_id?: string
  tenant_id?: string
  properties?: {
    id: string
    title: string
  } | null
  tenants?: {
    id: string
    full_name?: string
    name?: string
  } | null
}

interface TasksTableProps {
  tasks: Task[]
}

export function TasksTable({ tasks }: TasksTableProps) {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-sm text-muted-foreground">Nessuna attività ancora.</p>
        </CardContent>
      </Card>
    )
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <Badge variant="destructive" className="flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            Alta
          </Badge>
        )
      case 'medium':
        return (
          <Badge variant="default" className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Media
          </Badge>
        )
      case 'low':
        return (
          <Badge variant="secondary" className="flex items-center gap-1.5">
            Bassa
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string, dueDate?: string) => {
    const isOverdue = dueDate && new Date(dueDate) < new Date() && status !== 'completed'
    
    if (isOverdue) {
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
            Completata
          </Badge>
        )
      case 'in_progress':
        return (
          <Badge 
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 flex items-center gap-1.5"
          >
            <Clock className="h-3.5 w-3.5" />
            In Corso
          </Badge>
        )
      case 'todo':
        return (
          <Badge 
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 flex items-center gap-1.5"
          >
            Da Fare
          </Badge>
        )
      case 'cancelled':
        return (
          <Badge variant="outline" className="flex items-center gap-1.5">
            <XCircle className="h-3.5 w-3.5" />
            Cancellata
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titolo</TableHead>
              <TableHead>Descrizione</TableHead>
              <TableHead>Priorità</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead>Scadenza</TableHead>
              <TableHead>Assegnato a</TableHead>
              <TableHead>Proprietà</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => {
              const propertyName = task.properties?.title || 'N/A'
              const tenantName = task.tenants?.full_name || task.tenants?.name || 'N/A'

              return (
                <TableRow key={task.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <Link 
                      href={`/crm/tasks/${task.id}`}
                      className="hover:underline"
                    >
                      {task.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-md truncate">
                    {task.description || '-'}
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(task.priority)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(task.status, task.due_date)}
                  </TableCell>
                  <TableCell>
                    {task.due_date 
                      ? new Date(task.due_date).toLocaleDateString('it-IT')
                      : '-'
                    }
                  </TableCell>
                  <TableCell>
                    {task.assigned_to || '-'}
                  </TableCell>
                  <TableCell>
                    {task.property_id ? (
                      <Link 
                        href={`/crm/properties/${task.property_id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {propertyName}
                      </Link>
                    ) : (
                      propertyName
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

