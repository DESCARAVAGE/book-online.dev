"use client";

import { useState } from "react";
import { cinzel } from "@/app/ui/fonts";

type PricingCardProps = {
  title: string;
  price: string;
  imageSrc: string;
  features: readonly string[];
  /** Niveau d'ornementation du cadre, du plus sobre (1) au plus riche (4). */
  level?: 1 | 2 | 3 | 4;
};

// ===== Pièces d'ornement réutilisées à travers les paliers =====
// Toutes dessinées sur un viewBox 288x384 (= h-96 w-72, la taille fixe
// de la carte), pour se caler exactement sur la photo.

// var(--foreground)/var(--background) plutôt que des hex fixes : suit
// automatiquement le switch de thème (déjà relayé en douceur par la
// transition globale sur fill/stroke dans globals.css, rien à ajouter
// ici). Le trait principal suit --foreground (sombre en thème clair,
// clair en thème sombre) ; le cœur du fleuron (le "trou perlé") suit
// --background, pour rester lisible dans les deux cas.
const ORNAMENT = "var(--foreground)";
const ORNAMENT_CORE = "var(--background)";

function Quatrefoil({ cx, cy, r = 6 }: { cx: number; cy: number; r?: number }) {
  return (
    <g fill={ORNAMENT}>
      <circle cx={cx} cy={cy - r} r={r * 0.62} />
      <circle cx={cx} cy={cy + r} r={r * 0.62} />
      <circle cx={cx - r} cy={cy} r={r * 0.62} />
      <circle cx={cx + r} cy={cy} r={r * 0.62} />
      <circle cx={cx} cy={cy} r={r * 0.55} />
      <circle cx={cx} cy={cy} r={r * 0.22} fill={ORNAMENT_CORE} />
    </g>
  );
}

// Colonne de `count` fleurons empilés verticalement en haut à gauche
// de la carte, espacés régulièrement.
function FlowerColumn({ count, cx }: { count: number; cx: number }) {
  const spacing = 24;
  const startY = 24;
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Quatrefoil key={i} cx={cx} cy={startY + i * spacing} r={4.5} />
      ))}
    </>
  );
}

const BORDER = "M20,10 h248 a10,10 0 0 1 10,10 v344 a10,10 0 0 1 -10,10 h-248 a10,10 0 0 1 -10,-10 v-344 a10,10 0 0 1 10,-10 z";

// Cadre superposé à la photo, dont la richesse augmente avec `level`
// (1 = discret, 4 = complet) : mêmes pièces réutilisées à chaque palier,
// on en ajoute simplement de nouvelles plutôt que de tout redessiner.
function CardFrame({ level }: { level: 1 | 2 | 3 | 4 }) {
  return (
    <svg
      viewBox="0 0 288 384"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {/* Paliers 1 à 3 : une colonne de fleurons en haut à gauche de la
          carte, dont le nombre égale le niveau (1, puis 2, puis 3).
          Mythique n'en a pas — seul le liseré pointillé le distingue. */}
      {level <= 3 && <FlowerColumn count={level} cx={24} />}

      {/* Palier 4 (Mythique) : liseré pointillé, sans fleurons. */}
      {level === 4 && (
        <path
          d={BORDER}
          transform="translate(144,192) scale(0.955) translate(-144,-192)"
          fill="none"
          stroke={ORNAMENT}
          strokeWidth="1.6"
          strokeDasharray="0.1 7"
          strokeLinecap="round"
          opacity="0.8"
        />
      )}
    </svg>
  );
}

// Variante "clic" du flip card : chaque carte gère son propre état local
// (aucune coordination nécessaire pour en avoir plusieurs retournées en
// même temps). Le flip ET l'effet de survol sont gérés en CSS pur
// (voir globals.css) — React ne fait que basculer .is-flipped au clic.
//
// .card-lift (soulèvement au survol) est un wrapper séparé de .flip-card
// (qui porte `perspective`) : les deux transforms ne doivent pas être
// posés sur le même élément, sinon le flip 3D casse.
export default function CardOne({ title, price, imageSrc, features, level = 1 }: PricingCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="card-lift">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        className={`flip-card flip-card--click h-96 w-72 cursor-pointer ${flipped ? "is-flipped" : ""}`}
      >
        <div className="flip-card-inner rounded-md">
          {/* Face avant : photo + cadre ornemental + titre */}
          <div className="flip-card-front overflow-hidden rounded-md">
            <img
              src={imageSrc}
              alt={title}
              draggable={false}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <CardFrame level={level} />
            <h3
              className={`${cinzel.className} absolute inset-x-0 bottom-6 text-center text-2xl font-semibold text-white`}
            >
              {title}
            </h3>
          </div>

          {/* Face arrière : détails de l'offre */}
          <div className="flip-card-back flex flex-col items-center justify-center gap-3 rounded-md bg-foreground px-8 text-center text-background">
            <h3 className={`${cinzel.className} text-xl font-semibold`}>{title}</h3>
            <p className={`${cinzel.className} text-3xl font-bold`}>{price}</p>
            <ul className="space-y-1 text-sm opacity-90">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}