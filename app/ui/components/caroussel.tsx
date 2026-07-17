'use client';

import React from 'react';
import Image from 'next/image';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/pagination';

// Remplace ces URLs par tes propres photos en production
const slides = [
  { id: 1, src: 'https://picsum.photos/id/1015/1920/1080', alt: 'Rivière et montagnes' },
  { id: 2, src: 'https://picsum.photos/id/1018/1920/1080', alt: 'Paysage de montagne au lever du soleil' },
  { id: 3, src: 'https://picsum.photos/id/1025/1920/1080', alt: 'Portrait animalier' },
  { id: 4, src: 'https://picsum.photos/id/1039/1920/1080', alt: 'Forêt brumeuse' },
  { id: 5, src: 'https://picsum.photos/id/1043/1920/1080', alt: 'Architecture urbaine' },
] as const;

type HeroCarouselProps = {
  children?: React.ReactNode;
};
//  className="relative left-1/2 right-1/2 -mx-[50vw] w-screen h-screen overflow-hidden
// relative h-full w-full
export const HeroCarousel = ({ children }: HeroCarouselProps) => {
  return (
    <div className="relative -mx-[50vw] w-screen h-screen overflow-hidden">
      {/* <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        speed={1000}
        className="absolute inset-0 h-200 w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            
            <div className="relative h-full w-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}

      
      {children && (
        <div className="absolute inset-0 bg-sky-50 z-20  flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};