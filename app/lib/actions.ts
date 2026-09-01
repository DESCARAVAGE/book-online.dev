"use server";

import { Resend } from "resend";
import ContactEmail from "./emails/contactEmail";
import { contactSchema, type ContactFormValues } from "@/app/ui/types/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

// onboarding@resend.dev fonctionne sans vérification de domaine — utile
// pour tester tout de suite. À remplacer par une adresse sur ton
// propre domaine (vérifié dans Resend, SPF+DKIM posés) avant la mise
// en prod, sinon les emails finissent en spam.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "contact@example.com";

// Une vraie personne met plus de temps que ça à remplir 3 champs.
const MIN_SUBMIT_TIME_MS = 1500;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

type ContactSubmission = ContactFormValues & {
  // Honeypot : un humain ne le remplit jamais (masqué en CSS, pas en
  // type="hidden" — certains bots savent repérer et éviter ce type).
  company: string;
  // Horodatage posé au rendu du formulaire côté client, pour détecter
  // une soumission trop rapide pour être humaine.
  renderedAt: number;
};

export async function sendContactMessage(
  input: ContactSubmission,
): Promise<ContactFormState> {
  // Honeypot rempli : probablement un bot. On répond "succès" sans
  // rien envoyer, pour ne jamais révéler qu'il a été détecté.
  if (input.company) {
    return { status: "success", message: "Message envoyé, merci !" };
  }

  // Revalidation serveur avec le même schéma que le client (partagé
  // via contactSchema.ts) : react-hook-form filtre déjà l'essentiel en
  // amont, donc un échec ici signifie presque toujours un appel direct
  // à l'action en contournant le formulaire — message volontairement
  // générique, le détail par champ est géré côté client.
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: "Merci de vérifier les informations saisies." };
  }

  // Soumis trop vite pour être humain : même traitement que le
  // honeypot, on ne révèle rien.
  if (Date.now() - input.renderedAt < MIN_SUBMIT_TIME_MS) {
    return { status: "success", message: "Message envoyé, merci !" };
  }

  try {
    await resend.emails.send({
      from: `Aesteria — Photographe <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      // Jamais l'email du visiteur en "from" (rejeté par DMARC) : il va
      // en reply-to, pour pouvoir répondre directement depuis ta boîte mail.
      replyTo: parsed.data.email,
      subject: `Nouveau message de ${parsed.data.name}`,
      react: ContactEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      }),
    });
  } catch (error) {
    console.error("Erreur d'envoi Resend :", error);
    return {
      status: "error",
      message: "Une erreur est survenue, réessayez dans un instant.",
    };
  }

  return { status: "success", message: "Message envoyé, merci !" };
}