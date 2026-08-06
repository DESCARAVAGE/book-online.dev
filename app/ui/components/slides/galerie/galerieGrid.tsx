"use client";

import { motion } from "framer-motion";

type GalleryGridProps = {
  images: string[];
  onSelect: (index: number) => void;
};

// Grille responsive de photos cliquables, avec apparition en cascade au scroll
// Mobile: 1 colonne | sm: 2 colonnes | lg: 3 colonnes | xl: 4 colonnes
export default function GalleryGrid({ images, onSelect }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt=""
          draggable={false}
          onClick={() => onSelect(i)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            delay: (i % 4) * 0.1,
            ease: "easeOut",
          }}
          className="aspect-[4/3] w-full cursor-pointer select-none rounded-2xl object-cover shadow-md"
        />
      ))}
    </div>
  );
}