"use client";

import { motion } from "framer-motion";

// Photo de la section À propos : à gauche sur desktop, en haut sur mobile
export default function AboutPhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-sm overflow-hidden rounded-2xl shadow-md md:w-1/2 md:max-w-none"
    >
      <img
        src="/a-propos2.jpg"
        alt="Photo à propos"
        className="h-80 w-full object-cover sm:h-96 md:h-[520px]"
      />
    </motion.div>
  );
}