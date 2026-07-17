import React from 'react'
import { motion } from 'framer-motion'
import { cinzel } from '../../fonts'
import { FaInstagram } from 'react-icons/fa'

export default function Slides() {
  return (
    <div>
        <section className="slide1">
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0}} transition={{ duration: 0.8 }}>
          <h4 className={`${cinzel.className} max-w-xs  font-semibold leading-10 tracking-tight text center text-black dark:text-black-50`}>
            Aesteria - Photographe
          </h4>
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              href="https://www.instagram.com/aesteria.photo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
              <p>Instagram</p>
            </a>
        </motion.div>
      </section>
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
