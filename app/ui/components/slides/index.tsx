import React from "react";
import AboutMe from "./aboutMe";
import LandingSection from "./landingSection";
import Approch from "./approch";
import Gal from "./galerie"; 

export default function Slides() {

  return (
    <>
      <section>
        <LandingSection />
        {/* <GalleryCards /> */}
      </section>
      <section>
        <Approch />
      </section>
      <section>
        {/* <CollectionsScroll /> */}
      </section>
      <section>
        <AboutMe />
      </section>
      <section>
       <Gal />
      </section>
    </>
  );
}
