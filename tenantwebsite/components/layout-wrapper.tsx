'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCRMPage = pathname.startsWith('/crm') || pathname.startsWith('/demo') || pathname.startsWith('/login') || pathname.startsWith('/signup')

  if (isCRMPage) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <div className="flex-1 w-full">
        {children}
      </div>
      <Footer />
    </>
  )
}



