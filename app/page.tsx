'use client'
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import '@/app/ui/styles/slides.css';
import LandingSection from "./ui/components/landingSection";
import ScrollSection from "./ui/components/scroll-section";
import ScrollHorizontal from "./ui/components/scroll-horizontal";
import { cinzel } from "./ui/fonts";
import Header from "./ui/components/header";
import Slides from "./ui/components/slides";
import Footer from "./ui/components/footer";


export default function Home() {

  return (
    <main className="">
       <Header id="home"/> 
      <Slides />
      <Footer /> 
    </main>
  );
}