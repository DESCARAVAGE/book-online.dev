"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CollectionCard, { type Collection } from "./collectionCard";

type CollectionsSliderProps = {
  title: string;
  collections: Collection[];
};

// Le titre est animé ici (et non dans index.tsx) car index.tsx devient
// un Server Component asynchrone pour aller chercher les données —
// or framer-motion ne peut s'utiliser que dans un Client Component.
export default function CollectionsSlider({
  title,
  collections,
}: CollectionsSliderProps) {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="px-6 pb-6 text-3xl font-semibold text-white sm:px-10"
      >
        {title}
      </motion.h2>

      {/* le padding est ici, sur un div englobant, et non sur le Swiper
          lui-même : le CSS natif de Swiper force "padding: 0" sur .swiper
          et écraserait un px-* posé directement dessus */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="px-6 sm:px-10"
      >
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4.2 },
          }}
          // variable CSS officielle de Swiper pour la couleur des flèches :
          // plus fiable qu'une classe Tailwind, qui entrerait en conflit
          // avec le CSS natif de .swiper-button-next/prev
          style={{ "--swiper-navigation-color": "#ffffff" } as CSSProperties}
        >
          {collections.map((collection) => (
            <SwiperSlide key={collection.id} className="h-auto">
              <CollectionCard {...collection} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </>
  );
}