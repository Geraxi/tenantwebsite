"use server";

import { createSupabaseServerClient } from "@/lib/supabase";

type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitDemoRequest(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const agencyName = String(formData.get("agency_name") || "").trim();
  const contactName = String(formData.get("contact_name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const agentsValue = Number(formData.get("agents") || 0);
  const message = String(formData.get("message") || "").trim();

  if (!agencyName || !contactName || !email || !agentsValue) {
    return {
      status: "error",
      message: "Compila tutti i campi obbligatori prima di inviare la richiesta.",
    };
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("demo_requests").insert({
      agency_name: agencyName,
      contact_name: contactName,
      email,
      phone,
      agents: agentsValue,
      message,
    });

    if (error) {
      throw error;
    }

    return {
      status: "success",
      message: "Grazie! Ti ricontatteremo entro 24 ore per fissare la demo.",
    };
  } catch (error) {
    console.error("Supabase insert error", error);
    return {
      status: "error",
      message:
        "Si è verificato un problema con l’invio. Riprova oppure scrivi a info@tenantapp.it.",
    };
  }
}
