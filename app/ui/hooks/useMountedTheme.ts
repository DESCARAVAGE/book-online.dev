"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// next-themes ne connaît le thème réel qu'après le montage côté
// client (resolvedTheme est undefined pendant l'hydratation). Ce hook
// centralise cette attente pour éviter un mismatch serveur/client.
//
// Piège rencontré : lire la classe .dark directement sur le DOM (sans
// attendre le montage) supprime le flash de couleur, MAIS casse
// l'hydratation dès que isDark pilote une différence structurelle de
// JSX (ex: <SunIcon/> vs <MoonIcon/>) — le serveur ne peut jamais
// deviner cette classe, donc son rendu diffère de celui du client dès
// le premier passage, et React régénère tout l'arbre au lieu de
// réconcilier. D'où l'attente du montage : le flash qui en résulte
// est bénin, l'erreur d'hydratation ne l'est pas.
export function useMountedTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return {
    isDark: mounted && resolvedTheme === "dark",
    setTheme,
  };
}