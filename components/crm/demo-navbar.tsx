'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Home, Rocket } from 'lucide-react'
import Link from 'next/link'

export function DemoNavbar() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Modalità Demo
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Torna alla Homepage
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/signup">
            <Button>
              <Rocket className="mr-2 h-4 w-4" />
              Inizia Gratis
            </Button>
          </Link>
          <Avatar className="h-10 w-10">
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

