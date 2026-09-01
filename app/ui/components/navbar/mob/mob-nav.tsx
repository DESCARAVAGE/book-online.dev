'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import EuroIcon from '@mui/icons-material/Euro'
import InfoIcon from '@mui/icons-material/Info'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useNavScrollBehavior } from '@/app/ui/hooks/useNavScrollBehavior'
import { scrollToAnchor } from '@/app/lib/scrollToAnchor'

const actions = [
  { icon: <HomeIcon />, name: 'Accueil', href: '/' },
  { icon: <EuroIcon />, name: 'Tarifs', href: '/pricings' },
  { icon: <InfoIcon />, name: 'À propos', href: '/about' },
  { icon: <ConnectWithoutContactIcon />, name: 'Contact', href: '/contact' },
]

// Le SpeedDial n'est enveloppé dans aucun MuiThemeProvider : sans ça,
// ses boutons restent figés sur la palette MUI par défaut (blanc),
// indifférents à la classe .dark. On les fait suivre --background /
// --foreground comme le reste du site.
const fabSx = {
  bgcolor: 'var(--background)',
  color: 'var(--foreground)',
  '&:hover': {
    bgcolor: 'var(--background)',
    filter: 'brightness(0.95)',
  },
}

export default function MobNav() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  // resolvedTheme est déjà résolu côté client dès le premier rendu,
  // mais jamais côté serveur : un texte calculé directement dessus
  // (ici le title du tooltip) diverge entre les deux → mismatch
  // d'hydratation. Pattern mounted classique, scopé à ce seul usage
  // (l'icône reste en CSS pur juste au-dessus, déjà sûre).
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === 'dark'

  // useNavScrollBehavior renvoie aussi isSolid (fond opaque/transparent
  // de DeskNav) : MobNav n'a pas cet état, seul `hidden` (debounce du
  // scroll actif) nous intéresse ici — l'argument passé n'a donc pas
  // d'incidence réelle sur ce composant.
  const { hidden: hiddenByScroll } = useNavScrollBehavior(true)
  const hidden = hiddenByScroll && !open

  const handleNavigate = (href: string) => {
    setOpen(false)

    if (href.startsWith('#')) {
      scrollToAnchor(href)
    } else if (href === pathname) {
      // Déjà sur cette route : router.push ne ferait rien, on scrolle
      // en haut à la place plutôt que de laisser le clic sans effet.
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Vraie route : navigation Next.js classique (pas de rechargement)
      router.push(href)
    }
  }

  return (
    <motion.div
      initial={false}
      animate={{ x: hidden ? 100 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        bottom: 55,
        right: 16,
        zIndex: 50,
      }}
    >
      {/* Halo pulsant : en thème sombre, le FAB (bgcolor: var(--background))
          se fond dans le fond de page sans rien pour le distinguer.
          56px = taille par défaut d'un Fab MUI ; ancré au coin bas-droit
          (comme le FAB lui-même), pas inset-0 qui épouserait toute la
          hauteur du conteneur (celui-ci réserve de la place pour les
          actions même fermé).
          Visibilité pilotée en CSS pur (dark:block), pas par un état
          React isDark qui ne connaît le thème réel qu'après le montage
          — évite le flash et tout risque de mismatch d'hydratation.
          `open` reste un state React classique : sûr, puisqu'il démarre
          à false aussi bien côté serveur que client. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 right-0 h-14 w-14 animate-ping rounded-full border-1 border-white/70 [animation-duration:2.2s] ${
          open ? 'hidden' : 'hidden dark:block'
        }`}
      />

      <SpeedDial
        ariaLabel="Menu de navigation"
        icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiFab-primary': fabSx,
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            sx={fabSx}
            slotProps={{
              tooltip: {
                title: action.name,
                disableTouchListener: true,
              },
            }}
            onClick={() => handleNavigate(action.href)}
          />
        ))}
        <SpeedDialAction
          key="theme"
          // Choix conditionnel classique (comme le title juste en
          // dessous) plutôt que le double-rendu CSS dark:hidden/block :
          // ce dernier affichait les deux icônes en même temps ici, les
          // composants @mui/icons-material posant leur propre display
          // via le moteur CSS-in-JS de MUI, qui l'emportait sur la
          // classe Tailwind.
          icon={isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          // Contraste fort et volontairement inversé par rapport aux
          // autres boutons (fabSx) : la lune (proposition de passer en
          // sombre) est blanche sur fond noir, le soleil (proposition
          // de repasser en clair) est sombre sur fond blanc — le bouton
          // représente visuellement le thème vers lequel il bascule.
          sx={{
            bgcolor: isDark ? '#ffffff' : '#0a0a0a',
            color: isDark ? '#0a0a0a' : '#ffffff',
            '&:hover': {
              bgcolor: isDark ? '#f0f0f0' : '#1a1a1a',
            },
          }}
          slotProps={{
            tooltip: {
              title: isDark ? 'Thème clair' : 'Thème sombre',
              disableTouchListener: true,
            },
          }}
          onClick={() => {
            setOpen(false)
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
          }}
        />
      </SpeedDial>
    </motion.div>
  )
}