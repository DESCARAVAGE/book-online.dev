import { z } from "zod";

// Partagé entre ContactSection (validation client via react-hook-form)
// et actions.ts (revalidation serveur, obligatoire — la validation
// client reste un confort UX, jamais une garantie : n'importe qui peut
// appeler la Server Action directement sans passer par ce formulaire).
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom est trop court.").max(100),
  email: z.string().trim().email("Adresse email invalide."),
  message: z.string().trim().min(10, "Le message est trop court.").max(5000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;