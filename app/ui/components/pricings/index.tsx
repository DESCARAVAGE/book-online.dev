import { getSitePhotos } from "@/app/lib/getPhoto/index";
import PricingsClient from "./pricingsClient";

// Texte et paliers en dur pour l'instant (pas concernés par cette
// migration, seules les photos viennent de Supabase). `level` pilote
// la richesse du cadre ornemental (1 = sobre, 4 = complet).
const OFFER_DEFS = [
  {
    title: "PROLOGUE",
    price: "--- €",
    features: ["30 minutes de séance", "4 photos retouchées"],
    level: 1,
  },
  {
    title: "ÉPOPÉE",
    price: "--- €",
    features: ["1h de séance", "6 photos retouchées"],
    level: 2,
  },
  {
    title: "LÉGENDE",
    price: "--- €",
    features: ["1h30", "10 photos retouchées"],
    level: 3,
  },
  {
    title: "MYTHE",
    price: "--- €",
    features: ["2h", "15 photos retouchées"],
    level: 4,
  },
] as const;

// Placeholder générique (pas l'ancienne photo lourde) si une position
// n'est pas encore renseignée dans site_photos : visuellement évident
// que cette carte attend encore sa photo, sans jamais planter.
const PLACEHOLDER_IMAGE = "https://picsum.photos/seed/pricing-placeholder/600/800";

export default async function Pricings() {
  const photos = await getSitePhotos("pricing_card");
  const offers = OFFER_DEFS.map((offer, i) => ({
    ...offer,
    imageSrc: photos[i] ?? PLACEHOLDER_IMAGE,
  }));

  return <PricingsClient offers={offers} />;
}