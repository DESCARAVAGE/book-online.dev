"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type Collection = {
  id: string | number;
  image: string;
  title: string;
  href?: string;
};

// Remplace par tes vraies collections, ou passe la prop `collections`
const defaultCollections: Collection[] = Array.from({ length: 8 }, (_, i) => ({
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
  const targetRef = useRef<HTMLDivElement>(null); // section qui pilote le scroll
  const viewportRef = useRef<HTMLDivElement>(null); // bloc sticky visible
  const trackRef = useRef<HTMLDivElement>(null); // rangée de cards (ce qui translate)

  // distance exacte (en px) à parcourir pour que la dernière card arrive au bord
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const updateDistance = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = viewportRef.current.offsetWidth;
      setScrollDistance(Math.max(trackWidth - viewportWidth, 0));
    };

    updateDistance();
    window.addEventListener("resize", updateDistance);
    return () => window.removeEventListener("resize", updateDistance);
  }, [collections]);

  // scrollYProgress va de 0 à 1 pendant que la section traverse le viewport
  const { scrollYProgress } = useScroll({ target: targetRef });

  // translation horizontale calculée sur la vraie largeur du contenu :
  // à progress = 1, la dernière card est exactement au bord du viewport
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    // section délimitée : background
    <div className="bg-neutral-400">
      {/* la hauteur de cette section définit la distance de scroll disponible
          pour faire défiler les cards horizontalement (à ajuster selon leur nombre) */}
      <section ref={targetRef} className="relative h-[200vh]">
        {/* titre + cards regroupés dans le MEME bloc sticky :
            ils restent fixés ensemble à l'écran pendant tout le scroll horizontal */}
        <div
          ref={viewportRef}
          className="sticky top-0 flex h-screen flex-col justify-center gap-8 overflow-hidden"
        >
          <h2 className="px-6 text-3xl font-semibold text-white sm:px-10">
            Découvrez mes collections
          </h2>

          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 px-6 sm:px-10"
          >
            {collections.map((collection) => (
              <a
                key={collection.id}
                href={collection.href ?? "/galerie"}
                className="group relative block h-72 w-56 shrink-0 overflow-hidden rounded-2xl shadow-md sm:h-80 sm:w-64"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-lg font-semibold text-white">
                  {collection.title}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
