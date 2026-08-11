import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  aspectRatio: string;
}

const mediaItems: MediaItem[] = [
  { id: '1', type: 'image', src: teacupImg, label: 'TEA', actionText: 'VIEW STORY', aspectRatio: 'aspect-[3/4]' },
  { id: '4', type: 'video', src: '/home.mp4', label: 'ATMOSPHERE', actionText: 'WATCH', aspectRatio: 'aspect-[4/3]' },
  { id: '2', type: 'image', src: cheeseImg, label: 'BAKERY', actionText: 'VIEW STORY', aspectRatio: 'aspect-square' },
  { id: '5', type: 'image', src: friesImg, label: 'CRAFT', actionText: 'VIEW STORY', aspectRatio: 'aspect-[4/5]' },
  { id: '6', type: 'video', src: '/home1.mp4', label: 'CULTURE', actionText: 'WATCH', aspectRatio: 'aspect-[3/4]' },
  { id: '3', type: 'image', src: burgerImg, label: 'CAFE', actionText: 'VIEW STORY', aspectRatio: 'aspect-[4/3]' },
  { id: '7', type: 'image', src: teacupImg, label: 'MOMENTS', actionText: 'VIEW STORY', aspectRatio: 'aspect-square' },
  { id: '8', type: 'image', src: cheeseImg, label: 'TASTE', actionText: 'VIEW STORY', aspectRatio: 'aspect-[4/5]' },
];

export function Gallery() {
  const { t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);

  return (
    <section id="gallery" className="section-padding-landing bg-neutral-ivory relative overflow-hidden select-none">
      
      {/* Header Area */}
      <div className="reveal text-center max-w-2xl mx-auto mb-12 md:mb-20 space-y-4 px-6 relative z-10">
        <h2 className="font-display text-3xl md:text-4xl font-black text-text-primary tracking-tight">
          A TASTE OF OUR STORY
        </h2>
        <p className="text-text-secondary text-sm md:text-base font-body">
          Tea, craft, and moments shared.
        </p>
      </div>

      {/* Masonry Grid Area */}
      <div className="premium-container relative z-10">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8">
          {mediaItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                if (item.type === 'video') setActiveVideo(item);
              }}
              className={`break-inside-avoid relative overflow-hidden rounded-[24px] shadow-sm hover:shadow-2xl transition-all duration-500 bg-white/60 border border-white/60 group cursor-pointer w-full ${item.aspectRatio} flex items-center justify-center mb-6 sm:mb-8`}
            >
              {item.type === 'image' ? (
                <motion.img
                  src={item.src}
                  alt={item.label}
                  className="max-h-[80%] max-w-[85%] object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] z-0 pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out"
                  draggable={false}
                />
              ) : (
                <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[24px]">
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover z-0 opacity-90 pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
              )}

              {/* Subtle dark gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-plum-dark/90 via-plum-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none rounded-[24px]" />

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0 pointer-events-none">
                {item.type === 'video' && (
                  <div className="w-14 h-14 rounded-full border border-white/40 bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 shadow-xl">
                    <Play size={24} className="text-yellow ml-1" fill="currentColor" />
                  </div>
                )}
                <span className="font-display font-black text-white text-2xl tracking-[0.15em] uppercase drop-shadow-md">
                  {item.label}
                </span>
                <span className="font-body font-bold text-xs text-yellow tracking-[0.25em] uppercase mt-3 drop-shadow-md">
                  {item.actionText}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Fullscreen Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-plum-dark/95 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl aspect-video px-4 md:px-8"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-14 right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20 backdrop-blur-md"
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
