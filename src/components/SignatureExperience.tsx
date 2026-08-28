import { Hamburger, Sandwich, Soup, Drumstick, CupSoda, ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const experienceIcons = [Hamburger, Sandwich, Soup, Drumstick, CupSoda];
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
        <div className="reveal text-center max-w-2xl mx-auto space-y-4">
          <span className="typo-eyebrow text-plum block">
            {t('about.signatureExperience.badge')}
          </span>
          <h2 className="typo-section-title text-text-primary mask-reveal">
            <span className="text-shimmer">{t('about.signatureExperience.title')}</span>
          </h2>
          <p className="typo-body text-text-secondary max-w-lg mx-auto">
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
              <a
                href="#specials"
                key={exp.title}
                style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                className={`reveal luxury-card luxury-card-hover group p-6 xs:p-7 md:p-8 lg:p-9 rounded-2xl sm:rounded-3xl bg-white border border-neutral-border shadow-[0_4px_20px_rgba(43,37,32,0.03)] hover:shadow-[0_15px_40px_rgba(94,38,137,0.08)] flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${colSpan}`}
              >
                {/* Large Background Watermark Icon */}
                <div className="bg-icon-watermark right-[-5%] bottom-[-10%] group-hover:text-plum transition-colors duration-700">
                  <Icon size={240} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Top Row: Number with horizontal line & Circular Icon */}
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-base sm:text-lg font-black text-plum/80 leading-none tabular-nums">
                        {numStr}
                      </span>
                      <div className="w-6 sm:w-8 h-px bg-plum/20" />
                    </div>
                    <div className="text-plum luxury-icon bg-plum/5 p-2.5 sm:p-3 rounded-full border border-plum/10 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:bg-plum/10">
                      <Icon size={20} className="stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Title & Description directly below top row with tight, clean, elegant spacing */}
                  <div className="space-y-2 sm:space-y-2.5 max-w-xl">
                    <h3 className="typo-h3 text-text-primary leading-tight group-hover:text-plum transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <p className="typo-body-sm text-text-secondary leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Area with Divider */}
                <div className={`relative z-10 mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-neutral-border/50 flex items-center justify-between ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                  <span className="typo-eyebrow text-plum group-hover:text-plum-dark transition-colors">
                    {t('about.signatureExperience.discover') || "DISCOVER"}
                  </span>
                  <ArrowRight size={16} className={`text-plum luxury-arrow transition-transform duration-300 group-hover:translate-x-1 group-hover:text-plum-dark ${language === 'AR' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
export default SignatureExperience;
