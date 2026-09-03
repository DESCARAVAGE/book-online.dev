"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { cinzel } from "@/app/ui/fonts";
import PricingCardsGrid from "./pricingCardsGrid";
import { CardsSkeleton } from "./cards/cardOneSkeleton";

type Offer = {
  title: string;
  price: string;
  imageSrc: string;
  features: readonly string[];
  level: 1 | 2 | 3 | 4;
};

type PricingsClientProps = {
  offers: readonly Offer[];
};

const tipsTitle = "※ À ajouter en plus de la formule ※";
const tip1 = "± 1 personne supplémentaire : 30 €";
const tip2 = "⊚ 1 courte vidéo entre 30 secondes et 1 minute : 90 €";

export default function PricingsClient({ offers }: PricingsClientProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-14 px-6 py-20 text-center sm:px-10">
        <h1
          className={`${cinzel.className} text-3xl font-semibold text-foreground sm:text-4xl`}
        >
          Projettez-vous
        </h1>

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