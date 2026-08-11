'use client'
import React from 'react'
import '../../ui/styles/globals.css'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mt-7'>
      {children}
    </div>
  )
}
