"use client";

import { motion } from "framer-motion";
import { cinzel } from "@/app/ui/fonts";

// bg-secondary : le vert sombre déjà défini dans la charte graphique
// (--secondary), pas un vert Tailwind générique. text-white fixe (pas
// text-background, qui suit le thème et casserait le contraste en
// thème sombre) : ce bloc garde son fond sombre quel que soit le
// thème du site, comme l'overlay photo du recto des cartes tarifs.
export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="flex-1 rounded-md bg-secondary p-6 text-white sm:p-8"
    >
      <h3 className={`${cinzel.className} text-lg font-semibold`}>
        Médiateur — la personnalité INFP
      </h3>
      <p className="mt-2 text-sm text-white/80">
        Les Médiateurs sont des personnes poétiques, aimables et altruistes, toujours désireuses de
        soutenir une bonne cause.
      </p>
      <p className="mt-4 text-white/90">
        En tant que personnalité Médiatrice (INFP), mon empathie naturelle me permet de comprendre
        chacun pour adapter votre séance à vous, quelle que soit votre personnalité. Également
        guidée par ma sensibilité et mon authenticité, j&apos;utilise la mise en scène
        photographique pour donner vie à vos rêves et vos personnages intérieurs.
      </p>
      <p className="mt-4 text-white/90">
        Un shooting à mes côtés est un moment passé sans aucun jugement et dans une écoute absolue
        de vos attentes et émotions.
      </p>
    </motion.div>
  );
}