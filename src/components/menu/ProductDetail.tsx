import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../../data/menuData";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-plum/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-neutral-bg transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-neutral-bg relative flex items-center justify-center p-12 min-h-[300px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,38,137,0.08)_0%,transparent_70%)]" />
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                src={product.image}
                alt={product.name}
                className="relative max-h-full max-w-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {product.arabicName && (
                  <p className="font-arabic text-xl text-text-secondary mb-2">{product.arabicName}</p>
                )}
                <h2 className="font-display text-3xl md:text-5xl font-black text-plum mb-4 leading-tight">
                  {product.name}
                </h2>
                <div className="font-numbers text-3xl font-extrabold text-yellow mb-6">
                  AED {product.price}
                </div>
                <div className="w-12 h-1 bg-yellow/30 mb-6" />
                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                  {product.description}
                </p>

                <button className="w-full py-4 bg-plum text-white font-bold tracking-widest uppercase rounded-full hover:bg-plum-dark transition-colors shadow-lg shadow-plum/20">
                  Add To Order
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
