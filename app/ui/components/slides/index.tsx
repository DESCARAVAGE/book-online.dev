"use client";
import React from "react";
import GalleryCards from "./galerie";
import CollectionsScroll from "./collections";
import AboutMe from "./aboutMe";

export default function Slides() {

  return (
    <>
      <GalleryCards />
      <section id="collections">
        <CollectionsScroll />
      </section>
      <section id="a-propos">
        <AboutMe />
      </section>
    </>
  );
}
