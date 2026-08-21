import React from "react";
import AboutMe from "./aboutMe";
import LandingSection from "./landingSection";
import Approch from "./approch";
import Gal from "./galerie"; 

export default function Slides() {

  return (
    <>
      <section id="home">
        <LandingSection />
        {/* <GalleryCards /> */}
      </section>
      <section id="theme">
        <Approch />
      </section>
      <section id="collections">
        {/* <CollectionsScroll /> */}
      </section>
      <section id="a-propos">
        <AboutMe />
      </section>
      <section id="gallery">
       <Gal />
      </section>
    </>
  );
}
