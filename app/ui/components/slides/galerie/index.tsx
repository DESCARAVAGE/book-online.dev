import Link from "next/link";
import React from "react";

// Galerie responsive de photos non-cliquables
// Mobile: 1 colonne | sm: 2 colonnes | lg: 3 colonnes | xl: 4 colonnes
// Le parent peut passer son propre tableau d'URLs via la prop `images`

const defaultImages = Array.from(
  { length: 12 },
  (_, i) => `https://picsum.photos/seed/gallery-${i + 1}/480/360`,
);

export default function GalleryCards({ images = defaultImages }) {
  return (
    <div className="m-5">
      <div>
        <p className="text-black text-center">
          Phrase d'accroche - Aesteria la goat
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            className="aspect-[4/3] w-full cursor-default select-none rounded-2xl object-cover shadow-md"
          />
        ))}
      </div>
    </div>
  );
}
