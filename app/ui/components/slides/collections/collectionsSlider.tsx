"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CollectionCard, { type Collection } from "./collectionCard";

type CollectionsSliderProps = {
  collections: Collection[];
};

// Slider Swiper des collections, avec sa propre animation d'apparition au scroll
export default function CollectionsSlider({
  collections,
}: CollectionsSliderProps) {
  return (
    // le padding est ici, sur un div englobant, et non sur le Swiper
    // lui-même : le CSS natif de Swiper force "padding: 0" sur .swiper
    // et écraserait un px-* posé directement dessus
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
  );
}