'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, File, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

const activities = [
  {
    id: 1,
    type: 'payment',
    title: 'Pagamento affitto ricevuto',
    property: 'Appartamento 3B',
    time: '2 ore fa',
    icon: CheckCircle2,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
  },
  {
    id: 2,
    type: 'maintenance',
    title: 'Richiesta manutenzione inviata',
    property: 'Casa #42',
    time: '5 ore fa',
    icon: CheckCircle2,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
  {
    id: 3,
    type: 'lease',
    title: 'Nuovo contratto di affitto firmato',
    property: 'Ufficio Spazio A',
    time: 'Ieri',
    icon: File,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
  },
  {
    id: 4,
    type: 'inspection',
    title: 'Ispezione proprietà programmata',
    property: 'Villa 12',
    time: '2 giorni fa',
    icon: CheckCircle2,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
  },
]

export function RecentActivity() {
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
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className={`${activity.iconBg} rounded-full p-2 mt-0.5`}>
                  <Icon className={`h-4 w-4 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.property} • {activity.time}
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

