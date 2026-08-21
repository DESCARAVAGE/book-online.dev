import type { ReactNode } from "react";
import { createClient } from "@/app/ui/lib/supabase/server";
import HeaderGal from "@/app/ui/components/header/header-gal";
import "../../ui/styles/globals.css";

type CollectionsLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

// Server Component (plus de "use client" : nécessaire pour pouvoir
// appeler Supabase ici). Ce layout est partagé par toutes les routes
// /collections/[slug] : Next.js ne le démonte pas à chaque navigation,
// seul `children` (le contenu de page.tsx) est remplacé.
export default async function CollectionsLayout({
  children,
  params,
}: CollectionsLayoutProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Liste de toutes les collections pour le sélecteur de HeaderGal :
  // récupérée ici, une seule fois par visite, plutôt que refetchée
  // à chaque changement de slug depuis page.tsx.
  const { data: allCollections } = await supabase
    .from("collections")
    .select("slug, title, is_private")
    .order("created_at", { ascending: false });

  return (
    <div className="">
      {/* <HeaderGal collections={allCollections ?? []} currentSlug={slug} /> */}
      {children}
    </div>
  );
}