import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutDashboard, Users, DollarSign, CheckCircle2, AlertCircle, Plus, Rocket } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RevenueChart } from '@/components/crm/revenue-chart'
import { RecentActivity } from '@/components/crm/recent-activity'
import { PropertiesCarousel } from '@/components/crm/properties-carousel'

// Sample demo data
const demoStats = {
  totalProperties: 24,
  totalTenants: 18,
  monthlyRevenue: 12450,
  pendingTasks: 5,
  occupancyRate: 75,
  overdueTasks: 2,
  propertiesChange: 12,
  occupancyChange: 5,
  revenueChange: 8,
}

const demoProperties = [
  {
    id: 1,
    name: 'Appartamento Via Roma 15',
    address: 'Via Roma 15, Milano',
    type: 'Appartamento',
    status: 'Affittato',
    rent: 1200,
    details: 'Centro • 2 Camere, 1 Bagno',
    leaseEnds: 'Giu 2025',
    gradient: 'from-purple-500 to-blue-500',
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'],
    owner_name: 'Mario Rossi',
  },
  {
    id: 2,
    name: 'Ufficio Corso Garibaldi',
    address: 'Corso Garibaldi 42, Milano',
    type: 'Ufficio',
    status: 'Affittato',
    rent: 850,
    details: 'Business District • 80 mq',
    leaseEnds: 'Dic 2024',
    gradient: 'from-green-500 to-blue-500',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'],
    owner_name: 'Luigi Bianchi',
  },
  {
    id: 3,
    name: 'Negozio Piazza Duomo',
    address: 'Piazza Duomo 8, Milano',
    type: 'Negozio',
    status: 'Disponibile',
    rent: 2100,
    details: 'Centro Storico • 120 mq',
    available: 'Immediatamente',
    gradient: 'from-orange-500 to-yellow-500',
    images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80'],
    owner_name: 'Anna Verdi',
  },
  {
    id: 4,
    name: 'Appartamento Moderno',
    address: 'Via Manzoni 10, Milano',
    type: 'Appartamento',
    status: 'Affittato',
    rent: 950,
    details: 'Centro • 1 Camera, 1 Bagno',
    leaseEnds: 'Mar 2025',
    gradient: 'from-pink-500 to-rose-500',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
    owner_name: 'Maria Rossi',
  },
  {
    id: 5,
    name: 'Villa con Giardino',
    address: 'Via dei Pini 25, Milano',
    type: 'Villa',
    status: 'Disponibile',
    rent: 3500,
    details: 'Periferia • 4 Camere, 3 Bagni',
    available: 'Immediatamente',
    gradient: 'from-indigo-500 to-purple-500',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'],
    owner_name: 'Giuseppe Neri',
  },
]

const statsData = [
  {
    title: 'Proprietà Totali',
    value: demoStats.totalProperties.toString(),
    change: `↑${demoStats.propertiesChange}% dal mese scorso`,
    changeType: 'positive' as const,
      icon: LayoutDashboard,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Tasso di Occupazione',
    value: `${demoStats.occupancyRate}%`,
    change: `↑${demoStats.occupancyChange}% dal mese scorso`,
    changeType: 'positive' as const,
    icon: CheckCircle2,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Entrate Mensili',
    value: `€${demoStats.monthlyRevenue.toLocaleString('it-IT')}`,
    change: `↑${demoStats.revenueChange}% dal mese scorso`,
    changeType: 'positive' as const,
    icon: DollarSign,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Attività in Sospeso',
    value: demoStats.pendingTasks.toString(),
    change: `→${demoStats.overdueTasks} in ritardo`,
    changeType: 'warning' as const,
    icon: AlertCircle,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
]

export default function DemoDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Stai visualizzando una demo</h3>
            <p className="text-sm text-blue-700">
              Questa è una versione demo del CRM con dati di esempio. Iscriviti per iniziare a gestire le tue proprietà reali.
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
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bentornato! Ecco una panoramica delle tue proprietà.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.iconBg} rounded-full p-2`}>
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <p className={`text-xs ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'warning' ? 'text-red-600' : 
                  'text-muted-foreground'
                }`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Revenue Chart and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <RevenueChart />
        <RecentActivity />
      </div>

      {/* Properties Section */}
      <PropertiesCarousel properties={demoProperties} isDemo={true} />
    </div>
  )
}
