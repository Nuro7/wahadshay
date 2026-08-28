import { Play, ExternalLink } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { useLanguage } from "../i18n/LanguageContext";

import miniBitesImg from "../assets/mini_bites.jpg";

interface MediaItem {
  id: string;
  type: "video" | "image";
  src: string;
  instagramUrl: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    type: "video",
    src: "/home.mp4",
    instagramUrl: "https://www.instagram.com/reel/DcRJOKCsIo6/",
    titleEn: "Café Atmosphere & Rituals",
    titleAr: "أجواء المقهى والطقوس",
    subtitleEn: "Authentic Chai Experience",
    subtitleAr: "تجربة الشاي الأصيلة"
  },
  {
    id: "2",
    type: "video",
    src: "/home1.mp4",
    instagramUrl: "https://www.instagram.com/reel/DbTE8qztb6Q/",
    titleEn: "Juicy Dip & Sandwiches",
    titleAr: "جوسي ديب وساندويتشات",
    subtitleEn: "Spiced Melts & Rich Gravy",
    subtitleAr: "نكهات غنية وتغميسات فاخرة"
  },
  {
    id: "3",
    type: "video",
    src: "/home.mp4",
    instagramUrl: "https://www.instagram.com/reel/DbI0f8-s2DD/",
    titleEn: "Kitchen Craft & Passion",
    titleAr: "حرفة المطبخ والشغف",
    subtitleEn: "Fresh Preparation Daily",
    subtitleAr: "إعداد طازج يوميًا بأعلى المعايير"
  },
  {
    id: "4",
    type: "video",
    src: "/mobile.mp4",
    instagramUrl: "https://www.instagram.com/reel/DY72O-qsBeV/",
    titleEn: "Hot Chicken Burger",
    titleAr: "برجر الدجاج الحار",
    subtitleEn: "Signature Brioche & Glazed Crisp",
    subtitleAr: "بريوش مميز مع قرمشة متبلة"
  },
  {
    id: "5",
    type: "video",
    src: "/home1.mp4",
    instagramUrl: "https://www.instagram.com/reel/DYhYMCTPtS5/",
    titleEn: "Hot Chicken Rice Bowl",
    titleAr: "أرز الدجاج الحار",
    subtitleEn: "Aromatic Basmati & Roasted Spices",
    subtitleAr: "أرز بسمتي عطري مع بهارات محمصة"
  },
  {
    id: "6",
    type: "image",
    src: miniBitesImg,
    instagramUrl: "https://www.instagram.com/wahadshay.ae/",
    titleEn: "Mini Bites Selection",
    titleAr: "تشكيلة ميني بايتس",
    subtitleEn: "Perfect Companions to Chai",
    subtitleAr: "الرفيق المثالي لكوب الشاي"
  }
];

export function Gallery() {
  const { t, language } = useLanguage();

  return (
    <section id="gallery" className="section-padding bg-neutral-ivory relative overflow-hidden select-none">
      
      {/* Background Subtle Line Art Texture */}
      <div className="absolute inset-0 food-pattern-bg opacity-[0.04] pointer-events-none" />
      
      {/* Ambient Diffused Glow Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-plum/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-yellow/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="premium-container relative z-10 space-y-12 md:space-y-16">
        
        {/* ======================================================== */}
        {/* SECTION HEADER: Matches Official Brand Theme & Shimmer */}
        {/* ======================================================== */}
        <div className="reveal text-center max-w-3xl mx-auto space-y-4">
          
          {/* Hairline Tag Badge */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-plum/40 block" />
            <span className="typo-eyebrow text-plum">
              {t("about.gallery.badge") || "VISUAL JOURNAL"}
            </span>
            <span className="h-px w-8 bg-plum/40 block" />
          </div>

          {/* Headline with Signature Metallic Shimmer */}
          <h2 className="typo-section-title text-text-primary">
            <span className="text-shimmer block sm:inline">
              {language === "AR" ? "لمحة من" : "A Taste of"}
            </span>{" "}
            <span className="text-plum font-extrabold block sm:inline">
              {language === "AR" ? "قصتنا وتجربتنا" : "Our Story"}
            </span>
          </h2>

          <p className="typo-body text-text-secondary max-w-xl mx-auto">
            {t("about.gallery.tasteSubtitle") || "Tea, craft, and moments shared across every cup and bite."}
          </p>

          {/* Minimalist Brand Divider */}
          <div className="flex items-center justify-center gap-3 pt-2 max-w-xs mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-plum/20 to-plum/40 flex-1" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-pulse" />
            <div className="h-px bg-gradient-to-l from-transparent via-plum/20 to-plum/40 flex-1" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* DIRECT INSTAGRAM VIDEO REEL CARDS (Clean Video with Direct Link) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mediaItems.map((item) => (
            <a
              key={item.id}
              href={item.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-card group relative overflow-hidden rounded-3xl bg-black border border-neutral-border/80 shadow-[0_6px_25px_rgba(43,37,32,0.04)] hover:shadow-[0_20px_45px_rgba(94,38,137,0.18)] transition-all duration-500 cursor-pointer h-[480px] sm:h-[520px] flex flex-col justify-end block"
              aria-label={item.titleEn}
            >
              {item.type === "video" ? (
                <>
                  {/* Pure HTML5 Video Stream Preview */}
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                  />

                  {/* Dark Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140620]/95 via-[#140620]/20 to-[#140620]/40 z-10 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 typo-badge text-yellow shadow-xs flex items-center gap-1.5">
                      <FaInstagram size={13} className="text-yellow" />
                      <span>{language === "AR" ? "ريلز إنستغرام" : "INSTAGRAM REEL"}</span>
                    </span>

                    <div className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-yellow group-hover:text-plum-dark text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-110">
                      <ExternalLink size={15} />
                    </div>
                  </div>

                  {/* Center Play Button Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-yellow/90 text-plum-dark flex items-center justify-center shadow-[0_4px_25px_rgba(245,189,32,0.4)] group-hover:scale-115 group-hover:bg-yellow transition-all duration-300">
                      <Play size={24} fill="currentColor" className="translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Content Bar */}
                  <div className="p-6 z-20 relative space-y-2 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="typo-eyebrow text-yellow block">
                      {language === "AR" ? item.subtitleAr : item.subtitleEn}
                    </span>
                    <h3 className="typo-h3 text-white leading-tight">
                      {language === "AR" ? item.titleAr : item.titleEn}
                    </h3>

                    {/* Direct Instagram Action Pill */}
                    <div className="pt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F5BD20] to-[#E5AB15] text-plum-dark typo-button-sm shadow-md group-hover:shadow-lg transition-all">
                        <FaInstagram size={14} />
                        <span>{language === "AR" ? "مشاهدة الفيديو على إنستغرام" : "Watch on Instagram"}</span>
                        <ExternalLink size={12} />
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* Still Photo Card */
                <div className="w-full h-full p-6 flex flex-col items-center justify-between relative bg-gradient-to-br from-white via-neutral-ivory to-white">
                  <div className="w-full flex justify-between items-center z-20">
                    <span className="px-3 py-1 rounded-full bg-plum/5 border border-plum/10 typo-badge text-plum shadow-xs">
                      {language === "AR" ? "طبق مميز" : "SIGNATURE DISH"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-plum/5 text-plum flex items-center justify-center">
                      <ExternalLink size={14} />
                    </div>
                  </div>

                  <img
                    src={item.src}
                    alt={language === "AR" ? item.titleAr : item.titleEn}
                    className="max-h-[60%] max-w-[85%] object-contain filter drop-shadow-[0_15px_25px_rgba(43,37,32,0.18)] group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    draggable={false}
                  />

                  <div className="w-full text-start z-20 space-y-1">
                    <span className="typo-eyebrow text-plum block">
                      {language === "AR" ? item.subtitleAr : item.subtitleEn}
                    </span>
                    <h3 className="typo-h3 text-text-primary leading-tight">
                      {language === "AR" ? item.titleAr : item.titleEn}
                    </h3>
                  </div>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* ======================================================== */}
        {/* BOTTOM INSTAGRAM / MOMENTS BANNER */}
        {/* ======================================================== */}
        <div className="reveal bg-white/90 border border-neutral-border rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-plum/5 border border-plum/10 text-plum flex items-center justify-center flex-shrink-0">
              <FaInstagram size={22} />
            </div>
            <div>
              <h4 className="typo-h4 text-text-primary font-bold">
                {language === "AR" ? "تابع حسابنا الرسمي على إنستغرام" : "Follow Our Official Instagram"}
              </h4>
              <p className="typo-body-sm text-text-secondary">
                {language === "AR" ? "استكشف أحدث الأطباق والأجواء والريلز عبر @wahadshay.ae" : "Explore our latest dishes, rituals and reels at @wahadshay.ae"}
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/wahadshay.ae/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-plum hover:bg-plum-dark text-white typo-button transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 flex-shrink-0"
          >
            <FaInstagram size={16} />
            <span>{language === "AR" ? "متابعة @wahadshay.ae" : "Follow @wahadshay.ae"}</span>
            <ExternalLink size={14} />
          </a>
        </div>

      </div>

    </section>
  );
}

export default Gallery;
