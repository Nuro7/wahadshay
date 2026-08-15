import hotChickenBurgerImg from "../assets/Hot Chicken Burger.jpg";
import hotChickenRiceImg from "../assets/Hot Chicken Rice.jpg";
import juicyDipImg from "../assets/Juicy Dip.jpg";
import miniBitesImg from "../assets/Mini Bites.jpg";
import specialItemImg from "../assets/Hot Chicken.jpg";
import { useLanguage } from "../i18n/LanguageContext";
import { Sparkles } from "lucide-react";

export function Specials() {
  const { t } = useLanguage();

  const specials = [
    {
      title: "Hot Chicken Burger",
      tag: "House Special",
      badge: "Chef's Choice",
      desc: "Crispy golden fried hot chicken patty topped with melted cheese, fresh lettuce, and signature spicy sauce.",
      image: hotChickenBurgerImg,
      pairing: "Wahad shay",
      highlight: "Freshly Prepared Daily",
    },
    {
      title: "Juicy Dip Burger",
      tag: "Signature Pairing",
      badge: "Most Popular",
      desc: "Succulent chicken burger served with rich, warm dripping cheese sauce dip for the ultimate flavor experience.",
      image: juicyDipImg,
      pairing: "Wahad shay",
      highlight: "Signature Recipe",
    },
    {
      title: "Hot Chicken Rice",
      tag: "Chef Special",
      badge: "Customer Favorite",
      desc: "Fragrant seasoned mashkool rice served with spicy roasted chicken and house special gravy.",
      image: hotChickenRiceImg,
      pairing: "Wahad shay",
      highlight: "Slow Cooked Flavors",
    },
    {
      title: "Mini Bites",
      tag: "Snack Favorite",
      badge: "Trending",
      desc: "Bite-sized golden crispy chicken nuggets served hot with custom dipping sauce.",
      image: miniBitesImg,
      pairing: "Wahad shay",
      highlight: "Crispy & Tender",
    },
    {
      title: "Hot Chicken",
      tag: "Signature Selection",
      badge: "Must Try",
      desc: "Our exclusive combination of signature Karak tea and artisanal freshly prepared delicacies.",
      image: specialItemImg,
      pairing: "Wahad shay",
      highlight: "Artisan Craft",
    },
  ];

  return (
    <section id="specials" className="section-padding-landing bg-neutral-ivory relative overflow-hidden select-none min-h-screen">
      {/* Background soft glow orbs */}
      <div className="absolute top-[30%] left-[-15%] w-[450px] h-[450px] bg-plum/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-yellow/2 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="premium-container relative z-10">

        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-14 md:mb-20 space-y-4">
          <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
            {t('specials.weeklyHighlights')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black text-text-primary mask-reveal">
            <span className="text-shimmer">{t('specials.title')}</span>
          </h2>
          <p className="text-text-secondary text-base font-body max-w-lg mx-auto">
            {t('specials.subtitle')}
          </p>
        </div>

        {/* Specials Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {specials.map((spec, idx) => {
            const isLastOdd = idx === specials.length - 1 && specials.length % 2 !== 0;

            return (
              <div
                key={spec.title}
                style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal premium-card premium-card-hover group relative p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8 overflow-hidden ${
                  isLastOdd ? "lg:col-span-2 lg:max-w-2xl lg:mx-auto w-full" : ""
                }`}
              >
                {/* Animated soft gradient background glow */}
                <div className="absolute -right-[30%] -bottom-[30%] w-[250px] h-[250px] bg-plum/3 rounded-full blur-[70px] group-hover:bg-plum/6 transition-all duration-700 pointer-events-none" />

                {/* Badge */}
                <span className="absolute top-4 end-4 bg-yellow text-plum-dark text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full z-20">
                  {spec.badge}
                </span>

                {/* Image Container with Enhanced Height & Glow Highlight */}
                <div className="w-[160px] sm:w-[180px] md:w-[220px] shrink-0 relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-plum/10 via-yellow/15 to-transparent blur-lg scale-110 opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <img
                    src={spec.image}
                    alt={spec.title}
                    className="w-full h-48 sm:h-52 md:h-56 object-cover rounded-2xl border-2 border-white/80 shadow-xl group-hover:translate-y-[-6px] group-hover:scale-[1.04] transition-all duration-500 will-change-transform relative z-10"
                  />
                </div>

                {/* Details */}
                <div className="space-y-4 text-center sm:text-start flex-1">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-plum uppercase tracking-[0.2em] block">
                      {spec.tag}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-text-primary group-hover:text-plum transition-colors leading-tight">
                      {spec.title}
                    </h3>
                  </div>

                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed line-clamp-3 font-body">
                    {spec.desc}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-border">
                    <span className="font-body text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={13} className="text-plum shrink-0" />
                      {spec.pairing}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-plum uppercase tracking-wider bg-plum/5 px-3 py-1 rounded-full border border-plum/10">
                      {spec.highlight}
                    </span>
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
export default Specials;
