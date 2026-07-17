'use client'
import React from 'react'
import  { motion } from "framer-motion";
import "../styles/landingSection.css";
import { cinzel } from "../fonts";
import { FaInstagram } from "react-icons/fa";


function LandingSection() {
  return (
    <div className="bg-black h-screen w-screen">
      {/* <h3 className="font-bold">oui</h3> */}
      <div className='h-screen w-content flex-col w-fit '>
          <h4 className={`${cinzel.className} max-w-xs  font-semibold leading-10 tracking-tight text-black dark:text-zinc-50`}>
            Aesteria - Photographe
          </h4>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              href="https://www.instagram.com/aesteria.photo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
              <p>Instagram</p>
            </a>
          </div>
          
        </div>
    </div>
  )
}

export default LandingSection;
