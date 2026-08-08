import React from "react";
import { motion } from "framer-motion";
import { Product } from "../../data/menuData";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, featured }) => {
  return (
    <motion.div
      onClick={() => onClick(product)}
      whileHover="hover"
      initial="initial"
      className={`group cursor-pointer relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 border border-plum/5 ${
        featured ? "lg:flex-row items-center gap-8 md:col-span-1" : "h-full min-h-[420px]"
      }`}
    >
      {/* Yellow accent reveal on hover */}
      <motion.div 
        variants={{
          initial: { opacity: 0, x: -10 },
          hover: { opacity: 1, x: 0 }
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute top-0 left-0 w-1.5 h-16 bg-yellow rounded-br-lg" 
      />

      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream/40 to-white/90 pointer-events-none" />
      
      {/* Animated shadow for the card */}
      <motion.div 
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-3xl shadow-[0_20px_40px_rgba(94,38,137,0.08)] pointer-events-none"
      />

      {/* Card translateY effect is handled by framer-motion variants on the main div */}
      <motion.div 
        variants={{
          initial: { y: 0 },
          hover: { y: -6 }
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full h-full flex flex-col"
      >
        {/* Image Container */}
        <div className={`relative flex items-center justify-center ${featured ? "w-full lg:w-1/2 h-[280px]" : "h-[220px] mt-2"} z-10`}>
          <div className="absolute inset-0 bg-plum/5 rounded-full blur-[40px] group-hover:bg-plum/10 transition-colors duration-500" />
          <motion.img
            src={product.image}
            alt={product.name}
            variants={{
              initial: { scale: 1, y: 0 },
              hover: { scale: 1.05, y: -5 }
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)] will-change-transform"
          />
        </div>

        {/* Content */}
        <div className={`flex flex-col justify-end z-10 ${featured ? "w-full lg:w-1/2 mt-6 lg:mt-0" : "mt-8 flex-1"}`}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="font-display text-[clamp(20px,2vw,28px)] font-black text-plum transition-colors duration-400">
                {product.name}
              </h3>
              {product.arabicName && (
                <p className="font-arabic text-plum/50 mt-0.5 text-sm">{product.arabicName}</p>
              )}
            </div>
          </div>
          
          <p className="text-text-secondary text-sm md:text-base mt-3 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
          
          <div className="mt-6 flex items-center justify-between">
            <span className="font-numbers text-lg font-bold text-plum">
              AED {product.price}
            </span>
            <motion.div 
              variants={{
                initial: { opacity: 0, x: -10 },
                hover: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 text-yellow font-bold text-xs tracking-[0.15em] uppercase"
            >
              VIEW DETAILS <span className="text-lg leading-none">→</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
