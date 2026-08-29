import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, X, ChevronLeft, ChevronRight, Volume2, VolumeX, Image as ImageIcon } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { useLanguage } from "../i18n/LanguageContext";

import miniBitesImg from "../assets/mini_bites.webp";
import juicyDipImg from "../assets/juicy_dip.webp";
import hotChickenImg from "../assets/hot_chicken.webp";
import hotChickenBurgerImg from "../assets/hot_chicken_burger.webp";
import hotChickenRiceImg from "../assets/hot_chicken_rice.webp";

export interface MediaItem {
  id: string;
  type: "video" | "image";
  src: string;
  thumbnail: string;
  instagramUrl: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  tagEn: string;
  tagAr: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    type: "video",
    src: "/home.mp4",
    thumbnail: "/home-poster.webp",
    instagramUrl: "https://www.instagram.com/reel/DcRJOKCsIo6/",
    titleEn: "Café Atmosphere & Rituals",
    titleAr: "أجواء المقهى والطقوس",
    subtitleEn: "Authentic Chai Experience",
    subtitleAr: "تجربة الشاي الأصيلة",
    tagEn: "ATMOSPHERE",
    tagAr: "أجواء المقهى"
  },
  {
    id: "2",
    type: "video",
    src: "/home1.mp4",
    thumbnail: juicyDipImg,
    instagramUrl: "https://www.instagram.com/reel/DbTE8qztb6Q/",
    titleEn: "Juicy Dip & Sandwiches",
    titleAr: "جوسي ديب وساندويتشات",
    subtitleEn: "Spiced Melts & Rich Gravy",
    subtitleAr: "نكهات غنية وتغميسات فاخرة",
    tagEn: "SIGNATURE DISH",
    tagAr: "طبق مميز"
  },
  {
    id: "3",
    type: "video",
    src: "/home.mp4",
    thumbnail: hotChickenImg,
    instagramUrl: "https://www.instagram.com/reel/DbI0f8-s2DD/",
    titleEn: "Kitchen Craft & Passion",
    titleAr: "حرفة المطبخ والشغف",
    subtitleEn: "Fresh Preparation Daily",
    subtitleAr: "إعداد طازج يوميًا بأعلى المعايير",
    tagEn: "KITCHEN CRAFT",
    tagAr: "حرفة المطبخ"
  },
  {
    id: "4",
    type: "video",
    src: "/mobile.mp4",
    thumbnail: hotChickenBurgerImg,
    instagramUrl: "https://www.instagram.com/reel/DY72O-qsBeV/",
    titleEn: "Hot Chicken Burger",
    titleAr: "برجر الدجاج الحار",
    subtitleEn: "Signature Brioche & Glazed Crisp",
    subtitleAr: "بريوش مميز مع قرمشة متبلة",
    tagEn: "BESTSELLER",
    tagAr: "الأكثر طلباً"
  },
  {
    id: "5",
    type: "video",
    src: "/home1.mp4",
    thumbnail: hotChickenRiceImg,
    instagramUrl: "https://www.instagram.com/reel/DYhYMCTPtS5/",
    titleEn: "Hot Chicken Rice Bowl",
    titleAr: "أرز الدجاج الحار",
    subtitleEn: "Aromatic Basmati & Roasted Spices",
    subtitleAr: "أرز بسمتي عطري مع بهارات محمصة",
    tagEn: "SAVORY RICE",
    tagAr: "أطباق الأرز"
  },
  {
    id: "6",
    type: "image",
    src: miniBitesImg,
    thumbnail: miniBitesImg,
    instagramUrl: "https://www.instagram.com/wahadshay.ae/",
    titleEn: "Mini Bites Selection",
    titleAr: "تشكيلة ميني بايتس",
    subtitleEn: "Perfect Companions to Chai",
    subtitleAr: "الرفيق المثالي لكوب الشاي",
    tagEn: "SIGNATURE BITES",
    tagAr: "ميني بايتس"
  }
];

export function Gallery() {
  const { t, language } = useLanguage();
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "video" | "image">("all");
  const thumbnailRailRef = useRef<HTMLDivElement>(null);

  const filteredItems = mediaItems.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  // Handle keyboard navigation for modal lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;

      if (e.key === "Escape") {
        setActiveItem(null);
      } else if (e.key === "ArrowRight") {
        const currentIndex = mediaItems.findIndex((i) => i.id === activeItem.id);
        const nextIndex = (currentIndex + 1) % mediaItems.length;
        setActiveItem(mediaItems[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = mediaItems.findIndex((i) => i.id === activeItem.id);
        const prevIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        setActiveItem(mediaItems[prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  // Auto-scroll active thumbnail into view in modal rail
  useEffect(() => {
    if (activeItem && thumbnailRailRef.current) {
      const activeEl = thumbnailRailRef.current.querySelector(
        `[data-thumb-id="${activeItem.id}"]`
      ) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }
  }, [activeItem]);

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = mediaItems.findIndex((i) => i.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    setActiveItem(mediaItems[prevIndex]);
  };

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = mediaItems.findIndex((i) => i.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % mediaItems.length;
    setActiveItem(mediaItems[nextIndex]);
  };

  return (
    <section id="gallery" className="section-padding bg-neutral-ivory relative overflow-hidden select-none">
      
      {/* Background Subtle Line Art Texture */}
      <div className="absolute inset-0 food-pattern-bg opacity-[0.04] pointer-events-none" />
      
      {/* Ambient Diffused Glow Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-plum/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-yellow/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="premium-container relative z-10 space-y-10 md:space-y-14">
        
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

          {/* Gallery Category Filter Tabs */}
          <div className="pt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === "all"
                  ? "bg-plum text-white shadow-md shadow-plum/20 scale-105"
                  : "bg-white/80 text-text-secondary hover:bg-plum/10 hover:text-plum border border-neutral-border"
              }`}
            >
              {language === "AR" ? "الكل" : "All"} ({mediaItems.length})
            </button>
            <button
              onClick={() => setActiveFilter("video")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeFilter === "video"
                  ? "bg-plum text-white shadow-md shadow-plum/20 scale-105"
                  : "bg-white/80 text-text-secondary hover:bg-plum/10 hover:text-plum border border-neutral-border"
              }`}
            >
              <Play size={11} fill="currentColor" />
              <span>{language === "AR" ? "فيديوهات" : "Reels"} (5)</span>
            </button>
            <button
              onClick={() => setActiveFilter("image")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeFilter === "image"
                  ? "bg-plum text-white shadow-md shadow-plum/20 scale-105"
                  : "bg-white/80 text-text-secondary hover:bg-plum/10 hover:text-plum border border-neutral-border"
              }`}
            >
              <ImageIcon size={12} />
              <span>{language === "AR" ? "صور" : "Photos"} (1)</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MEDIA CARDS WITH CRISP THUMBNAILS & INSTANT PREVIEWS */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              onMouseEnter={() => setHoveredCardId(item.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="luxury-card group relative overflow-hidden rounded-3xl bg-black border border-neutral-border/80 shadow-[0_6px_25px_rgba(43,37,32,0.04)] hover:shadow-[0_20px_45px_rgba(94,38,137,0.18)] transition-all duration-500 cursor-pointer h-[480px] sm:h-[520px] flex flex-col justify-end block"
              aria-label={language === "AR" ? item.titleAr : item.titleEn}
            >
              {item.type === "video" ? (
                <>
                  {/* Immediate High-Resolution Poster Thumbnail Underlay */}
                  <img
                    src={item.thumbnail}
                    alt={language === "AR" ? item.titleAr : item.titleEn}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="520"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                  />

                  {/* HTML5 Video Stream on Hover/Focus (Desktop only) */}
                  {hoveredCardId === item.id && (
                    <video
                      src={item.src}
                      poster={item.thumbnail}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-1"
                    />
                  )}

                  {/* Dark Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140620]/95 via-[#140620]/30 to-[#140620]/40 z-10 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 typo-badge text-yellow shadow-xs flex items-center gap-1.5">
                      <FaInstagram size={13} className="text-yellow" />
                      <span>{language === "AR" ? item.tagAr : item.tagEn}</span>
                    </span>

                    <div className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-yellow group-hover:text-plum-dark text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-110">
                      <Play size={14} fill="currentColor" className="translate-x-0.5" />
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

                    {/* Action Pill */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F5BD20] to-[#E5AB15] text-plum-dark typo-button-sm shadow-md group-hover:shadow-lg transition-all">
                        <Play size={12} fill="currentColor" />
                        <span>{language === "AR" ? "مشاهدة العرض" : "Watch Preview"}</span>
                      </span>

                      <a
                        href={item.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all"
                        title={language === "AR" ? "فتح في إنستغرام" : "Open in Instagram"}
                        aria-label="Instagram Link"
                      >
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                /* Still Photo Card with Thumbnail */
                <div className="w-full h-full p-6 flex flex-col items-center justify-between relative bg-gradient-to-br from-white via-neutral-ivory to-white">
                  <div className="w-full flex justify-between items-center z-20">
                    <span className="px-3 py-1 rounded-full bg-plum/5 border border-plum/10 typo-badge text-plum shadow-xs">
                      {language === "AR" ? item.tagAr : item.tagEn}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-plum/5 text-plum flex items-center justify-center group-hover:bg-plum group-hover:text-white transition-colors">
                      <ImageIcon size={14} />
                    </div>
                  </div>

                  <img
                    src={item.thumbnail}
                    alt={language === "AR" ? item.titleAr : item.titleEn}
                    className="max-h-[60%] max-w-[85%] object-contain filter drop-shadow-[0_15px_25px_rgba(43,37,32,0.18)] group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    draggable={false}
                    loading="lazy"
                  />

                  <div className="w-full text-start z-20 space-y-2">
                    <div>
                      <span className="typo-eyebrow text-plum block">
                        {language === "AR" ? item.subtitleAr : item.subtitleEn}
                      </span>
                      <h3 className="typo-h3 text-text-primary leading-tight">
                        {language === "AR" ? item.titleAr : item.titleEn}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-plum/10 text-plum typo-button-sm">
                        <ImageIcon size={12} />
                        <span>{language === "AR" ? "عرض الصورة" : "View Photo"}</span>
                      </span>

                      <a
                        href={item.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-plum/5 hover:bg-plum/15 text-plum flex items-center justify-center transition-all"
                        title={language === "AR" ? "فتح في إنستغرام" : "Open in Instagram"}
                        aria-label="Instagram Link"
                      >
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
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

      {/* ======================================================== */}
      {/* FULLSCREEN LIGHTBOX MODAL WITH THUMBNAIL SELECTOR STRIP */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-3 sm:p-6 bg-[#12071C]/95 backdrop-blur-2xl">
            
            {/* Top Bar Controls */}
            <div className="w-full max-w-5xl flex items-center justify-between py-3 px-2 z-20 text-white">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-yellow/20 border border-yellow/40 text-yellow text-xs font-bold uppercase tracking-wider">
                  {language === "AR" ? activeItem.tagAr : activeItem.tagEn}
                </span>
                <span className="typo-h4 text-white font-bold hidden sm:inline">
                  {language === "AR" ? activeItem.titleAr : activeItem.titleEn}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Instagram Direct Link */}
                <a
                  href={activeItem.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white typo-button-sm transition-all flex items-center gap-1.5"
                >
                  <FaInstagram size={14} className="text-yellow" />
                  <span className="hidden sm:inline">{language === "AR" ? "إنستغرام" : "Instagram"}</span>
                  <ExternalLink size={12} />
                </a>

                {/* Sound Toggle (for videos) */}
                {activeItem.type === "video" && (
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                    aria-label="Toggle Sound"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/80 border border-white/15 text-white transition-colors cursor-pointer"
                  title="Close (Esc)"
                  aria-label="Close Lightbox"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Stage Viewport with Left/Right arrows */}
            <div className="relative w-full max-w-5xl flex-1 max-h-[68vh] sm:max-h-[70vh] flex items-center justify-center">
              
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-yellow hover:text-plum-dark text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-md"
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-yellow hover:text-plum-dark text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-md"
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>

              {/* Media Container */}
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full rounded-3xl overflow-hidden bg-black/90 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex items-center justify-center relative"
              >
                {activeItem.type === "video" ? (
                  <video
                    src={activeItem.src}
                    poster={activeItem.thumbnail}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={activeItem.src}
                      alt={language === "AR" ? activeItem.titleAr : activeItem.titleEn}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                )}

                {/* Subtitle / Caption Overlay */}
                <div className="absolute bottom-4 inset-x-4 pointer-events-none flex justify-center">
                  <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-center max-w-md">
                    <p className="text-xs sm:text-sm text-yellow font-medium">
                      {language === "AR" ? activeItem.subtitleAr : activeItem.subtitleEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ======================================================== */}
            {/* THUMBNAIL SELECTOR STRIP AT BOTTOM */}
            {/* ======================================================== */}
            <div className="w-full max-w-5xl pt-4 pb-2 z-20">
              <div className="flex items-center justify-between pb-2 px-1 text-white/70 text-xs font-semibold uppercase tracking-wider">
                <span>{language === "AR" ? "معاينة المصغرات" : "Gallery Thumbnails"}</span>
                <span>
                  {mediaItems.findIndex((i) => i.id === activeItem.id) + 1} / {mediaItems.length}
                </span>
              </div>

              <div
                ref={thumbnailRailRef}
                className="flex items-center gap-3 overflow-x-auto py-1 px-1 scrollbar-thin no-scrollbar"
                style={{ scrollbarWidth: "none" }}
              >
                {mediaItems.map((item) => {
                  const isSelected = item.id === activeItem.id;
                  return (
                    <button
                      key={item.id}
                      data-thumb-id={item.id}
                      onClick={() => setActiveItem(item)}
                      className={`relative flex-shrink-0 w-20 sm:w-28 h-14 sm:h-18 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                        isSelected
                          ? "border-yellow ring-2 ring-yellow/50 scale-105 shadow-[0_0_20px_rgba(245,189,32,0.4)] opacity-100"
                          : "border-white/20 opacity-50 hover:opacity-100 hover:border-white/60"
                      }`}
                      aria-label={`Select ${item.titleEn}`}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.titleEn}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Dark Vignette on thumbnail */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                      {/* Mini indicator icon */}
                      <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-yellow text-[9px]">
                        {item.type === "video" ? (
                          <Play size={8} fill="currentColor" />
                        ) : (
                          <ImageIcon size={9} />
                        )}
                      </div>

                      {/* Mini Title */}
                      <span className="absolute bottom-1 inset-x-1 text-[9px] font-bold text-white leading-tight truncate text-start">
                        {language === "AR" ? item.titleAr : item.titleEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default Gallery;
