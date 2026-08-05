import { motion } from "framer-motion";

const menuCategories = [
  {
    title: "Signature Teas",
    items: [
      { name: "Karak Special", price: "SR 12", desc: "Strong, slow-brewed black tea with milk, fresh crushed cardamom, and saffron." },
      { name: "Saffron Infusion", price: "SR 15", desc: "Premium golden saffron filaments steeped in fine organic black tea." },
      { name: "Mint Suleimani", price: "SR 10", desc: "Clear black tea brewed with fresh spearmint leaves and a splash of lemon." },
      { name: "Masala Blend", price: "SR 14", desc: "A robust blend of black tea, ginger, cloves, cinnamon, and whole milk." },
    ],
  },
  {
    title: "Artisan Breads",
    items: [
      { name: "Cheese Melt Brioche", price: "SR 22", desc: "Buttery brioche bun stuffed with melting triple cheddar and toasted." },
      { name: "Smoked Turkey Croissant", price: "SR 26", desc: "Flaky, multi-layered butter croissant filled with sliced turkey, sage, and provolone." },
      { name: "Spicy Herb Focaccia", price: "SR 18", desc: "Thick olive-oil flatbread topped with sea salt, fresh rosemary, and red chilli flakes." },
      { name: "Honey Butter Scone", price: "SR 14", desc: "Warm, crumbly traditional cream scone served with whipped honey-infused butter." },
    ],
  },
];

export function Menu() {
  return (
    <section id="menu" className="py-24 md:py-32 bg-plum relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block mb-3">
            Handcrafted Selections
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6">
            Explore Our Brand Menu
          </h2>
          <p className="text-grey text-base md:text-lg">
            Every cup and loaf at Wahad Shay is prepared using premium, sourced ingredients and time-honored baking methods.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {menuCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="rounded-3xl border border-white/5 bg-plum-dark/20 p-8 md:p-10 backdrop-blur-sm"
            >
              <h3 className="font-display text-2xl md:text-3xl text-yellow font-extrabold mb-8 pb-3 border-b border-white/5">
                {cat.title}
              </h3>
              
              <div className="space-y-8">
                {cat.items.map((item) => (
                  <div key={item.name} className="group">
                    <div className="flex justify-between items-baseline gap-4 mb-2">
                      <h4 className="font-display text-lg md:text-xl font-bold text-white group-hover:text-yellow transition-colors duration-300">
                        {item.name}
                      </h4>
                      <div className="flex-grow border-b border-dashed border-white/10 mx-2 group-hover:border-yellow/30 transition-colors duration-300" />
                      <span className="font-numbers text-base font-extrabold text-yellow">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-grey text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default Menu;
