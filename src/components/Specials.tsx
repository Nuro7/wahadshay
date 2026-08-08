import teacupImg from "../assets/wahad_teacup.png";
import burgerImg from "../assets/wahad_burger.png";

interface SpecialsProps {
  currency: "AED" | "SAR";
}

const specials = [
  {
    tag: "Signature Pairing",
    title: "Royal Karak & Cheese Brioche",
    desc: "Our double-spiced cardamom karak tea paired with a warm, toasted brioche bun loaded with dripping triple cheddar cheese.",
    image: burgerImg,
    badge: "Most Popular",
    price: 30,
  },
  {
    tag: "House Special",
    title: "Golden Saffron & Herb Bun",
    desc: "A hot cup of slow-brewed golden saffron tea served alongside our signature baked rosemary herb bun.",
    image: teacupImg,
    badge: "Chef's Choice",
    price: 28,
  },
];

export function Specials({ currency }: SpecialsProps) {
  return (
    <section id="specials" className="py-24 md:py-32 bg-neutral-ivory relative overflow-hidden select-none">
      {/* Background soft glow orbs */}
      <div className="absolute top-[30%] left-[-15%] w-[450px] h-[450px] bg-plum/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-yellow/2 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
            Weekly Highlights
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-text-primary mask-reveal">
            <span className="text-shimmer">Wahad Shay Specials</span>
          </h2>
          <p className="text-text-secondary text-base font-body max-w-lg mx-auto">
            Carefully curated signature pairings designed to deliver a harmonious explosion of rich flavors.
          </p>
        </div>

        {/* Specials Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {specials.map((spec, idx) => (
            <div
              key={spec.title}
              style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
              className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal premium-card premium-card-hover group relative p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8 overflow-hidden`}
            >
              {/* Animated soft gradient background glow */}
              <div className="absolute -right-[30%] -bottom-[30%] w-[250px] h-[250px] bg-plum/3 rounded-full blur-[70px] group-hover:bg-plum/6 transition-all duration-700 pointer-events-none" />
              
              {/* Badge */}
              <span className="absolute top-4 right-4 bg-yellow text-plum-dark text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full z-20">
                {spec.badge}
              </span>

              {/* Image Container with Floating hover reveal */}
              <div className="w-[140px] md:w-[170px] shrink-0 relative flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(94,38,137,0.06)_0%,transparent_60%)] blur-md scale-0 group-hover:scale-130 transition-transform duration-500 pointer-events-none" />
                <img
                  src={spec.image}
                  alt={spec.title}
                  className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] group-hover:translate-y-[-8px] group-hover:scale-[1.05] transition-all duration-500 will-change-transform"
                />
              </div>

              {/* Details */}
              <div className="space-y-4 text-center sm:text-left flex-1">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-plum uppercase tracking-[0.2em] block">
                    {spec.tag}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-text-primary group-hover:text-plum transition-colors leading-tight">
                    {spec.title}
                  </h3>
                </div>
                
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed line-clamp-3 font-body">
                  {spec.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-border">
                  <span className="font-body text-xs text-text-secondary uppercase tracking-wider">Pairing Price</span>
                  <span className="font-numbers text-lg font-extrabold text-plum">
                    {currency} {spec.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default Specials;
