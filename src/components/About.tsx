import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Compass, ShieldCheck, Heart, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleStepChange = (newStep: number) => {
    setDirection(newStep > currentStep ? 1 : -1);
    setCurrentStep(newStep);
  };

  const handleNext = () => {
    if (currentStep < timelineData.length - 1) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleStepChange((currentStep + 1) % timelineData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentStep]);

  return (
    <>
      {/* 1. Our Story Section */}
      <section id="about" className="py-24 md:py-32 bg-beige relative overflow-hidden select-none">
        <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-plum/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-left reveal space-y-6">
              <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
                Our Story
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-text-primary leading-tight">
                <span className="text-shimmer">A Symphony of Tea</span> <br />
                <span className="text-plum">&amp; Baked Craft</span>
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-body">
                Wahad Shay was born from a simple yet profound desire: to create a sanctuary where the ancient, rich traditions of slow-brewed tea meet the meticulous artistry of European baking. 
              </p>
              <p className="text-text-primary/85 text-sm md:text-base leading-relaxed font-body font-light">
                From our signature cardamom-infused Karak to our melting cheddar brioches, every item on our menu is a testament to culinary craftsmanship. We import raw saffron directly, hand-crush whole spices, and allow our bread doughs to slow-ferment for over 24 hours to achieve an exquisite, pillowy structure.
              </p>
            </div>

            <div className="reveal-right reveal relative flex items-center justify-center">
              <div className="absolute -inset-2 bg-gradient-to-r from-plum/5 to-yellow/5 rounded-3xl blur-xl opacity-30" />
              <div className="w-full max-w-lg premium-card p-8 md:p-10 text-center relative z-10 border border-neutral-border flex flex-col justify-between h-[360px] overflow-hidden">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-plum">
                    The Brand Motto
                  </span>
                  <blockquote className="font-display text-2xl md:text-3xl italic font-medium leading-relaxed text-text-primary">
                    "A World of Flavor in One Place. Prepared with passion, served with elegance."
                  </blockquote>
                </div>
                <div className="border-t border-neutral-border pt-6 flex items-center justify-center gap-3">
                  <div className="h-0.5 w-6 bg-yellow" />
                  <span className="font-display text-xs font-bold tracking-widest text-plum uppercase">
                    WAHAD SHAY LUXURY
                  </span>
                  <div className="h-0.5 w-6 bg-yellow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Philosophy Section */}
      <section className="py-24 md:py-32 bg-neutral-ivory relative overflow-hidden select-none">
        <div className="absolute bottom-[10%] left-[-15%] w-[400px] h-[400px] bg-yellow/2 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10 space-y-16">
          <div className="reveal text-center max-w-2xl mx-auto space-y-4">
            <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
              Philosophy
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-text-primary">
              What Defines Wahad Shay
            </h2>
            <p className="text-text-secondary text-sm md:text-base">
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
                  className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal premium-card premium-card-hover group p-8 flex flex-col justify-between h-[280px]`}
                >
                  <div className="rounded-full bg-beige border border-neutral-border p-3.5 text-plum w-fit shrink-0 mb-6 group-hover:scale-105 transition-transform">
                    <Icon size={24} className="stroke-[1.5]" />
                  </div>
                  <div className="space-y-2 mt-auto">
                    <h3 className="font-display text-lg font-bold text-text-primary group-hover:text-plum transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Brand Timeline Section */}
      <section className="py-24 md:py-32 bg-beige relative overflow-hidden select-none">
        <div className="mx-auto max-w-7xl px-6 relative z-10 space-y-16">
          <div className="reveal text-center max-w-2xl mx-auto space-y-4">
            <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
              Timeline
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-text-primary">
              Our Journey of Flavor
            </h2>
            <p className="text-text-secondary text-sm md:text-base">
              Tracing our growth from a singular concept lounge to a premium regional franchise network.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <svg 
              viewBox="0 0 800 220" 
              className="w-full h-auto overflow-visible select-none"
            >
              {/* Dotted Pathway Track */}
              <path
                d="M 100,130 C 200,30 220,190 320,80 C 420,-30 450,190 550,130 C 650,70 660,30 700,70"
                fill="none"
                stroke="var(--color-neutral-border)"
                strokeWidth="3"
                strokeDasharray="6 8"
                className="transition-all duration-500"
              />

              {/* active progress line segment */}
              <path
                d="M 100,130 C 200,30 220,190 320,80 C 420,-30 450,190 550,130 C 650,70 660,30 700,70"
                fill="none"
                stroke="var(--color-plum)"
                strokeWidth="3"
                strokeDasharray="760"
                strokeDashoffset={760 - (currentStep / (timelineData.length - 1)) * 760}
                className="transition-all duration-700 ease-in-out opacity-80"
              />

              {/* Traveling Glow Dot */}
              <circle
                r="6"
                fill="var(--color-yellow)"
                style={{
                  offsetPath: "path('M 100,130 C 200,30 220,190 320,80 C 420,-30 450,190 550,130 C 650,70 660,30 700,70')",
                  offsetDistance: `${(currentStep / (timelineData.length - 1)) * 100}%`,
                  transition: "offset-distance 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                  filter: "drop-shadow(0 0 6px var(--color-yellow))"
                }}
              />

              {/* Location Pins & Years */}
              {[
                { year: "2018", title: "Genesis", x: 100, y: 130 },
                { year: "2021", title: "Riyadh HQ", x: 320, y: 80 },
                { year: "2024", title: "UAE Network", x: 550, y: 130 },
                { year: "2026", title: "Digital Lounge", x: 700, y: 70 },
              ].map((node, idx) => {
                const isActive = idx === currentStep;
                const isCompleted = idx < currentStep;
                return (
                  <g 
                    key={node.year} 
                    onClick={() => handleStepChange(idx)}
                    className="cursor-pointer group"
                  >
                    {/* Ring ripple on active pin */}
                    {isActive && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="18"
                        className="fill-none stroke-plum opacity-40"
                        style={{
                          transformOrigin: `${node.x}px ${node.y}px`,
                          animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                        }}
                      />
                    )}

                    {/* Outer circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="10"
                      className={`transition-all duration-300 ${
                        isActive 
                          ? "fill-white stroke-plum stroke-2" 
                          : isCompleted
                            ? "fill-plum stroke-plum"
                            : "fill-white stroke-neutral-border hover:stroke-plum/50"
                      }`}
                    />

                    {/* Center Core dot */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="4"
                      className={`transition-all duration-300 ${
                        isActive ? "fill-yellow" : isCompleted ? "fill-white" : "fill-neutral-border"
                      }`}
                    />

                    {/* Text Label Year */}
                    <text
                      x={node.x}
                      y={node.y - 20}
                      textAnchor="middle"
                      className={`font-numbers text-xs font-bold transition-all duration-300 ${
                        isActive ? "fill-plum scale-110" : "fill-text-secondary group-hover:fill-plum"
                      }`}
                      style={{
                        transformOrigin: `${node.x}px ${node.y - 20}px`
                      }}
                    >
                      {node.year}
                    </text>

                    {/* Title tooltip below node */}
                    <text
                      x={node.x}
                      y={node.y + 24}
                      textAnchor="middle"
                      className={`font-display text-[10px] font-medium tracking-wide uppercase transition-all duration-300 ${
                        isActive ? "fill-plum-dark font-extrabold" : "fill-text-secondary/70 group-hover:fill-plum"
                      }`}
                    >
                      {node.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="relative max-w-3xl mx-auto px-4 md:px-12 flex items-center gap-4 md:gap-6 justify-center">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`p-3 rounded-full border border-neutral-border bg-white text-plum transition-all duration-300 cursor-pointer shadow-sm shrink-0 ${
                currentStep === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-light-beige hover:border-plum/20"
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex-1 overflow-hidden min-h-[190px] flex items-center justify-center relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? 80 : -80,
                      opacity: 0,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                    },
                    exit: (dir: number) => ({
                      x: dir > 0 ? -80 : 80,
                      opacity: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="premium-card premium-card-hover group p-8 space-y-4 text-center">
                    <span className="font-numbers text-3xl font-black text-plum block">
                      {timelineData[currentStep].year}
                    </span>
                    <h4 className="font-display text-xl font-bold text-text-primary group-hover:text-plum transition-colors leading-tight">
                      {timelineData[currentStep].title}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed max-w-md mx-auto">
                      {timelineData[currentStep].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={handleNext}
              disabled={currentStep === timelineData.length - 1}
              className={`p-3 rounded-full border border-neutral-border bg-white text-plum transition-all duration-300 cursor-pointer shadow-sm shrink-0 ${
                currentStep === timelineData.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-light-beige hover:border-plum/20"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
