"use client";

import { motion } from "framer-motion";
import SocialLinks from "./socialLinks";

// Texte de présentation + réseaux sociaux : à droite sur desktop,
// dans une carte blanche sur mobile
export default function AboutText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      className="w-full max-w-sm rounded-2xl bg-gray-50 p-6 text-center shadow-md
                 dark:bg-white/5 md:w-1/2 md:max-w-none md:bg-transparent md:p-6 md:text-left md:shadow-none"
    >
      <h2 className="text-3xl font-semibold text-foreground">À propos</h2>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Passionnée de photographie depuis toujours, je capture des instants
        authentiques à travers mes collections. Chaque image raconte une
        histoire, entre lumière naturelle et émotions brutes.
      </p>

      <div className="mt-6">
        <SocialLinks />
      </div>
    </motion.div>
  );
}