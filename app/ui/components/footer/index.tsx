import React from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="h-[10vh] grid grid-cols-3 content-evenly gap-4 bg-gray-500">
      <p>Mention légales</p>
      <p>Confidentialité</p>
      <p>CGV & CGU</p>
    </div>
  );
}
