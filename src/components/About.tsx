import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Compass, ShieldCheck, Heart, ChevronLeft, ChevronRight, ArrowRight, Leaf } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface Milestone {
  year: string;
  title: string;
  branchName?: string;
  desc: string;
  cardSubtitle?: string;
  cardDesc?: string;
  status?: "open" | "upcoming";
  shortTitle?: string;
}

const defaultTimelineData: Milestone[] = [
  {
    year: "JUNE 2025",
    title: "Al Hamidiya Branch",
    branchName: "HAMIDIYA BRANCH",
    desc: "Our journey begins. Hamidiya welcomed us first.",
    cardSubtitle: "A milestone that marked our beginning.",
    cardDesc: "Hamidiya is where our signature chai rituals first came to life, bringing people together over warmth and tradition.",
    status: "open"
  },
  {
    year: "JANUARY 2026",
    title: "Al Falah Branch",
    branchName: "AL FALAH BRANCH",
    desc: "A new chapter of flavour and community in Al Falah.",
    cardSubtitle: "A milestone that brought our craft to the capital.",
    cardDesc: "Al Falah branch welcomed guests with our signature tea blends and fresh artisan bakes in a cozy, modern lounge atmosphere.",
    status: "open"
  },
  {
    year: "APRIL 2026",
    title: "Al Wahda Branch",
    branchName: "AL WAHDA BRANCH",
    desc: "Expanding our experience to the heart of Al Wahda.",
    cardSubtitle: "A milestone that brought us closer to you.",
    cardDesc: "Al Wahda is where great food and unforgettable moments meet.",
    status: "open"
  },
  {
    year: "OPENING SOON",
    title: "Al Rawda Branch",
    branchName: "AL RAWDA BRANCH",
    desc: "A new destination is on the way.",
    cardSubtitle: "Expanding to new vibrant neighborhoods.",
    cardDesc: "Our upcoming Al Rawda branch is designed with luxurious warm interiors to create the perfect community sanctuary.",
    status: "upcoming"
  },
  {
    year: "OPENING SOON",
    title: "Sharjah Branch",
    branchName: "SHARJAH BRANCH",
    desc: "More flavours, more memories. Coming soon to Sharjah.",
    cardSubtitle: "Carrying our legacy to the cultural capital.",
    cardDesc: "Bringing Wahad Shay's signature karak, specialty teas, and artisanal baked delicacies to Sharjah.",
    status: "upcoming"
  }
];

const philosophyIcons = [Compass, Sparkles, Heart, ShieldCheck];

const StorefrontIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6.5L5.5 3h13L21 6.5" />
    <path d="M3 6.5h18" />
    <path d="M3 6.5c0 1.2 1 2 2.25 2s2.25-.8 2.25-2c0 1.2 1 2 2.25 2s2.25-.8 2.25-2c0 1.2 1 2 2.25 2s2.25-.8 2.25-2" />
    <path d="M4 8.5V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8.5" />
    <path d="M8.5 21v-5a2 2 0 0 1 4 0v5" />
    <rect x="14.5" y="12" width="3" height="3" rx="0.5" />
  </svg>
);

export function About({ isHomePage = false }: { isHomePage?: boolean }) {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(2);
  const [direction, setDirection] = useState(0);

  const timelineList = (t('about.timeline') as Milestone[]) || defaultTimelineData;
  const activeMilestone = timelineList[currentStep] || timelineList[0] || defaultTimelineData[0];
  const philosophyItems = t('about.philosophy') as any[];

  const handleStepChange = (newStep: number) => {
    setDirection(newStep > currentStep ? 1 : -1);
    setCurrentStep(newStep);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextStep = (currentStep + 1) % timelineList.length;
    setDirection(1);
    setCurrentStep(nextStep);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevStep = (currentStep - 1 + timelineList.length) % timelineList.length;
    setDirection(-1);
    setCurrentStep(prevStep);
  };

  return (
    <>
      {/* 1. Our Story Section */}
      <section id="about" className="section-padding-landing bg-neutral-ivory relative overflow-hidden select-none">
        {/* Subtle botanical line texture can be simulated or added as background. For now we use very soft blurred orbs to keep it clean */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-plum/3 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="premium-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left: Editorial Story */}
            <div className="reveal-left reveal space-y-10 lg:col-span-7">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-plum/40 block" />
                  <span className="text-plum text-[11px] font-bold uppercase tracking-[0.3em]">
                    {t('about.storyBadge')}
                  </span>
                </div>
                
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black leading-[1.08] tracking-tight">
                  <span className="text-gradient-plum">{t('about.storyTitle1')}</span> <span className="text-gradient-gold">{t('about.storyTitle2')}</span>
                  <br />
                  <span className="text-plum">{t('about.storyTitle3')}</span>
                </h2>
              </div>

              <div className="space-y-6 max-w-xl">
                <p className="text-text-primary/90 text-base md:text-lg leading-relaxed font-body font-medium">
                  {t('about.storyDesc1')}
                </p>
                <p className="text-text-secondary text-sm md:text-base leading-loose font-body font-light">
                  {t('about.storyDesc2')}
                </p>
              </div>

              <a href={isHomePage ? "#about" : "#menu"} className={`group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-plum hover:text-plum-dark transition-colors pt-4 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                <span className="border-b border-plum/30 pb-1 group-hover:border-plum transition-colors">{t('about.discoverMore')}</span>
                <ArrowRight size={16} className={`transform transition-transform ${language === 'AR' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
              </a>
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
                    {t('about.mottoBadge')}
                  </span>
                  
                  <blockquote className="font-display text-2xl md:text-3xl italic font-light leading-[1.4] text-text-primary px-4">
                    {t('about.mottoText')}
                  </blockquote>
                  
                  <div className="pt-8 flex flex-col items-center gap-4">
                    <div className="h-6 w-px bg-plum/20" />
                    <span className="font-display text-[10px] font-bold tracking-[0.3em] text-plum uppercase">
                      {t('about.mottoFooter')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Philosophy Section */}
      <section className="section-padding bg-beige relative overflow-hidden select-none">
        <div className="absolute bottom-[10%] left-[-15%] w-[600px] h-[600px] bg-yellow/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="premium-container relative z-10 space-y-16">
          <div className="reveal text-center max-w-2xl mx-auto space-y-6">
            <span className="text-plum text-[11px] font-bold uppercase tracking-[0.25em] block">
              {t('about.philBadge')}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              <span className="text-gradient-plum">{t('about.philTitle1')}</span>{" "}
              <span className="text-gradient-gold">{t('about.philTitle2')}</span>
            </h2>
            <p className="text-text-secondary text-base font-light max-w-md mx-auto">
              {t('about.philDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {philosophyItems.map((item, idx) => {
              const Icon = philosophyIcons[idx % philosophyIcons.length];
              const numStr = `0${idx + 1}`;
              
              return (
                <a
                  href={isHomePage ? "#about" : "#menu"}
                  key={item.title}
                  style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                  className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal luxury-card luxury-card-hover group p-8 md:p-10 flex flex-col justify-between min-h-[340px] relative block`}
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
                    <div className={`mt-8 pt-6 border-t border-neutral-border/60 flex items-center justify-between ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-plum group-hover:text-plum-dark transition-colors">
                        {t('about.discover')}
                      </span>
                      <ArrowRight size={16} className={`text-plum luxury-arrow transition-transform duration-500 group-hover:text-plum-dark ${language === 'AR' ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  
                  {/* Varying subtle accent borders based on index */}
                  {idx === 0 && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-plum/3 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />}
                  {idx === 1 && <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow/60 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />}
                  {idx === 2 && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-plum/3 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500" />}
                  {idx === 3 && <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-yellow/60 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Brand Timeline Section ("Our Journey, Growing Together") */}
      <section className="py-16 md:py-24 bg-[#1A0A28] relative overflow-hidden select-none">
        
        {/* Luxury Islamic Geometric Lattice Pattern in Dark Section */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z M40 15 L65 40 L40 65 L15 40 Z' fill='%23F5BD20' fill-opacity='0.8' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px"
          }}
        />

        {/* Ambient Rich Glow Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#5E2689]/35 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F5BD20]/8 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5E2689]/25 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 md:space-y-16">
          
          {/* Header */}
          <div className="reveal text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#F5BD20] text-xs font-bold uppercase tracking-[0.25em] block">
              {t('about.journeyBadge') || 'THE WAHAD SHAY JOURNEY'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {t('about.journeyTitle') || 'Our Journey, Growing Together'}
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto font-body">
              <span>{t('about.journeySubtitle1') || 'From our first branch to the future ahead —'}</span>{' '}
              <span className="block sm:inline">{t('about.journeySubtitle2') || 'every milestone is a step closer to serving you better.'}</span>
            </p>

            {/* Divider with Plus Accent */}
            <div className="flex items-center justify-center gap-3 pt-2 max-w-xs mx-auto">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-[#F5BD20]/50 flex-1" />
              <span className="text-[#F5BD20] text-xs font-bold">+</span>
              <div className="h-[1px] bg-gradient-to-l from-transparent to-[#F5BD20]/50 flex-1" />
            </div>
          </div>

          {/* Timeline Visual Wave & Milestones */}
          <div className="relative max-w-6xl mx-auto">
            
            {/* Desktop & Tablet Timeline Grid */}
            <div className="hidden md:block relative pt-6 pb-2">
              
              {/* Connecting Sine Wave Behind Nodes */}
              <div className="absolute top-[52px] left-[10%] right-[10%] h-8 pointer-events-none z-0">
                <svg viewBox="0 0 800 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  {/* Solid Gold Wave for Open branches */}
                  <path
                    d={language === 'AR'
                      ? "M 800,20 Q 700,5 600,20 T 400,20"
                      : "M 0,20 Q 100,5 200,20 T 400,20"}
                    fill="none"
                    stroke="#F5BD20"
                    strokeWidth="2.5"
                    style={{ filter: "drop-shadow(0 0 8px rgba(245, 189, 32, 0.6))" }}
                  />
                  {/* Dashed Gold Wave for Upcoming branches */}
                  <path
                    d={language === 'AR'
                      ? "M 400,20 Q 300,5 200,20 T 0,20"
                      : "M 400,20 Q 500,5 600,20 T 800,20"}
                    fill="none"
                    stroke="#F5BD20"
                    strokeWidth="2"
                    strokeDasharray="5 6"
                    className="opacity-50"
                  />
                </svg>
              </div>

              {/* 5 Milestone Columns */}
              <div className="grid grid-cols-5 gap-3 relative z-10">
                {timelineList.map((node: Milestone, idx: number) => {
                  const isActive = idx === currentStep;
                  const isOpen = node.status === "open" || idx < 3;

                  return (
                    <div
                      key={idx}
                      onClick={() => handleStepChange(idx)}
                      className="flex flex-col items-center text-center group cursor-pointer select-none"
                    >
                      {/* Date Label above node */}
                      <span className={`font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-300 h-6 flex items-center ${
                        isActive ? "text-[#F5BD20] scale-110 drop-shadow-[0_0_8px_rgba(245,189,32,0.6)] font-black" : "text-[#F5BD20]/80 group-hover:text-[#F5BD20]"
                      }`}>
                        {node.year}
                      </span>

                      {/* Wave Node Dot on Curve */}
                      <div className="relative my-2 flex items-center justify-center h-5">
                        {/* Active Ring Pulse */}
                        {isActive && (
                          <span className="absolute w-7 h-7 rounded-full border-2 border-[#F5BD20] animate-ping opacity-40 pointer-events-none" />
                        )}

                        {/* Node Dot */}
                        <div
                          className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            isOpen
                              ? "bg-[#F5BD20] shadow-[0_0_12px_rgba(245,189,32,0.8)]"
                              : "bg-[#1E0D2E] border-2 border-[#F5BD20]"
                          } ${isActive ? "scale-125 ring-4 ring-[#F5BD20]/30" : "group-hover:scale-110"}`}
                        />
                      </div>

                      {/* Dashed Stem Line */}
                      <div className="w-0 h-6 border-l-2 border-dashed border-[#F5BD20]/40 group-hover:border-[#F5BD20] transition-colors" />

                      {/* Storefront Icon Circular Badge */}
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-[#33184A] border-2 border-[#F5BD20] text-[#F5BD20] shadow-[0_0_25px_rgba(245,189,32,0.45)] scale-110 ring-4 ring-[#F5BD20]/20"
                            : "bg-[#28133C] border border-[#F5BD20]/30 text-[#F5BD20]/80 group-hover:border-[#F5BD20] group-hover:text-[#F5BD20] group-hover:scale-105"
                        }`}
                      >
                        <StorefrontIcon className="w-7 h-7" />
                      </div>

                      {/* Branch Title */}
                      <h4 className={`font-display text-[12px] sm:text-[13px] font-bold uppercase tracking-wider mt-3.5 transition-colors leading-snug ${
                        isActive ? "text-white font-extrabold" : "text-white/80 group-hover:text-white"
                      }`}>
                        {node.branchName || node.title}
                      </h4>

                      {/* Branch Short Description */}
                      <p className="text-[11px] text-neutral-300/80 leading-relaxed max-w-[145px] mx-auto mt-1 font-body">
                        {node.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Vertical Milestones List */}
            <div className="md:hidden space-y-4">
              {timelineList.map((node: Milestone, idx: number) => {
                const isActive = idx === currentStep;
                return (
                  <div
                    key={idx}
                    onClick={() => handleStepChange(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                      isActive
                        ? "bg-[#28133C] border-[#F5BD20] shadow-lg ring-1 ring-[#F5BD20]/30"
                        : "bg-[#220F35]/60 border-white/10 hover:border-[#F5BD20]/40"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isActive ? "bg-[#33184A] text-[#F5BD20] border-2 border-[#F5BD20] shadow-[0_0_15px_rgba(245,189,32,0.3)]" : "bg-[#28133C] text-[#F5BD20]/80 border border-[#F5BD20]/30"
                    }`}>
                      <StorefrontIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-[#F5BD20] uppercase tracking-wider block">
                        {node.year}
                      </span>
                      <h4 className="font-display font-bold text-sm text-white">
                        {node.branchName || node.title}
                      </h4>
                      <p className="text-xs text-neutral-300/80 mt-0.5 font-body">
                        {node.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Detail Card at Bottom with Left / Right Switchers */}
            <div className="mt-10 md:mt-14">
              <div className="bg-gradient-to-br from-[#2D1648]/95 via-[#230F38]/95 to-[#19092B]/95 border border-[#F5BD20]/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_30px_rgba(94,38,137,0.2)] backdrop-blur-xl relative overflow-hidden flex items-center justify-between gap-4">
                
                {/* Decorative Ambient Card Light */}
                <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#F5BD20]/5 rounded-full blur-3xl pointer-events-none" />

                {/* Prev Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/25 bg-white/5 hover:bg-[#F5BD20] hover:text-[#2E1A47] hover:border-[#F5BD20] text-white flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0 active:scale-95 shadow-md z-20"
                  aria-label="Previous Milestone"
                >
                  <ChevronLeft size={22} className="rtl:rotate-180" />
                </button>

                {/* Center Animated Milestone Card */}
                <div className="flex-1 px-2 sm:px-6 z-10">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({
                          x: dir > 0 ? 30 : -30,
                          opacity: 0,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                        },
                        exit: (dir: number) => ({
                          x: dir > 0 ? -30 : 30,
                          opacity: 0,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8 text-center sm:text-start"
                    >
                      {/* Glowing Storefront Circle Badge */}
                      <div className="w-22 h-22 sm:w-28 sm:h-28 rounded-full border-2 border-[#F5BD20]/50 bg-[#2E1A47] text-[#F5BD20] flex items-center justify-center shadow-[0_0_35px_rgba(245,189,32,0.25)] flex-shrink-0">
                        <StorefrontIcon className="w-11 h-11 sm:w-14 sm:h-14" />
                      </div>

                      {/* Content */}
                      <div className="space-y-1.5 flex-1">
                        <span className="text-[#F5BD20] text-xs font-bold uppercase tracking-widest block">
                          {activeMilestone.year}
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                          {activeMilestone.title}
                        </h3>
                        
                        {/* Golden Horizontal Bar */}
                        <div className="w-10 h-[2.5px] bg-[#F5BD20] my-2.5 mx-auto sm:mx-0 rounded-full" />

                        <p className="text-neutral-200 text-sm sm:text-base font-medium leading-relaxed">
                          {activeMilestone.cardSubtitle || activeMilestone.desc}
                        </p>
                        <p className="text-neutral-400 text-xs sm:text-sm font-normal leading-relaxed font-body pt-0.5">
                          {activeMilestone.cardDesc || activeMilestone.desc}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/25 bg-white/5 hover:bg-[#F5BD20] hover:text-[#2E1A47] hover:border-[#F5BD20] text-white flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0 active:scale-95 shadow-md z-20"
                  aria-label="Next Milestone"
                >
                  <ChevronRight size={22} className="rtl:rotate-180" />
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default About;
