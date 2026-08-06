'use client'
import { useState } from 'react'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import CollectionsIcon from '@mui/icons-material/Collections'
import InfoIcon from '@mui/icons-material/Info'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'

const actions = [
  { icon: <ConnectWithoutContactIcon />, name: 'Contact', href: '#contact' },
    { icon: <InfoIcon />, name: 'À propos', href: '#a-propos' },
  { icon: <CollectionsIcon />, name: 'Collections', href: '#collections' },
  { icon: <HomeIcon />, name: 'Accueil', href: '#home' },
]

export default function MobNav() {
  const [open, setOpen] = useState(false)

  const handleNavigate = (href: string) => {
  setOpen(false)

  const id = href.replace('#', '')

  if (window.location.pathname === '/') {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    window.history.pushState(null, '', href)
  } else {
    window.location.href = '/' + href
  }
}

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 55,
        right: 16,
        zIndex: 50,
      }}
    >
      <SpeedDial
        ariaLabel="Menu de navigation"
        icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiFab-primary': {
            bgcolor: 'white',
            color: '#333',
            '&:hover': {
              bgcolor: '#f5f5f5',
            },
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                title: action.name,
                disableTouchListener: true,
              },
            }}
            onClick={() => handleNavigate(action.href)}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}