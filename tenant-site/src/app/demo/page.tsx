import type { Metadata } from "next";
import { DemoForm } from "@/components/forms/demo-form";

export const metadata: Metadata = {
  title: "Prenota una demo | Tenant CRM",
  description:
    "Compila il form per fissare una demo personalizzata di Tenant: gestione affitti, vendite, CRM e documenti in un’unica piattaforma.",
};

export default function DemoPage() {
  return (
    <div className="bg-[#F8F9FB] py-16 sm:py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 lg:flex-row">
        <div className="space-y-4 lg:w-5/12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Demo 1:1
          </p>
          <h1 className="text-4xl font-semibold text-[#1A1A1A]">
            Parla con un product specialist
          </h1>
          <p className="text-base text-muted-foreground">
            In 10 minuti analizziamo il tuo processo attuale, importiamo un esempio di proprietà e
            ti facciamo vedere come Tenant unifica affitti, vendite e CRM.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "Import guidato da Excel / PDF",
              "Dashboard pronta per affitti e vendite",
              "Documenti e lead integrati",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:flex-1">
          <DemoForm />
        </div>
      </div>
    </div>
  );
}
