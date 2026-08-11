"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../styles/globals.css";
import { EffectCoverflow, Pagination } from "swiper/modules";

type SwiperComponentProps = {
  images: string[];
};

export default function SwiperComponent({ images }: SwiperComponentProps) {
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
      pagination
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
      // TODO (sync futur) : onSlideChange={(swiper) => ...} pour piloter
      // le sélecteur de MorePics depuis ici
    >
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <img src={src} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}