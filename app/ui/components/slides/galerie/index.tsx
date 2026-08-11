"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GalleryGrid from "./galerieGrid";
import PhotoModal from "./photoModal";
import { useModalBehavior } from "./useModalBelhavior";

// Le parent peut passer son propre tableau d'URLs via la prop `images`
const defaultImages = Array.from(
  { length: 12 },
  (_, i) => `https://picsum.photos/seed/gallery-${i + 1}/480/360`,
);

export default function GalleryCards({
  images = defaultImages,
  collectionHref = "/galerie",
}: {
  images?: string[];
  collectionHref?: string;
}) {
  // index de la photo actuellement ouverte dans la modal (null = fermée)
  const [selected, setSelected] = useState<number | null>(null);

  useModalBehavior(selected !== null, () => setSelected(null));

  return (
    <div className="m-5">
      <GalleryGrid images={images} onSelect={setSelected} />
      <PhotoModal
        src={selected !== null ? images[selected] : null}
        collectionHref={collectionHref}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}