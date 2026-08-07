import { Sparkles, Compass, ShieldCheck, Heart } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

const timelineData: Milestone[] = [
  {
    year: "2018",
    title: "The Genesis",
    desc: "Founded with a vision to marry traditional tea preparation with premium European artisan baking.",
  },
  {
    year: "2021",
    title: "Riyadh Flagship",
    desc: "Launched our first flagship tea lounge on King Abdulaziz Road, Riyadh, introducing our signature double-spiced Karak.",
  },
  {
    year: "2024",
    title: "UAE Network Launch",
    desc: "Expanded across the borders, establishing initial boutique Lounges in Ajman, Sharjah, and Abu Dhabi.",
  },
  {
    year: "2026",
    title: "The Digital Era",
    desc: "Introduced smart franchise models, modern digital lounges, and premium client-side experiences globally.",
  },
];

const philosophyItems = [
  {
    icon: Compass,
    title: "Authentic Sourcing",
    desc: "We source premium organic saffron from trusted farmers and tea leaves from select high-altitude gardens.",
  },
  {
    icon: Sparkles,
    title: "Artisanal Craft",
    desc: "Our brioche, croissants, and focaccia are baked fresh daily by master bakers using traditional slow fermentation.",
  },
  {
    icon: Heart,
    title: "Warm Hospitality",
    desc: "We design spaces of serene comfort, combining warm beige materials and soft golden lighting for a cozy home feel.",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromising Quality",
    desc: "Every blend is double-spiced and every dish is checked for flavor, color, and absolute customer delight.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-plum-dark relative overflow-hidden select-none">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-[#5e2689]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[400px] h-[400px] bg-yellow/3 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 space-y-24 md:space-y-36">
        
        {/* About Narrative Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal space-y-6">
            <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block">
              Our Story
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              A Symphony of Tea <br />
              <span className="text-yellow">&amp; Baked Craft</span>
            </h2>
            <p className="text-grey text-base md:text-lg leading-relaxed font-body">
              Wahad Shay was born from a simple yet profound desire: to create a sanctuary where the ancient, rich traditions of slow-brewed tea meet the meticulous artistry of European baking. 
            </p>
            <p className="text-white/70 text-sm md:text-base leading-relaxed font-body font-light">
              From our signature cardamom-infused Karak to our melting cheddar brioches, every item on our menu is a testament to culinary craftsmanship. We import raw saffron directly, hand-crush whole spices, and allow our bread doughs to slow-ferment for over 24 hours to achieve an exquisite, pillowy structure.
            </p>
          </div>

          <div className="reveal relative flex items-center justify-center">
            {/* Ambient brand gradient glow card wrapper */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#5e2689]/25 to-[#f5bd20]/15 rounded-3xl blur-xl opacity-60" />
            <div className="w-full max-w-lg glass-card p-8 md:p-10 text-center relative z-10 border border-white/10 flex flex-col justify-between h-[360px] overflow-hidden">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4AF37]">
                  The Brand Motto
                </span>
                <blockquote className="font-display text-2xl md:text-3xl italic font-medium leading-relaxed text-white">
                  "A World of Flavor in One Place. Prepared with passion, served with elegance."
                </blockquote>
              </div>
              <div className="border-t border-white/10 pt-6 flex items-center justify-center gap-3">
                <div className="h-0.5 w-6 bg-yellow" />
                <span className="font-display text-xs font-bold tracking-widest text-[#F8EED5] uppercase">
                  WAHAD SHAY LUXURY
                </span>
                <div className="h-0.5 w-6 bg-yellow" />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Philosophy Grid */}
        <div className="space-y-16">
          <div className="reveal text-center max-w-2xl mx-auto space-y-4">
            <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block">
              Philosophy
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
              What Defines Wahad Shay
            </h2>
            <p className="text-grey text-sm md:text-base">
              We focus on four foundational pillars to deliver a memorable, luxury dining and café experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {philosophyItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                  className="reveal glass-card glass-card-hover p-8 flex flex-col justify-between h-[280px]"
                >
                  <div className="rounded-full bg-white/5 border border-white/10 p-3.5 text-yellow w-fit shrink-0 mb-6 group-hover:scale-105 transition-transform">
                    <Icon size={24} className="stroke-[1.5]" />
                  </div>
                  <div className="space-y-2 mt-auto">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-yellow transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-grey text-xs md:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Timeline Section */}
        <div className="space-y-16 pt-8">
          <div className="reveal text-center max-w-2xl mx-auto space-y-4">
            <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block">
              Timeline
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
              Our Journey of Flavor
            </h2>
            <p className="text-grey text-sm md:text-base">
              Tracing our growth from a singular concept lounge to a premium regional franchise network.
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l border-dashed border-white/10 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2 max-w-4xl space-y-12">
            {timelineData.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  } w-full`}
                >
                  {/* Timeline central dot */}
                  <div className="absolute left-[-17px] md:left-1/2 md:-translate-x-1/2 top-1.5 h-8 w-8 rounded-full bg-plum border-4 border-plum-dark flex items-center justify-center shadow-lg z-20">
                    <div className="h-2 w-2 rounded-full bg-yellow" />
                  </div>

                  {/* Content Card (Left or Right aligned on desktop) */}
                  <div 
                    style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                    className={`reveal w-full md:w-[45%] pl-6 md:pl-0 ${
                      isEven ? "md:pr-10 md:text-right" : "md:pl-10 text-left"
                    }`}
                  >
                    <div className="glass-card glass-card-hover p-6 md:p-8 space-y-3">
                      <span className="font-numbers text-2xl md:text-3xl font-black text-yellow block">
                        {milestone.year}
                      </span>
                      <h4 className="font-display text-lg font-bold text-white">
                        {milestone.title}
                      </h4>
                      <p className="text-grey text-xs md:text-sm leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
export default About;
