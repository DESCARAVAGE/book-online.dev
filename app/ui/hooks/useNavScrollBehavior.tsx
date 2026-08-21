"use client";

import { useEffect, useState } from "react";

type NavScrollBehavior = {
  isSolid: boolean;
  hidden: boolean;
};

// Deux comportements liés au scroll, mais indépendants l'un de l'autre :
// - isSolid : fond opaque + texte sombre passé 20px de scroll (ou en
//   permanence si isHome=false, cf. DeskNav)
// - hidden : true pendant le scroll actif, repasse à false 200ms après
//   le dernier événement (debounce) — pilote la visibilité de la nav.
export function useNavScrollBehavior(isHome: boolean): NavScrollBehavior {
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingNow, setIsScrollingNow] = useState(false);

  useEffect(() => {
    // État initial sans déclencher isScrollingNow, pour ne pas planquer
    // la nav une fraction de seconde au chargement.
    setScrolled(window.scrollY > 20);

    let hideTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setIsScrollingNow(true);

      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => setIsScrollingNow(false), 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimeout);
    };
  }, []);

  return {
    isSolid: scrolled || !isHome,
    hidden: isScrollingNow,
  };
}