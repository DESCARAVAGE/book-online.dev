"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type MorePicsProps = {
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

// Masonry, même logique que GalleryGrid/CollectionGallery : ratio
// naturel conservé (paysage reste paysage, portrait reste portrait).
// Clic sur une miniature -> fait défiler SwiperComponent jusqu'à la
// photo correspondante. La photo actuellement affichée dans le Swiper
// est entourée d'un cadre noir.
export default function MorePics({ images, activeIndex, onSelect }: MorePicsProps) {
  return (
    <div className="columns-2 gap-4 p-6 sm:columns-3 md:columns-4 lg:columns-3">
      {images.map((src, i) => (
        <motion.div
          key={i}
          role="button"
          tabIndex={0}
          aria-current={i === activeIndex}
          onClick={() => onSelect(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(i);
            }
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
          className={`mb-4 w-full cursor-pointer break-inside-avoid rounded-xl p-1 transition-shadow duration-200 ${
            i === activeIndex ? "ring-4 ring-black" : ""
          }`}
        >
          <Image
            src={src}
            alt=""
            width={400}
            height={600}
            draggable={false}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            quality={90}
            className="h-auto w-full rounded-lg shadow-sm"
          />
        </motion.div>
      ))}
    </div>
  );
}