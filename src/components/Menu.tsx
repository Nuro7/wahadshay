import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { Leaf, Utensils, Coffee, Sparkles } from "lucide-react";

// Import local premium assets
import parathaImg from "../assets/demo/burger.png";
import plateImg from "../assets/demo/combo.png";
import dipBurgerImg from "../assets/Juicy Dip.jpg";
import loadedFriesImg from "../assets/Hot Chicken Rice.jpg";
import wahadBurgerImg from "../assets/Hot Chicken Burger.jpg";
import cheeseImg from "../assets/Mini Bites.jpg";

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
  price: number;
}

const allProducts: MenuItemData[] = [
  { id: "p1", name: "Zinger Loaded Fries", desc: "Crispy fries layered with zinger chicken, signature sauce and cheese.", image: loadedFriesImg, category: "SNACKS", variation: "large", price: 18 },
  { id: "p2", name: "Masaka Paratha", desc: "Golden flaky paratha filled with savory spiced masaka filling.", image: parathaImg, category: "PARATHA", variation: "shifted", price: 12 },
  { id: "p3", name: "Kabab Paratha", desc: "Succulent grilled kabab wrapped in our signature buttery paratha.", image: parathaImg, category: "PARATHA", price: 15 },
  { id: "p4", name: "Chicken Lemon Paratha", desc: "Zesty lemon-marinated chicken bites inside a warm paratha.", image: parathaImg, category: "PARATHA", variation: "accent", price: 14 },
  { id: "p5", name: "Prawns Paratha", desc: "Juicy seasoned prawns tucked into a soft, layered paratha.", image: parathaImg, category: "PARATHA", price: 18 },
  { id: "p6", name: "Mathafi Paratha", desc: "A secret brand recipe of spicy chicken enveloped in paratha.", image: parathaImg, category: "PARATHA", variation: "large", price: 15 },
  { id: "p7", name: "Wahad Shay Platinum Paratha", desc: "Our ultimate signature paratha with premium layered ingredients.", image: parathaImg, category: "PARATHA", variation: "accent", price: 20 },
  { id: "p8", name: "Nuggets Paratha", desc: "Crispy golden chicken nuggets folded into a hot flaky paratha.", image: parathaImg, category: "PARATHA", variation: "shifted", price: 12 },
  { id: "p9", name: "Dynamite Paratha", desc: "Spicy dynamite chicken pieces wrapped in fresh buttery paratha.", image: parathaImg, category: "PARATHA", price: 15 },
  { id: "p10", name: "Chicken Chilli Paratha", desc: "Fiery chilli chicken bites perfectly balanced within a warm paratha.", image: parathaImg, category: "PARATHA", variation: "large", price: 14 },
  { id: "p11", name: "Pubg Paratha", desc: "A fan-favorite loaded paratha, action-packed with flavor.", image: parathaImg, category: "PARATHA", price: 16 },
  { id: "p12", name: "Francisco Paratha", desc: "Classic grilled chicken strips, cheese, and special sauce in paratha.", image: parathaImg, category: "PARATHA", variation: "shifted", price: 15 },
  { id: "p13", name: "Zinger Paratha", desc: "Crunchy fried zinger chicken rolled in a soft, flaky paratha.", image: parathaImg, category: "PARATHA", variation: "accent", price: 16 },
  { id: "p14", name: "Alfredo Penne Pasta", desc: "Creamy classic Alfredo sauce tossed with tender penne pasta.", image: plateImg, category: "PASTA & RICE", variation: "large", price: 24 },
  { id: "p15", name: "Juicy Chicken with Mashkool Rice", desc: "Fragrant mashkool rice served with our juicy roasted chicken.", image: plateImg, category: "PASTA & RICE", variation: "shifted", price: 28 },
  { id: "p16", name: "Juicy Dip Burger", desc: "Premium chicken patty with our signature dripping cheese sauce.", image: dipBurgerImg, category: "CHICKEN", variation: "large", price: 22 },
  { id: "p17", name: "Mac & Cheese with Chicken", desc: "Rich, creamy macaroni and cheese topped with savory chicken pieces.", image: plateImg, category: "PASTA & RICE", variation: "accent", price: 25 },
  { id: "p18", name: "Mini Bites", desc: "Perfectly sized, bite-ready savory treats for easy snacking.", image: cheeseImg, category: "BITES", variation: "shifted", price: 10 },
];

interface MenuProps {
  currency?: "AED" | "SAR";
}

export function Menu({ currency = "AED" }: MenuProps) {
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

  const footerText = t('menuFooter') || "";
  const footerChars = Array.from(footerText);

  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(2px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.35,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="menu" className="section-padding-landing relative overflow-hidden select-none bg-neutral-ivory pb-24 md:pb-32 flex-1 w-full">
      {/* Background Orbs & Patterns Wrapper to contain overflow and prevent scrollWidth expansion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-ivory via-beige to-neutral-ivory" />
        <div className="absolute inset-0 food-pattern-bg" />
        <div className="absolute top-[30%] left-[-15%] w-[60vw] h-[60vw] bg-plum/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-yellow/2 rounded-full blur-[120px]" />
        
        {/* Subtle brand graphic / abstract shape in background */}
        <div className="absolute top-1/2 right-0 opacity-[0.03] w-96 h-96 border-[1px] border-yellow rounded-full scale-150 translate-x-1/4" />

        {/* Thematic Food/Botanical Icon Patterns */}
        <div className="absolute top-[8%] left-[-6%] opacity-[0.03] text-plum transform -rotate-12 pointer-events-none animate-float-burger">
          <Leaf size={300} strokeWidth={0.4} />
        </div>
        <div className="absolute top-[40%] right-[-6%] opacity-[0.025] text-yellow transform rotate-45 pointer-events-none animate-float-fries">
          <Utensils size={260} strokeWidth={0.4} />
        </div>
        <div className="absolute bottom-[35%] left-[4%] opacity-[0.02] text-plum transform rotate-12 pointer-events-none animate-float-burger">
          <Coffee size={220} strokeWidth={0.4} />
        </div>
        <div className="absolute bottom-[10%] right-[8%] opacity-[0.03] text-yellow transform -rotate-45 pointer-events-none animate-float-fries">
          <Sparkles size={180} strokeWidth={0.4} />
        </div>

        {/* Framing Floating Food Elements on Sides */}
        <motion.img
          initial={{ y: 50, opacity: 0, rotate: -10 }}
          animate={{ y: [0, -15, 0], opacity: 0.12, rotate: [-10, 0, -10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          src="/floating_herbs.png"
          alt=""
          className="hidden xl:block absolute left-[-2%] top-[25%] w-36 h-36 object-contain z-0 blur-[1px] pointer-events-none"
        />
        <motion.img
          initial={{ y: -50, opacity: 0, rotate: 20 }}
          animate={{ y: [0, 20, 0], opacity: 0.15, rotate: [20, 35, 20] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          src="/flying_chilli.png"
          alt=""
          className="hidden xl:block absolute right-[-2%] top-[55%] w-48 h-48 object-contain z-0 pointer-events-none"
        />
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 relative z-10">
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-8 md:mb-10 space-y-1.5">
          <span className="text-plum text-[11px] font-bold uppercase tracking-[0.25em] block">
            {t('menuHero.topTiny')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-text-primary mask-reveal leading-none">
            <span className="text-shimmer">
              {t('menuHero.our')} {t('menuHero.menuTitle')}
            </span>
          </h2>
          <p className="text-text-secondary text-xs sm:text-sm font-body max-w-md mx-auto">
            {t('menuHero.subtitle')}
          </p>
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
                className={`category-btn relative flex items-center justify-center px-4 py-2 md:px-6 md:py-3 rounded-full font-display text-[11px] md:text-sm font-bold uppercase tracking-wider md:tracking-widest transition-all duration-300 cursor-pointer shrink-0 border border-transparent overflow-hidden ${activeTab === cat
                  ? "category-active text-plum-dark"
                  : "text-text-secondary hover:text-plum border-neutral-border hover:border-plum/20 bg-white shadow-sm"
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

        {/* 18 Product Showcase Flexbox Wrapper (Centers Leftover Row Items) */}
        <motion.div
          layout
          className="relative flex flex-wrap justify-center gap-4 sm:gap-6 min-h-[400px] w-full"
        >
          <AnimatePresence mode="wait">
            {filteredProducts.map((item, idx) => {
              const isArabic = language === 'AR';

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
                  style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                  className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal premium-card premium-card-hover group relative p-5 flex flex-col items-center text-center min-h-[350px] overflow-hidden w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] shrink-0`}
                >
                  {/* Animated soft gradient background glow */}
                  <div className="absolute -right-[30%] -bottom-[30%] w-[180px] h-[180px] bg-plum/3 rounded-full blur-[50px] group-hover:bg-plum/6 transition-all duration-700 pointer-events-none" />
                  
                  {/* Category Badge on Top-Right/Left */}
                  <span className={`absolute top-3 ${isArabic ? 'left-3' : 'right-3'} bg-yellow text-plum-dark text-[8.5px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full z-20`}>
                    {t(`menuCategories.${item.category}`) || item.category}
                  </span>

                  {/* Image Container with Floating hover reveal */}
                  <div className="relative w-full h-[100px] md:h-[130px] lg:h-[160px] flex items-center justify-center mt-2 shrink-0">
                    <div className="absolute w-20 h-20 rounded-full bg-[radial-gradient(circle_at_center,rgba(94,38,137,0.06)_0%,transparent_60%)] blur-md scale-0 group-hover:scale-130 transition-transform duration-500 pointer-events-none" />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] group-hover:translate-y-[-6px] group-hover:scale-[1.05] transition-all duration-500 will-change-transform"
                    />
                  </div>

                  {/* Details Container - Vertically Centered to balance empty space */}
                  <div className={`flex-1 flex flex-col justify-center items-center w-full my-3 space-y-1.5 ${isArabic ? 'font-arabic' : ''}`}>
                    <span className="text-[8.5px] font-extrabold text-plum uppercase tracking-[0.2em] block opacity-85">
                      {item.id.toUpperCase()}
                    </span>
                    <h3 className="font-display text-sm sm:text-base font-black text-text-primary group-hover:text-plum transition-colors leading-snug max-w-[90%]">
                      {t(`menuProducts.${item.id}.name`) || item.name}
                    </h3>
                    <p className="text-text-secondary text-[11px] sm:text-[12px] leading-relaxed font-body font-light line-clamp-2 max-w-[95%]">
                      {t(`menuProducts.${item.id}.desc`) || item.desc}
                    </p>
                  </div>

                  {/* Bottom Price Row - Pushed to bottom with mt-auto */}
                  <div className="w-full pt-3 mt-auto border-t border-neutral-border flex items-center justify-between shrink-0">
                    <span className="font-body text-[10px] text-text-secondary uppercase tracking-wider">{t('specials.pairingPrice')}</span>
                    <span className="font-numbers text-sm font-extrabold text-plum">
                      {currency} {item.price}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Footer Transition Statement (Handwritten Signature Animation) */}
        <motion.div
          variants={sentenceVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-32 text-center select-none"
        >
          <p className={`text-plum/85 text-2xl md:text-3xl lg:text-4xl ${language === 'AR' ? 'font-arabic-signature' : 'font-signature'} tracking-wide leading-relaxed`}>
            {footerChars.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default Menu;
