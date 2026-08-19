import type { ReactNode } from "react";
import CornerOrnament from "../elements/ornement-corner";

type PhotoFrameProps = {
  children: ReactNode;
  className?: string;
};

// Enveloppe une photo (ou tout contenu) de 4 ornements d'angle
// minimalistes (équerre + point). Le conteneur doit être capable de
// recevoir position: relative — className le passe directement.
// currentColor : passe className="text-foreground" (ou une autre
// couleur) pour teinter les 4 coins d'un coup.
// Les coins débordent légèrement à l'extérieur du cadre (offset
// négatif) plutôt que d'être collés pile sur le bord : ça les met en
// évidence au lieu de se fondre dans la photo.
export default function PhotoFrame({ children, className }: PhotoFrameProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {children}
      <CornerOrnament className="pointer-events-none absolute -left-1 -top-1 h-6 w-6" />
      <CornerOrnament className="pointer-events-none absolute -right-1 -top-1 h-6 w-6 -scale-x-100" />
      <CornerOrnament className="pointer-events-none absolute -bottom-1 -left-1 h-6 w-6 -scale-y-100" />
      <CornerOrnament className="pointer-events-none absolute -bottom-1 -right-1 h-6 w-6 -scale-x-100 -scale-y-100" />
    </div>
  );
}