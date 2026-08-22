"use client";

import { useState } from "react";
import { cinzel } from "@/app/ui/fonts";

type PricingCardProps = {
  title: string;
  price: string;
  imageSrc: string;
  features: string[];
};

// Variante "clic" du flip card : chaque carte gère son propre état local
// (aucune coordination nécessaire pour en avoir plusieurs retournées en
// même temps). Le flip ET l'effet de survol sont gérés en CSS pur
// (voir global.css) — React ne fait que basculer .is-flipped au clic.
//
// .card-lift (soulèvement au survol) est un wrapper séparé de .flip-card
// (qui porte `perspective`) : les deux transforms ne doivent pas être
// posés sur le même élément, sinon le flip 3D casse.
export default function CardOne({ title, price, imageSrc, features }: PricingCardProps) {
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
          {/* Face avant : photo + titre */}
          <div className="flip-card-front overflow-hidden rounded-md">
            <img
              src={imageSrc}
              alt={title}
              draggable={false}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
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