import React from "react";
import { motion } from "framer-motion";
import { Product } from "../../data/menuData";
import { useLanguage } from "../../i18n/LanguageContext";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, featured }) => {
  const { language, t } = useLanguage();
  return (
    <div className="relative">
      {/* Heart Icon (like the reference) */}
      <button className={`absolute top-6 right-6 z-20 transition-colors ${featured ? 'text-white/50 hover:text-white' : 'text-plum/30 hover:text-plum'}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      <motion.div
        onClick={() => onClick(product)}
        whileHover="hover"
        initial="initial"
        className={`group cursor-pointer relative rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_rgba(94,38,137,0.12)] ${
          featured 
            ? "bg-plum-dark text-white lg:flex-row items-center gap-8 md:col-span-full xl:col-span-2 min-h-[250px]" 
            : "bg-white border border-plum/5 h-full min-h-[420px]"
        }`}
      >
        {/* Yellow accent reveal on hover (Only for regular cards) */}
        {!featured && (
          <motion.div 
            variants={{
              initial: { opacity: 0, x: -10 },
              hover: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-0 left-0 w-1.5 h-16 bg-yellow rounded-br-lg" 
          />
        )}

        {/* Subtle background glow on hover */}
        <div className={`absolute inset-0 pointer-events-none ${featured ? 'bg-gradient-to-br from-white/5 to-transparent' : 'bg-gradient-to-br from-cream/40 to-white/90'}`} />

        {/* Card translateY effect is handled by framer-motion variants on the main div */}
        <motion.div 
          variants={{
            initial: { y: 0 },
            hover: { y: -6 }
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 w-full h-full flex ${featured ? 'flex-col-reverse lg:flex-row items-center justify-between' : 'flex-col'}`}
        >
          {/* Content */}
          <div className={`flex flex-col justify-end z-10 ${featured ? "w-full lg:w-1/2 mt-6 lg:mt-0" : "mt-8 flex-1 order-last"}`}>
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="mb-2">
                  <span className={`text-[9px] font-display font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full ${featured ? 'bg-plum border border-white/20 text-yellow' : 'bg-yellow/20 text-plum-dark'}`}>
                    {featured ? 'Signature' : 'Chef\'s Pick'}
                  </span>
                </div>
                <h3 className={`font-display text-[clamp(20px,2vw,28px)] font-black transition-colors duration-400 ${featured ? 'text-white' : 'text-plum'}`}>
                  {language === "AR" && product.arabicName ? product.arabicName : product.name}
                </h3>
                {language === "EN" && product.arabicName && (
                  <p className={`font-body mt-0.5 text-sm ${featured ? 'text-white/60' : 'text-plum/50'}`}>{product.arabicName}</p>
                )}
                {language === "AR" && (
                  <p className={`font-body mt-0.5 text-sm ${featured ? 'text-white/60' : 'text-plum/50'}`}>{product.name}</p>
                )}
              </div>
            </div>
            
            <p className={`text-sm md:text-base mt-3 line-clamp-2 leading-relaxed font-medium ${featured ? 'text-white/80' : 'text-text-secondary'}`}>
              {language === "AR" && product.arabicDescription ? product.arabicDescription : product.description}
            </p>
            
            <div className="mt-6 flex items-center gap-6">
              <span className={`font-display text-[18px] md:text-[22px] font-bold ${featured ? 'text-yellow' : 'text-plum-dark'}`}>
                AED {product.price}
              </span>
              <motion.div 
                variants={{
                  initial: { opacity: 0.9, x: 0 },
                  hover: { opacity: 1, x: language === "AR" ? -5 : 5 }
                }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-2 font-display font-bold text-[10px] md:text-[11px] tracking-wider uppercase px-4 py-2 rounded-full shadow-sm group-hover:shadow-md ${featured ? 'bg-yellow text-plum-dark' : 'bg-yellow text-plum-dark'}`}
              >
                {language === "AR" ? "عرض التفاصيل" : "VIEW DETAILS"} 
                <span className={`text-lg leading-none mt-[-2px] ${language === "AR" ? 'rotate-180' : ''}`}>→</span>
              </motion.div>
            </div>
          </div>

          {/* Image Container */}
          <div className={`relative flex items-center justify-center ${featured ? "w-full lg:w-[45%] h-[200px] lg:h-[280px]" : "h-[200px] md:h-[260px] lg:h-[285px] mt-2"} z-10`}>
            <div className={`absolute inset-0 rounded-full blur-[40px] transition-colors duration-500 ${featured ? 'bg-yellow/10 group-hover:bg-yellow/20' : 'bg-plum/5 group-hover:bg-plum/10'}`} />
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
        </motion.div>
      </motion.div>
    </div>
  );
};

