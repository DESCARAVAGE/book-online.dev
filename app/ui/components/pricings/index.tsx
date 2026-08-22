'use client'
import { cinzel } from "@/app/ui/fonts";
import { motion } from "framer-motion";
import CardOne from "@/app/ui/components/pricings/cards/cardOne";

// Données en dur pour l'instant (même logique que la galerie) : à
// remplacer plus tard par un fetch Supabase.
// `level` pilote la richesse du cadre ornemental (1 = sobre, 4 =
// complet), du moins cher au plus cher.
const offers = [
  {
    title: "PROLOGUE",
    price: "--- €",
    imageSrc: "/DSCF4496.jpg",
    features: ["30 minutes de séance", "4 photos retouchées"],
    level: 1,
  },
  {
    title: "ÉPOPÉE",
    price: "--- €",
    imageSrc: "/DSCF3773.jpg",
    features: ["1h de séance", "6 photos retouchées"],
    level: 2,
  },
  {
    title: "LÉGENDE",
    price: "--- €",
    imageSrc: "/DSCF8210.jpg",
    features: ["1h30", "10 photos retouchées"],
    level: 3,
  },
  {
    title: "MYTHIQUE",
    price: "--- €",
    imageSrc: "/DSCF1693.jpg",
    features: ["2h", "15 photos retouchées"],
    level: 4,
  },
] as const;

const title = "※ À ajouter en plus de la formule ※";
const tip1 = "± 1 personne supplémentaire : 30 €";
const tip2 = "⊚ 1 court vidéo entre 30 secondes et 1 minute : 90 €";

export default function Pricings() {
  return (
    <>
      <div className="flex flex-col items-center gap-14 px-6 py-20 text-center sm:px-10">
        <h1
          className={`${cinzel.className} text-3xl font-semibold text-foreground sm:text-4xl`}
        >
          Projettez-vous
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-10">
          {offers.map((offer) => (
            <CardOne key={offer.title} {...offer} />
          ))}
        </div>
      </div>
      <div className="w-full text-center">
        <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`${cinzel.className} text-4xl font-semibold tracking-tight sm:text-3xl md:text-2xl`}
      >{title}
      </motion.h1>
        <p>{tip1}</p>
        <p>{tip2}</p></div>
    </>
  );
}