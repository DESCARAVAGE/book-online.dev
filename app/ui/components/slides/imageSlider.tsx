'use client'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface Slide {
    url: string;
    title: string;
}

export interface ImageSliderProps {
    slides?: Slide[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

export default function ImageSlider({
    slides = [],
    autoPlay = true,
    autoPlayInterval = 4000,
}: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        if (slides.length === 0) return;
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        if (slides.length === 0) return;
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Recale l'index si le tableau de slides change de taille (évite un index hors limites)
    useEffect(() => {
        if (currentIndex >= slides.length) {
            setCurrentIndex(0);
        }
    }, [slides, currentIndex]);

    // Défilement automatique
    useEffect(() => {
        if (!autoPlay || slides.length <= 1) return;

        const interval = setInterval(() => {
            goToNext();
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [currentIndex, autoPlay, autoPlayInterval, slides.length]);

    // Garde principale : rien à afficher si pas de slides
    if (slides.length === 0) {
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <p>Aucune photo trouvée</p>
            </div>
        );
    }

    const sliderStyles: React.CSSProperties = {
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
    };

    const slideStyles: React.CSSProperties = {
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center -3rem",
        backgroundSize: "cover",
    };

    // const leftArrowStyle: React.CSSProperties = {
    //     position: 'absolute',
    //     top: '50%',
    //     transform: 'translate(0, -50%)',
    //     left: '8px',
    //     fontSize: "16px",
    //     color: "#fff",
    //     zIndex: 2,
    //     cursor: "pointer",
    // };

    // const rightArrowStyle: React.CSSProperties = {
    //     position: 'absolute',
    //     top: '50%',
    //     transform: 'translate(0, -50%)',
    //     right: '8px',
    //     fontSize: "16px",
    //     color: "#fff",
    //     zIndex: 2,
    //     cursor: "pointer",
    // };

    return (
        <div style={sliderStyles}>
            {/* <div onClick={goToPrevious} style={leftArrowStyle}>&#10094;</div>
            <div onClick={goToNext} style={rightArrowStyle}>&#10095;</div> */}

            <AnimatePresence mode="sync">
                <motion.div
                    key={currentIndex}
                    style={{
                        ...slideStyles,
                        backgroundImage: `url(${slides[currentIndex].url})`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            </AnimatePresence>
        </div>
    )
}