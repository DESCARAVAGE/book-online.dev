"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type AboutPhotoProps = {
  src?: string;
};

// Photo de la section À propos : à gauche sur desktop, en haut sur mobile
export default function AboutPhoto({ src = "/a-propos2.jpg" }: AboutPhotoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative h-80 w-full max-w-sm overflow-hidden rounded-2xl shadow-md sm:h-96 md:h-[520px] md:w-1/2 md:max-w-none"
    >
      <Image
        src={src}
        alt="Photo à propos"
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        quality={90}
        className="object-cover"
      />
    </motion.div>
  );
}