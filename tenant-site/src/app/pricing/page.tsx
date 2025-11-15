import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tenantPlanBenefits } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Prezzi | Tenant CRM",
  description: "€199/mese, tutto incluso: affitti, vendite, CRM, documenti e lead con supporto dedicato.",
};

export default function PricingPage() {
  return (
    <div className="bg-[#F8F9FB] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Prezzo trasparente
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-[#1A1A1A]">
            €199/mese – Tutto incluso
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Nessun pacchetto nascosto. Tutta Tenant è disponibile dal primo giorno con onboarding personalizzato.
          </p>
        </div>
        <Card className="mt-10 border border-primary/30 bg-white p-10 shadow-lg shadow-primary/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Piano unico
              </p>
              <p className="mt-2 text-4xl font-semibold text-[#1A1A1A]">€199</p>
              <p className="text-sm text-muted-foreground">al mese, IVA esclusa</p>
            </div>
            <Button size="lg" asChild>
              <Link href="/demo">Prenota Demo</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {tenantPlanBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-base text-[#1A1A1A]">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {benefit}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
