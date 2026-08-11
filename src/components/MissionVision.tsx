import { Eye, Target, CheckCircle2, Lightbulb, Award, TrendingUp } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const coreIcons = [CheckCircle2, Lightbulb, Award, TrendingUp];

export default function MissionVision() {
  const { t } = useLanguage();
  const coreValues = t('about.missionVision.coreValues') as string[];
  return (
    <section className="py-24 bg-neutral-ivory relative overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-12">
            {/* Vision */}
            <div className="flex flex-col sm:flex-row gap-6 items-start reveal-left reveal group">
              <div className="shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-white border border-neutral-border shadow-sm relative transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-plum/20">
                <div className="absolute inset-0 rounded-2xl border border-yellow opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-500" />
                <Eye size={36} className="text-plum stroke-[1] transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="pt-2">
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-plum mb-4">{t('about.missionVision.visionTitle')}</h3>
                <p className="text-text-primary text-lg md:text-xl font-medium max-w-md leading-relaxed font-body">
                  {t('about.missionVision.visionDesc')}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="flex flex-col sm:flex-row gap-6 items-start reveal-left reveal group" style={{ "--stagger-idx": 1 } as React.CSSProperties}>
              <div className="shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-white border border-neutral-border shadow-sm relative transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-plum/20">
                <div className="absolute inset-0 rounded-2xl border border-yellow opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-500" />
                <Target size={36} className="text-plum stroke-[1] transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="pt-2">
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-plum mb-4">{t('about.missionVision.missionTitle')}</h3>
                <p className="text-text-primary text-lg md:text-xl font-medium max-w-md leading-relaxed font-body">
                  {t('about.missionVision.missionDesc')}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:border-l lg:border-plum/20 lg:px-16 reveal-right reveal" style={{ "--stagger-idx": 2 } as React.CSSProperties}>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-plum mb-10">{t('about.missionVision.coreValuesTitle')}</h3>
            <div className="space-y-6">
              {coreValues.map((title, idx) => {
                const Icon = coreIcons[idx % coreIcons.length];
                return (
                  <div key={idx} className="flex items-center gap-5 group p-2 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300 border border-transparent hover:border-neutral-border">
                    <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-plum/5 text-plum group-hover:bg-plum group-hover:text-yellow transition-colors duration-300">
                      <Icon size={22} className="stroke-[1.5]" />
                    </div>
                    <span className="font-body text-text-primary text-lg md:text-xl font-semibold group-hover:text-plum transition-colors">{title}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
