import { separateToolsCosts } from "@/lib/copy";
import { Card } from "@/components/ui/card";

export function CostComparison() {
  return (
    <section className="bg-[#F8F9FB] py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        <Card className="border border-border/70 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Strumenti separati (tipici)
          </p>
          <ul className="mt-6 space-y-4 text-sm text-[#1A1A1A]">
            {separateToolsCosts.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between rounded-xl bg-[#F8F9FB] px-4 py-3"
              >
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground">{item.cost}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl bg-[#E24A4A]/10 px-4 py-3 text-sm font-semibold text-[#E24A4A]">
            💸 Totale: €220–350/mese
          </div>
        </Card>
        <Card className="border border-primary/30 bg-white p-6 shadow-lg shadow-primary/10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Tenant
          </p>
          <h3 className="mt-4 text-4xl font-semibold text-[#1A1A1A]">
            €199<span className="text-base font-medium text-muted-foreground"> / mese</span>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Tutto incluso: affitti, vendite, CRM, import, documenti e lead.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Tutto incluso",
              "Onboarding e formazione",
              "Supporto prioritario",
              "Aggiornamenti continui",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
            🎉 Risparmi fino al 40%
          </div>
        </Card>
      </div>
    </section>
  );
}
