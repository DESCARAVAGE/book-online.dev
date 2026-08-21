'use client'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useMountedTheme } from '@/app/ui/hooks/useMountedTheme'
import { useNavScrollBehavior } from '@/app/ui/hooks/useNavScrollBehavior'
import { scrollToAnchor } from '@/app/ui/lib/scrollToAnchor'
import { SunIcon, MoonIcon } from './themeIcons'

// href commençant par "#" -> ancre scrollée sur la home. href
// commençant par "/" -> vraie navigation Next.js vers une autre page.
const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Tarifs & Offres', href: '/pricings' },
  { label: 'À propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function DeskNav() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const { isSolid, hidden } = useNavScrollBehavior(isHome)
  const { isDark, setTheme } = useMountedTheme()

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
        y: hidden ? '-100%' : '0%',
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