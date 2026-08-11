import React from "react";
import GalleryCards from "./galerie";
import CollectionsScroll from "./collections";
import AboutMe from "./aboutMe";
import LandingSection from "../landingSection";

export default function Slides() {

  return (
    <>
      <section id="home">
        <LandingSection />
        <GalleryCards />
      </section>
      <section id="collections">
        <CollectionsScroll />
      </section>
      <section id="a-propos">
        <AboutMe />
      </section>
    </>
  );
}
