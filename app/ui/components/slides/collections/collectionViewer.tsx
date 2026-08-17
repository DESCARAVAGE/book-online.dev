"use client";

import { useState } from "react";
import SwiperComponent from "../../swiper/";
import MorePics from "./more-pics";

type CollectionViewerProps = {
  images: string[];
};

// Mobile (< lg) : Swiper puis MorePics empilés, comportement inchangé.
// Desktop (lg+) : côte à côte, Swiper 65% / MorePics 35%, hauteur
// bornée pour ne jamais dépasser l'écran (le -180px est une estimation
// de la hauteur de la navbar + HeaderGal au-dessus ; à ajuster si ça
// change). MorePics scrolle indépendamment si la collection est longue.
export default function CollectionViewer({ images }: CollectionViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 px-4 pb-10 pt-4 sm:px-6 lg:h-[calc(100vh-180px)] lg:flex-row lg:gap-6 lg:px-8 lg:pb-12 lg:pt-6">
      <div className="w-full lg:w-[65%]">
        <SwiperComponent
          images={images}
          activeIndex={activeIndex}
          onActiveChange={setActiveIndex}
        />
      </div>
      <div className="w-full lg:w-[35%] lg:overflow-y-auto">
        <MorePics
          images={images}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </div>
    </div>
  );
}