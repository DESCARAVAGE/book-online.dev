import { getSitePhotos } from "@/app/lib/getPhoto/hero";
import LandingSectionClient from "./client";

const HERO_TAGS = ["hero-1", "hero-2", "hero-3"];

// Fallback temporaire : les anciennes photos locales, tant que les 3
// étiquettes ne sont pas toutes renseignées dans Supabase
// (site_photos). À supprimer de /public une fois la bascule confirmée
// — les garder ici indéfiniment annule l'intérêt de la migration
// (sécurité + poids du repo).
const FALLBACK_IMAGES = [
  "/744657735_2449638908862477_3520232296819307297_n.jpg",
  "/745621991_28183378918023659_7689868071902929136_n.jpg",
  "/747723307_1585445749963260_4212395155748312337_n.jpg",
];

export default async function LandingSection() {
  const photos = await getSitePhotos(HERO_TAGS);
  const images = HERO_TAGS.map((tag, i) => photos[tag] ?? FALLBACK_IMAGES[i]);

  return <LandingSectionClient images={images} />;
}