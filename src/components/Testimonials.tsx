import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    name: "Yousef Al-Mutawa",
    role: "Food & Hospitality Critic, Dubai",
    text: "Wahad Shay has elevated the tea lounge experience to pure art. The Karak Special is double-spiced perfection, and the cheese brioche melts like butter in the sun. Truly Rolls-Royce digital hospitality.",
    rating: 5,
  },
  {
    name: "Sarah Lindqvist",
    role: "Artisan Baker & Enthusiast, Riyadh",
    text: "The fermentation of their smoked turkey croissant is flawless—airy, flaky layers with the exact right bite. Combined with the saffron infusion, it is a culinary harmony you don't find elsewhere.",
    rating: 5,
  },
  {
    name: "Faisal Bin Salman",
    role: "Franchise Investor, Abu Dhabi",
    text: "Partnering with Wahad Shay was a seamless experience. Their operations, store design support, and proprietary spice blends are world-class. Our Abu Dhabi branch has become a community landmark.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-plum relative overflow-hidden select-none">
      {/* Ambient background glow orbs */}
      <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] bg-[#5E2689]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[380px] h-[380px] bg-yellow/4 rounded-full blur-[110px] pointer-events-none animate-pulse" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block">
            Guest Experience
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white">
            Customer Testimonials
          </h2>
          <p className="text-grey text-sm md:text-base font-body">
            What our guests and network partners say about their Wahad Shay café experience.
          </p>
        </div>

        {/* Testimonial Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((t, idx) => (
            <div
              key={t.name}
              style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
              className="reveal glass-card glass-card-hover p-8 md:p-10 flex flex-col justify-between h-[320px] relative"
            >
              {/* Quote Mark Icon Accent */}
              <div className="absolute top-6 right-6 text-yellow/10">
                <Quote size={40} className="stroke-[1.5]" />
              </div>

              {/* Rating stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow text-yellow stroke-[1]" />
                ))}
              </div>

              {/* Message */}
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed italic font-body my-6 flex-1">
                "{t.text}"
              </p>

              {/* User Bio */}
              <div className="border-t border-white/5 pt-4">
                <h4 className="font-display text-sm font-bold text-[#F8EED5]">
                  {t.name}
                </h4>
                <span className="text-[10px] text-grey font-body uppercase font-bold tracking-wider mt-1 block">
                  {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default Testimonials;
