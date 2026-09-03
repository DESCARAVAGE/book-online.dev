"use client";

import { motion } from "framer-motion";
import { cinzel } from "@/app/ui/fonts";

const TIMELINE = [
  {
    title: "Directrice artistique plurimédias",
    place: "Le Cercle digital",
    period: "2026 (2 ans)",
  },
  {
    title: "Mastère audiovisuel et digital content",
    place: "Le Cercle digital",
    period: "2026 (2 ans)",
  },
  {
    title: "Bachelor communication et webmarketing",
    place: "IST Pigier Tours",
    period: "2024 (1 an)",
  },
  {
    title: "DUT InfoCom, information numérique des organisations",
    place: "IUT de Tours",
    period: "2023 (2 ans)",
  },
  {
    title: "BAC général (spécialités LLCE anglais, SES)",
    place: "Lycée Jean-Moulin",
    period: "2021",
  },
];

// h-full + flex-col + justify-between sur la liste : les entrées se
// répartissent sur toute la hauteur disponible (donnée par le parent
// via items-stretch, voir about/index.tsx), au lieu de rester collées
// en haut avec du vide en dessous.
export default function Parcours() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="flex h-full flex-col rounded-md border border-foreground/15 p-6 sm:p-8"
    >
      <h3 className={`${cinzel.className} mb-6 text-lg font-semibold text-foreground`}>
        Mon parcours
      </h3>
      <ul className="flex flex-1 flex-col justify-between gap-6 border-l border-foreground/20 pl-5">
        {TIMELINE.map((item) => (
          <li key={item.title} className="relative">
            <span className="absolute -left-[1.45rem] top-1.5 h-2.5 w-2.5 rotate-45 bg-foreground" />
            <p className="font-medium text-foreground">{item.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.place} · {item.period}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}