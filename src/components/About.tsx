import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Compass, ShieldCheck, Heart, ChevronLeft, ChevronRight, ArrowRight, Leaf } from "lucide-react";

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
      <section id="about" className="py-24 md:py-36 bg-neutral-ivory relative overflow-hidden select-none">
        {/* Subtle botanical line texture can be simulated or added as background. For now we use very soft blurred orbs to keep it clean */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-plum/3 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left: Editorial Story */}
            <div className="reveal-left reveal space-y-10 lg:col-span-7">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-plum/40 block" />
                  <span className="text-plum text-[10px] font-bold uppercase tracking-[0.35em]">
                    Our Story
                  </span>
                </div>
                
                <h2 className="font-display text-[2.75rem] md:text-7xl font-black leading-[1.05] tracking-tight">
                  <span className="text-gradient-plum">A Symphony</span> <span className="text-gradient-gold">of Tea</span>
                  <br />
                  <span className="text-plum">&amp; Baked Craft</span>
                </h2>
              </div>

              <div className="space-y-6 max-w-xl">
                <p className="text-text-primary/90 text-lg md:text-xl leading-relaxed font-body font-medium">
                  Wahad Shay was born from a simple yet profound desire: to create a sanctuary where the ancient, rich traditions of slow-brewed tea meet the meticulous artistry of European baking. 
                </p>
                <p className="text-text-secondary text-sm md:text-base leading-loose font-body font-light">
                  From our signature cardamom-infused Karak to our melting cheddar brioches, every item on our menu is a testament to culinary craftsmanship. We import raw saffron directly, hand-crush whole spices, and allow our bread doughs to slow-ferment for over 24 hours to achieve an exquisite, pillowy structure.
                </p>
              </div>

              <button className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-plum hover:text-plum-dark transition-colors pt-4">
                <span className="border-b border-plum/30 pb-1 group-hover:border-plum transition-colors">Discover More</span>
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right: Brand Motto Card */}
            <div className="reveal-right reveal relative lg:col-span-5 h-full flex items-center">
              <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm p-10 md:p-14 text-center relative z-10 border border-neutral-border/60 flex flex-col justify-center gap-12 aspect-[4/5] shadow-lg rounded-2xl overflow-hidden">
                {/* Decorative Top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-plum/30 to-transparent rounded-t-2xl" />
                
                {/* Thematic Botanical Patterns */}
                <div className="absolute top-[-10%] right-[-15%] opacity-[0.04] text-plum transform rotate-45 pointer-events-none">
                  <Leaf size={280} strokeWidth={0.5} />
                </div>
                <div className="absolute bottom-[-10%] left-[-15%] opacity-[0.03] text-yellow transform -rotate-12 pointer-events-none">
                  <Leaf size={320} strokeWidth={0.5} />
                </div>

                <div className="space-y-8 relative">
                  <span className="text-[9px] uppercase font-bold tracking-[0.4em] text-text-secondary/60">
                    The Brand Motto
                  </span>
                  
                  <blockquote className="font-display text-2xl md:text-3xl italic font-light leading-[1.4] text-text-primary px-4">
                    "A World of Flavor in One Place. Prepared with passion, served with elegance."
                  </blockquote>
                  
                  <div className="pt-8 flex flex-col items-center gap-4">
                    <div className="h-6 w-px bg-plum/20" />
                    <span className="font-display text-[10px] font-bold tracking-[0.3em] text-plum uppercase">
                      Wahad Shay Luxury
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Philosophy Section */}
      <section className="py-24 md:py-36 bg-beige relative overflow-hidden select-none">
        <div className="absolute bottom-[10%] left-[-15%] w-[600px] h-[600px] bg-yellow/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10 space-y-20">
          <div className="reveal text-center max-w-2xl mx-auto space-y-6">
            <span className="text-plum text-[10px] font-bold uppercase tracking-[0.3em] block">
              Philosophy
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-text-primary">
              What Defines Wahad Shay
            </h2>
            <p className="text-text-secondary text-base font-light max-w-md mx-auto">
              We focus on four foundational pillars to deliver a memorable, luxury dining and café experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {philosophyItems.map((item, idx) => {
              const Icon = item.icon;
              const numStr = `0${idx + 1}`;
              
              return (
                <div
                  key={item.title}
                  style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                  className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal luxury-card luxury-card-hover group p-8 md:p-10 flex flex-col justify-between h-[360px] relative`}
                >
                  {/* Huge Background Number */}
                  <span className="bg-number-watermark luxury-bg-num bottom-[-20%] right-[-10%] group-hover:opacity-10 transition-opacity duration-700">
                    {numStr}
                  </span>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Top Section */}
                    <div className="flex items-start justify-between mb-10">
                      <div className="flex flex-col gap-2">
                        <span className="font-numbers text-base font-black text-plum/80 tracking-widest">
                          {numStr}
                        </span>
                        <div className="w-6 h-px bg-yellow/60" />
                      </div>
                      <div className="text-plum bg-plum/5 p-3 rounded-full luxury-icon transition-transform duration-500 ease-out border border-plum/10 group-hover:bg-plum/10 group-hover:border-plum/20">
                        <Icon size={24} className="stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="mt-auto space-y-5">
                      <h3 className="font-display text-2xl font-bold text-text-primary leading-tight group-hover:text-plum transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-8 pt-6 border-t border-neutral-border/60 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-plum group-hover:text-plum-dark transition-colors">
                        Discover
                      </span>
                      <ArrowRight size={16} className="text-plum luxury-arrow transition-transform duration-500 group-hover:text-plum-dark" />
                    </div>
                  </div>
                  
                  {/* Varying subtle accent borders based on index */}
                  {idx === 0 && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-plum/30 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />}
                  {idx === 1 && <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow/60 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />}
                  {idx === 2 && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-plum/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500" />}
                  {idx === 3 && <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-yellow/60 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Brand Timeline Section */}
      <section className="pt-24 md:pt-36 pb-32 bg-plum-dark relative overflow-hidden select-none">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-plum/50 rounded-[100%] blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10 space-y-24">
          <div className="reveal text-center max-w-2xl mx-auto space-y-6">
            <span className="text-yellow text-[10px] font-bold uppercase tracking-[0.3em] block">
              The Wahad Shay Journey
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white">
              A Legacy in the Making
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* SVG Timeline */}
            <svg 
              viewBox="0 0 800 220" 
              className="w-full h-auto overflow-visible select-none drop-shadow-2xl"
            >
              {/* Dotted Pathway Track (Gold) */}
              <path
                d="M 100,130 C 200,30 220,190 320,80 C 420,-30 450,190 550,130 C 650,70 660,30 700,70"
                fill="none"
                stroke="rgba(245, 189, 32, 0.2)"
                strokeWidth="2"
                strokeDasharray="4 8"
                className="transition-all duration-500"
              />

              {/* active progress line segment (Solid Gold) */}
              <path
                d="M 100,130 C 200,30 220,190 320,80 C 420,-30 450,190 550,130 C 650,70 660,30 700,70"
                fill="none"
                stroke="var(--color-yellow)"
                strokeWidth="2"
                strokeDasharray="760"
                strokeDashoffset={760 - (currentStep / (timelineData.length - 1)) * 760}
                className="transition-all duration-700 ease-in-out"
                style={{ filter: "drop-shadow(0 0 8px rgba(245, 189, 32, 0.4))" }}
              />

              {/* Traveling Glow Dot */}
              <circle
                r="4"
                fill="var(--color-white)"
                style={{
                  offsetPath: "path('M 100,130 C 200,30 220,190 320,80 C 420,-30 450,190 550,130 C 650,70 660,30 700,70')",
                  offsetDistance: `${(currentStep / (timelineData.length - 1)) * 100}%`,
                  transition: "offset-distance 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                  filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"
                }}
              />

              {/* Location Pins & Years */}
              {[
                { year: "2018", title: "Genesis", x: 100, y: 130 },
                { year: "2021", title: "Riyadh HQ", x: 320, y: 80 },
                { year: "2024", title: "UAE Network", x: 550, y: 130 },
                { year: "2026", title: "Digital Era", x: 700, y: 70 },
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
                        r="20"
                        className="fill-none stroke-yellow opacity-30"
                        style={{
                          transformOrigin: `${node.x}px ${node.y}px`,
                          animation: "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                        }}
                      />
                    )}

                    {/* Outer circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="8"
                      className={`transition-all duration-500 ${
                        isActive 
                          ? "fill-plum-dark stroke-yellow stroke-[3px]" 
                          : isCompleted
                            ? "fill-yellow stroke-yellow"
                            : "fill-plum-dark stroke-yellow/40 hover:stroke-yellow"
                      }`}
                      style={isActive ? { filter: "drop-shadow(0 0 12px rgba(245, 189, 32, 0.6))" } : {}}
                    />

                    {/* Text Label Year */}
                    <text
                      x={node.x}
                      y={node.y - 24}
                      textAnchor="middle"
                      className={`font-numbers text-sm transition-all duration-500 ${
                        isActive ? "fill-yellow font-black scale-110" : "fill-white/60 font-medium group-hover:fill-white"
                      }`}
                      style={{
                         transformOrigin: `${node.x}px ${node.y - 24}px`
                      }}
                    >
                      {node.year}
                    </text>

                    {/* Title tooltip below node */}
                    <text
                      x={node.x}
                      y={node.y + 28}
                      textAnchor="middle"
                      className={`font-display text-[9px] tracking-[0.2em] uppercase transition-all duration-500 ${
                        isActive ? "fill-white font-bold" : "fill-white/40 font-medium group-hover:fill-white/80"
                      }`}
                    >
                      {node.title}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Overlapping Info Panel */}
            <div className="relative z-20 mt-[-40px] md:mt-[-60px] max-w-2xl mx-auto px-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`p-2 rounded-full border border-white/10 text-white/50 transition-all duration-300 cursor-pointer hover:bg-white/10 hover:text-white ${
                      currentStep === 0 ? "opacity-30 cursor-not-allowed" : ""
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="font-display text-[10px] font-bold tracking-[0.3em] text-yellow uppercase">
                    {timelineData[currentStep].year}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentStep === timelineData.length - 1}
                    className={`p-2 rounded-full border border-white/10 text-white/50 transition-all duration-300 cursor-pointer hover:bg-white/10 hover:text-white ${
                      currentStep === timelineData.length - 1 ? "opacity-30 cursor-not-allowed" : ""
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        x: dir > 0 ? 40 : -40,
                        opacity: 0,
                      }),
                      center: {
                        x: 0,
                        opacity: 1,
                      },
                      exit: (dir: number) => ({
                        x: dir > 0 ? -40 : 40,
                        opacity: 0,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    <h4 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                      {timelineData[currentStep].title}
                    </h4>
                    <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-md mx-auto">
                      {timelineData[currentStep].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
