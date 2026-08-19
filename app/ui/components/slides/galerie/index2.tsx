"use client";

import { motion } from "framer-motion";
import { cinzel } from "@/app/ui/fonts";
import PhotoFrame from "@/app/ui/components/elements/photoFrame";

// Placeholders en attendant de vraies photos (même logique que
// GalleryCards) : passe `images` en prop pour les remplacer.
const defaultImages = Array.from(
  { length: 4 },
  (_, i) => `https://picsum.photos/seed/galerie-ornee-${i + 1}/500/650`,
);

type GalProps = {
  images?: string[];
};

// h-[35vh] retiré : une grille de photos a besoin de sa hauteur
// naturelle, pas d'une hauteur d'écran fixe (qui allait soit couper
// les photos, soit les écraser selon leur nombre).
export default function Gal({ images = defaultImages }: GalProps) {
  return (
    <div className="flex flex-col items-center gap-10 px-6 py-20 text-center sm:px-10">
      <h2
        className={`${cinzel.className} text-3xl font-semibold text-foreground sm:text-4xl`}
      >
        Galerie
      </h2>

      <div className="grid w-full max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
        {images.map((src, i) => (
          <PhotoFrame key={i} className="text-foreground">
            <motion.img
              src={src}
              alt=""
              draggable={false}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              className="aspect-[3/4] w-full rounded-sm object-cover"
            />
          </PhotoFrame>
        ))}
      </div>
    </div>
  );
}