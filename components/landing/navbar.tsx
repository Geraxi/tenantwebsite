import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-removebg-preview.png"
              alt="Tenant Logo"
              width={56}
              height={56}
              className="h-14 w-14"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Tenant</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Funzionalità
          </Link>
          <Link href="/#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Prezzi
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">Accedi</Button>
          </Link>
          <Link href="/demo">
            <Button size="sm" className="rounded-full px-6 shadow-md shadow-primary/20">Prova Demo CRM</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

