import { notFound } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import HeaderGal from "@/app/ui/components/header/header-gal";
import CollectionViewer from "@/app/ui/components/slides/collections/collectionViewer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // deux requêtes en parallèle : la collection demandée + la liste de
  // toutes les collections (pour le sélecteur dans HeaderGal)
  const [{ data: collection }, { data: allCollections }] = await Promise.all([
    supabase
      .from("collections")
      .select("id, title, is_private, photos(image_url, position)")
      .eq("slug", slug)
      .single(),
    supabase
      .from("collections")
      .select("slug, title")
      .order("created_at", { ascending: false }),
  ]);

  if (!collection) {
    notFound();
  }

  // ⚠️ is_private ne restreint encore rien réellement (cf. décision
  // précédente) : uniquement un style différent sur les cards.
  const images = (collection.photos ?? [])
    .sort((a, b) => a.position - b.position)
    .map((p) => p.image_url);

  return (
    <main>
      <HeaderGal collections={allCollections ?? []} currentSlug={slug} />
      <CollectionViewer images={images} />
    </main>
  );
}