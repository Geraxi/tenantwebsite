import { valueProps } from "@/lib/copy";
import { Card } from "@/components/ui/card";

export function ValuePropGrid() {
  return (
    <section
      className="bg-[#F8F9FB] py-16 sm:py-20"
      aria-labelledby="value-prop-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Perché Tenant
          </p>
          <h2
            id="value-prop-heading"
            className="mt-3 text-3xl font-semibold text-[#1A1A1A]"
          >
            Un’unica piattaforma al posto di 5 strumenti.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((item) => (
            <Card
              key={item.title}
              className="h-full border-none bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[#1A1A1A]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
