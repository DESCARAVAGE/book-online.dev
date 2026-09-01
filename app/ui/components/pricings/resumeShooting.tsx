"use client";

import { motion } from "framer-motion";
import { cinzel } from "@/app/ui/fonts";
import Step from "./step";

// Données en dur pour l'instant (même logique que les offres) : à
// remplacer par les vraies photos plus tard. reverse alterne quel côté
// reçoit l'image d'une étape à l'autre. L'étape 4 n'a pas de photo :
// c'est volontaire (clôture, bloc centré — voir Step).
//
// picsum.photos/seed/... : une seed donnée renvoie toujours la même
// image (contrairement à loremflickr, essayé puis abandonné — change
// de photo à chaque chargement ET certaines portent un filigrane/pseudo
// Flickr intégré à l'image, inutilisable tel quel sur le site).
const steps = [
  {
    number: 1,
    title: "Prenons contact",
    description:
      "Racontez-moi votre projet, vos envies, le lieu qui vous inspire : c'est le point de départ pour cadrer ensemble la séance qui vous ressemble.",
    imageSrc: "https://picsum.photos/seed/session-contact/600/750",
    reverse: false,
  },
  {
    number: 2,
    title: "Réserve ta date",
    description:
      "Une fois les grandes lignes posées, on fixe une date. Elle vous est exclusivement réservée.",
    imageSrc: "https://picsum.photos/seed/session-date/600/750",
    reverse: true,
  },
  {
    number: 3,
    title: "Jour du shooting",
    description:
      "Pas d'inquiétude si vous n'êtes pas à l'aise devant l'objectif : je vous guide du début à la fin, à votre rythme.",
    imageSrc: "https://picsum.photos/seed/session-shooting/600/750",
    reverse: false,
  },
  {
    number: 4,
    title: "Reçois tes meilleurs clichés",
    description:
      "Après une sélection et une retouche soignées, vous recevez une galerie en ligne privée avec vos plus belles photos.",
  },
];

const additionalInfo = [
  {
    title: "Zone Géographique",
    text: "Basée principalement à Tours et ponctuellement en dans le Cher.",
  },
  {
    title: "Transports & Déplacements",
    text: "Les séances sont réalisées sur des spots plutôt accessibles en transports en commun. Tout déplacement au-delà de cette zone couverte fait l'objet d'un forfait kilométrique / transport convenu à l'avance.",
  },
  {
    title: "Tenues & Maquillage ",
    text: "Je mets à disposition certains accessoires et tenues selon les collections du moment.",
  },
];

export default function ResumeShooting() {
  return (
    <div className="flex flex-col items-center gap-16 px-6 py-20 sm:px-10">
      <h2
        className={`${cinzel.className} text-center text-3xl font-semibold text-foreground sm:text-4xl`}
      >
        Comment se déroule votre séance ?
      </h2>

      <div className="flex w-full max-w-6xl flex-col gap-20">
        {steps.map((step) => (
          <Step key={step.number} {...step} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl rounded-md border border-foreground/15 p-8"
      >
        <h3
          className={`${cinzel.className} mb-6 text-center text-lg font-semibold text-foreground`}
        >
          Informations supplémentaires
        </h3>
        {/* flex, pas grid : sur mobile, grid (sans colonnes explicites
            avant sm:) empilait les 3 blocs en une colonne. flex-wrap
            les laisse se répartir en ligne(s) dès le mobile.
            lg: (pas sm:) pour repasser en rangée unique : à 220px de
            large chacun + 2 gaps de 24px, il faut ~708px disponibles
            pour les 3 côte à côte — sm: (640px) bascule bien avant
            d'avoir cette place une fois les paddings retirés (déborde
            dès 641px), lg: (1024px) laisse ~832px de marge réelle. */}
        <div className="flex flex-wrap justify-center gap-6 text-center lg:flex-nowrap lg:justify-between lg:text-left">
          {additionalInfo.map((info) => (
            <div key={info.title} className="min-w-[220px] flex-1 basis-56">
              <h4 className="text-sm font-semibold text-foreground">{info.title}</h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{info.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}