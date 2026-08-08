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
    <div className="sticky top-[72px] md:top-20 z-40 bg-beige/80 backdrop-blur-xl border-b border-plum/10 py-3 mb-8 shadow-sm">
      <div
        ref={scrollRef}
        className="flex items-center gap-3 md:gap-6 overflow-x-auto px-6 max-w-7xl mx-auto no-scrollbar py-2"
      >
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex items-center gap-3 px-5 py-2.5 rounded-full font-display text-sm md:text-base font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer shrink-0 overflow-hidden ${
                isActive
                  ? "category-active text-white"
                  : "text-plum/60 hover:text-plum hover:bg-plum/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-plum rounded-full z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 transition-colors ${isActive ? 'border-yellow' : 'border-transparent group-hover:border-plum/20'}`}>
                   <img src={cat.heroImage} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <span>{cat.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
