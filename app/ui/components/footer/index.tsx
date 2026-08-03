import React from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const insta = "aesteria.photo";
  const linkedin = "olivia-ferreira-223444220";

  return (
    <section
      id="contact"
      className="soft-bg flex flex-wrap gap-5 content-center justify-center h-[20vh]"
    >
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
    </section>
  );
}
