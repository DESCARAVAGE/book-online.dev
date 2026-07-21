import React from 'react'
import { motion } from 'framer-motion';
import '@/app/ui/styles/header.css';
import ImageSlider from '../slides/imageSlider';
import { cinzel } from '../../fonts';

export interface Slide {
  url: string;
  title: string;
}

interface HeaderProps {
  id?: string;
}

function index({ id }: HeaderProps) {

  const slides: Slide[] = [
    { url: '/744657735_2449638908862477_3520232296819307297_n.jpg', title: 'Photo 1' },
    { url: '/745621991_28183378918023659_7689868071902929136_n.jpg', title: 'Photo 2' },
    { url: '/747723307_1585445749963260_4212395155748312337_n.jpg', title: 'Photo 3' },
  ];

  const containerStyles = {
    width: "100vw",
    height: "10vh",
    margin: "0 auto",
  }

  return (
    <motion.div id={id} className='header scroll-mt-20' style={{ position: 'relative' }}>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>

      <h1 className={`${cinzel.className}
        absolute inset-0 flex items-center justify-center
        max-w-xs mx-auto font-semibold leading-10 tracking-tight
        text-center text-black-500 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] dark:text-white-500`}>
        Aesteria - Photographe
      </h1>
    </motion.div>
  )
}

export default index