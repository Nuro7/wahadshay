import { Coffee, Utensils, Sparkles, Croissant, Dessert, ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface ExperienceItem {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  desc: string;
  colSpan?: string;
}

const experienceIcons = [Sparkles, Coffee, Croissant, Dessert, Utensils];
const colSpans = [
  "md:col-span-6 lg:col-span-5", // First row left
  "md:col-span-6 lg:col-span-7", // First row right (slightly wider)
  "md:col-span-12 lg:col-span-12", // Middle row (full width featured)
  "md:col-span-6 lg:col-span-7", // Bottom row left (slightly wider)
  "md:col-span-6 lg:col-span-5", // Bottom row right
];

export function SignatureExperience() {
  const { t, language } = useLanguage();
  const experiences = t('about.signatureExperience.experiences') as Array<{ title: string, desc: string }>;
  return (
    <section id="experience" className="section-padding bg-neutral-ivory relative overflow-hidden select-none">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,38,137,0.02),transparent_70%)] pointer-events-none" />

      <div className="premium-container relative z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto space-y-6">
          <span className="text-plum text-[11px] font-bold uppercase tracking-[0.25em] block">
            {t('about.signatureExperience.badge')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black text-text-primary mask-reveal">
            <span className="text-shimmer">{t('about.signatureExperience.title')}</span>
          </h2>
          <p className="text-text-secondary text-base font-light max-w-lg mx-auto">
            {t('about.signatureExperience.subtitle')}
          </p>
        </div>

        {/* Asymmetric Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {experiences.map((exp, idx) => {
            const Icon = experienceIcons[idx % experienceIcons.length];
            const colSpan = colSpans[idx % colSpans.length];
            const numStr = `0${idx + 1}`;
            
            return (
              <div
                key={exp.title}
                style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                className={`reveal luxury-card luxury-card-hover group p-8 md:p-12 flex flex-col justify-between min-h-[340px] relative overflow-hidden ${colSpan}`}
              >
                {/* Large Background Watermark Icon */}
                <div className="bg-icon-watermark right-[-5%] bottom-[-10%] group-hover:text-plum transition-colors duration-700">
                  <Icon size={240} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <span className="font-numbers text-sm font-bold text-plum/70 tracking-widest">
                        {numStr}
                      </span>
                      <div className="w-8 h-px bg-plum/20" />
                    </div>
                    <div className="text-plum luxury-icon bg-plum/5 p-3 rounded-full border border-plum/10 transition-transform duration-500 ease-out">
                      <Icon size={22} className="stroke-[1.5]" />
                    </div>
                  </div>

                  <div className="mt-auto space-y-4 max-w-[85%]">
                    <h3 className="font-display text-2xl font-bold text-text-primary leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed font-light">
                      {exp.desc}
                    </p>
                  </div>

                  <div className={`mt-10 pt-6 border-t border-neutral-border/50 flex items-center justify-between ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-plum">
                      {t('about.signatureExperience.discover')}
                    </span>
                    <ArrowRight size={16} className={`text-plum luxury-arrow transition-transform duration-500 ${language === 'AR' ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
export default SignatureExperience;
