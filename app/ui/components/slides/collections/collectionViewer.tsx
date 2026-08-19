"use client";

import { useEffect, useRef, useState } from "react";
import SwiperComponent from "../../swiper/";
import MorePics from "./more-pics";
import Link from "next/link";

// Petit cadenas utilisé pour signaler une collection privée dans le menu.
function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={className}
    >
      <rect x="4.5" y="9" width="11" height="8" rx="1.5" />
      <path d="M7 9V6.5a3 3 0 0 1 6 0V9" strokeLinecap="round" />
    </svg>
  );
}


type CollectionViewerProps = {
  images: string[];
};

type NewCollectionViewerProps = {
  collections: { slug: string; title: string; is_private?: boolean }[];
  currentSlug: string;
  images: string[];
};

// Mobile (< lg) : Swiper puis MorePics empilés, comportement inchangé.
// Desktop (lg+) : côte à côte, Swiper 65% / MorePics 35%, hauteur
// bornée pour ne jamais dépasser l'écran (le -180px est une estimation
// de la hauteur de la navbar + HeaderGal au-dessus ; à ajuster si ça
// change). MorePics scrolle indépendamment si la collection est longue.
export default function CollectionViewer({ collections, currentSlug, images }: NewCollectionViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const current = collections?.find((c) => c.slug === currentSlug);

  // Ferme le menu au clic en dehors ou à la touche Échap.
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);


  return (
    <div className="p-10 absolute bottom-0">
      <div className="p-5 h-[90vh] ">
        <div className="pb-5 flex items-center justify-center gap-2">
          <h1
            className={`text-2xl tracking-wide text-gray-900 sm:text-3xl`}
          >
            {current?.title ?? "Collection"}
          </h1>
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="listbox"
              className="flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200"
            >

              <svg
                className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {open && (
              <ul
                role="listbox"
                className="absolute left-1/2 top-full z-20 mt-2 max-h-80 w-64 -translate-x-1/2 overflow-y-auto rounded-2xl bg-white p-2 text-left shadow-lg ring-1 ring-black/5"
              >
                {collections.map((c) =>
                  c.is_private ? (
                    // Privée : visible mais grisée, non sélectionnable, cadenas affiché.
                    <li key={c.slug}>
                      <div
                        aria-disabled="true"
                        className="flex cursor-not-allowed items-center justify-between rounded-xl px-4 py-2 text-sm text-gray-400"
                      >
                        <span>{c.title}</span>
                        <LockIcon className="h-3.5 w-3.5 shrink-0" />
                      </div>
                    </li>
                  ) : (
                    // Publique : rien de spécial affiché, comportement inchangé.
                    <li key={c.slug}>
                      <Link
                        href={`/collections/${c.slug}`}
                        onClick={() => setOpen(false)}
                        className={`block rounded-xl px-4 py-2 text-sm transition ${c.slug === currentSlug
                            ? "bg-gray-900 font-medium text-white"
                            : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {c.title}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>
        </div>
        <SwiperComponent
          images={images}
          activeIndex={activeIndex}
          onActiveChange={setActiveIndex}
        />
      </div>
      
    </div>
  );
}

// flex-col gap-4 px-4 pb-10 pt-4 sm:px-6 lg:h-[calc(100vh-180px)] lg:flex-row lg:gap-6 lg:px-8 lg:pb-12 lg:pt-6