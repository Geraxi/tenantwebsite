import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlayCircle } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-24">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/herovideo.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-6xl md:text-7xl lg:text-8xl">
            La Piattaforma
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              per Agenzie Immobiliari
            </span>
          </h1>

          <p className="mt-6 text-xl leading-8 text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)] sm:text-2xl max-w-2xl mx-auto font-medium">
            Gestisci affitti, vendite, pagamenti e documenti in un'unica piattaforma.
            Risparmia tempo e denaro consolidando tutti i tuoi strumenti.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <Link href="/demo">
              <Button size="lg" className="h-14 px-8 text-lg gap-2 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                <PlayCircle className="h-5 w-5" />
                Prova Demo CRM
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 grayscale opacity-50">
            {/* Placeholder for social proof / trusted by logos if needed */}
            <div className="text-sm font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">SCELTO DA OLTRE 500+ AGENZIE</div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10" />
    </section>
  )
}
