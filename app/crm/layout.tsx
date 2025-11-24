import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CRMNavbar } from '@/components/crm/navbar'
import { CRMSidebar } from '@/components/crm/sidebar'

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      redirect('/login')
    }

    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <CRMSidebar />
        <div className="flex flex-1 flex-col overflow-hidden md:ml-64">
          <CRMNavbar user={user} />
          <main className="flex-1 overflow-y-auto bg-background p-6">
            {children}
          </main>
        </div>
      </div>
    )
  } catch (error) {
    // If there's an error (e.g., Supabase not configured), redirect to login
    redirect('/login')
  }
}

