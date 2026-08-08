import React from "react";
import { motion } from "framer-motion";

export const MenuHero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-plum opacity-5 pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-plum/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-yellow/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <h1 className="font-display text-6xl md:text-8xl font-black text-plum tracking-tight">
            OUR MENU
          </h1>
          <p className="font-body text-xl md:text-2xl text-text-secondary font-medium tracking-wide">
            One Cup. Many Stories.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
