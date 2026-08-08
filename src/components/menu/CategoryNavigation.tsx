import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Category } from "../../data/menuData";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryNavigation: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [categories]);

  useEffect(() => {
    const activeBtn = scrollRef.current?.querySelector(".category-active") as HTMLElement;
    const container = scrollRef.current;
    
    if (activeBtn && container) {
      // Calculate center position manually to prevent full page horizontal shifts
      const containerWidth = container.clientWidth;
      const btnOffsetLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.clientWidth;
      
      const scrollTarget = btnOffsetLeft - (containerWidth / 2) + (btnWidth / 2);
      
      container.scrollTo({
        left: scrollTarget,
        behavior: "smooth"
      });
    }
    
    // Need a slight timeout to check scroll after smooth scroll completes
    setTimeout(checkScroll, 350);
  }, [activeCategoryId]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="relative z-40 bg-transparent py-4 mb-12 max-w-7xl mx-auto group/nav">
      
      {/* Scroll Left Button */}
      <button
        onClick={() => scrollByAmount("left")}
        className={`absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-neutral-border text-plum hover:bg-yellow hover:text-plum-dark hover:scale-105 transition-all duration-300 pointer-events-auto ${showLeftScroll ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex items-center gap-4 md:gap-6 overflow-x-auto px-12 md:px-16 w-full py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex flex-col items-center justify-center gap-3 w-20 h-[104px] md:w-24 md:h-[116px] rounded-[2rem] font-display text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 shadow-sm ${
                isActive
                  ? "category-active bg-plum-dark text-white shadow-[0_8px_16px_rgba(94,38,137,0.3)] -translate-y-2"
                  : "bg-white text-plum-dark/70 hover:bg-white hover:text-plum hover:-translate-y-1 hover:shadow-md"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryBorder"
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-yellow rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-2 mt-1">
                <div className={`w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center transition-all ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                   <img src={cat.heroImage} alt={cat.name} className="w-full h-full object-contain drop-shadow-md" />
                </div>
                <span className={`mt-1 ${isActive ? 'mb-2' : ''} text-center leading-tight px-1`}>{cat.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scrollByAmount("right")}
        className={`absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-neutral-border text-plum hover:bg-yellow hover:text-plum-dark hover:scale-105 transition-all duration-300 pointer-events-auto ${showRightScroll ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Fade Gradients for visual cue */}
      <div className={`absolute top-0 bottom-0 left-0 w-12 md:w-20 bg-gradient-to-r from-beige to-transparent pointer-events-none transition-opacity duration-300 z-30 ${showLeftScroll ? "opacity-100" : "opacity-0"}`} />
      <div className={`absolute top-0 bottom-0 right-0 w-12 md:w-20 bg-gradient-to-l from-beige to-transparent pointer-events-none transition-opacity duration-300 z-30 ${showRightScroll ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
};
