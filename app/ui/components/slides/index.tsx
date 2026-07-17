'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cinzel } from '../../fonts'
import { FaInstagram } from 'react-icons/fa'
import ImageSlider from './imageSlider'

export interface PropsType {
    url: string,
    title: string,
}

export interface Slide {
    url: string;
    title: string;
}

export default function Slides() {

    const slides: Slide[] = [
        { url: '/744657735_2449638908862477_3520232296819307297_n.jpg', title: 'Photo 1' },
        { url: '/745621991_28183378918023659_7689868071902929136_n.jpg', title: 'Photo 2' },
        { url: '/747723307_1585445749963260_4212395155748312337_n.jpg', title: 'Photo 3' },
    ];

    const containerStyles = {
        width: "500px",
        height: "280px",
        margin: "0 auto",
    }

    return (
        <div>
            <section className="slide1 z-1">

                <motion.div
                    className='flex flex-col w-fit justify-items-center'
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}>
                    <div className='justify-items-center'>
                        <h4 className={`${cinzel.className}
                       max-w-xs font-semibold leading-10 tracking-tight text centertext-black dark:text-zinc-500`}>
                            Aesteria - Photographe
                        </h4>
                        <div style={containerStyles}>
                            <ImageSlider slides={slides} />
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.85, y: 1 }}
                        transition={{ type: "spring" }}
                        className='justify-items-center my-4'
                    >
                        <a
                            className="flex h-12 w-fit items-center  gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
                            href="https://www.instagram.com/aesteria.photo/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram />
                            <p>Instagram</p>
                        </a>
                    </motion.button>

                </motion.div>

            </section>
            {/* <section className='backG flex flex-col'>
                <motion.div className="text-center  h-screen">
                    <p>À bientôt !</p>
                </motion.div>
            </section> */}

            {/* <section className="scroll-h">
        <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 100}} transition={{ duration: 0.8 }} className="">
          peut-être
        </motion.div>
      </section>
      <section className="slide3">
        <motion.div className="">
          non
        </motion.div>
      </section><section className="slide4">
        <motion.div className="">
          oui
        </motion.div>
      </section>
       */}
        </div>
    )
}
