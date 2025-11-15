import { featureCards } from "@/lib/copy";
import { Card } from "@/components/ui/card";

type FeatureGridProps = {
  title?: string;
  description?: string;
  id?: string;
};

export function FeatureGrid({
  title = "Funzionalità per agenzie esigenti",
  description = "Ogni modulo è progettato insieme ad agenzie che gestiscono sia locazioni che vendite.",
  id,
}: FeatureGridProps) {
  return (
    <section className="bg-white py-16 sm:py-20" id={id}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Funzionalità
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#1A1A1A]">
            {title}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featureCards.map((feature) => (
            <Card
              key={feature.title}
              className="h-full border border-border/60 bg-[#F8F9FB] p-6"
            >
              <h3 className="text-lg font-semibold text-[#1A1A1A]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
