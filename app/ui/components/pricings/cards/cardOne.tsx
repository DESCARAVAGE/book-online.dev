"use client";

import { useState } from "react";
import Image from "next/image";
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

// Couleurs fixes (pas de var(--foreground)) : l'ornement est posé sur
// l'overlay sombre de la photo (bg-gradient-to-t from-black/80...),
// qui ne change jamais avec le thème du site. Le faire suivre
// --foreground le rendait quasi invisible en thème clair (--foreground
// y est sombre, sur un fond déjà sombre). Blanc fixe = toujours lisible.
const ORNAMENT = "#ffffff";
const ORNAMENT_CORE = "#1a1a1a";

function Quatrefoil({
  cx,
  cy,
  r = 6,
  color = ORNAMENT,
  coreColor = ORNAMENT_CORE,
}: {
  cx: number;
  cy: number;
  r?: number;
  color?: string;
  coreColor?: string;
}) {
  return (
    <g fill={color}>
      <circle cx={cx} cy={cy - r} r={r * 0.62} />
      <circle cx={cx} cy={cy + r} r={r * 0.62} />
      <circle cx={cx - r} cy={cy} r={r * 0.62} />
      <circle cx={cx + r} cy={cy} r={r * 0.62} />
      <circle cx={cx} cy={cy} r={r * 0.55} />
      <circle cx={cx} cy={cy} r={r * 0.22} fill={coreColor} />
    </g>
  );
}

// Grille de `count` fleurons, ancrée en haut à gauche, bornée à 2
// lignes de hauteur maximum (le nombre de colonnes s'ajuste en
// conséquence — 4 fleurons donnent naturellement un carré 2x2).
// color/coreColor optionnels : par défaut celles du recto (fixes,
// blanc/sombre), mais surchargeables pour le verso (voir BackOrnament).
function FlowerGrid({
  count,
  x,
  y,
  color,
  coreColor,
}: {
  count: number;
  x: number;
  y: number;
  color?: string;
  coreColor?: string;
}) {
  const spacing = 24;
  const cols = Math.ceil(count / 2);
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        return (
          <Quatrefoil
            key={i}
            cx={x + col * spacing}
            cy={y + row * spacing}
            r={4.5}
            color={color}
            coreColor={coreColor}
          />
        );
      })}
    </>
  );
}

// Nombre de fleurons par palier : 1, 2, 4, 5 (Mythique inclus, qui
// n'en avait aucun avant).
const FLOWER_COUNT: Record<1 | 2 | 3 | 4, number> = {
  1: 1,
  2: 2,
  3: 4,
  4: 0,
};

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
      {/* Tous les paliers : une grille de fleurons en haut à gauche,
          dont le nombre suit FLOWER_COUNT (1, 2, 4, 5). */}
      <FlowerGrid count={FLOWER_COUNT[level]} x={24} y={24} />

      {/* Palier 4 (Mythique) : liseré pointillé en plus des fleurons. */}
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

// Écho du motif du recto, sur le verso : même grille de fleurons,
// réfléchie horizontalement (haut-gauche -> haut-droit), pour
// prolonger l'illusion d'une carte qui se retourne réellement plutôt
// que d'avoir deux faces sans rapport. Mythique n'a pas de fleurons
// (voir FLOWER_COUNT) mais garde son pointillé : sans lui, son verso
// n'avait plus aucun ornement du tout.
//
// Couleurs différentes du recto à dessein : le recto est toujours posé
// sur l'overlay sombre de la photo (fixe, quel que soit le thème), donc
// blanc/sombre fixes y fonctionnent toujours. Le verso, lui, utilise
// bg-foreground (qui suit le thème : sombre en clair, clair en sombre)
// — on reprend donc var(--background)/var(--foreground) pour garder un
// bon contraste dans les deux cas, comme pour CardOneSkeleton. Le
// pointillé suit la même logique de couleur que les fleurons, pas le
// ORNAMENT blanc fixe du recto.
function BackOrnament({ level }: { level: 1 | 2 | 3 | 4 }) {
  const count = FLOWER_COUNT[level];

  return (
    <svg
      viewBox="0 0 288 384"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <g transform="scale(-1,1) translate(-288,0)">
        {count > 0 && (
          <FlowerGrid
            count={count}
            x={24}
            y={24}
            color="var(--background)"
            coreColor="var(--foreground)"
          />
        )}
        {level === 4 && (
          <path
            d={BORDER}
            transform="translate(144,192) scale(0.955) translate(-144,-192)"
            fill="none"
            stroke="var(--background)"
            strokeWidth="1.6"
            strokeDasharray="0.1 7"
            strokeLinecap="round"
            opacity="0.8"
          />
        )}
      </g>
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
            <Image
              src={imageSrc}
              alt={title}
              fill
              draggable={false}
              sizes="288px"
              quality={90}
              className="object-cover"
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
            <BackOrnament level={level} />
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