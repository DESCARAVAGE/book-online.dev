"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function AboutMe() {
  const insta = "aesteria.photo";
  const linkedin = "olivia-ferreira-223444220";

  return (
    <section className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:gap-16">
        {/* photo : à gauche sur desktop, en haut sur mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-sm overflow-hidden rounded-2xl shadow-md md:w-1/2 md:max-w-none"
        >
          <img
            src="/a-propos.jpg"
            alt="Photo à propos"
            className="h-80 w-full object-cover sm:h-96 md:h-[520px]"
          />
        </motion.div>

        {/* texte + réseaux sociaux : à droite sur desktop, dans une carte blanche sur mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="w-full max-w-sm rounded-2xl bg-gray-50 p-6 text-center shadow-md
                     md:w-1/2 md:max-w-none md:bg-transparent md:p-0 md:text-left md:shadow-none"
        >
          <h2 className="text-3xl font-semibold text-gray-900">À propos</h2>
          <p className="mt-4 text-gray-600">
            Passionnée de photographie depuis toujours, je capture des instants
            authentiques à travers mes collections. Chaque image raconte une
            histoire, entre lumière naturelle et émotions brutes.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              className="flex items-center justify-center text-background"
              href={`https://www.instagram.com/${insta}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.85, y: 1 }}
                transition={{ type: "spring" }}
                className="btn-link flex-col gap-2"
              >
                <FaInstagram />
                <p>Instagram</p>
              </motion.button>
            </a>
            <a
              className="flex items-center justify-center text-background"
              href={`https://www.linkedin.com/in/${linkedin}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.85, y: 1 }}
                transition={{ type: "spring" }}
                className="btn-link flex-col gap-2"
              >
                <FaLinkedin />
                <p>Linkdin</p>
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}