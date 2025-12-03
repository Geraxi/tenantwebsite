'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, File, ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

interface Activity {
  id: number
  type: string
  title: string
  property: string
  time: string
  icon: any
  iconColor: string
  iconBg: string
}

interface RecentActivityProps {
  activities?: Activity[]
}

export function RecentActivity({ activities = [] }: RecentActivityProps) {
  const pathname = usePathname()
  const isDemo = pathname.startsWith('/demo')
  const tasksLink = isDemo ? '/demo/tasks' : '/crm/tasks'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attività Recenti</CardTitle>
        <CardDescription>Ultime attività nel sistema</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Calendar className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nessuna Attività</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Le attività recenti appariranno qui quando aggiungi proprietà, pagamenti o attività
            </p>
            <Link href={tasksLink}>
              <Button>
                Crea Prima Attività
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon
              // Determine link based on activity type
              const getActivityLink = () => {
                switch (activity.type) {
                  case 'payment':
                    return isDemo ? '/demo/payments' : '/crm/payments'
                  case 'maintenance':
                  case 'inspection':
                    return isDemo ? '/demo/tasks' : '/crm/tasks'
                  case 'lease':
                    return isDemo ? '/demo/properties' : '/crm/properties'
                  default:
                    return isDemo ? '/demo/tasks' : '/crm/tasks'
                }
              }

              return (
                <Link
                  key={activity.id}
                  href={getActivityLink()}
                  className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0 hover:bg-muted/50 -mx-4 px-4 py-2 rounded-md transition-colors group"
                >
                  <div className={`${activity.iconBg} rounded-full p-2 mt-0.5 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-4 w-4 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm group-hover:text-primary transition-colors">{activity.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.property} • {activity.time}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                </Link>
              )
            })}
            <Link href={tasksLink} className="block mt-4">
              <Button variant="outline" className="w-full">
                Visualizza Tutte le Attività
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
