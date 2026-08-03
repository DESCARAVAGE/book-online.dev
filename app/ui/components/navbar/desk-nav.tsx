'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Accueil', href: '#home' },
  { label: 'Collections', href: '#collections' },
  { label: 'À propos', href: '#a-propos' },
  { label: 'Contact', href: '#contact' },
]

export default function DeskNav() {
  const [scrolled, setScrolled] = useState(false)

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
        backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0)',
        boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.08)' : '0 0 0 rgba(0,0,0,0)',
        color: scrolled ? '#1a1a1a' : '#ffffff',
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="flex items-center justify-center gap-10 px-8 py-4">
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
    </motion.nav>
  )
}