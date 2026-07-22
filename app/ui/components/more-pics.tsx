'use client'
import React from 'react'
import { motion } from 'framer-motion'

export interface CardItem {
    id: number
    title: string
    description: string
}

// Remplace ce tableau par ton vrai contenu (titres, textes, images...)
const cardsData: CardItem[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Titre ${i + 1}`,
    description: 'Courte description de la carte.',
}))

// Palette pastel qui tourne sur les cards pour qu'elles se démarquent
// du fond gris de la page tout en restant harmonieuses entre elles
const bgPalette = [
    '#FDEDEC', // rose pâle
    '#EAF4FB', // bleu pâle
    '#EFF7EC', // vert pâle
    '#FBF3E4', // crème
    '#F1ECF8', // lavande
]

export default function MorePics() {
    return (
        <section className="w-full bg-gray-500 px-4 py-16 md:px-10">
            <div
                className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
                {cardsData.map((card, i) => (
                    <motion.div
                        key={card.id}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                        style={{ backgroundColor: bgPalette[i % bgPalette.length] }}
                        className="flex flex-col gap-2 rounded-2xl p-6
                        shadow-[10px_10px_24px_rgba(13,39,80,0.12),inset_-6px_-6px_16px_rgba(255,255,255,0.9)]
                        cursor-pointer"
                    >
                        <span className="text-xs font-medium tracking-wide text-[#0D2750]/45">
                            {String(card.id).padStart(2, '0')}
                        </span>
                        <h3 className="text-base font-semibold text-[#0D2750]">
                            {card.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#0D2750]/70">
                            {card.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}