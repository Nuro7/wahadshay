import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "../../data/menuData";
import { Food3DLayer } from "./Food3DLayer";

interface CategorySceneProps {
  category: Category;
}

export const CategoryScene: React.FC<CategorySceneProps> = ({ category }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.id}
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-6xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16"
      >
        {/* Category Title & Intro */}
        <div className="flex-1 text-center md:text-left z-10">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl md:text-8xl font-black text-plum tracking-tighter uppercase drop-shadow-md"
          >
            {category.name}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-yellow via-yellow/50 to-transparent mt-6 w-1/2 mx-auto md:mx-0 origin-left"
          />
        </div>

        {/* 3D Food Presentation */}
        <div className="flex-1 w-full relative">
          <Food3DLayer 
            image={category.heroImage} 
            alt={category.name} 
            transitionStyle={category.transitionStyle} 
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
