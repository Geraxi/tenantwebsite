import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { getTasks } from '@/lib/actions/tasks'
import { TasksTable } from '@/components/crm/tasks/tasks-table'

export default async function TasksPage() {
  const tasks = await getTasks()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attività</h1>
          <p className="text-muted-foreground">Gestisci richieste di manutenzione e promemoria</p>
        </div>
        <Link href="/crm/tasks/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi Attività
          </Button>
        </Link>
      </div>

      <TasksTable tasks={tasks} />
    </div>
  )
}
