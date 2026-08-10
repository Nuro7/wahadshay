import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Play, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

import teacupImg from "../assets/wahad_teacup.png";
import burgerImg from "../assets/wahad_burger.png";
import cheeseImg from "../assets/cheese_dripping.png";
import friesImg from "../assets/loaded_fries.png";

type MediaType = 'image' | 'video';

interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  label: string;
  actionText: string;
  width: string;
  height: string;
}

const mediaItems: MediaItem[] = [
  { id: '1', type: 'image', src: teacupImg, label: 'TEA', actionText: 'VIEW STORY', width: 'w-[280px] md:w-[320px]', height: 'h-[400px] md:h-[450px]' },
  { id: '2', type: 'image', src: cheeseImg, label: 'BAKERY', actionText: 'VIEW STORY', width: 'w-[280px] md:w-[320px]', height: 'h-[360px] md:h-[400px]' },
  { id: '3', type: 'image', src: burgerImg, label: 'CAFE', actionText: 'VIEW STORY', width: 'w-[260px] md:w-[280px]', height: 'h-[380px] md:h-[420px]' },
  { id: '4', type: 'video', src: '/home.mp4', label: 'ATMOSPHERE', actionText: 'WATCH', width: 'w-[320px] md:w-[480px]', height: 'h-[400px] md:h-[500px]' },
  { id: '5', type: 'image', src: friesImg, label: 'CRAFT', actionText: 'VIEW STORY', width: 'w-[260px] md:w-[300px]', height: 'h-[380px] md:h-[420px]' },
  { id: '6', type: 'video', src: '/home1.mp4', label: 'CULTURE', actionText: 'WATCH', width: 'w-[300px] md:w-[380px]', height: 'h-[400px] md:h-[460px]' },
  { id: '7', type: 'image', src: teacupImg, label: 'MOMENTS', actionText: 'VIEW STORY', width: 'w-[280px] md:w-[320px]', height: 'h-[400px] md:h-[450px]' },
  { id: '8', type: 'image', src: cheeseImg, label: 'TASTE', actionText: 'VIEW STORY', width: 'w-[260px] md:w-[300px]', height: 'h-[360px] md:h-[420px]' },
];

export function Gallery() {
  const { t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0 });
  const x = useMotionValue(0);

  // Calculate dynamic bounds for dragging
  useEffect(() => {
    const updateBounds = () => {
      if (carouselRef.current && innerRef.current) {
        setDragBounds({
          left: -innerRef.current.scrollWidth + carouselRef.current.offsetWidth - 48, // 48 is padding allowance
          right: 0
        });
      }
    };
    
    updateBounds();
    window.addEventListener('resize', updateBounds);
    
    // Add small delay for fonts/images loading to recalculate
    setTimeout(updateBounds, 500);
    
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  // Map the x drag value to a progress width (0 to 100%)
  const progressWidth = useTransform(x, [dragBounds.left, 0], ["100%", "0%"]);

  return (
    <section id="gallery" className="pt-32 md:pt-40 pb-24 md:pb-32 bg-neutral-ivory relative overflow-hidden select-none">
      
      {/* Header Area */}
      <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4 px-6 relative z-10">
        <h2 className="font-display text-3xl md:text-5xl font-black text-text-primary tracking-tight">
          A TASTE OF OUR STORY
        </h2>
        <p className="text-text-secondary text-sm md:text-base font-body">
          Tea, craft, and moments shared.
        </p>
      </div>

      {/* Cinematic Media Reel */}
      <div className="w-full max-w-[100vw] overflow-x-hidden relative z-10">
        <div ref={carouselRef} className="overflow-hidden w-full max-w-[100vw] cursor-grab active:cursor-grabbing px-4 sm:px-6 md:px-12">
          <motion.div
            ref={innerRef}
            drag="x"
            dragConstraints={dragBounds}
            style={{ x }}
            dragElastic={0.15}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            className="flex items-center gap-4 md:gap-6 w-max py-8"
          >
            {mediaItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04 }}
                onClick={() => {
                  if (item.type === 'video') setActiveVideo(item);
                }}
                className={`relative overflow-hidden rounded-[20px] shadow-sm hover:shadow-2xl transition-all duration-500 bg-white/50 border border-white/60 group shrink-0 flex items-center justify-center ${item.width} ${item.height}`}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.label}
                    className="max-h-[75%] max-w-[85%] object-contain filter drop-shadow-xl z-0 pointer-events-none"
                    draggable={false}
                  />
                ) : (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-105 z-0 opacity-90 pointer-events-none"
                  />
                )}

                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-plum-dark/80 via-plum-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 pointer-events-none">
                  <div className="w-12 h-12 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center mb-4">
                    <Play size={18} className="text-yellow ml-1" fill="currentColor" />
                  </div>
                  <span className="font-display font-black text-white text-lg tracking-widest uppercase">
                    {item.label}
                  </span>
                  <span className="font-body font-semibold text-[10px] text-yellow tracking-[0.2em] uppercase mt-2">
                    {item.actionText}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 mt-12 flex items-center gap-6 justify-center relative z-10 opacity-70">
        <span className="font-numbers text-xs font-bold text-plum-dark">01</span>
        <div className="h-[2px] w-full max-w-[200px] bg-plum/10 rounded-full overflow-hidden relative">
          <motion.div 
            style={{ width: progressWidth, transformOrigin: "right" }}
            className="absolute right-0 top-0 bottom-0 bg-plum-dark rounded-full"
          />
        </div>
        <span className="font-numbers text-xs font-bold text-plum-dark">08</span>
      </div>

      {/* Custom Fullscreen Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-plum-dark/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl aspect-video px-4 md:px-8"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
              
              <div className="w-full h-full rounded-[24px] overflow-hidden bg-black shadow-2xl border border-white/10">
                <video
                  src={activeVideo.src}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
