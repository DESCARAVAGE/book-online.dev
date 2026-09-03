import React from "react";
import { getSitePhotos } from "@/app/lib/getPhoto/index";
import AboutMe from "./aboutMe";
import LandingSection from "./landing";
import Approch from "./approch";
import Gal from "./galerie";

export default async function Slides() {
  // Deux photos "about" existent (section: "about") : position 0 pour
  // l'accueil (ici), position 1 pour la page /about qui mène au
  // formulaire de contact (voir app/about/page.tsx).
  const aboutPhotos = await getSitePhotos("about");

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
        <AboutMe photo={aboutPhotos[0]} />
      </section>
      <section>
       <Gal />
      </section>
    </>
  );
}