"use client";

import { motion } from "framer-motion";

type MorePicsProps = {
  images: string[];
};

// Grille de toutes les photos de la collection.
// TODO (sync futur) : au clic sur une miniature, faire défiler
// SwiperComponent jusqu'à la photo correspondante.
export default function MorePics({ images }: MorePicsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4">
      {images.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt=""
          draggable={false}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
          className="aspect-square w-full rounded-xl object-cover shadow-sm"
        />
      ))}
    </div>
  );
}