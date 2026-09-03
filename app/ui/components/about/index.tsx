"use client";

import { useEffect } from "react";
import Divider4 from "@/app/ui/components/themes/divider-medival";
import AboutMe from "@/app/ui/components/slides/aboutMe";
import ContactSection from "./contactSection";

type AboutProps = {
  aboutPhoto?: string;
};

export default function About({ aboutPhoto }: AboutProps) {
  // Scroll animé vers le formulaire si on arrive depuis le CTA de la
  // page pricings. sessionStorage plutôt qu'un hash d'URL (#contact) :
  // ce dernier restait affiché dans l'URL et se dupliquait au clic
  // (/about#contact#contact). Effacé juste après lecture pour ne pas
  // re-déclencher le scroll sur un rechargement ultérieur de la page.
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (target) {
      sessionStorage.removeItem("scrollTarget");
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div>
      <AboutMe photo={aboutPhoto} />
      {/* <Divider4 />
      <ContactSection /> */}
    </div>
  );
}