"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cinzel } from "@/app/ui/fonts";
import PhotoFrame from "@/app/ui/components/elements/photoFrame";
import PhotoModal from "./photoModal";
import { useModalBehavior } from "./useModalBelhavior";
import HeaderOrnament from "./headerOrnement";
import FooterOrnament from "./footerOrnement";

const PAGE_SIZE = 12;
const TOTAL_PHOTOS = 48;

// Données en dur pour l'instant, structurées pour être remplacées
// facilement par un fetch Supabase paginé plus tard :
// - allImages -> deviendra le résultat d'un .range(offset, offset + PAGE_SIZE - 1)
// - loadMore() -> deviendra un appel réseau (async) au lieu d'un simple +12
// Le reste (visibleCount, hasMore, la modal) ne changera pas.
const allImages = Array.from(
  { length: TOTAL_PHOTOS },
  (_, i) => `https://picsum.photos/seed/galerie-ornee-${i + 1}/500/650`,
);

export default function Gal() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<number | null>(null);

  useModalBehavior(selected !== null, () => setSelected(null));

  const visibleImages = allImages.slice(0, visibleCount);
  const hasMore = visibleCount < allImages.length;

  function loadMore() {
    setVisibleCount((count) => Math.min(count + PAGE_SIZE, allImages.length));
  }

  return (
    // Plus de gap-10 uniforme : un seul gap imposait le même
    // espacement à toutes les paires d'éléments, impossible de
    // rapprocher juste les ornements de la grille sans tout resserrer.
    // Chaque espacement est maintenant une marge individuelle.
    <div className="flex flex-col items-center px-6 py-20 text-center sm:px-10">
      <h2
        className={`${cinzel.className} mb-6 text-3xl font-semibold text-foreground sm:text-4xl`}
      >
        Galerie
      </h2>

      {/* mb-3 : rapproché de la grille juste en dessous */}
      <HeaderOrnament className="mb-3 h-auto w-full max-w-xl text-foreground" />

      {/* relative : sert d'ancrage au bouton "Plus de photos" superposé */}
      <div className="relative w-full max-w-5xl">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {visibleImages.map((src, i) => (
            <PhotoFrame key={i} className="text-foreground">
              <motion.img
                src={src}
                alt=""
                draggable={false}
                onClick={() => setSelected(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                className="aspect-[3/4] w-full cursor-pointer rounded-sm object-cover"
              />
            </PhotoFrame>
          ))}
        </div>

        {hasMore && (
          // pointer-events-none : le dégradé ne doit pas bloquer les clics
          // sur les photos qu'il survole, seul le bouton doit rester cliquable.
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-32 items-end justify-center bg-gradient-to-t from-background to-transparent pb-4">
            <button
              type="button"
              onClick={loadMore}
              className="pointer-events-auto cursor-pointer rounded-full bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-600 shadow-md transition hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
            >
              Plus de photos
            </button>
          </div>
        )}
      </div>

      {/* mt-3 : symétrique avec le mb-3 du dessus, pied collé à la grille */}
      <FooterOrnament className="mt-3 h-auto w-full max-w-xl text-foreground" />

      <PhotoModal
        src={selected !== null ? visibleImages[selected] : null}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}