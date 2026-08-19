type Divider4Props = {
  className?: string;
};

// Séparateur médiéval : nœud trinitaire (triquetra) cerclé au centre,
// lignes fines flanquées de petits points, embouts discrets en point
// plein. currentColor partout : englobe-le dans un élément avec
// text-foreground (ou une autre couleur) pour qu'il suive le thème
// clair/sombre du site.
// - Largeur responsive : 75% jusqu'à 900px (mobile/tablette), 45% à
//   partir de 901px (même seuil que DeskNav/MobNav dans NavBar) —
//   une largeur fixe en % devient énorme sur un écran desktop large.
// - opacity-60 sur l'ensemble : reste discret sans changer le dessin.
// - Un vrai espace sépare les lignes latérales du médaillon central
//   (les lignes s'arrêtent avant son bord plutôt que de le toucher).
export default function Divider4({ className }: Divider4Props) {
  return (
    <div className={`mx-auto w-3/4 min-[901px]:w-[45%] opacity-60 ${className ?? ""}`}>
      <svg
        viewBox="0 0 680 100"
        className="h-auto w-full"
        role="img"
        aria-label="Séparateur décoratif"
      >
        <line x1="80" y1="45" x2="302" y2="45" stroke="currentColor" strokeWidth={1.25} />
        <line x1="378" y1="45" x2="600" y2="45" stroke="currentColor" strokeWidth={1.25} />

        <circle cx="200" cy="45" r="2" fill="currentColor" />
        <circle cx="480" cy="45" r="2" fill="currentColor" />
        <circle cx="70" cy="45" r="3" fill="currentColor" />
        <circle cx="610" cy="45" r="3" fill="currentColor" />

        <circle cx="340" cy="45" r="24" fill="none" stroke="currentColor" strokeWidth={1} />

        {[0, 120, 240].map((angle) => (
          <g key={angle} transform={`translate(340,45) rotate(${angle})`}>
            <path
              d="M0,0 Q10,-7 20,0 Q10,7 0,0 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
            />
          </g>
        ))}
        <circle cx="340" cy="45" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}