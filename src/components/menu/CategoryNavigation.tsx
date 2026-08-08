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
    <div className="sticky top-[72px] md:top-20 z-40 bg-beige/90 backdrop-blur-md border-b border-plum/5 py-4 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto px-6 max-w-7xl mx-auto no-scrollbar py-2"
      >
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex items-center gap-3 px-5 py-2.5 rounded-full font-display text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                isActive
                  ? "category-active text-white scale-105 shadow-[0_8px_16px_rgba(94,38,137,0.25)]"
                  : "bg-white/60 text-plum/50 hover:bg-white hover:text-plum hover:shadow-sm"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-plum rounded-full z-0 border-b-4 border-yellow"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-beige flex items-center justify-center p-1 transition-all ${isActive ? 'bg-white' : 'group-hover:scale-110'}`}>
                   <img src={cat.heroImage} alt={cat.name} className="w-full h-full object-contain" />
                </div>
                <span className="mt-0.5">{cat.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
