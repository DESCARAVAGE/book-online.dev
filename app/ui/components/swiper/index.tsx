"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../styles/globals.css";
import { EffectCoverflow, Pagination } from "swiper/modules";

type SwiperComponentProps = {
  images: string[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
};

export default function SwiperComponent({
  images,
  activeIndex,
  onActiveChange,
}: SwiperComponentProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  // Si activeIndex change depuis l'extérieur (clic sur une miniature
  // dans MorePics), on fait défiler le Swiper jusqu'à cette slide.
  // Le garde-fou évite de relancer slideTo() quand c'est le Swiper
  // lui-même qui est à l'origine du changement (via onSlideChange).
  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper && swiper.activeIndex !== activeIndex) {
      swiper.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper lg:h-full"
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={(swiper) => onActiveChange(swiper.activeIndex)}
    >
      {images.map((src, i) => (
        // lg:!h-full / lg:!w-auto en !important : la règle globale
        // .swiper-slide { width:300px; height:300px } (globals.css)
        // a la même spécificité et gagnerait sinon sur desktop.
        <SwiperSlide key={i} className="lg:!h-full lg:!w-auto">
          <img
            src={src}
            alt=""
            className="rounded-xl"
            // lg:!h-full lg:!w-auto
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}