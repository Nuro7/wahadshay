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
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-6xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        {/* Category Title & Intro */}
        <div className="flex-1 text-center md:text-left z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-5xl md:text-7xl font-black text-text-primary tracking-tight uppercase"
          >
            {category.name}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, w: 0 }}
            animate={{ opacity: 1, w: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-yellow to-transparent mt-4 w-3/4 mx-auto md:mx-0"
          />
        </div>

        {/* 3D Food Presentation */}
        <div className="flex-1 w-full">
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
