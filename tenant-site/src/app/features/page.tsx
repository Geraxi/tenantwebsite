import type { Metadata } from "next";
import { FeatureGrid } from "@/components/sections/feature-grid";

export const metadata: Metadata = {
  title: "Funzionalità | Tenant CRM",
  description:
    "Gestione affitti e vendite, CRM completo, importazione dati, documenti e lead match in un’unica piattaforma.",
};

export default function FeaturesPage() {
  return (
    <>
      <section className="bg-[#F8F9FB] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Tutto in uno
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-[#1A1A1A]">
            Funzionalità progettate per affitti e vendite
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Dalla pipeline agli allegati firmati, ogni modulo è connesso allo stesso database.
            Nessuna integrazione fragile, nessun doppio inserimento.
          </p>
        </div>
      </section>
      <FeatureGrid />
    </>
  );
}
