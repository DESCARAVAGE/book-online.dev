"use client";
import React from "react";

import GalleryCards from "./galerie";
import CollectionsScroll from "./collections";
import AboutUs from "./aboutUs";

export interface PropsType {
  url: string;
  title: string;
}

export interface Slide {
  url: string;
  title: string;
}

export default function Slides() {
  const slides: Slide[] = [
    {
      url: "/744657735_2449638908862477_3520232296819307297_n.jpg",
      title: "Photo 1",
    },
    {
      url: "/745621991_28183378918023659_7689868071902929136_n.jpg",
      title: "Photo 2",
    },
    {
      url: "/747723307_1585445749963260_4212395155748312337_n.jpg",
      title: "Photo 3",
    },
  ];

  const containerStyles = {
    width: "70vw",
    height: "45vh",
    margin: "0 auto",
  };

  return (
    <>
      <GalleryCards />
      <section id="collections">
        <CollectionsScroll />
      </section>
      <section id="a-propos">
        <AboutUs />
      </section>
    </>
  );
}
