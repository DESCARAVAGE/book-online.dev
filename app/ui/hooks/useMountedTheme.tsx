"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// next-themes ne connaît le thème réel qu'après le montage côté
// client (resolvedTheme est undefined pendant l'hydratation). Ce hook
// centralise cette attente pour éviter un mismatch serveur/client sur
// tout élément dont l'apparence dépend du thème (icône, couleur...).
export function useMountedTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return {
    isDark: mounted && resolvedTheme === "dark",
    setTheme,
  };
}