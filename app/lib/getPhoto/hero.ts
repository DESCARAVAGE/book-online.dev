import { createClient } from "@/app/lib/supabase/server";

// Va chercher plusieurs photos du site en une seule requête (par leurs
// étiquettes), plutôt qu'un aller-retour par photo. Retourne un
// dictionnaire { tag: url } — les étiquettes pas encore renseignées
// dans Supabase sont simplement absentes du résultat : à chaque
// appelant de prévoir un fallback (voir landingSection.tsx).
export async function getSitePhotos(tags: string[]): Promise<Record<string, string>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_photos")
    .select("tag, image_url")
    .in("tag", tags);

  if (error || !data) {
    console.error("Erreur de récupération des photos du site :", error);
    return {};
  }

  return Object.fromEntries(data.map((row) => [row.tag, row.image_url]));
}