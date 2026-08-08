import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Category } from "../../data/menuData";

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

  useEffect(() => {
    const activeBtn = scrollRef.current?.querySelector(".category-active");
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeCategoryId]);

  return (
    <div className="relative z-40 bg-transparent py-4 mb-12">
      <div
        ref={scrollRef}
        className="flex items-center gap-4 md:gap-6 overflow-x-auto px-6 max-w-7xl mx-auto no-scrollbar py-4"
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
                <span className={`mt-1 ${isActive ? 'mb-2' : ''}`}>{cat.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
