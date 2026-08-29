import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { useLanguage } from "../i18n/LanguageContext";

import miniBitesImg from "../assets/mini_bites.webp";
import juicyDipImg from "../assets/juicy_dip.webp";
import hotChickenImg from "../assets/hot_chicken.webp";
import hotChickenBurgerImg from "../assets/hot_chicken_burger.webp";
import hotChickenRiceImg from "../assets/hot_chicken_rice.webp";

export interface MediaItem {
  id: string;
  type: "reel" | "photo";
  src?: string; // High-res image for photo lightbox
  thumbnail: string;
  instagramUrl: string;
  titleEn?: string;
  titleAr?: string;
  subtitleEn?: string;
  subtitleAr?: string;
  tagEn?: string;
  tagAr?: string;
}

// 9 Reels + 1 Photo as requested
const mediaItems: MediaItem[] = [
  {
    id: "reel-1",
    type: "reel",
    thumbnail: hotChickenBurgerImg, // Fallback thumbnail
    instagramUrl: "https://www.instagram.com/reel/DclkzVJICXl/",
  },
  {
    id: "reel-2",
    type: "reel",
    thumbnail: juicyDipImg,
    instagramUrl: "https://www.instagram.com/reel/DcQKf_ZsW_7/",
  },
  {
    id: "reel-3",
    type: "reel",
    thumbnail: hotChickenImg,
    instagramUrl: "https://www.instagram.com/reel/Db7xZfxs7Q_/",
  },
  {
    id: "reel-4",
    type: "reel",
    thumbnail: miniBitesImg,
    instagramUrl: "https://www.instagram.com/reel/DbgYW-fM9y-/",
  },
  {
    id: "reel-5",
    type: "reel",
    thumbnail: hotChickenRiceImg,
    instagramUrl: "https://www.instagram.com/reel/DauWVdlKerE/",
  },
  {
    id: "reel-6",
    type: "reel",
    thumbnail: hotChickenImg,
    instagramUrl: "https://www.instagram.com/reel/DbI0f8-s2DD/",
  },
  {
    id: "reel-7",
    type: "reel",
    thumbnail: juicyDipImg,
    instagramUrl: "https://www.instagram.com/reel/DaDelTjo8IS/",
  },
  {
    id: "reel-8",
    type: "reel",
    thumbnail: miniBitesImg,
    instagramUrl: "https://www.instagram.com/reel/DZnDl69NLhb/",
  },
  {
    id: "reel-9",
    type: "reel",
    thumbnail: hotChickenBurgerImg,
    instagramUrl: "https://www.instagram.com/reel/DYrM6W0uwht/",
  },
  {
    id: "photo-1",
    type: "photo",
    src: miniBitesImg,
    thumbnail: miniBitesImg,
    instagramUrl: "https://www.instagram.com/wahadshay.ae/",
    titleEn: "Mini Bites Selection",
    titleAr: "تشكيلة ميني بايتس",
    subtitleEn: "Perfect Companions to Chai",
    subtitleAr: "الرفيق المثالي لكوب الشاي",
    tagEn: "SIGNATURE BITES",
    tagAr: "ميني بايتس"
  }
];

export function Gallery() {
  const { t, language } = useLanguage();
  const [activePhoto, setActivePhoto] = useState<MediaItem | null>(null);

  // Keyboard navigation for photo lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === "Escape") setActivePhoto(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto]);

  // Determine grid span based on index to create asymmetric masonry
  const getGridClasses = (index: number) => {
    switch (index) {
      case 0: return "lg:col-span-2 lg:row-span-2 aspect-[4/5] lg:aspect-auto"; // Featured large reel
      case 1: return "lg:col-span-1 lg:row-span-2 aspect-[3/4] lg:aspect-auto"; // Tall reel
      case 2: return "lg:col-span-1 lg:row-span-1 aspect-square lg:aspect-auto"; // Square
      case 3: return "lg:col-span-1 lg:row-span-1 aspect-square lg:aspect-auto"; // Square
      case 4: return "lg:col-span-2 lg:row-span-1 aspect-video lg:aspect-auto"; // Wide
      case 5: return "lg:col-span-1 lg:row-span-2 aspect-[3/4] lg:aspect-auto"; // Tall reel
      case 6: return "lg:col-span-1 lg:row-span-1 aspect-square lg:aspect-auto"; // Square
      case 7: return "lg:col-span-2 lg:row-span-2 aspect-[4/5] lg:aspect-auto"; // Large secondary
      case 8: return "lg:col-span-1 lg:row-span-1 aspect-square lg:aspect-auto"; // Square
      case 9: return "lg:col-span-1 lg:row-span-1 aspect-square lg:aspect-auto"; // Square
      default: return "lg:col-span-1 lg:row-span-1 aspect-square lg:aspect-auto";
    }
  };

  return (
    <section id="gallery" className="section-padding bg-neutral-ivory relative overflow-hidden select-none">
      
      {/* Background Subtle Line Art Texture */}
      <div className="absolute inset-0 food-pattern-bg opacity-[0.04] pointer-events-none" />
      
      <div className="premium-container relative z-10 space-y-10 md:space-y-16">
        
        {/* SECTION HEADER: Minimal & Editorial */}
        <div className="reveal text-center max-w-2xl mx-auto space-y-4">
          
          <div className="flex items-center justify-center gap-3">
            <span className="typo-eyebrow text-plum tracking-[0.2em] font-semibold">
              {t("about.gallery.badge") || "VISUAL JOURNAL"}
            </span>
          </div>

          <h2 className="typo-section-title text-text-primary text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {language === "AR" ? "لمحة من قصتنا" : "A Taste of Our Story"}
          </h2>

          <p className="typo-body text-text-secondary md:text-lg">
            {t("about.gallery.tasteSubtitle") || "Tea, craft, and moments shared."}
          </p>
        </div>

        {/* ASYMMETRIC MASONRY GALLERY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[300px] gap-4 sm:gap-6">
          {mediaItems.map((item, index) => {
            const isReel = item.type === "reel";
            
            return (
              <div
                key={item.id}
                onClick={() => !isReel && setActivePhoto(item)}
                className={`group relative overflow-hidden rounded-[2rem] bg-white border border-neutral-border/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(94,38,137,0.12)] transition-all duration-500 block ${getGridClasses(index)} ${!isReel ? 'cursor-pointer' : ''}`}
              >
                {isReel ? (
                  /* REEL ITEM (Direct Link) */
                  <a
                    href={item.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 block w-full h-full"
                    aria-label="Open Instagram Reel"
                  >
                    <img
                      src={item.thumbnail}
                      alt="Instagram Reel"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                    
                    {/* Top Instagram Indicator */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white/90">
                        <FaInstagram size={14} />
                      </div>
                    </div>

                    {/* Center Elegant Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white flex items-center justify-center group-hover:bg-yellow group-hover:border-yellow group-hover:text-plum-dark transition-all duration-500 group-hover:scale-110 shadow-lg">
                        <Play size={24} fill="currentColor" className="translate-x-0.5" />
                      </div>
                    </div>
                  </a>
                ) : (
                  /* PHOTO ITEM (Lightbox trigger) */
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={item.thumbnail}
                      alt={language === "AR" ? item.titleAr : item.titleEn}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                    
                    {/* Subtle Photo Indicator */}
                    <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-plum-dark text-sm font-semibold flex items-center gap-2 shadow-lg">
                        <ImageIcon size={16} />
                        <span>{language === "AR" ? "عرض الصورة" : "View Photo"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM INSTAGRAM CTA */}
        <div className="reveal mt-12 sm:mt-16 bg-white border border-neutral-border/60 rounded-[2rem] p-8 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start max-w-4xl mx-auto">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-plum/5 text-plum flex items-center justify-center flex-shrink-0">
              <FaInstagram size={24} />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-text-primary mb-1">
                {language === "AR" ? "تابع رحلتنا" : "Follow Our Journey"}
              </h4>
              <p className="text-text-secondary text-sm sm:text-base">
                {language === "AR" ? "المزيد من اللحظات والتحديثات عبر إنستغرام." : "More moments, behind the scenes & fresh updates on Instagram."}
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/wahadshay.ae/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-plum hover:bg-plum-dark text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-3 flex-shrink-0"
          >
            <span>{language === "AR" ? "متابعة @wahadshay.ae" : "Follow @wahadshay.ae"}</span>
            <ExternalLink size={16} />
          </a>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX FOR PHOTOS ONLY */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl"
            onClick={() => setActivePhoto(null)} // Close when clicking backdrop
          >
            {/* Top Bar Controls */}
            <div className="absolute top-0 inset-x-0 w-full flex items-center justify-end p-6 z-20">
              <button
                onClick={(e) => { e.stopPropagation(); setActivePhoto(null); }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X size={24} />
              </button>
            </div>

            {/* Photo Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
            >
              <img
                src={activePhoto.src}
                alt={language === "AR" ? activePhoto.titleAr : activePhoto.titleEn}
                className="max-w-full max-h-[85vh] object-contain drop-shadow-2xl rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default Gallery;
