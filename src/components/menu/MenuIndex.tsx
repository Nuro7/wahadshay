import React, { useState, useEffect } from "react";
import { menuCategories, Product } from "../../data/menuData";
import { MenuHero } from "./MenuHero";
import { CategoryNavigation } from "./CategoryNavigation";
import { CategoryScene } from "./CategoryScene";
import { ProductGrid } from "./ProductGrid";
import { ProductDetail } from "./ProductDetail";

export const MenuIndex: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(menuCategories[0].id);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const activeCategory = menuCategories.find((c) => c.id === activeCategoryId) || menuCategories[0];

  // Preload images for smoother transitions
  useEffect(() => {
    menuCategories.forEach(category => {
      const img = new Image();
      img.src = category.heroImage;
    });
  }, []);

  return (
    <section id="menu" className="relative min-h-screen bg-beige font-body selection:bg-plum selection:text-white">
      {/* 1. Menu Intro */}
      <MenuHero />

      {/* 2. Category Navigation */}
      <CategoryNavigation
        categories={menuCategories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
      />

      {/* 3. Category Scene (Cinematic Transition + 3D Food) */}
      <div className="relative z-10 overflow-hidden pt-8 pb-12">
        <CategoryScene category={activeCategory} />
      </div>

      {/* 4. Products Display */}
      <div className="relative z-10">
        <ProductGrid category={activeCategory} onSelectProduct={setSelectedProduct} />
      </div>

      {/* 5. Product Detail Modal */}
      <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
};

export default MenuIndex;
