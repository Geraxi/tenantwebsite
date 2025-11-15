"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitDemoRequest } from "@/app/demo/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const initialState = {
  status: "idle",
  message: "",
};

export function DemoForm() {
  const [state, formAction] = useFormState(submitDemoRequest, initialState);

  return (
    <form action={formAction} className="space-y-6 rounded-3xl border border-border/70 bg-white p-8 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Nome Agenzia" name="agency_name">
          <Input name="agency_name" id="agency_name" required placeholder="Es. Agenzia Blu" />
        </Field>
        <Field label="Nome Referente" name="contact_name">
          <Input name="contact_name" id="contact_name" required placeholder="Es. Marta Rossi" />
        </Field>
        <Field label="Email" name="email">
          <Input name="email" id="email" type="email" required placeholder="nome@azienda.it" />
        </Field>
        <Field label="Telefono" name="phone">
          <Input name="phone" id="phone" type="tel" placeholder="+39 333 1234567" />
        </Field>
        <Field label="Numero Agenti" name="agents">
          <Input name="agents" id="agents" type="number" min="1" max="500" required placeholder="10" />
        </Field>
      </div>
      <Field label="Messaggio" name="message">
        <Textarea
          name="message"
          id="message"
          rows={4}
          placeholder="Raccontaci il tuo processo attuale e cosa vuoi migliorare."
        />
      </Field>
      <div className="space-y-4">
        <SubmitButton />
        {state.status !== "idle" && (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              state.status === "success"
                ? "bg-primary/10 text-primary"
                : "bg-[#E24A4A]/10 text-[#E24A4A]"
            }`}
          >
            {state.message}
          </div>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {children}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full md:w-auto" disabled={pending}>
      {pending ? "Invio in corso..." : "Prenota una Demo"}
    </Button>
  );
}
