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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="absolute inset-0 bg-plum/40 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 bg-beige/50 backdrop-blur-md p-3 rounded-full shadow-sm hover:bg-beige transition-colors text-plum"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-plum/5 relative flex items-center justify-center p-12 min-h-[400px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,38,137,0.1)_0%,transparent_70%)]" />
              <motion.img
                initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                src={product.image}
                alt={product.name}
                className="relative max-h-full max-w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              />
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {product.arabicName && (
                  <p className="font-arabic text-2xl text-plum/60 mb-2">{product.arabicName}</p>
                )}
                <h2 className="font-display text-4xl md:text-6xl font-black text-plum mb-6 leading-none">
                  {product.name}
                </h2>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="font-display text-3xl font-bold text-yellow bg-plum/5 px-4 py-2 rounded-2xl">
                    AED {product.price}
                  </div>
                </div>

                <div className="w-16 h-1 bg-yellow mb-8 rounded-full" />
                
                <p className="text-text-secondary text-lg leading-relaxed mb-10 font-medium">
                  {product.description}
                </p>

                {/* Return to menu / Close Action */}
                <button 
                  onClick={onClose}
                  className="w-full md:w-auto px-10 py-4 bg-white border-2 border-plum text-plum font-bold tracking-[0.15em] text-sm uppercase rounded-full hover:bg-plum hover:text-white transition-colors duration-300 shadow-sm"
                >
                  Return to Menu
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
