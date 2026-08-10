import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { useLanguage } from "../i18n/LanguageContext";
import teacupImg from "../assets/wahad_teacup.png";
import burgerImg from "../assets/wahad_burger.png";
import cheeseImg from "../assets/cheese_dripping.png";
import friesImg from "../assets/loaded_fries.png";

interface GalleryItem {
  image: string;
  tag: string;
  handle: string;
}

const galleryImages = [teacupImg, cheeseImg, burgerImg, friesImg];

export function Gallery() {
  const { t, language } = useLanguage();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const galleryItems = useMemo(() => {
    const items = t('about.gallery.items') as Array<{ tag: string }>;
    return items.map((item, index) => ({
      image: galleryImages[index % galleryImages.length],
      tag: item.tag,
      handle: language === 'AR' ? "@واحد_شاي" : "@wahadshay"
    }));
  }, [t, language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "ArrowLeft") {
        setActiveIdx(activeIdx === 0 ? galleryItems.length - 1 : activeIdx - 1);
      } else if (e.key === "ArrowRight") {
        setActiveIdx(activeIdx === galleryItems.length - 1 ? 0 : activeIdx + 1);
      } else if (e.key === "Escape") {
        setActiveIdx(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx === 0 ? galleryItems.length - 1 : activeIdx - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx === galleryItems.length - 1 ? 0 : activeIdx + 1);
    }
  };

  return (
    <section id="gallery" className="pt-[160px] md:pt-[200px] pb-24 md:pb-32 bg-neutral-ivory relative overflow-hidden select-none">
      {/* Background radial soft gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,38,137,0.02),transparent_65%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
            {t('about.gallery.badge')}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-text-primary">
            <span className="text-shimmer">{t('about.gallery.title')}</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-body">
            {t('about.gallery.subtitle1')}<span className="text-plum font-semibold">{t('about.gallery.subtitle2')}</span>.
          </p>
        </div>

        {/* Dynamic Animated Gallery Grid (Modern Bento Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-6 lg:h-[650px]">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              onClick={() => setActiveIdx(idx)}
              className={`premium-card overflow-hidden group relative flex items-center justify-center p-8 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[28px] ${
                idx === 0 ? "lg:col-span-2 lg:row-span-1 h-[320px] lg:h-auto" :
                idx === 1 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 h-[320px] lg:h-auto" :
                "lg:col-span-1 lg:row-span-1 h-[320px] lg:h-auto"
              }`}
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-plum/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image asset with dynamic scale zoom on card hover */}
              <motion.img
                src={item.image}
                alt={item.tag}
                className={`max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] z-10 ${
                  idx === 1 ? "max-h-[55%] lg:max-h-[65%]" : "max-h-[65%] lg:max-h-[75%]"
                }`}
                whileHover={{ scale: 1.15, rotate: idx % 2 === 0 ? 3 : -3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {/* Hover Dark Overlay showing Instagram logo and metadata */}
              <div className="absolute inset-0 bg-plum/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-4 z-20 backdrop-blur-[4px]">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="rounded-full bg-white/20 p-4 border border-white/30 text-yellow shadow-2xl"
                >
                  <FaInstagram size={28} />
                </motion.div>
                <div className="text-center transform translate-y-6 group-hover:translate-y-0 transition-transform duration-400 ease-out">
                  <span className="font-display text-lg md:text-xl font-black text-white block tracking-wide">
                    {item.tag}
                  </span>
                  <span className="font-body text-[12px] text-white/80 tracking-widest uppercase block mt-1.5">
                    {item.handle}
                  </span>
                </div>
                <div className={`flex items-center gap-2 text-yellow text-[10px] md:text-[11px] font-bold uppercase tracking-widest pt-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-400 ease-out delay-75 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                  <ZoomIn size={14} />
                  <span>{t('about.gallery.viewStory')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Full Screen Viewer Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <div 
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-plum-dark/95 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer z-50 animate-fade-in"
            >
              <X size={20} />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-6 p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer z-50 animate-fade-in"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Lightbox Center Image Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full h-[60vh] flex flex-col items-center justify-center p-8 premium-card border-neutral-border bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[activeIdx].image}
                alt={galleryItems[activeIdx].tag}
                className="max-h-[80%] max-w-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              />
              
              <div className="text-center mt-6 space-y-1 font-body">
                <span className="font-display text-lg font-bold text-text-primary block">
                  {galleryItems[activeIdx].tag}
                </span>
                <span className="text-xs text-text-secondary">
                  {galleryItems[activeIdx].handle}
                </span>
              </div>
            </motion.div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-6 p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer z-50 animate-fade-in"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default Gallery;
