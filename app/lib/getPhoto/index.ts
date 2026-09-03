import { createClient } from "@/app/lib/supabase/server";

// Récupère les photos d'une section (hero, pricing_card,
// resume_shooting, about), déjà triées par position. Retourne un
// tableau vide si la section n'a pas encore de photo — à chaque
// appelant de prévoir un fallback ou un filtrage d'affichage.
export async function getSitePhotos(section: string): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_photos")
    .select("image_url")
    .eq("section", section)
    .order("position", { ascending: true });

  if (error || !data) {
    console.error(`Erreur de récupération des photos (section: ${section}) :`, error);
    return [];
  }

  return data.map((row) => row.image_url);
}