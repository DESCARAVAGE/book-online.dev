'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useNavScrollBehavior } from '@/app/ui/hooks/useNavScrollBehavior'
import { scrollToAnchor } from '@/app/lib/scrollToAnchor'
import { SunIcon, MoonIcon } from './themeIcons'

// href commençant par "#" -> ancre scrollée sur la home. href
// commençant par "/" -> vraie navigation Next.js vers une autre page.
const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Tarifs & Offres', href: '/pricings' },
  { label: 'Contact', href: '/contact' },
]

export default function DeskNav() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const { isSolid, hidden } = useNavScrollBehavior(isHome)
  const { resolvedTheme, setTheme } = useTheme()

  // Contrairement à ce qu'on pourrait penser, resolvedTheme EST déjà
  // résolu correctement dès le tout premier rendu client (next-themes
  // le lit avant l'hydratation) — mais le serveur, lui, ne peut jamais
  // le connaître. Résultat : aria-label/aria-pressed calculés
  // directement depuis resolvedTheme divergent entre serveur et
  // client → mismatch d'hydratation réel (confirmé en pratique).
  // On revient donc au pattern mounted, mais seulement pour ces deux
  // attributs texte (pas pour les icônes, qui restent en CSS pur,
  // sûres par construction) : correction invisible après montage,
  // aucun flash visuel, aucune structure de DOM qui diverge.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <motion.nav
      initial={false}
      // Seul `y` (glissement au scroll) reste piloté par framer-motion :
      // aucune dépendance au thème ici, donc aucun risque de flash ou
      // de mismatch d'hydratation sur cette valeur.
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${
        isSolid
          ? 'bg-background/95 text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.08)]'
          : 'bg-transparent text-white shadow-none'
      }`}
    >
      {/* Grille 3 colonnes (1fr / auto / 1fr) : les liens restent
          centrés sur toute la largeur de la barre, la colonne de
          gauche fait juste contrepoids au bouton de droite. */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-10 px-8 py-4">
        <div />

        <div className="flex items-center justify-center gap-10">
          {navLinks.map((link) =>
            link.href.startsWith('#') ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToAnchor(link.href)
                }}
                className="text-sm font-medium tracking-wide transition-colors hover:opacity-70"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  // On est déjà sur cette route : Link ne ferait rien
                  // (aucune navigation vers la même page), on scrolle
                  // en haut à la place plutôt que de laisser le clic
                  // sans effet.
                  if (link.href === pathname) {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className="text-sm font-medium tracking-wide transition-colors hover:opacity-70"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label={isDark ? 'Passer en thème clair' : 'Passer en thème sombre'}
            aria-pressed={isDark}
            suppressHydrationWarning
            className="cursor-pointer transition-opacity hover:opacity-70"
          >
            {/* Les deux icônes sont toujours dans le DOM, identiques
                entre serveur et client : seule leur visibilité change,
                via la variante dark: de Tailwind (pilotée par la classe
                .dark posée sur <html>, déjà correcte avant même
                l'hydratation). Pas d'état React à attendre pour ça,
                donc pas de flash et aucun risque de mismatch. */}
            <SunIcon className="hidden h-5 w-5 dark:block" />
            <MoonIcon className="block h-5 w-5 dark:hidden" />
          </button>
        </div>
      </div>
    </motion.nav>
  )
}