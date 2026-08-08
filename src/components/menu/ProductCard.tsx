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
      whileHover={{ y: -12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group cursor-pointer relative bg-white rounded-[2rem] p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-[0_30px_60px_rgba(94,38,137,0.12)] transition-shadow duration-500 border border-plum/5 ${
        featured ? "lg:flex-row items-center gap-8 md:col-span-1" : "h-full min-h-[400px]"
      }`}
    >
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow/10 to-plum/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Container - Editorial style (image breaks bounds slightly) */}
      <div className={`relative flex items-center justify-center ${featured ? "w-full lg:w-1/2 h-[250px]" : "h-[200px] mt-4"} z-10`}>
        <div className="absolute inset-0 bg-plum/5 rounded-full blur-2xl group-hover:bg-yellow/20 transition-colors duration-500" />
        <motion.img
          src={product.image}
          alt={product.name}
          className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-[0.22,1,0.36,1]"
        />
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-end z-10 ${featured ? "w-full lg:w-1/2 mt-6 lg:mt-0" : "mt-8 flex-1"}`}>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-display text-2xl font-black text-plum group-hover:text-yellow transition-colors duration-300">
              {product.name}
            </h3>
            {product.arabicName && (
              <p className="font-arabic text-plum/60 mt-1">{product.arabicName}</p>
            )}
          </div>
          <span className="font-display text-xl font-bold text-plum shrink-0 bg-plum/5 px-3 py-1 rounded-full">
            AED {product.price}
          </span>
        </div>
        <p className="text-plum/70 text-sm mt-4 line-clamp-3 leading-relaxed font-medium">
          {product.description}
        </p>
        
        <div className="mt-6 flex items-center gap-2 text-plum font-bold text-xs uppercase tracking-widest overflow-hidden">
          <motion.span 
            className="inline-block relative"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Explore Flavor →
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};
