'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

const navLinks = [
  { label: 'Accueil', href: '#home' },
  { label: 'Collections', href: '#collections' },
  { label: 'À propos', href: '#a-propos' },
  { label: 'Contact', href: '#contact' },
]

// Icônes soleil/lune : stroke="currentColor" pour hériter automatiquement
// de la couleur animée du nav (blanc sur hero, sombre une fois scrollé).
function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <circle cx="12" cy="12" r="4.5" />
      <path
        strokeLinecap="round"
        d="M12 2.5v2.25M12 19.25v2.25M4.22 4.22l1.59 1.59M18.19 18.19l1.59 1.59M2.5 12h2.25M19.25 12h2.25M4.22 19.78l1.59-1.59M18.19 5.81l1.59-1.59"
      />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z"
      />
    </svg>
  )
}

export default function DeskNav() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  // Le fond transparent + texte blanc n'a de sens que sur la home,
  // par-dessus la photo hero (toujours sombre, overlay compris).
  // Ailleurs (pages légales, collections...) il n'y a pas de hero
  // derrière : la nav doit être solide dès le départ, sinon texte
  // blanc sur fond clair = invisible tant qu'on n'a pas scrollé.
  const isHome = pathname === '/'
  const isSolid = scrolled || !isHome

  // next-themes ne connaît le thème réel qu'après le montage côté
  // client (avant ça, resolvedTheme est undefined pendant l'hydratation).
  // On attend le montage pour éviter un mismatch serveur/client sur l'icône.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === 'dark'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    const id = href.replace('#', '')

    if (window.location.pathname === '/') {
      // Déjà sur la home : scroll manuel, pas de rechargement
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      window.history.pushState(null, '', href)
    } else {
      // Ailleurs (mauvaise route, 404...) : vraie navigation vers la home + ancre
      window.location.href = '/' + href
    }
  }

  return (
    <motion.nav
      initial={false}
      animate={{
        // Ces couleurs sont pilotées par framer-motion (JS), donc hors
        // d'atteinte de Tailwind/CSS : il faut explicitement les faire
        // dépendre de isDark pour que le thème s'y applique.
        backgroundColor: isSolid
          ? isDark
            ? 'rgba(7,13,13,0.95)'
            : 'rgba(255,255,255,0.95)'
          : 'rgba(255,255,255,0)',
        boxShadow: isSolid ? '0 2px 10px rgba(0,0,0,0.08)' : '0 0 0 rgba(0,0,0,0)',
        color: isSolid ? (isDark ? '#f0ede4' : '#1a1a1a') : '#ffffff',
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* Grille 3 colonnes (1fr / auto / 1fr) : les liens restent
          centrés sur toute la largeur de la barre, la colonne de
          gauche fait juste contrepoids au bouton de droite. */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-10 px-8 py-4">
        <div />

        <div className="flex items-center justify-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavigate(e, link.href)}
              className="text-sm font-medium tracking-wide transition-colors hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Passer en thème clair' : 'Passer en thème sombre'}
            aria-pressed={isDark}
            className="cursor-pointer transition-opacity hover:opacity-70"
          >
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </motion.nav>
  )
}