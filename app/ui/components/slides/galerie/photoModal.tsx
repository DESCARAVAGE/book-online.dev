"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type PhotoModalProps = {
  src: string | null; // null = modal fermée
  collectionHref?: string;
  onClose: () => void;
};

// Modal de zoom sur une photo, avec bouton optionnel vers la collection associée
export default function PhotoModal({
  src,
  collectionHref,
  onClose,
}: PhotoModalProps) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full flex-col items-center gap-4"
          >
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute -top-10 right-0 text-3xl text-white transition hover:opacity-70"
            >
              ×
            </button>

            <img
              src={src}
              alt=""
              className="h-[90vh] w-[65vw] rounded-2xl object-contain shadow-lg"
            />

            {collectionHref && (
              <Link
                href={collectionHref}
                className="rounded-full bg-white px-6 py-2 text-sm font-medium text-gray-900 shadow-md transition hover:bg-gray-100"
              >
                Voir la collection
              </Link>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}