import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShieldCheck, Heart, ChevronLeft, ChevronRight, ArrowRight, Leaf } from "lucide-react";
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

const philosophyIcons = [Leaf, Sparkles, Heart, ShieldCheck];

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
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Editorial Story */}
            <div className="reveal-left reveal space-y-8 lg:col-span-7">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-plum/40 block" />
                  <span className="text-plum text-xs font-bold uppercase tracking-[0.25em]">
                    {t('about.storyBadge')}
                  </span>
                </div>
                
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.12] tracking-tight">
                  <span className="text-gradient-plum">{t('about.storyTitle1')}</span>
                  {t('about.storyTitle2') ? <span className="text-gradient-gold ms-1">{t('about.storyTitle2')}</span> : null}
                  <br />
                  <span className="text-plum">{t('about.storyTitle3')}</span>
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-text-primary/90 text-base sm:text-lg leading-relaxed font-body font-medium">
                  {t('about.storyDesc1')}
                </p>
                {t('about.storyDesc2') && (
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-body font-light">
                    {t('about.storyDesc2')}
                  </p>
                )}
              </div>

              <a href={isHomePage ? "#about" : "#menu"} className={`group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-plum hover:text-plum-dark transition-colors pt-2 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                <span className="border-b border-plum/30 pb-1 group-hover:border-plum transition-colors">{t('about.discoverMore')}</span>
                <ArrowRight size={16} className={`transform transition-transform ${language === 'AR' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
              </a>
            </div>

            {/* Right: Brand Motto Card */}
            <div className="reveal-right reveal relative lg:col-span-5 flex items-center justify-center">
              <div className="w-full bg-white/90 backdrop-blur-md p-7 sm:p-8 text-center relative z-10 border border-neutral-border/80 flex flex-col justify-center gap-5 shadow-[0_8px_30px_rgba(46,26,71,0.06)] hover:shadow-[0_12px_40px_rgba(46,26,71,0.1)] rounded-3xl overflow-hidden transition-all duration-300">
                {/* Decorative Top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2.5px] bg-gradient-to-r from-transparent via-plum/50 to-transparent rounded-t-3xl" />
                
                {/* Thematic Botanical Patterns */}
                <div className="absolute top-[-10%] right-[-15%] opacity-[0.03] text-plum transform rotate-45 pointer-events-none">
                  <Leaf size={220} strokeWidth={0.5} />
                </div>
                <div className="absolute bottom-[-10%] left-[-15%] opacity-[0.025] text-yellow transform -rotate-12 pointer-events-none">
                  <Leaf size={240} strokeWidth={0.5} />
                </div>

                <div className="space-y-4 relative">
                  <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-text-secondary/70">
                    {t('about.mottoBadge')}
                  </span>
                  
                  <blockquote className="font-display text-xl sm:text-2xl italic font-light leading-relaxed text-text-primary px-2">
                    {t('about.mottoText')}
                  </blockquote>
                  
                  <div className="pt-2 flex flex-col items-center gap-2">
                    <div className="h-5 w-px bg-plum/25" />
                    <span className="font-display text-[11px] font-bold tracking-[0.25em] text-plum uppercase">
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
            <p className="text-text-secondary text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              {t('about.philDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
            {philosophyItems.map((item, idx) => {
              const Icon = philosophyIcons[idx % philosophyIcons.length];
              const numStr = `0${idx + 1}`;
              
              return (
                <a
                  href={isHomePage ? "#about" : "#menu"}
                  key={item.title}
                  style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                  className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal luxury-card luxury-card-hover group p-6 xs:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white border border-neutral-border shadow-[0_4px_20px_rgba(43,37,32,0.03)] hover:shadow-[0_15px_40px_rgba(94,38,137,0.08)] flex flex-col justify-between relative overflow-hidden transition-all duration-300`}
                >
                  <div className="flex flex-col flex-1">
                    {/* Top Row: Number with underline (left) & Circle icon (right) */}
                    <div className="flex items-center justify-between mb-6 sm:mb-7">
                      <div className="flex flex-col">
                        <span className="font-numbers text-lg xs:text-xl font-bold text-plum tracking-tight leading-none">
                          {numStr}
                        </span>
                        <div className="w-6 h-0.5 bg-yellow/80 rounded-full mt-1.5" />
                      </div>
                      <div className="w-10 h-10 xs:w-11 xs:h-11 rounded-full bg-plum/5 border border-plum/10 flex items-center justify-center text-plum group-hover:scale-105 group-hover:bg-plum/10 group-hover:border-plum/20 transition-all duration-300 shadow-2xs">
                        <Icon size={20} className="stroke-[1.6]" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl xs:text-[22px] sm:text-2xl font-bold text-text-primary leading-snug tracking-tight group-hover:text-plum transition-colors duration-300 mb-2.5 sm:mb-3">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-[13.5px] xs:text-sm sm:text-[14.5px] leading-[1.6] font-body font-light">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Action Area with Divider */}
                  <div className={`mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-neutral-border/60 flex items-center justify-between ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10.5px] xs:text-[11px] uppercase font-bold tracking-[0.2em] text-plum group-hover:text-plum-dark transition-colors">
                      {t('about.discover') || "DISCOVER"}
                    </span>
                    <ArrowRight size={16} className={`text-plum luxury-arrow transition-transform duration-300 group-hover:translate-x-1 group-hover:text-plum-dark ${language === 'AR' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </div>
                  
                  {/* Subtle accent indicator */}
                  {idx === 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-plum/30 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />}
                  {idx === 1 && <div className="absolute top-0 left-0 right-0 h-1 bg-yellow/60 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />}
                  {idx === 2 && <div className="absolute bottom-0 left-0 right-0 h-1 bg-plum/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500" />}
                  {idx === 3 && <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow/60 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />}
                </a>
              );
            })}
          </div>

          {/* Wahad Shay Promise Highlight */}
          <div className="reveal text-center max-w-2xl mx-auto pt-2 sm:pt-4">
            <div className="inline-flex flex-col items-center gap-2.5 px-6 sm:px-10 py-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-md border border-neutral-border shadow-[0_4px_25px_rgba(43,37,32,0.03)] hover:shadow-[0_10px_35px_rgba(94,38,137,0.08)] transition-all duration-300">
              <p className="font-display text-base sm:text-lg md:text-xl font-bold text-gradient-plum tracking-tight">
                {t('about.philPromiseTagline') || "Great ingredients. Signature flavours. Warm hospitality."}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-6 sm:w-10 bg-yellow/80 rounded-full" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-plum uppercase">
                  {t('about.philPromiseText') || "That’s the Wahad Shay promise."}
                </span>
                <div className="h-px w-6 sm:w-10 bg-yellow/80 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Brand Timeline Section ("Our Journey, Growing Together") */}
      <section className="section-padding bg-[#180A26] relative overflow-hidden select-none border-t border-white/5">
        
        {/* Soft luxury diffused ambient glow orbs */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-plum/30 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-0 right-[-10%] w-[450px] h-[450px] bg-yellow/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 left-[-10%] w-[400px] h-[400px] bg-plum/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="premium-container relative z-10 space-y-12 md:space-y-16">
          
          {/* Header */}
          <div className="reveal text-center max-w-3xl mx-auto space-y-4">
            
            {/* Tag Badge with Hairline Accents */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-yellow/50 block" />
              <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em]">
                {t('about.journeyBadge') || 'THE WAHAD SHAY JOURNEY'}
              </span>
              <span className="h-px w-8 bg-yellow/50 block" />
            </div>

            {/* Headline with metallic gold shimmer */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              <span className="text-shimmer-gold">
                {t('about.journeyTitle') || 'Our Journey, Growing Together'}
              </span>
            </h2>

            <p className="text-white/70 text-sm sm:text-base font-body font-light leading-relaxed max-w-xl mx-auto">
              <span>{t('about.journeySubtitle1') || 'From our first branch to the future ahead —'}</span>{' '}
              <span className="block sm:inline">{t('about.journeySubtitle2') || 'every milestone is a step closer to serving you better.'}</span>
            </p>

            {/* Refined Minimal Divider */}
            <div className="flex items-center justify-center gap-3 pt-2 max-w-xs mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-yellow/40 to-yellow/60 flex-1" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-pulse" />
              <div className="h-px bg-gradient-to-l from-transparent via-yellow/40 to-yellow/60 flex-1" />
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
                        isActive ? "text-yellow scale-110 drop-shadow-[0_0_8px_rgba(245,189,32,0.6)] font-black" : "text-yellow/80 group-hover:text-yellow"
                      }`}>
                        {node.year}
                      </span>

                      {/* Wave Node Dot on Curve */}
                      <div className="relative my-2 flex items-center justify-center h-5">
                        {/* Active Ring Pulse */}
                        {isActive && (
                          <span className="absolute w-7 h-7 rounded-full border-2 border-yellow animate-ping opacity-40 pointer-events-none" />
                        )}

                        {/* Node Dot */}
                        <div
                          className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            isOpen
                              ? "bg-yellow shadow-[0_0_12px_rgba(245,189,32,0.8)]"
                              : "bg-[#180A26] border-2 border-yellow"
                          } ${isActive ? "scale-125 ring-4 ring-yellow/30" : "group-hover:scale-110"}`}
                        />
                      </div>

                      {/* Dashed Stem Line */}
                      <div className="w-0 h-6 border-l-2 border-dashed border-yellow/40 group-hover:border-yellow transition-colors" />

                      {/* Storefront Icon Circular/Square Luxury Badge */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-br from-[#3D1A5C] to-[#250E3A] border-2 border-yellow text-yellow shadow-[0_0_25px_rgba(245,189,32,0.45)] scale-110 ring-4 ring-yellow/20"
                            : "bg-[#28133C]/90 border border-yellow/25 text-yellow/80 backdrop-blur-md group-hover:border-yellow group-hover:text-yellow group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(245,189,32,0.25)]"
                        }`}
                      >
                        <StorefrontIcon className="w-7 h-7" />
                      </div>

                      {/* Branch Title */}
                      <h4 className={`font-display text-[12px] sm:text-[13px] font-bold uppercase tracking-wider mt-3.5 transition-colors leading-snug ${
                        isActive ? "text-white font-black" : "text-white/80 group-hover:text-white"
                      }`}>
                        {node.branchName || node.title}
                      </h4>

                      {/* Branch Short Description */}
                      <p className="text-[11px] text-white/60 leading-relaxed max-w-[145px] mx-auto mt-1 font-body font-light">
                        {node.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Vertical Milestones Journey Chain */}
            <div className="md:hidden relative">
              <div className="space-y-3.5 sm:space-y-4 relative">
                {timelineList.map((node: Milestone, idx: number) => {
                  const isActive = idx === currentStep;
                  const isOpen = node.status === "open" || idx < 3;
                  const isFirst = idx === 0;
                  const isLast = idx === timelineList.length - 1;
                  const nextIsOpen = idx < timelineList.length - 1 && (timelineList[idx + 1].status === "open" || idx + 1 < 3);

                  return (
                    <div
                      key={idx}
                      className="relative flex items-stretch gap-3 sm:gap-4"
                    >
                      {/* Vertical Chain Rail Column */}
                      <div className="relative w-7 sm:w-8 flex flex-col items-center justify-center flex-shrink-0">
                        {/* Top vertical connector line segment (from previous node to this node) */}
                        {!isFirst && (
                          <div
                            className={`absolute top-0 bottom-1/2 w-[2.5px] -translate-x-1/2 left-1/2 ${
                              isOpen
                                ? "bg-yellow shadow-[0_0_8px_rgba(245,189,32,0.6)]"
                                : "border-l-2 border-dashed border-yellow/50 bg-transparent"
                            }`}
                          />
                        )}

                        {/* Bottom vertical connector line segment (from this node to next node) */}
                        {!isLast && (
                          <div
                            className={`absolute top-1/2 bottom-0 w-[2.5px] -translate-x-1/2 left-1/2 ${
                              isOpen && nextIsOpen
                                ? "bg-yellow shadow-[0_0_8px_rgba(245,189,32,0.6)]"
                                : "border-l-2 border-dashed border-yellow/50 bg-transparent"
                            }`}
                          />
                        )}

                        {/* Dashed Horizontal Stem Connector to Card */}
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 h-0 border-t-2 border-dashed ${
                            isActive ? "border-yellow" : "border-yellow/40"
                          } ${
                            language === 'AR'
                              ? "right-1/2 w-6 mr-1"
                              : "left-1/2 w-6 ml-1"
                          }`}
                        />

                        {/* Node Dot on the Chain */}
                        <div
                          onClick={() => handleStepChange(idx)}
                          className="relative z-10 w-7 h-7 flex items-center justify-center cursor-pointer group"
                        >
                          {/* Active Ring Pulse */}
                          {isActive && (
                            <span className="absolute inset-0 rounded-full border-2 border-yellow animate-ping opacity-50 pointer-events-none" />
                          )}

                          {/* Glow halo when active */}
                          {isActive && (
                            <span className="absolute -inset-1 rounded-full bg-yellow/25 blur-xs pointer-events-none" />
                          )}

                          {/* Node circle */}
                          <div
                            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                              isOpen
                                ? "bg-yellow shadow-[0_0_10px_rgba(245,189,32,0.9)]"
                                : "bg-[#180A26] border-2 border-yellow shadow-[0_0_6px_rgba(245,189,32,0.3)]"
                            } ${
                              isActive
                                ? "scale-125 ring-4 ring-yellow/30 bg-yellow"
                                : "group-hover:scale-110 opacity-90"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Milestone Card */}
                      <div
                        onClick={() => handleStepChange(idx)}
                        className={`flex-1 p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3.5 sm:gap-4 relative overflow-hidden group select-none ${
                          isActive
                            ? "bg-gradient-to-br from-[#3A185B] via-[#2A1042] to-[#1D0830] border-yellow shadow-[0_0_25px_rgba(245,189,32,0.3)] ring-1 ring-yellow/40 scale-[1.01]"
                            : "bg-[#220F35]/75 border-white/10 hover:border-yellow/40 hover:bg-[#2A1342]/90"
                        }`}
                      >
                        {/* Decorative Active Indicator Bar */}
                        {isActive && (
                          <div className={`absolute top-0 bottom-0 w-1 bg-yellow ${language === 'AR' ? 'right-0' : 'left-0'}`} />
                        )}

                        {/* Storefront Icon */}
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-br from-[#4D1F74] to-[#2B0E44] text-yellow border-2 border-yellow shadow-[0_0_15px_rgba(245,189,32,0.4)] scale-105"
                              : "bg-[#28133C] text-yellow/80 border border-yellow/25 group-hover:border-yellow/60 group-hover:text-yellow"
                          }`}
                        >
                          <StorefrontIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>

                        {/* Card Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] sm:text-[11px] font-bold text-yellow uppercase tracking-wider font-display block">
                              {node.year}
                            </span>
                            {/* Step number badge */}
                            <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full border ${
                              isActive
                                ? "text-yellow border-yellow/50 bg-yellow/10"
                                : "text-white/40 border-white/10 bg-white/5"
                            }`}>
                              0{idx + 1}
                            </span>
                          </div>

                          <h4 className={`font-display font-bold text-sm sm:text-base transition-colors leading-tight mt-0.5 ${
                            isActive ? "text-white font-black" : "text-white/90 group-hover:text-white"
                          }`}>
                            {node.branchName || node.title}
                          </h4>

                          <p className="text-xs text-white/70 mt-1 font-body font-light line-clamp-2 leading-relaxed">
                            {node.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Detail Card at Bottom with Left / Right Switchers */}
            <div className="mt-8 md:mt-10 flex justify-center">
              <div className="w-full max-w-2xl bg-gradient-to-br from-[#2D1648]/95 via-[#220E38]/95 to-[#160726]/95 border border-yellow/30 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_35px_rgba(94,38,137,0.2)] backdrop-blur-xl relative overflow-hidden flex items-center justify-between gap-3 sm:gap-5">
                
                {/* Decorative Ambient Card Light */}
                <div className="absolute top-0 right-1/4 w-[250px] h-[250px] bg-yellow/5 rounded-full blur-3xl pointer-events-none" />

                {/* Prev Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/5 hover:bg-yellow hover:text-plum-dark hover:border-yellow text-white flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0 active:scale-95 shadow-md z-20"
                  aria-label="Previous Milestone"
                >
                  <ChevronLeft size={18} className="rtl:rotate-180" />
                </button>

                {/* Center Animated Milestone Card */}
                <div className="flex-1 px-1 sm:px-3 z-10">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({
                          x: dir > 0 ? 20 : -20,
                          opacity: 0,
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                        },
                        exit: (dir: number) => ({
                          x: dir > 0 ? -20 : 20,
                          opacity: 0,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 text-center sm:text-start"
                    >
                      {/* Glowing Storefront Rounded Square Badge */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#3E1B60] to-[#250E3A] border-2 border-yellow/60 text-yellow flex items-center justify-center shadow-[0_0_25px_rgba(245,189,32,0.25)] flex-shrink-0 ring-2 ring-yellow/10">
                        <StorefrontIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>

                      {/* Content */}
                      <div className="space-y-1 flex-1">
                        <span className="text-yellow text-[11px] font-bold uppercase tracking-widest font-display block">
                          {activeMilestone.year}
                        </span>
                        <h3 className="font-display text-lg sm:text-2xl font-black text-white leading-tight mt-0.5">
                          {activeMilestone.title}
                        </h3>
                        
                        {/* Golden Horizontal Bar */}
                        <div className="w-8 h-[2px] bg-gradient-to-r from-yellow to-yellow/40 my-1.5 mx-auto sm:mx-0 rounded-full" />

                        <p className="text-white/90 text-xs sm:text-sm font-medium leading-relaxed font-body">
                          {activeMilestone.cardSubtitle || activeMilestone.desc}
                        </p>
                        <p className="text-white/60 text-[11px] sm:text-xs font-light leading-relaxed font-body">
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
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/5 hover:bg-yellow hover:text-plum-dark hover:border-yellow text-white flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0 active:scale-95 shadow-md z-20"
                  aria-label="Next Milestone"
                >
                  <ChevronRight size={18} className="rtl:rotate-180" />
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
