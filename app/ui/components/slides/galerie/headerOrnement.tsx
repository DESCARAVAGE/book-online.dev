type HeaderOrnamentProps = {
  className?: string;
};

// Bandeau d'en-tête : un croissant de lune flanqué de petites
// étoiles, avec deux fines lignes de part et d'autre. currentColor :
// suit la couleur héritée du contexte (passe className="text-foreground"
// ou une autre couleur).
export default function HeaderOrnament({ className }: HeaderOrnamentProps) {
  return (
    <svg viewBox="0 0 680 100" className={className} aria-hidden="true">
      <line x1="90" y1="45" x2="280" y2="45" stroke="currentColor" strokeWidth={0.9} />
      <line x1="400" y1="45" x2="590" y2="45" stroke="currentColor" strokeWidth={0.9} />
      <g transform="translate(320,23) scale(1.3)">
        <path
          d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z"
          fill="currentColor"
        />
      </g>
      <g transform="translate(300,20)">
        <path
          d="M0,-3 C0.45,-0.9 0.9,-0.45 3,0 C0.9,0.45 0.45,0.9 0,3 C-0.45,0.9 -0.9,0.45 -3,0 C-0.9,-0.45 -0.45,-0.9 0,-3 Z"
          fill="currentColor"
        />
      </g>
      <g transform="translate(380,60)">
        <path
          d="M0,-5 C0.75,-1.5 1.5,-0.75 5,0 C1.5,0.75 0.75,1.5 0,5 C-0.75,1.5 -1.5,0.75 -5,0 C-1.5,-0.75 -0.75,-1.5 0,-5 Z"
          fill="currentColor"
        />
      </g>
      <g transform="translate(400,28)">
        <path
          d="M0,-2 C0.3,-0.6 0.6,-0.3 2,0 C0.6,0.3 0.3,0.6 0,2 C-0.3,0.6 -0.6,0.3 -2,0 C-0.6,-0.3 -0.3,-0.6 0,-2 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}