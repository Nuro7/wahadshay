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
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className={`group cursor-pointer relative bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-shadow duration-500 ${
        featured ? "md:col-span-2 md:flex-row items-center gap-8" : "h-[320px]"
      }`}
    >
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow/5 to-plum/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image */}
      <div className={`relative flex items-center justify-center ${featured ? "w-1/2 h-[200px]" : "h-[140px] mt-2"} z-10`}>
        <motion.img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-end z-10 ${featured ? "w-1/2" : "mt-6 flex-1"}`}>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-display text-lg md:text-xl font-black text-text-primary group-hover:text-plum transition-colors duration-300">
              {product.name}
            </h3>
            {product.arabicName && (
              <p className="font-arabic text-sm text-text-secondary mt-1">{product.arabicName}</p>
            )}
          </div>
          <span className="font-numbers text-lg font-extrabold text-plum shrink-0">
            AED {product.price}
          </span>
        </div>
        <p className="text-text-secondary text-sm mt-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-4 flex items-center gap-2 text-yellow font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          View Details <span className="text-lg leading-none">+</span>
        </div>
      </div>
    </motion.div>
  );
};
