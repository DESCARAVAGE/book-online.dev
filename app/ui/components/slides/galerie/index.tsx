"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Galerie responsive de photos cliquables (ouvrent une modal de zoom)
// Mobile: 1 colonne | sm: 2 colonnes | lg: 3 colonnes | xl: 4 colonnes
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

  // fermer avec Échap + bloquer le scroll de la page pendant que la modal est ouverte
  useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div className="m-5">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-black"
      >
        Phrase d'accroche - Aesteria la goat
      </motion.p>

      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt=""
            draggable={false}
            onClick={() => setSelected(i)}
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

      {/* modal de zoom sur la photo cliquée */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-full flex-col items-center gap-4"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                className="absolute -top-10 right-0 text-3xl text-white transition hover:opacity-70"
              >
                ×
              </button>

              <img
                src={images[selected]}
                alt=""
                className="h-[65vh] w-[65vw] rounded-2xl object-contain shadow-lg"
              />

              <Link
                href={collectionHref}
                className="rounded-full bg-white px-6 py-2 text-sm font-medium text-gray-900 shadow-md transition hover:bg-gray-100"
              >
                Voir la collection
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}