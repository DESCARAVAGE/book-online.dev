"use client";

import { useEffect } from "react";
import Divider4 from "@/app/ui/components/themes/divider-medival";
import SocialLinks from "@/app/ui/components/about/socialLinks";
import { cinzel } from "@/app/ui/fonts";
import AboutHero from "./aboutHero";
import Parcours from "./parcours";
import Profile from "./profile";
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
      <AboutHero photo={aboutPhoto} />

      {/* items-stretch (par défaut sur flex) : les deux colonnes
          s'étirent à la hauteur de la plus grande. Parcours (h-full +
          justify-between en interne) répartit ses entrées sur tout
          cet espace ; Profile (flex-1) absorbe l'écart restant côté
          droit plutôt que de laisser un vide sous "Où me retrouver ?". */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 sm:px-10 md:flex-row">
        <div className="md:w-[42%]">
          <Parcours />
        </div>
        <div className="flex flex-col gap-6 md:w-[58%]">
          <Profile />
          <div className="rounded-md border border-foreground/15 p-6 sm:p-8">
            <h3
              className={`${cinzel.className} mb-4 text-lg font-semibold text-foreground`}
            >
              Où me retrouver ?
            </h3>
            <SocialLinks />
          </div>
        </div>
      </div>

      <Divider4 />
      {/* <ContactSection /> */}
    </div>
  );
}