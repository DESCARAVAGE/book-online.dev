'use client'
import React from 'react'
import DeskNav from './desk-nav'
import MobNav from './mob-nav'

export default function NavBar() {
  return (
    <>
      {/* Desktop : visible à partir de 901px */}
      <div className="hidden min-[901px]:block">
        <DeskNav />
      </div>

      {/* Mobile : visible jusqu'à 900px */}
      <div className="block min-[901px]:hidden">
        <MobNav />
      </div>
    </>
  )
}