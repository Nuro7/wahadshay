import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import teacupImg from "../assets/wahad_teacup.png";
import burgerImg from "../assets/wahad_burger.png";
import cheeseImg from "../assets/cheese_dripping.png";
import friesImg from "../assets/loaded_fries.png";

interface GalleryItem {
  image: string;
  tag: string;
  handle: string;
}

const galleryItems: GalleryItem[] = [
  { image: teacupImg, tag: "Signature Karak", handle: "@wahadshay" },
  { image: cheeseImg, tag: "Cheese Melt Brioche", handle: "@wahadshay" },
  { image: burgerImg, tag: "Smoked Turkey Croissant", handle: "@wahadshay" },
  { image: friesImg, tag: "Loaded Cheese Fries", handle: "@wahadshay" },
];

export function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

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
    <section id="gallery" className="py-24 md:py-32 bg-neutral-ivory relative overflow-hidden select-none">
      {/* Background radial soft gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,38,137,0.02),transparent_65%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
            Visual Journal
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-text-primary">
            <span className="text-shimmer">Photo Gallery</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-body">
            Follow our digital aesthetic journey and share your moments at <span className="text-plum font-semibold">#WahadShay</span>.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
              onClick={() => setActiveIdx(idx)}
              className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal premium-card premium-card-hover overflow-hidden group relative h-[280px] flex items-center justify-center p-8 cursor-pointer`}
            >
              {/* Image asset with scale zoom on card hover */}
              <img
                src={item.image}
                alt={item.tag}
                className="max-h-[160px] max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] group-hover:scale-110 transition-transform duration-500 will-change-transform"
              />

              {/* Hover Dark Overlay showing Instagram logo and metadata */}
              <div className="absolute inset-0 bg-plum/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-3 z-20">
                <div className="rounded-full bg-white/10 p-3 border border-white/20 text-yellow">
                  <FaInstagram size={20} />
                </div>
                <div className="text-center">
                  <span className="font-display text-sm font-bold text-white block">
                    {item.tag}
                  </span>
                  <span className="font-body text-[10px] text-white/70 tracking-wider block mt-0.5">
                    {item.handle}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-yellow text-[9px] font-bold uppercase tracking-widest pt-2">
                  <ZoomIn size={10} />
                  <span>View Story</span>
                </div>
              </div>
            </div>
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
