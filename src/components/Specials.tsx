import { motion } from "framer-motion";
import teacupImg from "../assets/wahad_teacup.png";
import burgerImg from "../assets/wahad_burger.png";

const specials = [
  {
    tag: "Signature Pairing",
    title: "Royal Karak & Cheese Brioche",
    desc: "Our double-spiced cardamom karak tea paired with a warm, toasted brioche bun loaded with dripping triple cheddar cheese.",
    image: burgerImg,
    badge: "Most Popular",
  },
  {
    tag: "House Special",
    title: "Golden Saffron & Herb Bun",
    desc: "A hot cup of slow-brewed golden saffron tea served alongside our signature rosemary herb bun.",
    image: teacupImg,
    badge: "Chef's Choice",
  },
];

export function Specials() {
  return (
    <section id="specials" className="py-24 md:py-32 bg-plum-dark relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-[30%] left-[-15%] w-[400px] h-[400px] bg-[#9333ea] rounded-full blur-[150px] opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block mb-3">
            Weekly Highlights
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6">
            Wahad Shay Specials
          </h2>
          <p className="text-grey text-base md:text-lg">
            Carefully curated signature pairings designed to deliver a harmonious explosion of flavor.
          </p>
        </div>

        {/* Specials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {specials.map((spec, idx) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group relative rounded-3xl border border-white/5 bg-plum/30 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 overflow-hidden hover:border-yellow/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-500"
            >
              {/* Badge */}
              <span className="absolute top-4 right-4 bg-yellow text-plum-dark text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                {spec.badge}
              </span>

              {/* Image Container */}
              <div className="w-[140px] md:w-[180px] shrink-0 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={spec.image}
                  alt={spec.title}
                  className="w-full h-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Details */}
              <div className="space-y-4 text-center md:text-left">
                <span className="text-xs font-bold text-yellow uppercase tracking-widest block">
                  {spec.tag}
                </span>
                <h3 className="font-display text-2xl font-extrabold text-white">
                  {spec.title}
                </h3>
                <p className="text-grey text-sm md:text-base leading-relaxed">
                  {spec.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default Specials;
