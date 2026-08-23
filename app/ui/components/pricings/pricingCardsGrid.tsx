"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CardOne from "./cards/cardOne";
import { CardsSkeleton } from "./cards/cardOneSkeleton";

type Offer = {
  title: string;
  price: string;
  imageSrc: string;
  features: readonly string[];
  level: 1 | 2 | 3 | 4;
};

type PricingCardsGridProps = {
  offers: readonly Offer[];
};

// Container : orchestre le décalage entre chaque enfant (0.55s).
// delayChildren : sans lui, la 1ère carte démarre à délai zéro — trop
// tôt pour que framer-motion ait le temps de peindre son état "caché"
// avant de basculer vers "visible", elle apparaît donc directement à
// sa position finale au lieu d'animer comme les autres.
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.55, delayChildren: 0.1 } },
};

// Chaque carte : fondu + léger glissement vers le haut. Durée (0.45s)
// volontairement plus courte que le délai entre cartes (0.55s) : sans
// ça, la carte précédente est encore en mouvement quand la suivante
// démarre le sien, ce qui donne une impression de saccade / double
// mouvement simultané plutôt qu'un vrai enchaînement l'une après
// l'autre. easeOut : départ franc, ralentit en douceur à l'arrivée.
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

// CardOne n'a pas besoin de savoir qu'il est préchargé : toute la
// logique vit ici. On charge les photos en JS (new Image()), sans les
// insérer dans le DOM, pour connaître le moment exact où elles sont
// toutes prêtes. Une fois CardOne rendu avec la même image, le
// navigateur la sert depuis son cache — pas de second téléchargement.
export default function PricingCardsGrid({ offers }: PricingCardsGridProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  // Sans ça, des photos locales/en cache chargent en quelques dizaines
  // de ms : le skeleton disparaîtrait avant qu'un cycle de reflet
  // (1.2s) ait le temps de se terminer, le coupant en plein passage.
  // 1300ms > 1.2s garantit qu'au moins un cycle complet se termine.
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    setLoadedCount(0);
    setMinTimeElapsed(false);

    const minTimer = setTimeout(() => setMinTimeElapsed(true), 1300);

    const images = offers.map((offer) => {
      const img = new Image();
      img.onload = () => setLoadedCount((c) => c + 1);
      // ne bloque pas indéfiniment si une image échoue à charger
      img.onerror = () => setLoadedCount((c) => c + 1);
      img.src = offer.imageSrc;
      return img;
    });

    return () => {
      clearTimeout(minTimer);
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [offers]);

  const allLoaded = loadedCount >= offers.length && minTimeElapsed;

  // mode="wait" : la sortie du skeleton (exit) doit se terminer
  // intégralement avant que l'entrée des vraies cartes ne commence —
  // c'est ce qui donne la continuité demandée plutôt qu'un simple
  // remplacement instantané.
  return (
    <AnimatePresence mode="wait">
      {!allLoaded ? (
        <motion.div
          key="skeleton"
          exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.4, ease: "easeOut" } }}
          className="flex flex-wrap items-center justify-center gap-10"
        >
          <CardsSkeleton count={offers.length} />
        </motion.div>
      ) : (
        <motion.div
          key="cards"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-10"
        >
          {offers.map((offer) => (
            <motion.div key={offer.title} variants={cardVariants}>
              <CardOne {...offer} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}