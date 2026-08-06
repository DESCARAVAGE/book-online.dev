"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SocialButtonProps = {
  href: string;
  label: string;
  icon: ReactNode;
};

// Bouton animé pour un lien de réseau social, réutilisable
// (Instagram, LinkedIn, ou tout autre réseau ajouté plus tard)
export default function SocialBtn({ href, label, icon }: SocialButtonProps) {
  return (
    <a
      className="flex items-center justify-center text-background"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <motion.button
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.85, y: 1 }}
        transition={{ type: "spring" }}
        className="btn-link flex-col gap-2"
      >
        {icon}
        <p>{label}</p>
      </motion.button>
    </a>
  );
}