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
        // <section className='slide1 z-1'>
        <section className='flex flex-wrap gap-5 justify-center'>
            <a
                className="flex w-fit text-background"
                href={`https://www.instagram.com/${insta}/`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.85, y: 1 }}
                    transition={{ type: "spring" }}
                    className='btn-link justify-items-center'
                >
                    <FaInstagram />
                    <p>Instagram</p>
                </motion.button>
            </a>
            <a
                className="flex w-fit items-center text-background"
                href={`https://www.linkedin.com/in/${linkedin}/`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.85, y: 1 }}
                    transition={{ type: "spring" }}
                    className='btn-link justify-items-center'
                >
                    <FaLinkedin />
                    <p>Linkdin</p>
                </motion.button>
            </a>
        </section>

        // </section>
        // <Grid container spacing={2} sx={{ marginInline: '10vw' }}>
        //     <Grid size={{ xs: 12, md: 6 }} sx={{
        //         display: "flex", justifyContent: 'center', alignItems: 'center'
        //     }}>
        //         <a
        //             className="flex w-fit text-background"
        //             href={`https://www.instagram.com/${insta}/`}
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             <motion.button
        //                 whileHover={{ scale: 1.05, y: -1 }}
        //                 whileTap={{ scale: 0.85, y: 1 }}
        //                 transition={{ type: "spring" }}
        //                 className='btn-link justify-items-center'
        //             >
        //                 <FaInstagram />
        //                 <p>Instagram</p>
        //             </motion.button>
        //         </a>

        //     </Grid>
        //     <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: 'center' }}>
        //         <a
        //             className="flex w-fit items-center text-background"
        //             href={`https://www.linkedin.com/in/${linkedin}/`}
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             <motion.button
        //                 whileHover={{ scale: 1.05, y: -1 }}
        //                 whileTap={{ scale: 0.85, y: 1 }}
        //                 transition={{ type: "spring" }}
        //                 className='btn-link justify-items-center'
        //             >
        //                 <FaLinkedin />
        //                 <p>Linkdin</p>
        //             </motion.button>
        //         </a>
        //     </Grid>
        // </Grid>
    )
}


// <a
//                     className="flex w-fit items-center text-background"
//                     href={`https://www.instagram.com/${insta}/`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     <motion.button
//                         whileHover={{ scale: 1.05, y: -1 }}
//                         whileTap={{ scale: 0.85, y: 1 }}
//                         transition={{ type: "spring" }}
//                         className='btn-link justify-items-center'
//                     >
//                         <FaInstagram />
//                         <p>Instagram</p>
//                     </motion.button>
//                 </a>
//                 <a
//                     className="flex h-12 w-fit items-center text-background"
//                     href={`https://www.linkedin.com/in/${linkedin}/`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     <motion.button
//                         whileHover={{ scale: 1.05, y: -1 }}
//                         whileTap={{ scale: 0.85, y: 1 }}
//                         transition={{ type: "spring" }}
//                         className='btn-link justify-items-center'
//                     >
//                         <FaLinkedin />
//                         <p>Linkdin</p>
//                     </motion.button>
//                 </a>    
{/* <section className="slide1 z-1">

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
    

    </motion.div>

</section> */}
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
