import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import burgerImg from "../../assets/wahad_burger.png";

export const MenuHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const rotateImage = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <div ref={containerRef} className="relative pt-32 pb-16 md:pt-32 md:pb-32 overflow-hidden flex flex-col justify-center bg-beige">
      {/* Background aesthetics */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 bg-plum/5 pointer-events-none" />

      {/* Organic Background Shapes */}
      <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-plum rounded-full blur-[80px] opacity-20 pointer-events-none" />

      {/* The main container */}
      <div className="relative z-10 px-6 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-8">

        {/* Left Side: Text Content (40%) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-[40%] flex flex-col text-left space-y-6 pt-10 md:pt-0 z-20"
        >
          <div className="inline-flex items-center gap-4">
            <span className="h-px w-8 bg-yellow" />
            <span className="text-yellow text-sm font-bold uppercase tracking-[0.2em]">Explore Our Menu</span>
            <span className="h-px w-8 bg-yellow" />
          </div>

          <h1 className="font-display text-6xl md:text-[clamp(90px,10vw,140px)] font-black leading-[0.9] uppercase tracking-tight flex flex-col mb-6">
            <span className="text-plum">Our</span>
            <span className="text-yellow">Menu</span>
          </h1>

          <p className="font-body text-3xl md:text-5xl text-plum mb-6 font-medium tracking-tight">
            One Cup. Many Stories.
          </p>

          <p className="font-body text-lg md:text-xl text-text-secondary max-w-lg leading-relaxed flex flex-col">
            <span>Globally inspired flavors crafted with passion.</span>
            <span>Premium taste at prices for everyone.</span>
          </p>
        </motion.div>

        {/* Right Side: Large Food Composition (60%) */}
        <div className="w-full md:w-[60%] relative flex justify-center items-center mt-12 md:mt-0">

          {/* Yellow Organic Brand Shape */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[300px] md:w-[500px] md:h-[500px] bg-yellow rounded-tl-[40%] rounded-tr-[60%] rounded-bl-[70%] rounded-br-[40%] z-0"
          />

          {/* Main Food Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: yImage, rotateZ: rotateImage }}
            className="relative z-10 w-[120%] md:w-[130%] -ml-[10%] md:-ml-[15%] flex justify-center"
          >
            <img
              src={burgerImg}
              alt="Wahad Shay Burger"
              className="w-full max-w-[400px] md:max-w-[700px] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.3)]"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

