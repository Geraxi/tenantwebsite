import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <Image
                src="/images/logo-removebg-preview.png"
                alt="Tenant Logo"
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Tenant</h3>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              La piattaforma CRM completa per agenzie immobiliari.
              Gestisci affitti, vendite, pagamenti e relazioni in un unico posto.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Prodotto</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Funzionalità
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Prezzi
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Accedi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Azienda</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contatti
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-muted-foreground hover:text-primary transition-colors">
                  Prova Demo CRM
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Chi Siamo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legale</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Termini di Servizio
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tenant CRM. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Termini</Link>
            <Link href="/#contact" className="hover:text-primary transition-colors">Contatti</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

