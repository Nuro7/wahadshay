import type React from "react";
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
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-24">
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
            <div
              key={spec.title}
              style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
              className="reveal glass-card glass-card-hover group relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 overflow-hidden"
            >
              {/* Badge */}
              <span className="absolute top-4 right-4 bg-yellow text-plum-dark text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                {spec.badge}
              </span>

              {/* Image Container */}
              <div className="w-[140px] md:w-[180px] shrink-0 micro-icon micro-transition">
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
                <h3 className="font-display text-2xl font-extrabold text-white micro-title micro-transition">
                  {spec.title}
                </h3>
                <p className="text-grey text-sm md:text-base leading-relaxed">
                  {spec.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default Specials;
