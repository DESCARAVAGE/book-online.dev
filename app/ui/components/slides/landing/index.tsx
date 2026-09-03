import { getSitePhotos } from "@/app/lib/getPhoto";
import LandingSectionClient from "./client";

// Fallback retiré : test réel de la bascule Supabase. Une étiquette
// pas encore renseignée dans site_photos donne simplement un tableau
// plus court (voire vide) plutôt que d'être masquée par une ancienne
// photo locale.
export default async function LandingSection() {
  const images = await getSitePhotos("hero");

  return <LandingSectionClient images={images} />;
}