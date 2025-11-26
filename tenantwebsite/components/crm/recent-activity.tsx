'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, File, ArrowRight, AlertCircle, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

interface Activity {
  id: string
  type: string
  title: string
  property: string
  date: Date
}

interface RecentActivityProps {
  activities: Activity[]
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + " anni fa"

  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + " mesi fa"

  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + " giorni fa"

  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + " ore fa"

  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + " minuti fa"

  return "pochi secondi fa"
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const pathname = usePathname()
  const isDemo = pathname.startsWith('/demo')
  const tasksLink = isDemo ? '/demo/tasks' : '/crm/tasks'

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' }
      case 'task':
        return { icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' }
      case 'lease':
        return { icon: File, color: 'text-purple-600', bg: 'bg-purple-100' }
      case 'property':
        return { icon: Home, color: 'text-blue-600', bg: 'bg-blue-100' }
      default:
        return { icon: CheckCircle2, color: 'text-gray-600', bg: 'bg-gray-100' }
    }
  }

  if (activities.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Attività Recenti</CardTitle>
          <CardDescription>Ultime attività nel sistema</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
          <p>Nessuna attività recente</p>
          <p className="text-sm">Le tue attività appariranno qui</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Attività Recenti</CardTitle>
        <CardDescription>Ultime attività nel sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const { icon: Icon, color, bg } = getIcon(activity.type)
            return (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className={`${bg} rounded-full p-2 mt-0.5`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.property} • {timeAgo(new Date(activity.date))}
                  </p>
                </div>
              </div>
            )
          })}
          <Link href={tasksLink} className="block mt-4">
            <Button variant="outline" className="w-full">
              Visualizza Tutte le Attività
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}


