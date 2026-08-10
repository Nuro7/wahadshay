import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import local premium assets
import parathaImg from "../assets/demo/paratha.png";
import plateImg from "../assets/demo/plate.png";
import dipBurgerImg from "../assets/dip_burger.png";
import loadedFriesImg from "../assets/loaded_fries.png";
import wahadBurgerImg from "../assets/wahad_burger.png";
import cheeseImg from "../assets/cheese_dripping.png";

const categories = [
  "ALL",
  "PARATHA",
  "CHICKEN",
  "PASTA & RICE",
  "SNACKS",
  "BITES",
];

interface MenuItemData {
  id: string;
  name: string;
  desc: string;
  image: string;
  category: string;
  variation?: "default" | "large" | "shifted" | "accent";
}

const allProducts: MenuItemData[] = [
  { id: "p1", name: "Zinger Loaded Fries", desc: "Crispy fries layered with zinger chicken, signature sauce and cheese.", image: loadedFriesImg, category: "SNACKS", variation: "large" },
  { id: "p2", name: "Masaka Paratha", desc: "Golden flaky paratha filled with savory spiced masaka filling.", image: parathaImg, category: "PARATHA", variation: "shifted" },
  { id: "p3", name: "Kabab Paratha", desc: "Succulent grilled kabab wrapped in our signature buttery paratha.", image: parathaImg, category: "PARATHA" },
  { id: "p4", name: "Chicken Lemon Paratha", desc: "Zesty lemon-marinated chicken bites inside a warm paratha.", image: parathaImg, category: "PARATHA", variation: "accent" },
  { id: "p5", name: "Prawns Paratha", desc: "Juicy seasoned prawns tucked into a soft, layered paratha.", image: parathaImg, category: "PARATHA" },
  { id: "p6", name: "Mathafi Paratha", desc: "A secret brand recipe of spicy chicken enveloped in paratha.", image: parathaImg, category: "PARATHA", variation: "large" },
  { id: "p7", name: "Wahad Shay Platinum Paratha", desc: "Our ultimate signature paratha with premium layered ingredients.", image: parathaImg, category: "PARATHA", variation: "accent" },
  { id: "p8", name: "Nuggets Paratha", desc: "Crispy golden chicken nuggets folded into a hot flaky paratha.", image: parathaImg, category: "PARATHA", variation: "shifted" },
  { id: "p9", name: "Dynamite Paratha", desc: "Spicy dynamite chicken pieces wrapped in fresh buttery paratha.", image: parathaImg, category: "PARATHA" },
  { id: "p10", name: "Chicken Chilli Paratha", desc: "Fiery chilli chicken bites perfectly balanced within a warm paratha.", image: parathaImg, category: "PARATHA", variation: "large" },
  { id: "p11", name: "Pubg Paratha", desc: "A fan-favorite loaded paratha, action-packed with flavor.", image: parathaImg, category: "PARATHA" },
  { id: "p12", name: "Francisco Paratha", desc: "Classic grilled chicken strips, cheese, and special sauce in paratha.", image: parathaImg, category: "PARATHA", variation: "shifted" },
  { id: "p13", name: "Zinger Paratha", desc: "Crunchy fried zinger chicken rolled in a soft, flaky paratha.", image: parathaImg, category: "PARATHA", variation: "accent" },
  { id: "p14", name: "Alfredo Penne Pasta", desc: "Creamy classic Alfredo sauce tossed with tender penne pasta.", image: plateImg, category: "PASTA & RICE", variation: "large" },
  { id: "p15", name: "Juicy Chicken with Mashkool Rice", desc: "Fragrant mashkool rice served with our juicy roasted chicken.", image: plateImg, category: "PASTA & RICE", variation: "shifted" },
  { id: "p16", name: "Juicy Dip Burger", desc: "Premium chicken patty with our signature dripping cheese sauce.", image: dipBurgerImg, category: "CHICKEN", variation: "large" },
  { id: "p17", name: "Mac & Cheese with Chicken", desc: "Rich, creamy macaroni and cheese topped with savory chicken pieces.", image: plateImg, category: "PASTA & RICE", variation: "accent" },
  { id: "p18", name: "Mini Bites", desc: "Perfectly sized, bite-ready savory treats for easy snacking.", image: cheeseImg, category: "BITES", variation: "shifted" },
];

export function Menu() {
  const [activeTab, setActiveTab] = useState("ALL");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto center active tab in horizontal scrolling bar
  useEffect(() => {
    const activeBtn = scrollRef.current?.querySelector(".category-active");
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeTab]);

  const filteredProducts = activeTab === "ALL" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeTab);

  return (
    <section id="menu" className="py-24 md:py-32 relative overflow-hidden select-none bg-[#1A0A26]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A26] via-[#2A113E] to-[#1A0A26] z-0" />
      <div className="absolute top-[10%] left-[-15%] w-[60vw] h-[60vw] bg-plum/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-yellow/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* Subtle brand graphic / abstract shape in background */}
      <div className="absolute top-1/4 right-0 opacity-[0.03] pointer-events-none z-0 w-96 h-96 border-[1px] border-yellow rounded-full scale-150 translate-x-1/4" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 relative z-10">
        
        {/* Menu Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20 lg:mb-32">
          {/* Text Left */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-yellow text-sm font-bold uppercase tracking-[0.25em] block"
            >
              ONE CUP, MANY STORIES
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-black text-white leading-tight"
            >
              OUR MENU
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#E5E0EA] text-lg md:text-xl font-body max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              A taste of our craft, made to be shared.
            </motion.p>
          </div>
          
          {/* Image Composition Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-square md:aspect-video lg:aspect-square flex justify-center items-center">
              {/* Decorative circle behind food */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-plum-dark/40 to-transparent border border-plum/30 z-0" />
              
              <img 
                src={loadedFriesImg} 
                alt="Wahad Shay Premium Showcase" 
                className="w-4/5 h-auto object-contain z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] scale-110 lg:scale-125 translate-x-4 -translate-y-4"
              />
              
              {/* Floating accent images */}
              <img src={cheeseImg} className="absolute w-24 h-24 object-contain -bottom-8 -left-4 z-20 blur-[2px] opacity-70" alt="" />
              
              {/* Graphic strokes */}
              <svg className="absolute -top-10 -right-10 w-32 h-32 text-yellow z-0 opacity-40 rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10,90 Q50,10 90,90" />
                <path d="M20,90 Q50,30 80,90" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Premium Category Navigation */}
        <div className="flex justify-center mb-16 relative z-20">
          <div 
            ref={scrollRef}
            className="flex items-center gap-2 overflow-x-auto pb-4 max-w-full w-fit scroll-smooth no-scrollbar px-4"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`category-btn relative flex items-center justify-center px-6 py-3 rounded-full font-display text-[13px] md:text-sm font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shrink-0 border border-transparent overflow-hidden ${
                  activeTab === cat
                    ? "category-active text-plum-dark"
                    : "text-[#F8F5F2] hover:text-yellow border-white/10 hover:border-white/20 bg-white/5"
                }`}
              >
                {activeTab === cat && (
                  <motion.div 
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-yellow rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 18 Product Showcase Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((item, idx) => {
              // Create subtle variations based on the predefined variation property
              const isLarge = item.variation === "large";
              const isShifted = item.variation === "shifted";
              const isAccent = item.variation === "accent";
              
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: activeTab === "ALL" ? (idx % 6) * 0.1 : idx * 0.1,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                  className="group relative flex flex-col items-center bg-white/[0.03] hover:bg-white/[0.05] rounded-[24px] p-6 border border-white/5 hover:border-white/10 transition-colors duration-500"
                >
                  {/* Subtle glass effect backing */}
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Card shadow */}
                  <div className="absolute inset-0 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] pointer-events-none" />

                  {/* Decorative element for 'accent' items */}
                  {isAccent && (
                    <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-yellow opacity-70" />
                  )}
                  {isLarge && (
                    <div className="absolute bottom-4 right-4 w-8 h-[1px] bg-yellow/30" />
                  )}

                  {/* Product Image Area */}
                  <div className={`relative w-full h-[140px] flex items-center justify-center mb-6 z-10 ${isShifted ? 'mt-4' : 'mt-0'}`}>
                    {/* Hover Glow */}
                    <div className="absolute w-24 h-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(240,185,11,0.15)_0%,transparent_60%)] blur-xl scale-50 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
                    
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`h-full w-auto object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-out will-change-transform ${
                        isLarge ? 'scale-[1.15] group-hover:scale-[1.22]' : 'scale-100 group-hover:scale-[1.07]'
                      } group-hover:-translate-y-2`}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col flex-1 w-full text-center z-10">
                    <h3 className={`font-display font-bold text-white group-hover:text-yellow transition-colors duration-300 leading-snug mb-3 ${isLarge ? 'text-lg' : 'text-base'}`}>
                      {item.name}
                    </h3>
                    <p className="text-white/60 text-[12px] leading-relaxed font-body font-light line-clamp-3">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Footer Transition Statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-32 text-center"
        >
          <p className="font-display text-white/40 text-lg md:text-xl font-medium tracking-wide">
            Made with passion. Served with love. Remembered always.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default Menu;
