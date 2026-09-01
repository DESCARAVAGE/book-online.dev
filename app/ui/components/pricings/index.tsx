"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { cinzel } from "@/app/ui/fonts";
import PricingCardsGrid from "./pricingCardsGrid";
import { CardsSkeleton } from "./cards/cardOneSkeleton"; 

// Données en dur pour l'instant (même logique que la galerie) : à
// remplacer plus tard par un fetch Supabase.
// `level` pilote la richesse du cadre ornemental (1 = sobre, 4 =
// complet), du moins cher au plus cher.
const offers = [
  {
    title: "PROLOGUE",
    price: "--- €",
    imageSrc: "/DSCF3417.jpg",
    features: ["30 minutes de séance", "4 photos retouchées"],
    level: 1,
  },
  {
    title: "ÉPOPÉE",
    price: "--- €",
    imageSrc: "/DSCF1147.jpg",
    features: ["1h de séance", "6 photos retouchées"],
    level: 2,
  },
  {
    title: "LÉGENDE",
    price: "--- €",
    imageSrc: "/DSCF4833.jpg",
    features: ["1h30", "10 photos retouchées"],
    level: 3,
  },
  {
    title: "MYTHE",
    price: "--- €",
    imageSrc: "/DSCF1693.jpg",
    features: ["2h", "15 photos retouchées"],
    level: 4,
  },
] as const;

const tipsTitle = "※ À ajouter en plus de la formule ※";
const tip1 = "± 1 personne supplémentaire : 30 €";
const tip2 = "⊚ 1 courte vidéo entre 30 secondes et 1 minute : 90 €";

export default function Pricings() {
  return (
    <>
      <div className="flex flex-col items-center gap-14 px-6 py-20 text-center sm:px-10">
        <h1
          className={`${cinzel.className} text-3xl font-semibold text-foreground sm:text-4xl`}
        >
          Projettez-vous
        </h1>

        {/* Suspense n'a rien à faire tant que `offers` est en dur (pas
            d'await ici, donc jamais de vraie suspension) — mais c'est la
            bonne place pour plus tard, quand `offers` viendra d'un fetch
            Supabase côté serveur. Le vrai chargement géré aujourd'hui
            (photos + skeleton + cascade) vit dans PricingCardsGrid,
            côté client, puisqu'il s'agit du chargement d'images par le
            navigateur — Suspense ne peut pas intercepter ça. */}
        <Suspense
          fallback={
            <div className="flex flex-wrap items-center justify-center gap-10">
              <CardsSkeleton count={offers.length} />
            </div>
          }
        >
          <PricingCardsGrid offers={offers} />
        </Suspense>
      </div>

      <div className="w-full pb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${cinzel.className} mb-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl`}
        >
          {tipsTitle}
        </motion.h1>
        <p className="text-foreground">{tip1}</p>
        <p className="text-foreground">{tip2}</p>
      </div>
    </>
  );
}
