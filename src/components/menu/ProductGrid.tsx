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
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
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
      className="max-w-7xl mx-auto px-6 pb-12"
    >
      {/* Featured Items */}
      {displayFeatured.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {displayFeatured.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} onClick={onSelectProduct} featured={true} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Regular Items Title */}
      {displayRegular.length > 0 && (
        <motion.div variants={itemVariants} className="mb-12 flex items-center gap-6">
          <h3 className="typo-h3 text-plum uppercase">
            Explore {category.name}
          </h3>
          <div className="flex-1 h-px bg-plum/10" />
        </motion.div>
      )}

      {/* Regular Items Grid */}
      {displayRegular.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
