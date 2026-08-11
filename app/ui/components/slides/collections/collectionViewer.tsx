"use client";

import SwiperComponent from "../../swiper/";
import MorePics from "./more-pics";

type CollectionViewerProps = {
  images: string[];
};

// Wrapper commun à Swiper et MorePics : c'est ici qu'on branchera
// plus tard l'état partagé (index actif) pour les synchroniser.
export default function CollectionViewer({ images }: CollectionViewerProps) {
  return (
    <>
      <SwiperComponent images={images} />
      <MorePics images={images} />
    </>
  );
}