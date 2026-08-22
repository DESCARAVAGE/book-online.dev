'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
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
import { useMountedTheme } from '@/app/ui/hooks/useMountedTheme'
import { useNavScrollBehavior } from '@/app/ui/hooks/useNavScrollBehavior'
import { scrollToAnchor } from '@/app/ui/lib/scrollToAnchor'

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

  const { isDark, setTheme } = useMountedTheme()

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
          actions même fermé). Masqué pendant l'ouverture du menu. */}
      {isDark && !open && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 animate-ping rounded-full border-1 border-white/70 [animation-duration:2.2s]"
        />
      )}

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
          icon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
          sx={fabSx}
          slotProps={{
            tooltip: {
              title: isDark ? 'Thème clair' : 'Thème sombre',
              disableTouchListener: true,
            },
          }}
          onClick={() => {
            setOpen(false)
            setTheme(isDark ? 'light' : 'dark')
          }}
        />
      </SpeedDial>
    </motion.div>
  )
}