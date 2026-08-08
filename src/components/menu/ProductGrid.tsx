import React from "react";
import { motion } from "framer-motion";
import { Category, Product } from "../../data/menuData";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  category: Category;
  onSelectProduct: (product: Product) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const ProductGrid: React.FC<ProductGridProps> = ({ category, onSelectProduct }) => {
  const featuredProducts = category.products.filter((p) => p.featured);
  const regularProducts = category.products.filter((p) => !p.featured);

  // Fallback if no featured items
  const displayFeatured = featuredProducts.length > 0 ? featuredProducts : category.products.slice(0, 1);
  const displayRegular = featuredProducts.length > 0 ? regularProducts : category.products.slice(1);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-7xl mx-auto px-6 pb-32"
    >
      {/* Featured Items */}
      {displayFeatured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {displayFeatured.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} onClick={onSelectProduct} featured={true} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Regular Items Title */}
      {displayRegular.length > 0 && (
        <motion.div variants={itemVariants} className="mb-8 flex items-center gap-4">
          <h3 className="font-display text-2xl font-bold text-text-primary">
            More From {category.name}
          </h3>
          <div className="flex-1 h-[1px] bg-neutral-border" />
        </motion.div>
      )}

      {/* Regular Items Grid */}
      {displayRegular.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayRegular.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} onClick={onSelectProduct} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
