import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

// Import local premium assets
import parathaImg from "../assets/demo/burger.png";
import plateImg from "../assets/demo/combo.png";
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
  const { t, language } = useLanguage();
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
    <section id="menu" className="relative overflow-hidden select-none bg-[#1A0A26] pb-24 md:pb-32 flex-1 w-full">
      {/* Background Orbs Wrapper to contain overflow and prevent scrollWidth expansion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A26] via-[#2A113E] to-[#1A0A26]" />
        <div className="absolute top-[30%] left-[-15%] w-[60vw] h-[60vw] bg-plum/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-yellow/5 rounded-full blur-[120px]" />
        {/* Subtle brand graphic / abstract shape in background */}
        <div className="absolute top-1/2 right-0 opacity-[0.03] w-96 h-96 border-[1px] border-yellow rounded-full scale-150 translate-x-1/4" />
      </div>

      {/* Menu Hero Section - Edge to Edge like Homepage */}
      <div className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[750px] flex items-center pt-40 md:pt-48 lg:pt-56 pb-20 lg:pb-32 mb-16 lg:mb-24 overflow-hidden border-b border-white/5">
        {/* Background Banner Image with gentle zoom */}
        <motion.div
          initial={{ scale: 1.1, filter: "brightness(0.8)" }}
          animate={{ scale: 1, filter: "brightness(1)" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <picture>
            <source media="(max-width: 767px)" srcSet="/mobile_menu.jpg" />
            <img
              src="/menu banner.png"
              alt="Wahad Shay Menu Banner"
              className="w-full h-full object-cover object-center"
            />
          </picture>
          {/* Rich Gradients for legibility and smooth blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A0A26] via-[#1A0A26]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A26]/40 via-transparent to-[#1A0A26]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A26] via-transparent to-[#1A0A26]"></div>
        </motion.div>

        {/* Premium Floating Elements for Depth (3D feel) */}
        <motion.img
          initial={{ y: 50, x: 20, opacity: 0, rotate: -15 }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0], opacity: 0.6, rotate: [-15, -5, -15] }}
          transition={{ opacity: { duration: 1 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, x: { duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
          src="/floating_herbs.png"
          alt="Herbs"
          className="hidden lg:block absolute right-[15%] top-[30%] w-32 h-32 object-contain z-10 blur-[2px]"
        />
        <motion.img
          initial={{ y: -50, x: -20, opacity: 0, rotate: 45 }}
          animate={{ y: [0, 30, 0], x: [0, -15, 0], opacity: 0.8, rotate: [45, 65, 45] }}
          transition={{ opacity: { duration: 1, delay: 0.5 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" }, x: { duration: 8, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" } }}
          src="/flying_chilli.png"
          alt="Chilli"
          className="hidden md:block absolute right-[5%] bottom-[20%] w-48 h-48 object-contain z-10 drop-shadow-2xl"
        />
        <motion.img
          initial={{ y: 0, x: 50, opacity: 0, rotate: 10 }}
          animate={{ y: [0, -15, 0], x: [0, -10, 0], opacity: 0.5, rotate: [10, -5, 10] }}
          transition={{ opacity: { duration: 1, delay: 0.8 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, x: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
          src="/floating_fries.png"
          alt="Fries"
          className="hidden lg:block absolute right-[35%] top-[15%] w-24 h-24 object-contain z-10 blur-[4px]"
        />

        {/* Content Left Overlay */}
        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center justify-between -mt-12 lg:-mt-20">
          <div className="w-full max-w-2xl flex flex-col relative z-20 mt-10 md:mt-0 lg:ml-24 xl:ml-32 items-center lg:items-start text-center lg:text-left">

            {/* Top tiny text */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-6 md:mb-8 w-full"
            >
              <div className="hidden sm:block w-8 md:w-12 h-[2px] bg-yellow rounded-full"></div>
              <span className="text-yellow text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.25em] sm:tracking-[0.4em]">
                {t('menuHero.topTiny')}
              </span>
            </motion.div>

            {/* OUR MENU Title block */}
            <div className={`flex flex-col relative mb-5 items-center lg:items-start w-full ${language === 'AR' ? 'font-arabic' : ''}`}>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
                className={`font-display text-[3.5rem] sm:text-6xl md:text-8xl lg:text-[130px] font-black text-white leading-[0.9] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${language === 'AR' ? 'lg:text-[100px]' : ''}`}
              >
                {t('menuHero.our')}
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                className={`font-display text-[4.5rem] sm:text-7xl md:text-9xl lg:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow to-[#B38700] leading-[0.9] drop-shadow-[0_15px_30px_rgba(240,185,11,0.2)] relative z-10 mt-1 lg:mt-0 ${language === 'AR' ? 'lg:text-[110px]' : ''}`}
              >
                {t('menuHero.menuTitle')}
              </motion.h2>
            </div>

            {/* Subtitle text */}
            <div className={`text-[#E5E0EA] text-[17px] sm:text-xl md:text-3xl font-body leading-relaxed font-light drop-shadow-lg mx-auto lg:mx-0 mt-3 text-center lg:text-left relative z-20 max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-full ${language === 'AR' ? 'font-arabic' : ''}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                {t('menuHero.tasteOf')}<br className="block sm:hidden" />
                <span className="hidden sm:inline"> </span>{t('menuHero.madeToBe')} <span className="text-yellow font-medium relative inline-block">{t('menuHero.shared')}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.8, ease: "easeInOut", originX: 0 }}
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-yellow/50 rounded-full"
                  ></motion.span>
                </span>
              </motion.div>
            </div>

          </div>

          {/* Desktop badge placed on the right side to balance design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, type: "spring" }}
            className="hidden lg:flex flex-col items-center justify-center relative z-16 mt-28 xl:mt-75"
          >
            <div className="w-36 h-36 rounded-full border-[2px] border-white/20 flex flex-col items-center justify-center p-2 relative shadow-[0_0_40px_rgba(240,185,11,0.15)] bg-[#1A0A26]/40 backdrop-blur-sm">
              <div className="absolute inset-2 border-[1.5px] border-dashed border-yellow/50 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <svg className="absolute inset-0 w-full h-full drop-shadow-md" viewBox="0 0 100 100">
                <path id="curve-desktop" fill="transparent" d="M 15 50 a 35 35 0 1 1 70 0 a 35 35 0 1 1 -70 0" />
                <text className="text-[7.5px] font-bold tracking-[0.25em] uppercase fill-white">
                  <textPath href="#curve-desktop" startOffset="10%">{t('menuHero.badgeLine1')}</textPath>
                  <textPath href="#curve-desktop" startOffset="60%">{t('menuHero.badgeLine2')}</textPath>
                </text>
              </svg>
              <img src="/favicon.png" alt="Wahad Shay" className="w-14 h-14 object-contain z-10" />
            </div>
          </motion.div>
        </div>



        {/* Yellow cloud doodles at the bottom edge */}
        <div className="hidden md:flex absolute -bottom-4 left-0 w-full lg:w-[120%] lg:-left-[10%] h-48 lg:h-64 z-20 pointer-events-none opacity-80 mix-blend-screen overflow-hidden items-end justify-center">
          <motion.svg
            viewBox="0 0 1000 150"
            preserveAspectRatio="none"
            className="w-[300%] sm:w-[200%] md:w-[150%] lg:w-full h-full max-w-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            <path d="M-50,150 C 50,60 150,20 250,90 C 350,160 450,20 550,100 C 650,180 750,40 850,90 C 950,140 1050,60 1150,150" fill="none" stroke="#F0B90B" strokeWidth="6" strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(240,185,11,0.5)]" />
            <path d="M-50,150 C 20,80 120,40 220,110 C 320,180 420,40 520,120 C 620,200 720,60 820,110 C 920,160 1020,80 1120,150" fill="none" stroke="#F0B90B" strokeWidth="3" strokeLinecap="round" className="opacity-40" />
          </motion.svg>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 relative z-10">
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
                className={`category-btn relative flex items-center justify-center px-6 py-3 rounded-full font-display text-[13px] md:text-sm font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shrink-0 border border-transparent overflow-hidden ${activeTab === cat
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
                <span className={`relative z-10 ${language === 'AR' ? 'font-arabic' : ''}`}>{t(`menuCategories.${cat}`) || cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 18 Product Showcase Grid */}
        <motion.div
          layout
          className={`relative grid gap-x-3 sm:gap-x-5 gap-y-6 sm:gap-y-10 min-h-[400px] w-full ${
            filteredProducts.length === 1
              ? "grid-cols-1 place-items-center"
              : filteredProducts.length === 2
              ? "grid-cols-2 max-w-4xl mx-auto"
              : "grid-cols-2 md:grid-cols-3"
          }`}
        >
          <AnimatePresence mode="wait">
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
                  className={`group relative flex flex-col items-center bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm rounded-[24px] p-4 sm:p-6 border border-white/5 transition-all duration-500 hover:-translate-y-1 ${
                    filteredProducts.length === 1 ? "w-full max-w-[450px]" : ""
                  }`}
                >
                  {/* Subtle glass effect backing */}
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Card shadow & Glowing Border */}
                  <div className="absolute inset-0 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover:shadow-[0_20px_40px_rgba(240,185,11,0.1)] border border-transparent group-hover:border-yellow/20 transition-all duration-500 pointer-events-none" />

                  {/* Decorative element for 'accent' items */}
                  {isAccent && (
                    <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-yellow opacity-70" />
                  )}
                  {isLarge && (
                    <div className="absolute bottom-4 right-4 w-8 h-[1px] bg-yellow/30" />
                  )}

                  {/* Product Image Area */}
                  <div className={`relative w-full h-[100px] sm:h-[140px] flex items-center justify-center mb-4 sm:mb-6 z-10 ${isShifted ? 'mt-4' : 'mt-0'}`}>
                    {/* Hover Glow */}
                    <div className="absolute w-24 h-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(240,185,11,0.25)_0%,transparent_70%)] blur-xl scale-50 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100 pointer-events-none" />

                    <img
                      src={item.image}
                      alt={item.name}
                      className={`h-full w-auto object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)] transition-all duration-500 ease-out will-change-transform ${isLarge ? 'scale-[1.15] group-hover:scale-[1.25]' : 'scale-100 group-hover:scale-[1.12]'
                        } group-hover:-translate-y-3 group-hover:rotate-3 group-hover:drop-shadow-[0_20px_30px_rgba(240,185,11,0.2)]`}
                    />
                  </div>

                  {/* Text Content */}
                  <div className={`flex flex-col flex-1 w-full text-center z-10 transition-transform duration-500 group-hover:-translate-y-1 ${language === 'AR' ? 'font-arabic' : ''}`}>
                    <h3 className={`font-display font-bold text-white group-hover:text-yellow transition-colors duration-300 leading-snug mb-2 sm:mb-3 ${isLarge ? 'text-[14px] sm:text-lg' : 'text-[13px] sm:text-base'}`}>
                      {t(`menuProducts.${item.id}.name`) || item.name}
                    </h3>
                    <p className="text-white/60 text-[11px] sm:text-[12px] leading-relaxed font-body font-light line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
                      {t(`menuProducts.${item.id}.desc`) || item.desc}
                    </p>
                  </div>

                  {/* Interactive Button */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                    <div className="bg-gradient-to-r from-yellow to-[#B38700] text-plum-dark text-[10px] sm:text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full shadow-[0_5px_15px_rgba(240,185,11,0.3)]">
                      Explore
                    </div>
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
          <p className={`font-display text-white/40 text-lg md:text-xl font-medium tracking-wide ${language === 'AR' ? 'font-arabic' : ''}`}>
            {t('menuFooter')}
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default Menu;
