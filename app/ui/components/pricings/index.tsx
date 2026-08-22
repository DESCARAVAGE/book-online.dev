import { cinzel } from "@/app/ui/fonts";
import CardOne from "@/app/ui/components/pricings/cards/cardOne";

// Données en dur pour l'instant (même logique que la galerie) : à
// remplacer plus tard par un fetch Supabase.
const offers = [
  {
    title: "PROLOGUE",
    price: "--- €",
    imageSrc: "/DSCF4496.jpg",
    features: ["30 minutes de séance", "4 photos retouchées"],
    aura: "dual",
  },
  {
    title: "ÉPOPÉE",
    price: "--- €",
    imageSrc: "/DSCF3773.jpg",
    features: ["1h de séance", "6 photos retouchées"],
    aura: "silver",
  },
  {
    title: "LÉGENDE",
    price: "--- €",
    imageSrc: "/DSCF8210.jpg",
    features: ["Journée complète", "60 photos retouchées", "Galerie en ligne", "Album photo relié"],
    aura: "gold",
  },
  {
    title: "MYTHIQUE",
    price: "--- €",
    imageSrc: "/DSCF1693.jpg",
    features: ["Journée complète", "60 photos retouchées", "Galerie en ligne", "Album photo relié"],
    aura: "rainbow",
  },
];

export default function Pricings() {
  return (
    <div className="flex flex-col items-center gap-14 px-6 py-20 text-center sm:px-10">
      {/* clip-path bouclier : défini une seule fois ici, référencé par
          toutes les cartes via clip-path: url(#shield-clip).
          clipPathUnits="objectBoundingBox" -> s'adapte automatiquement
          à la taille de chaque carte qui le référence (0 à 1 sur
          chaque axe), pas besoin de le dupliquer par carte. */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="shield-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 C1,0.15 1,0.35 0.9,0.55 C0.8,0.85 0.65,0.95 0.5,1 C0.35,0.95 0.2,0.85 0.1,0.55 C0,0.35 0,0.15 0,0 Z" />
          </clipPath>
        </defs>
      </svg>

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
  );
}
