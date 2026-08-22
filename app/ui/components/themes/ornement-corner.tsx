type CornerOrnamentProps = {
  className?: string;
};

// Motif d'angle minimaliste : équerre fine + point plein au sommet.
// Orienté par défaut pour le coin haut-gauche ; PhotoFrame le
// retourne (scale-x/-y en Tailwind) pour les 3 autres angles.
// currentColor : suit la couleur héritée du contexte.
export default function CornerOrnament({ className }: CornerOrnamentProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <line x1="14" y1="0" x2="40" y2="0" stroke="currentColor" strokeWidth={1} />
      <line x1="0" y1="14" x2="0" y2="40" stroke="currentColor" strokeWidth={1} />
      <circle cx="4" cy="4" r="1.75" fill="currentColor" />
    </svg>
  );
}