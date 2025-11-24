'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  Building2,
  Users,
  UserCheck,
  DollarSign,
  CheckSquare,
  ArrowRight,
  Upload,
  Settings,
  LayoutDashboard,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const navItems = [
  {
    title: 'Dashboard',
    href: '/crm/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Proprietà',
    href: '/crm/properties',
    icon: Building2,
  },
  {
    title: 'Proprietari',
    href: '/crm/owners',
    icon: Users,
  },
  {
    title: 'Inquilini',
    href: '/crm/tenants',
    icon: UserCheck,
  },
  {
    title: 'Pagamenti',
    href: '/crm/payments',
    icon: DollarSign,
  },
  {
    title: 'Attività',
    href: '/crm/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Importa Dati',
    href: '/crm/data-import',
    icon: Upload,
  },
  {
    title: 'Impostazioni',
    href: '/crm/settings',
    icon: Settings,
  },
]

function SidebarContent() {
  return <SidebarNavItems collapsed={false} />
}

function SidebarNavItems({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname()
  const isDemo = pathname.startsWith('/demo')
  
  // Map routes to demo or crm based on current path
  const getHref = (href: string) => {
    if (isDemo) {
      return href.replace('/crm', '/demo')
    }
    return href
  }

  return (
    <nav className="flex-1 px-2 space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const href = getHref(item.href)
        const isActive = pathname === href || (href !== '/demo/dashboard' && href !== '/crm/dashboard' && pathname.startsWith(href))
        return (
          <Link key={item.href} href={href}>
            <Button
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start text-white hover:bg-blue-700',
                isActive && 'bg-blue-700 text-white',
                !isActive && 'text-white/80',
                collapsed && 'justify-center px-0'
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
              {!collapsed && item.title}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}

export function CRMSidebar() {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only render mobile sidebar on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {/* Mobile Sidebar */}
      {mounted && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
              <Building2 className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-blue-600">
            <div className="flex flex-col h-full pt-5 pb-4">
              <div className="flex items-center gap-2 px-4 mb-6">
                <Image 
                  src="/images/logo-removebg-preview.png" 
                  alt="Tenant Logo" 
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <span className="text-2xl font-bold text-white">Tenant</span>
              </div>
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      )}
      {!mounted && (
        <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50" onClick={() => setMounted(true)}>
          <Building2 className="h-5 w-5" />
        </Button>
      )}

      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex md:flex-col md:fixed md:inset-y-0 transition-all duration-300",
        collapsed ? "md:w-16" : "md:w-64"
      )}>
        <div className="flex-1 flex flex-col min-h-0 border-r bg-blue-600">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-between px-4 mb-8">
              {!collapsed && (
                <div className="flex items-center gap-2">
                  <Image 
                    src="/images/logo-removebg-preview.png" 
                    alt="Tenant Logo" 
                    width={56}
                    height={56}
                    className="h-14 w-14"
                  />
                  <span className="text-2xl font-bold text-white">Tenant</span>
                </div>
              )}
              {collapsed && (
                <div className="flex justify-center w-full">
                  <Image 
                    src="/images/logo-removebg-preview.png" 
                    alt="Tenant Logo" 
                    width={48}
                    height={48}
                    className="h-12 w-12"
                  />
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                className="ml-auto text-white hover:bg-blue-700"
              >
                {collapsed ? (
                  <ArrowRight className="h-5 w-5" />
                ) : (
                  <ArrowRight className="h-5 w-5 rotate-180" />
                )}
              </Button>
            </div>
            <SidebarNavItems collapsed={collapsed} />
          </div>
        </div>
      </aside>
    </>
  )
}

