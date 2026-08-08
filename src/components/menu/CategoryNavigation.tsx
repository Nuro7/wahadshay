import React, { useEffect, useRef } from "react";
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
    <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-border/50 py-4 mb-8">
      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto px-6 max-w-7xl mx-auto no-scrollbar"
      >
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-full font-display text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-500 cursor-pointer shrink-0 ${
                isActive
                  ? "category-active text-plum bg-yellow/10"
                  : "text-text-secondary hover:text-plum hover:bg-neutral-bg"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full border border-yellow pointer-events-none" />
              )}
              {isActive && (
                <span className="h-2 w-2 rounded-full bg-yellow shadow-[0_0_8px_rgba(255,199,44,0.6)] animate-pulse" />
              )}
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
