import { createClient } from "@/app/ui/lib/supabase/server";
import CollectionsSlider from "./collectionsSlider";
import type { Collection } from "./collectionCard";

// Server Component asynchrone : va chercher les collections + leur
// première photo directement depuis Supabase, côté serveur.
export default async function CollectionsScroll() {
  const supabase = await createClient();

  const { data: collections, error } = await supabase
    .from("collections")
    .select("id, title, slug, is_private, photos(image_url, position)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur de chargement des collections :", error.message);
  }

  const items: Collection[] = (collections ?? []).map((c) => ({
    id: c.id,
    title: c.title,
    href: `/collections/${c.slug}`, // à affiner plus tard avec c.slug
    image: c.photos?.[0]?.image_url ?? "/placeholder.jpg",
    isPrivate: c.is_private,
  }));

  return (
    <section className="mx-2 rounded-xl bg-neutral-400 py-10">
      {/* conteneur centré : le fond reste en pleine largeur,
          seul le contenu (titre + slider) est limité et centré */}
      <div className="mx-auto max-w-7xl">
        <CollectionsSlider
          title="Découvrez mes collections"
          collections={items}
        />
      </div>
    </section>
  );
}