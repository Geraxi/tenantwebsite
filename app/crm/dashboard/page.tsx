import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, Plus, FileText, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { RevenueChart } from '@/components/crm/revenue-chart'
import { RecentActivity } from '@/components/crm/recent-activity'
import { PropertiesCarousel } from '@/components/crm/properties-carousel'
import Link from 'next/link'

async function getStats() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  // Get user's agency_id
  const { data: userData } = await supabase
    .from('users')
    .select('agency_id')
    .eq('id', user.id)
    .single()

  if (!userData?.agency_id) {
    return {
      totalProperties: 0,
      totalTenants: 0,
      monthlyRevenue: 0,
      pendingTasks: 0,
      occupancyRate: 0,
      overdueTasks: 0,
      propertiesChange: 0,
      occupancyChange: 0,
      revenueChange: 0,
      recentProperties: [],
    }
  }

  const agencyId = userData.agency_id

  // Get properties count (rent only for occupancy calculation)
  const { count: rentPropertiesCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('agency_id', agencyId)
    .eq('status', 'active')
    .eq('type', 'rent')

  // Get all active properties count
  const { count: propertiesCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('agency_id', agencyId)
    .eq('status', 'active')

  // Get rented properties for occupancy (only rent properties can be rented)
  const { count: rentedCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('agency_id', agencyId)
    .eq('status', 'active')
    .eq('type', 'rent')
    .not('tenant_id', 'is', null)

  const occupancyRate = rentPropertiesCount && rentPropertiesCount > 0 
    ? Math.round((rentedCount || 0) / rentPropertiesCount * 100) 
    : 0

  // Get tenants count
  const { count: tenantsCount } = await supabase
    .from('tenants')
    .select('*', { count: 'exact', head: true })
    .eq('agency_id', agencyId)
    .eq('rental_status', 'active')

  // Get monthly revenue (sum of completed payments this month)
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data: payments } = await supabase
    .from('payments')
    .select('amount')
    .eq('agency_id', agencyId)
    .eq('status', 'completed')
    .gte('paid_date', startOfMonth.toISOString())

  const monthlyRevenue = payments?.reduce((sum: number, p: { amount: number | null }) => sum + Number(p.amount || 0), 0) || 0

  // Get pending tasks count
  const { count: tasksCount } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('agency_id', agencyId)
    .in('status', ['todo', 'in_progress'])

  // Get overdue tasks
  const today = new Date().toISOString()
  const { count: overdueCount } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('agency_id', agencyId)
    .in('status', ['todo', 'in_progress'])
    .lt('due_date', today)

  // Get recent properties with images and owner data
  const { data: recentProperties } = await supabase
    .from('properties')
    .select('id, title, city, price, type, status, tenant_id, images, address, owners(*)')
    .eq('agency_id', agencyId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(10)

  // Calculate changes (simplified - in production, compare with previous period)
  const propertiesChange = 0 // Would calculate from previous month
  const occupancyChange = 0 // Would calculate from previous month
  const revenueChange = 0 // Would calculate from previous month

  return {
    totalProperties: propertiesCount || 0,
    totalTenants: tenantsCount || 0,
    monthlyRevenue,
    pendingTasks: tasksCount || 0,
    occupancyRate,
    overdueTasks: overdueCount || 0,
    propertiesChange,
    occupancyChange,
    revenueChange,
    recentProperties: recentProperties || [],
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const statsData = [
    {
      title: 'Proprietà Totali',
      value: stats?.totalProperties.toString() || '0',
      change: stats?.propertiesChange ? `↑${stats.propertiesChange}% dal mese scorso` : 'Nessun cambiamento',
      changeType: (stats?.propertiesChange || 0) > 0 ? 'positive' as const : 'neutral' as const,
      icon: FileText,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      href: '/crm/properties',
      description: 'Visualizza tutte le proprietà',
    },
    {
      title: 'Tasso di Occupazione',
      value: `${stats?.occupancyRate || 0}%`,
      change: stats?.occupancyChange ? `↑${stats.occupancyChange}% dal mese scorso` : 'Nessun cambiamento',
      changeType: (stats?.occupancyChange || 0) > 0 ? 'positive' as const : 'neutral' as const,
      icon: CheckCircle2,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      href: '/crm/properties?type=rent',
      description: 'Visualizza proprietà in affitto',
    },
    {
      title: 'Entrate Mensili',
      value: `€${(stats?.monthlyRevenue || 0).toLocaleString('it-IT')}`,
      change: stats?.revenueChange ? `↑${stats.revenueChange}% dal mese scorso` : 'Nessun cambiamento',
      changeType: (stats?.revenueChange || 0) > 0 ? 'positive' as const : 'neutral' as const,
      icon: CheckCircle2,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      href: '/crm/payments',
      description: 'Visualizza tutti i pagamenti',
    },
    {
      title: 'Attività in Sospeso',
      value: stats?.pendingTasks.toString() || '0',
      change: stats?.overdueTasks ? `→${stats.overdueTasks} in ritardo` : 'Tutto in regola',
      changeType: (stats?.overdueTasks || 0) > 0 ? 'warning' as const : 'positive' as const,
      icon: AlertCircle,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      href: '/crm/tasks',
      description: 'Visualizza tutte le attività',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bentornato! Ecco una panoramica delle tue proprietà.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href} className="block">
              <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer group border-2 hover:border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">{stat.title}</CardTitle>
                  <div className={`${stat.iconBg} rounded-full p-2 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{stat.value}</div>
                  <p className={`text-xs mb-2 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'warning' ? 'text-red-600' : 
                    'text-muted-foreground'
                  }`}>
                    {stat.change}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    <span>{stat.description}</span>
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Revenue Chart and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <RevenueChart />
        <RecentActivity />
      </div>

      {/* Properties Section */}
      <PropertiesCarousel 
        properties={stats?.recentProperties?.map((p: any) => ({
          id: p.id,
          name: p.title,
          title: p.title,
          address: p.address ?? undefined,
          city: p.city ?? undefined,
          type: p.type,
          status: p.tenant_id ? 'Affittato' : 'Disponibile',
          rent: p.price ?? undefined,
          price: p.price ?? undefined,
          images: p.images || [],
          tenant_id: p.tenant_id,
          owner: Array.isArray(p.owners) ? p.owners[0] || null : p.owners || null,
        })) || []} 
        isDemo={false}
      />
    </div>
  )
}
