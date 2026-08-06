"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export type Collection = {
  id: string | number;
  image: string;
  title: string;
  href?: string;
};

const defaultCollections: Collection[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/seed/collection-${i + 1}/480/360`,
  title: `Collection ${i + 1}`,
  href: "/galerie",
}));

function CollectionCard({ image, title, href = "/galerie" }: Collection) {
  return (
    <a
      href={href}
      className="group relative block h-72 w-full overflow-hidden rounded-2xl shadow-md sm:h-80"
    >
      <img
        src={image}
        alt={title}
        draggable={false}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <span className="absolute bottom-4 left-4 text-lg font-semibold text-white">
        {title}
      </span>
    </a>
  );
}

export default function CollectionsScroll({
  collections = defaultCollections,
}: {
  collections?: Collection[];
}) {
  return (
    <section className="bg-neutral-400 py-10 mx-2 rounded-xl">
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
      </div>
    </section>
  );
}