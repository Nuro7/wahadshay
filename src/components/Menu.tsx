import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

// Import local premium assets
import teacupImg from "../assets/wahad_teacup.png";
import burgerImg from "../assets/wahad_burger.png";
import cheeseImg from "../assets/cheese_dripping.png";
import friesImg from "../assets/loaded_fries.png";
import herbsImg from "../assets/floating_herbs.png";
import chilliImg from "../assets/flying_chilli.png";

interface MenuProps {
  currency: "AED" | "SAR";
}

interface MenuItemData {
  name: string;
  price: number;
  desc: string;
  image: string;
  badge?: string;
  spicy?: boolean;
  vegan?: boolean;
}

const categories = [
  "Tea",
  "Coffee",
  "Milkshakes",
  "Mojito",
  "Fresh Juice",
  "Breakfast",
  "Main Course",
  "Snacks",
  "Desserts",
];

const menuData: Record<string, MenuItemData[]> = {
  Tea: [
    { name: "Karak Special", price: 12, desc: "Strong, slow-brewed black tea with milk, fresh crushed cardamom, and saffron.", image: teacupImg, badge: "Best Seller" },
    { name: "Saffron Infusion", price: 15, desc: "Premium golden saffron filaments steeped in fine organic black tea.", image: herbsImg },
    { name: "Mint Suleimani", price: 10, desc: "Clear black tea brewed with fresh spearmint leaves and a splash of lemon.", image: teacupImg, vegan: true },
    { name: "Masala Blend", price: 14, desc: "A robust blend of black tea, ginger, cloves, cinnamon, and whole milk.", image: teacupImg },
  ],
  Coffee: [
    { name: "Rose Cardamom Latte", price: 18, desc: "Espresso combined with cardamom-infused milk and organic rose extract.", image: teacupImg },
    { name: "Iced Spanish Latte", price: 20, desc: "Chilled espresso with sweetened condensed milk and dynamic vanilla notes.", image: teacupImg, badge: "Popular" },
    { name: "Cold Brew Saffron Foam", price: 22, desc: "Organic cold-brew topped with sweet whipped saffron cardamom cream.", image: herbsImg },
    { name: "Espresso Macchiato", price: 12, desc: "Double shot of single-origin espresso with a dollop of warm milk froth.", image: teacupImg },
  ],
  Milkshakes: [
    { name: "Karak Biscuit Shake", price: 20, desc: "Blended karak tea gelato, caramel sauce, and crushed spiced biscuits.", image: teacupImg, badge: "New" },
    { name: "Dates Caramel Shake", price: 22, desc: "Organic dates blended with vanilla bean cream and homemade caramel.", image: burgerImg },
    { name: "Vanilla Pistachio Shake", price: 24, desc: "Premium vanilla gelato blended with local ground pistachio kernels.", image: teacupImg },
  ],
  Mojito: [
    { name: "Classic Mint Mojito", price: 16, desc: "Muddled fresh mint, lime slices, organic sugar cane juice, and soda.", image: herbsImg, vegan: true },
    { name: "Blue Curacao Mojito", price: 18, desc: "Blue Curacao syrup, fresh mint, crushed ice, and lime wedges.", image: teacupImg },
    { name: "Saffron Passionfruit Mojito", price: 20, desc: "Tangy passionfruit pulp, fresh mint leaves, and a splash of saffron syrup.", image: herbsImg, badge: "Popular" },
  ],
  "Fresh Juice": [
    { name: "Fresh Orange Juice", price: 15, desc: "100% cold-pressed organic local oranges served over crushed ice.", image: teacupImg, vegan: true },
    { name: "Mint Lemonade Juice", price: 14, desc: "Pressed fresh lime juice blended with organic spearmint leaves.", image: herbsImg, vegan: true },
    { name: "Avocado Dates Juice", price: 22, desc: "Creamy avocado purée blended with sweet local dates and honey.", image: teacupImg },
  ],
  Breakfast: [
    { name: "Cheese Melt Brioche", price: 22, desc: "Buttery brioche bun stuffed with melting triple cheddar and toasted.", image: cheeseImg, badge: "Best Seller" },
    { name: "Smoked Turkey Croissant", price: 26, desc: "Flaky, multi-layered butter croissant filled with sliced turkey, sage, and provolone.", image: burgerImg },
    { name: "Honey Butter Scone", price: 14, desc: "Warm, crumbly traditional scone served with whipped honey-infused butter.", image: friesImg },
  ],
  "Main Course": [
    { name: "Spicy Herb Chicken Brioche", price: 34, desc: "Slow-roasted chicken breast with rosemary rub inside a toasted brioche.", image: burgerImg, spicy: true },
    { name: "Royal Truffle Burger", price: 38, desc: "Wagyu beef patty with truffle mayo, cheddar cheese, and fresh brioche.", image: cheeseImg, badge: "Chef's Choice" },
    { name: "Malabar Roast Chicken Bun", price: 32, desc: "Double-spiced Malabar-style shredded chicken roast loaded in brioche.", image: burgerImg },
  ],
  Snacks: [
    { name: "Spicy Herb Focaccia", price: 18, desc: "Thick olive-oil flatbread topped with sea salt, fresh rosemary, and red chilli flakes.", image: chilliImg, spicy: true },
    { name: "Loaded Cheese Fries", price: 16, desc: "Crispy skin-on potato fries topped with melted hot cheddar cheese.", image: friesImg, badge: "Popular" },
    { name: "Fried Cardamom Scones", price: 12, desc: "Crispy cardamom-scented mini-scones dusted with powdered cane sugar.", image: friesImg },
  ],
  Desserts: [
    { name: "Rose Pistachio Gelato Buns", price: 24, desc: "Warm sweet bun sandwiching organic rose water and pistachio gelato scoop.", image: burgerImg },
    { name: "Cardamom Brioche Pudding", price: 26, desc: "Baked brioche cubes soaked in spiced custard, served warm with honey.", image: cheeseImg, badge: "New" },
    { name: "Saffron Milk Cake", price: 28, desc: "Sponge cake soaked in rich saffron milk and topped with vanilla whip.", image: herbsImg },
  ],
};

export function Menu({ currency }: MenuProps) {
  const [activeTab, setActiveTab] = useState("Tea");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto center active tab in horizontal scrolling bar
  useEffect(() => {
    const activeBtn = scrollRef.current?.querySelector(".category-active");
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeTab]);

  return (
    <section id="menu" className="py-24 md:py-32 bg-plum relative overflow-hidden select-none">
      {/* Background soft glow orbs */}
      <div className="absolute top-[40%] left-[-15%] w-[450px] h-[450px] bg-plum/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-yellow/3 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block">
            Handcrafted Selections
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mask-reveal">
            Explore Our Brand Menu
          </h2>
          <p className="text-grey text-base font-body max-w-lg mx-auto leading-relaxed">
            Every cup and loaf at Wahad Shay is prepared using premium, ethically sourced ingredients and time-honored artisanal baking.
          </p>
        </div>

        {/* Modern Categories Bar (Horizontal scroll with indicator dots) */}
        <div className="reveal flex justify-center mb-16">
          <div 
            ref={scrollRef}
            className="flex items-center gap-3 overflow-x-auto pb-4 max-w-full w-fit scroll-smooth no-scrollbar px-4"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`category-btn flex items-center gap-2 px-6 py-3 rounded-full font-display text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                  activeTab === cat
                    ? "category-active bg-yellow text-plum-dark shadow-md scale-102"
                    : "bg-plum-dark/40 border border-white/5 text-white/60 hover:text-white"
                }`}
              >
                {activeTab === cat && (
                  <span className="h-1.5 w-1.5 rounded-full bg-plum-dark animate-pulse" />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {menuData[activeTab].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card glass-card-hover group relative p-6 flex flex-col justify-between h-[330px] overflow-hidden"
              >
                {/* Badges / Accents */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                  {item.badge ? (
                    <span className="bg-yellow text-plum-dark text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  ) : (
                    <span />
                  )}
                  
                  <div className="flex gap-1.5">
                    {item.spicy && (
                      <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Spicy
                      </span>
                    )}
                    {item.vegan && (
                      <span className="bg-green-500/10 border border-green-500/30 text-green-400 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-0.5">
                        <Leaf size={7} />
                        Vegan
                      </span>
                    )}
                  </div>
                </div>

                {/* Styled Food Image */}
                <div className="h-[140px] flex items-center justify-center relative mt-4">
                  <div className="absolute w-24 h-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,189,32,0.15)_0%,transparent_60%)] blur-md scale-0 group-hover:scale-130 transition-transform duration-500" />
                  
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] group-hover:translate-y-[-6px] group-hover:scale-[1.04] transition-all duration-500 will-change-transform"
                  />
                </div>

                {/* Content description & metadata */}
                <div className="space-y-3 mt-4 flex-1 flex flex-col justify-end">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-display text-base sm:text-lg font-black text-white group-hover:text-yellow transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-numbers text-sm font-extrabold text-yellow shrink-0">
                      {currency} {item.price}
                    </span>
                  </div>
                  <p className="text-grey text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
export default Menu;
