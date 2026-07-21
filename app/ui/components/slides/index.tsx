'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cinzel } from '../../fonts'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedin } from "react-icons/fa";
import { Box, Grid } from '@mui/material'
import ImageSlider from './imageSlider'

export interface PropsType {
    url: string,
    title: string,
}

export interface Slide {
    url: string;
    title: string;
}

const insta = "aesteria.photo";
const linkedin = "olivia-ferreira-223444220"

export default function Slides() {

    const slides: Slide[] = [
        { url: '/744657735_2449638908862477_3520232296819307297_n.jpg', title: 'Photo 1' },
        { url: '/745621991_28183378918023659_7689868071902929136_n.jpg', title: 'Photo 2' },
        { url: '/747723307_1585445749963260_4212395155748312337_n.jpg', title: 'Photo 3' },
    ];

    const containerStyles = {
        width: "70vw",
        height: "45vh",
        margin: "0 auto",
    }


    return (
        <>
            <section
                id='galerie'
                className='galerie  flex
                flex-wrap gap-5 content-center 
                justify-center h-screen'>
                galerie
            </section>
            <section id='contact' className='soft-bg flex flex-wrap gap-5 content-center justify-center h-screen'>
                <a
                    className="flex items-center justify-center text-background"
                    href={`https://www.instagram.com/${insta}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.85, y: 1 }}
                        transition={{ type: "spring" }}
                        className='btn-link flex-col gap-2'
                    >
                        <FaInstagram />
                        <p>Instagram</p>
                    </motion.button>
                </a>
                <a
                    className="flex items-center justify-center text-background"
                    href={`https://www.linkedin.com/in/${linkedin}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.85, y: 1 }}
                        transition={{ type: "spring" }}
                        className='btn-link flex-col gap-2'
                    >
                        <FaLinkedin />
                        <p>Linkdin</p>
                    </motion.button>
                </a>
            </section>
            <section
                id='a-propos'
                className='galerie bg-red-500 flex
                flex-wrap gap-5 content-center 
                justify-center h-screen'>
                à propos
            </section>
        </>
    )
}