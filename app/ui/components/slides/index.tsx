"use client";
import React from "react";
import GalleryCards from "./galerie";
import CollectionsScroll from "./collections";
import AboutUs from "./aboutUs";

export default function Slides() {

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
