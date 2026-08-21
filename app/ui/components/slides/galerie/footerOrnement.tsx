type FooterOrnamentProps = {
  className?: string;
};

// Marque de fin : une petite fleur à cinq pétales ronds avec un cœur
// central, flanquée de deux lignes légèrement ondulées (pas droites,
// pour rester dans le même esprit organique que HeaderOrnament).
// currentColor : suit la couleur héritée du contexte.
export default function FooterOrnament({ className }: FooterOrnamentProps) {
  return (
    <svg viewBox="0 0 680 90" className={className} aria-hidden="true">
      <path
        d="M90,45 C160,35 230,55 305,45"
        fill="none"
        stroke="currentColor"
        strokeWidth={0.9}
      />
      <path
        d="M375,45 C450,35 520,55 590,45"
        fill="none"
        stroke="currentColor"
        strokeWidth={0.9}
      />
      <circle cx="340" cy="34.6" r="5" fill="currentColor" />
      <circle cx="349.5" cy="40.8" r="5" fill="currentColor" />
      <circle cx="345.9" cy="51.6" r="5" fill="currentColor" />
      <circle cx="334.1" cy="51.6" r="5" fill="currentColor" />
      <circle cx="330.5" cy="40.8" r="5" fill="currentColor" />
      <circle cx="340" cy="45" r="3" fill="currentColor" />
    </svg>
  );
}