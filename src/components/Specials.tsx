import hotChickenBurgerImg from "../assets/hot_chicken_burger.webp";
import hotChickenRiceImg from "../assets/hot_chicken_rice.webp";
import juicyDipImg from "../assets/juicy_dip.webp";
import miniBitesImg from "../assets/mini_bites.webp";
import specialItemImg from "../assets/hot_chicken.webp";
import { useLanguage } from "../i18n/LanguageContext";
import { Sparkles } from "lucide-react";

export function Specials({ isHomePage = false }: { isHomePage?: boolean } = {}) {
  const { t, language } = useLanguage();
  const isAr = language === "AR";

  const specials = [
    {
      title: isAr ? "برجر الدجاج الحار" : "Hot Chicken Burger",
      tag: isAr ? "طبق الدار المميز" : "House Special",
      badge: isAr ? "اختيار الشيف" : "Chef's Choice",
      desc: isAr
        ? "قطعة دجاج حارة مقرمشة وذهبية تعلوها الجبنة الذائبة، الخس الطازج، وصلصتنا الحارة المميزة."
        : "Crispy golden fried hot chicken patty topped with melted cheese, fresh lettuce, and signature spicy sauce.",
      image: hotChickenBurgerImg,
      pairing: isAr ? "واحد شاي" : "Wahad shay",
      highlight: isAr ? "يُحضر طازجاً يومياً" : "Freshly Prepared Daily",
    },
    {
      title: isAr ? "برجر جوسي ديب" : "Juicy Dip Burger",
      tag: isAr ? "مزيج مميز" : "Signature Pairing",
      badge: isAr ? "الأكثر طلباً" : "Most Popular",
      desc: isAr
        ? "برجر دجاج شهي وغني بالعصارة يُقدّم مع تغميسة صلصة الجبن الدافئة واللذيذة لتجربة نكهة استثنائية."
        : "Succulent chicken burger served with rich, warm dripping cheese sauce dip for the ultimate flavor experience.",
      image: juicyDipImg,
      pairing: isAr ? "واحد شاي" : "Wahad shay",
      highlight: isAr ? "وصفة خاصة" : "Signature Recipe",
    },
    {
      title: isAr ? "أرز الدجاج الحار" : "Hot Chicken Rice",
      tag: isAr ? "خاص بالشيف" : "Chef Special",
      badge: isAr ? "المفضل لدى الزوار" : "Customer Favorite",
      desc: isAr
        ? "أرز مشخول متبل وعطري يُقدّم مع الدجاج المحمر الحار ومرق الدار الخاص."
        : "Fragrant seasoned mashkool rice served with spicy roasted chicken and house special gravy.",
      image: hotChickenRiceImg,
      pairing: isAr ? "واحد شاي" : "Wahad shay",
      highlight: isAr ? "نكهات مطهوة ببطء" : "Slow Cooked Flavors",
    },
    {
      title: isAr ? "ميني بايتس" : "Mini Bites",
      tag: isAr ? "سناك مفضل" : "Snack Favorite",
      badge: isAr ? "الأكثر رواجاً" : "Trending",
      desc: isAr
        ? "قطع دجاج مقرمشة وذهبية بحجم اللقمة تُقدّم ساخنة مع صلصة التغميس الخاصة."
        : "Bite-sized golden crispy chicken nuggets served hot with custom dipping sauce.",
      image: miniBitesImg,
      pairing: isAr ? "واحد شاي" : "Wahad shay",
      highlight: isAr ? "مقرمش وطري" : "Crispy & Tender",
    },
    {
      title: isAr ? "دجاج حار" : "Hot Chicken",
      tag: isAr ? "تشكيلة استثنائية" : "Signature Selection",
      badge: isAr ? "تجربة لا تُفوت" : "Must Try",
      desc: isAr
        ? "مجموعتنا الحصرية التي تجمع بين شاي الكرك المميز والمأكولات الحرفية الطازجة."
        : "Our exclusive combination of signature Karak tea and artisanal freshly prepared delicacies.",
      image: specialItemImg,
      pairing: isAr ? "واحد شاي" : "Wahad shay",
      highlight: isAr ? "حرفة وإتقان" : "Artisan Craft",
    },
  ];

  return (
    <section id="specials" className={`${isHomePage ? "section-padding-landing" : "page-first-section"} bg-neutral-ivory relative overflow-hidden select-none`}>
      {/* Background soft glow orbs */}
      <div className="absolute top-[30%] left-[-15%] w-[450px] h-[450px] bg-plum/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-yellow/2 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className={`${isHomePage ? "premium-container" : "page-container"} relative z-10`}>

        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <span className="typo-eyebrow text-plum block mb-4">
            {t('specials.weeklyHighlights')}
          </span>
          {isHomePage ? (
            <h2 className="typo-section-title text-text-primary mask-reveal mb-5">
              <span className="text-shimmer">{t('specials.title')}</span>
            </h2>
          ) : (
            <h1 className="typo-section-title text-text-primary mask-reveal mb-5">
              <span className="text-shimmer">{t('specials.title')}</span>
            </h1>
          )}
          <p className="typo-body text-text-secondary max-w-lg mx-auto">
            {t('specials.subtitle')}
          </p>
        </div>

        {/* Specials Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {specials.map((spec, idx) => {
            const isLastOdd = idx === specials.length - 1 && specials.length % 2 !== 0;

            return (
              <div
                key={spec.title}
                style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal luxury-card luxury-card-hover group relative p-3.5 sm:p-5 md:p-6 flex flex-col sm:flex-row items-stretch gap-4 sm:gap-6 md:gap-7 overflow-hidden rounded-3xl ${
                  isLastOdd ? "lg:col-span-2 lg:max-w-3xl lg:mx-auto w-full" : ""
                }`}
              >
                {/* Animated soft gradient background glow */}
                <div className="absolute -right-[20%] -bottom-[20%] w-[250px] h-[250px] bg-plum/4 rounded-full blur-[70px] group-hover:bg-plum/8 transition-all duration-700 pointer-events-none" />

                {/* Hero Image Container */}
                <div className="w-full aspect-[4/3] sm:w-[260px] md:w-[280px] lg:w-[300px] sm:aspect-[4/3] sm:h-auto shrink-0 relative rounded-2xl overflow-hidden bg-[#241038]/5 shadow-md">
                  {/* Subtle inner ambient glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-plum/10 via-yellow/15 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                  {/* Badge floating inside the top-end corner of the image */}
                  <div className="absolute top-3 end-3 z-20">
                    <span className="bg-yellow text-plum-dark typo-badge px-3 py-1 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.25)] flex items-center gap-1 backdrop-blur-sm border border-yellow/30">
                      <Sparkles size={11} className="text-plum-dark" />
                      {spec.badge}
                    </span>
                  </div>

                  {/* Food Image */}
                  <img
                    src={spec.image}
                    alt={spec.title}
                    loading="lazy"
                    decoding="async"
                    width="300"
                    height="225"
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform ${
                      spec.image === miniBitesImg
                        ? "object-[center_35%]"
                        : "object-center"
                    }`}
                  />

                  {/* Bottom Image Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none sm:hidden" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between text-start p-1 sm:p-0 space-y-3">
                  <div className="space-y-1.5">
                    <span className="typo-eyebrow text-plum block">
                      {spec.tag}
                    </span>
                    <h3 className="typo-h3 text-text-primary group-hover:text-plum transition-colors leading-tight">
                      {spec.title}
                    </h3>
                    <p className="typo-body-sm text-text-secondary leading-relaxed line-clamp-2 sm:line-clamp-3 pt-0.5">
                      {spec.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3.5 border-t border-neutral-border/80 mt-auto">
                    <span className="typo-button-sm text-plum/90 uppercase flex items-center gap-1.5 font-bold">
                      <Sparkles size={13} className="text-yellow shrink-0" />
                      {spec.pairing}
                    </span>
                    <span className="inline-flex items-center typo-badge text-plum bg-plum/5 px-3 py-1 rounded-full border border-plum/10 shrink-0">
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
