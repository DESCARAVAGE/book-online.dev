"use client";

import { motion } from "framer-motion";
import CollectionsSlider from "./collectionsSlider";
import type { Collection } from "./collectionCard";

// Le parent peut passer son propre tableau de collections via la prop `collections`
const defaultCollections: Collection[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/seed/collection-${i + 1}/480/360`,
  title: `Collection ${i + 1}`,
  href: "/galerie",
}));

export default function CollectionsScroll({
  collections = defaultCollections,
}: {
  collections?: Collection[];
}) {
  return (
    <section className="mx-2 rounded-xl bg-neutral-400 py-10">
      {/* conteneur centré : le fond reste en pleine largeur,
          seul le contenu (titre + slider) est limité et centré */}
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="px-6 pb-6 text-3xl font-semibold text-white sm:px-10"
        >
          Découvrez mes collections
        </motion.h2>

        <CollectionsSlider collections={collections} />
      </div>
    </section>
  );
}