import { howItWorksSteps } from "@/lib/copy";
import { Card } from "@/components/ui/card";

export function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Come funziona
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#1A1A1A]">
            Inizia oggi, operativo domani.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <Card key={step.title} className="h-full border border-border/60 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-[#1A1A1A]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
