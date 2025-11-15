"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const currency = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const defaultCosts = {
  rents: 89,
  sales: 79,
  crm: 109,
  leads: 79,
};

export function SavingsCalculator() {
  const [costs, setCosts] = useState(defaultCosts);

  const totals = useMemo(() => {
    const sum = Object.values(costs).reduce((acc, value) => acc + Number(value || 0), 0);
    return {
      sum,
      savings: sum - 199,
    };
  }, [costs]);

  const fields = [
    { label: "Costo attuale Affitti", key: "rents" as const },
    { label: "Costo attuale Vendite", key: "sales" as const },
    { label: "Costo attuale CRM", key: "crm" as const },
    { label: "Costo Lead Platform", key: "leads" as const },
  ];

  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="calculator-heading">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Calcolatore
          </p>
          <h2 id="calculator-heading" className="mt-3 text-3xl font-semibold text-[#1A1A1A]">
            Calcola il risparmio immediato.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Inserisci i costi che stai sostenendo oggi e scopri quanto margin puoi recuperare
            passando a Tenant.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                <Input
                  id={field.key}
                  type="number"
                  min={0}
                  step={10}
                  value={costs[field.key]}
                  onChange={(event) =>
                    setCosts((prev) => ({
                      ...prev,
                      [field.key]: Number(event.target.value),
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <Card className="flex flex-col justify-between border border-primary/30 bg-[#F8F9FB] p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Risultato
            </p>
            <div className="mt-6 space-y-2 text-lg text-[#1A1A1A]">
              <div className="flex items-center justify-between">
                <span>Costo attuale</span>
                <strong>{currency.format(totals.sum)}</strong>
              </div>
              <div className="flex items-center justify-between text-primary">
                <span>Tenant</span>
                <strong>€199</strong>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-2xl bg-white px-6 py-5 text-center shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              Risparmio mensile stimato
            </p>
            <p className="mt-2 text-4xl font-semibold text-[#1A1A1A]">
              {currency.format(Math.max(totals.savings, 0))}
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
