import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-[#F8F9FB] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl rounded-3xl border border-primary/20 bg-white px-6 py-16 text-center shadow-lg shadow-primary/5 sm:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Demo guidata
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-[#1A1A1A]">
          Prenota una demo di 10 minuti
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Scopri come Tenant unifica affitti, vendite, CRM e documenti in una sola vista.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" asChild>
            <Link href="/demo">Prenota Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
