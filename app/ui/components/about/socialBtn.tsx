"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SocialButtonProps = {
  href: string;
  label: string;
  icon: ReactNode;
};

// Icône seule, sans carte ni libellé visible (label passe en
// aria-label pour l'accessibilité) — chaque icône porte déjà sa
// couleur de marque (voir socialLinks.tsx). Hover : grossit et se
// soulève légèrement, sans fond/bordure qui distrairait de la couleur
// propre à chaque logo.
export default function SocialBtn({ href, label, icon }: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.2, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex text-3xl"
    >
      {icon}
    </motion.a>
  );
}