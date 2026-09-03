"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cinzel } from "@/app/ui/fonts";

type StepProps = {
  number: number;
  title: string;
  description: string;
  imageSrc?: string;
  /** true -> image à gauche, texte à droite (desktop). false/absent ->
      texte à gauche, image à droite. Sans imageSrc, ignoré : le step
      devient un bloc de texte seul, centré. */
  reverse?: boolean;
};

function StepHeading({ number, title }: { number: number; title: string }) {
  return (
    <h3 className={`${cinzel.className} text-2xl font-semibold text-foreground`}>
      {number}. {title}
    </h3>
  );
}

// Flexbox pur, pas de grid. Mobile : tout se centre (flex-col par
// défaut, items-center + text-center). Desktop (md:) : deux moitiés
// côte à côte, le texte toujours aligné à gauche DANS sa propre
// moitié (plus lisible, peu importe le côté de l'écran où il se
// trouve) ; reverse inverse quel côté reçoit l'image.
export default function Step({ number, title, description, imageSrc, reverse }: StepProps) {
  if (!imageSrc) {
    // Pas d'image (étape de clôture) : bloc de texte seul, centré en
    // desktop comme en mobile.
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-xl text-center"
      >
        <StepHeading number={number} title={title} />
        <p className="mt-3 text-gray-600 dark:text-gray-400">{description}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col items-center gap-8 md:gap-16 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="relative aspect-[4/5] w-full max-w-sm shrink-0 overflow-hidden rounded-md bg-foreground/10 md:w-1/2 md:max-w-none">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          className="object-cover"
        />
      </div>
      <div className="flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
        <StepHeading number={number} title={title} />
        <p className="mt-3 text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}