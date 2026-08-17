"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "@/app/ui/styles/landingSection.css";
import { cinzel } from "@/app/ui/fonts";

const heroImages = [
  "/744657735_2449638908862477_3520232296819307297_n.jpg",
  "/745621991_28183378918023659_7689868071902929136_n.jpg",
  "/747723307_1585445749963260_4212395155748312337_n.jpg",
];

export default function LandingSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1200}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        style={{ "--swiper-navigation-color": "#ffffff00" } as CSSProperties}
        className="absolute inset-0 z-0 h-full w-full"
      >
        {heroImages.map((src, i) => (
          <SwiperSlide key={i} className="relative h-full w-full">
            <Image
              src={src}
              alt="Photographie Aesteria"
              fill
              priority={i === 0}
              sizes="100vw"
              quality={90}
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center text-white pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${cinzel.className} text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl`}
        >
          Aesteria — Photographe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mt-4 max-w-md text-base text-gray-200 sm:text-lg"
        >
          Des instants capturés avec authenticité, entre lumière naturelle et
          émotions brutes.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          href="#collections"
          className="pointer-events-auto mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-md transition hover:bg-gray-100"
        >
          Découvrir mes collections
        </motion.a>
      </div>

      {/* indicateur de scroll : rebond + lueur pulsante */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative flex h-10 w-10 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full bg-white blur-md"
            animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.7, 1.15, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <FaChevronDown className="relative z-10 text-2xl text-white" />
        </div>
      </motion.div>
    </div>
  );
}