import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import teacupImg from "../../assets/wahad_teacup.png";

export const MenuHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="relative pt-32 pb-16 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background aesthetics */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 bg-plum opacity-5 pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-plum/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-yellow/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-64 h-64 md:w-80 md:h-80 mb-8"
          style={{ y: yImage }}
        >
          <img src={teacupImg} alt="Wahad Shay Teacup" className="w-full h-full object-contain drop-shadow-2xl" />
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -top-4 -right-8 w-24 h-24 bg-yellow/40 rounded-full blur-2xl z-[-1]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <h1 className="font-display text-6xl md:text-8xl font-black text-plum tracking-tight uppercase drop-shadow-lg">
            Our Menu
          </h1>
          <p className="font-body text-xl md:text-3xl text-plum/80 font-medium tracking-wide">
            One Cup. Many Stories.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
