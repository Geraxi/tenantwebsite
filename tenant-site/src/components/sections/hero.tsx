import Link from "next/link";
import { Logo } from "@/components/branding/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const heroBullets = [
  "Affitti + vendite + CRM + documenti",
  "Onboarding guidato e import immediato",
  "Risparmi fino al 40% rispetto ai tool separati",
];

export function HeroSection() {
  return (
    <section className="bg-white py-16 sm:py-24" id="hero">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Logo />
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Tenant CRM
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-[#1A1A1A] sm:text-5xl">
            Il gestionale moderno per agenzie immobiliari.
          </h1>
          <p className="text-lg text-muted-foreground">
            Affitti + Vendite + CRM + Documenti in un unico strumento veloce,
            intuitivo e pronto da usare. Pensato per team che vogliono
            centralizzare proprietà, clienti e lead senza costi nascosti.
          </p>
          <ul className="space-y-2 text-base text-muted-foreground">
            {heroBullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/demo">Prenota una Demo</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Guarda le Funzionalità</a>
            </Button>
          </div>
        </div>
        <Card className="space-y-6 border-none bg-[#F8F9FB] p-8 shadow-sm">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Confronto mensile
            </p>
            <p className="text-4xl font-semibold text-[#1A1A1A]">
              €199<span className="text-base font-medium text-muted-foreground"> / mese</span>
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white p-6 shadow-inner">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Tenant sostituisce
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[#1A1A1A]">
              <li className="flex items-center justify-between">
                <span>Tool Affitti</span>
                <span className="text-muted-foreground">€29–49</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tool Vendite</span>
                <span className="text-muted-foreground">€49–99</span>
              </li>
              <li className="flex items-center justify-between">
                <span>CRM</span>
                <span className="text-muted-foreground">€79–129</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Documenti</span>
                <span className="text-muted-foreground">€10–20</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Lead</span>
                <span className="text-muted-foreground">€49–99</span>
              </li>
            </ul>
            <div className="mt-6 rounded-xl bg-[#E24A4A]/10 px-4 py-3 text-sm text-[#E24A4A]">
              Risparmio immediato fino al 40%
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
