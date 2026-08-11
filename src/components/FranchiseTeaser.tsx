import type React from "react";
import Button from "./ui/Button";
import { useLanguage } from "../i18n/LanguageContext";

export function FranchiseTeaser() {
  const { t } = useLanguage();
  return (
    <section className="section-padding bg-neutral-ivory border-t border-neutral-border/40 relative overflow-hidden select-none">
      {/* Background ambient light */}
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] bg-plum/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[250px] h-[250px] bg-yellow/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="premium-container relative z-10">
        <div className="reveal grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Column: Heading and info */}
          <div className="lg:col-span-3 space-y-6 text-center lg:text-left">
            <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
              {t('franchiseTeaser.badge')}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-text-primary leading-tight">
              <span className="text-shimmer">{t('franchiseTeaser.title1')}</span> <br />
              <span className="text-plum font-extrabold">{t('franchiseTeaser.title2')}</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-body max-w-xl mx-auto lg:mx-0">
              {t('franchiseTeaser.subtitle')}
            </p>
            
            {/* Action CTA */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <a 
                href="#franchise"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, '', '#franchise');
                  window.dispatchEvent(new HashChangeEvent("hashchange"));
                }}
              >
                <Button variant="primary" className="shadow-[0_4px_15px_rgba(245,189,32,0.15)]">
                  {t('franchiseTeaser.cta')}
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Statistics grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 w-full">
            <div className="premium-card p-6 flex flex-col justify-center items-center text-center h-[120px] border border-neutral-border bg-white/70 backdrop-blur-md shadow-sm rounded-2xl">
              <span className="font-numbers text-2xl md:text-3xl font-extrabold text-plum">{t('franchiseTeaser.stats.outletsNum')}</span>
              <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mt-1">{t('franchiseTeaser.stats.outletsLabel')}</span>
            </div>
            <div className="premium-card p-6 flex flex-col justify-center items-center text-center h-[120px] border border-neutral-border bg-white/70 backdrop-blur-md shadow-sm rounded-2xl">
              <span className="font-numbers text-2xl md:text-3xl font-extrabold text-plum">{t('franchiseTeaser.stats.guestsNum')}</span>
              <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mt-1">{t('franchiseTeaser.stats.guestsLabel')}</span>
            </div>
            <div className="premium-card p-6 flex flex-col justify-center items-center text-center h-[120px] border border-neutral-border bg-white/70 backdrop-blur-md shadow-sm rounded-2xl">
              <span className="font-numbers text-2xl md:text-3xl font-extrabold text-plum">{t('franchiseTeaser.stats.growthNum')}</span>
              <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mt-1">{t('franchiseTeaser.stats.growthLabel')}</span>
            </div>
            <div className="premium-card p-6 flex flex-col justify-center items-center text-center h-[120px] border border-neutral-border bg-white/70 backdrop-blur-md shadow-sm rounded-2xl">
              <span className="font-numbers text-2xl md:text-3xl font-extrabold text-yellow-600">{t('franchiseTeaser.stats.trainingNum')}</span>
              <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider mt-1">{t('franchiseTeaser.stats.trainingLabel')}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FranchiseTeaser;
