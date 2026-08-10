import { Globe2, Users, Handshake } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Vision2030() {
  const { t, language } = useLanguage();
  const phases = t('about.vision2030.phases') as Array<{ phase: string, title: string, description: string }>;

  return (
    <section className="py-24 bg-beige relative overflow-hidden select-none z-10">
      <div className="mx-auto max-w-7xl px-6 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 reveal">
          <h2 className="font-display text-5xl md:text-6xl font-extrabold text-plum">{t('about.vision2030.title')}</h2>
          <div className="hidden md:block w-1.5 h-16 bg-plum rounded-full"></div>
          <div className="md:hidden h-1.5 w-16 bg-plum rounded-full"></div>
          <h3 className="font-display text-2xl md:text-3xl font-medium text-text-primary max-w-sm leading-snug">
            {t('about.vision2030.subtitle')}
          </h3>
        </div>

        {/* Phases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {phases.map((item, idx) => (
            <div 
              key={idx} 
              className="flex bg-white rounded-2xl shadow-xl overflow-hidden reveal premium-card-hover group"
              style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
            >
              <div className="bg-plum text-white w-14 flex items-center justify-center shrink-0">
                <span className="transform -rotate-90 whitespace-nowrap font-display font-bold text-lg tracking-wider block">
                  Phase {item.phase}
                </span>
              </div>
              <div className="p-8">
                <h4 className="font-display text-2xl font-bold text-plum mb-3 group-hover:text-plum-dark transition-colors">{item.title}</h4>
                <p className="text-text-secondary text-base leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
          
          {/* Badge */}
          <div className={`hidden lg:flex absolute ${language === 'AR' ? '-left-6' : '-right-6'} -bottom-6 bg-yellow text-plum rounded-3xl p-6 shadow-2xl transform rotate-12 border-4 border-white z-20 items-center justify-center animate-float-burger`}>
            <span className="font-display font-black text-2xl text-center leading-tight">
              {t('about.vision2030.badgeLine1')}<br/>{t('about.vision2030.badgeLine2')}
            </span>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-plum rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden reveal mt-12">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
            {/* Long-Term Vision */}
            <div className="flex gap-6 items-start">
              <div className="shrink-0 bg-white/10 p-4 rounded-2xl text-yellow">
                <Globe2 size={40} className="stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-display text-3xl font-bold text-yellow mb-4">{t('about.vision2030.longTermTitle')}</h4>
                <p className="text-white/90 text-lg leading-relaxed">
                  {t('about.vision2030.longTermDesc1')}<span className="text-yellow font-bold">{t('about.vision2030.longTermDesc2')}</span>{t('about.vision2030.longTermDesc3')}
                </p>
              </div>
            </div>

            {/* Join the Journey */}
            <div className="flex gap-6 items-start">
              <div className="shrink-0 bg-white/10 p-4 rounded-2xl text-yellow">
                <Handshake size={40} className="stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-display text-3xl font-bold text-yellow mb-4">{t('about.vision2030.joinTitle')}</h4>
                <p className="text-white/90 text-lg leading-relaxed">
                  {t('about.vision2030.joinDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
