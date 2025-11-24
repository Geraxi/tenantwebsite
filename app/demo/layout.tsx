import { CRMSidebar } from '@/components/crm/sidebar'
import { DemoNavbar } from '@/components/crm/demo-navbar'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <CRMSidebar />
      <div className="flex flex-1 flex-col overflow-hidden md:ml-64">
        <DemoNavbar />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  )
}



