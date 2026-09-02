"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cinzel } from "@/app/ui/fonts";
import { sendContactMessage, type ContactFormState } from "@/app/lib/actions";
import { contactSchema, type ContactFormValues } from "@/app/ui/types/contact";

// id="contact" : cible du CTA depuis la page pricings et du scroll
// animé (voir about/index.tsx).
export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ContactFormState | null>(null);

  // Honeypot et horodatage : volontairement hors de react-hook-form
  // (ils ne doivent jamais être validés ni bloquer l'envoi), lus
  // directement au moment de la soumission.
  const honeypotRef = useRef<HTMLInputElement>(null);
  const renderedAtRef = useRef(Date.now());

  // Le message de succès disparaît après 10s plutôt que de rester
  // affiché indéfiniment.
  useEffect(() => {
    if (result?.status !== "success") return;
    const timer = setTimeout(() => setResult(null), 10_000);
    return () => clearTimeout(timer);
  }, [result]);

  const onValid = (data: ContactFormValues) => {
    startTransition(async () => {
      const response = await sendContactMessage({
        ...data,
        company: honeypotRef.current?.value ?? "",
        renderedAt: renderedAtRef.current,
      });
      setResult(response);
      if (response.status === "success") {
        reset();
      }
    });
  };

  return (
    <section id="form" className="flex flex-col items-center gap-10 px-6 py-20 sm:px-10">
      <h2
        className={`${cinzel.className} text-center text-3xl font-semibold text-foreground sm:text-4xl`}
      >
        Parlons de votre projet
      </h2>

      {/* noValidate : react-hook-form gère toute la validation et son
          affichage — sans ça, le navigateur afficherait AUSSI ses
          propres bulles natives (celles qu'on cherche justement à
          remplacer) en plus des messages de react-hook-form. */}
      <form
        onSubmit={handleSubmit(onValid)}
        noValidate
        className="flex w-full max-w-xl flex-col gap-4"
      >
        {/* Honeypot : un champ d'apparence normale pour un bot, mais
            masqué visuellement (pas type="hidden", que certains bots
            savent repérer et éviter) et retiré de l'ordre de tabulation
            pour un humain au clavier. */}
        <div aria-hidden="true" className="absolute -left-[9999px] opacity-0">
          <label htmlFor="company">Ne pas remplir ce champ</label>
          <input type="text" id="company" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full">
            <input
              type="text"
              placeholder="Votre nom"
              {...register("name")}
              className="w-full rounded-md border border-foreground/20 bg-transparent px-4 py-3 text-foreground placeholder:text-gray-500 focus:border-foreground/40 focus:outline-none"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Votre email"
              {...register("email")}
              className="w-full rounded-md border border-foreground/20 bg-transparent px-4 py-3 text-foreground placeholder:text-gray-500 focus:border-foreground/40 focus:outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <textarea
            placeholder="Parlez-moi de votre projet..."
            rows={6}
            {...register("message")}
            className="w-full resize-none rounded-md border border-foreground/20 bg-transparent px-4 py-3 text-foreground placeholder:text-gray-500 focus:border-foreground/40 focus:outline-none"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 cursor-pointer rounded-full bg-foreground px-8 py-3 font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Envoi..." : "Envoyer"}
        </button>

        {result?.status === "success" && (
          <p className="text-center text-sm text-green-600 dark:text-green-400">
            {result.message}
          </p>
        )}
        {result?.status === "error" && (
          <p className="text-center text-sm text-red-500">{result.message}</p>
        )}
      </form>
    </section>
  );
}