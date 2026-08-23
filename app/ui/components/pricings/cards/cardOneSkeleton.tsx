// Même gabarit que CardOne (h-96 w-72) pour ne pas décaler la mise en
// page au moment du remplacement par la vraie carte.
// Plutôt qu'un simple bloc de couleur : un vrai dos de carte à jouer
// (les offres sont "face cachée" tant qu'elles chargent) — cadre
// double, treillis de losanges, médaillon central en quatrefeuille
// (même motif que le cadre de CardOne, pour rester cohérent). Tout en
// currentColor : suit le thème via text-foreground sur le <svg>.
export function CardOneSkeleton() {
  return (
    <div className="relative h-96 w-72 shrink-0 overflow-hidden rounded-md bg-foreground/10">
      <svg
        viewBox="0 0 288 384"
        className="absolute inset-0 h-full w-full text-foreground"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="skeleton-lattice"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <path
              d="M12,0 L24,12 L12,24 L0,12 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              opacity="0.15"
            />
          </pattern>
        </defs>

        {/* Cadre extérieur */}
        <rect
          x="14"
          y="14"
          width="260"
          height="356"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        {/* Cadre intérieur, plus fin */}
        <rect
          x="22"
          y="22"
          width="244"
          height="340"
          rx="6"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.15"
        />
        {/* Treillis répété entre les deux cadres */}
        <rect x="22" y="22" width="244" height="340" fill="url(#skeleton-lattice)" />

        {/* Médaillon central : quatrefeuille, écho du cadre de CardOne */}
        <g transform="translate(144,192)">
          <circle r="34" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
          {[0, 90, 180, 270].map((angle) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <path d="M0,0 Q11,-7 22,0 Q11,7 0,0 Z" fill="currentColor" fillOpacity="0.2" />
            </g>
          ))}
          <circle r="4" fill="currentColor" fillOpacity="0.3" />
        </g>
      </svg>

      {/* Reflet : bande fine, traverse toute la largeur, par-dessus le
          reste (dernier dans le DOM). */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent from-35% via-white/30 via-50% to-transparent to-65%" />
    </div>
  );
}

export function CardsSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <CardOneSkeleton key={i} />
      ))}
    </>
  );
}