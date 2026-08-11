import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const menuItems = ["Home", "About", "Menu", "Specials", "Franchise", "Gallery", "Contact"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#home");
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3 transition-all duration-500 ${
        isScrolled ? "translate-y-0" : "translate-y-1"
      }`}
    >
      <div 
        className={`mx-auto max-w-[1440px] rounded-full border transition-all duration-500 flex items-center justify-between px-4 sm:px-6 md:px-8 py-1.5 md:py-2 ${
          isScrolled 
            ? "border-neutral-border bg-neutral-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(43,37,32,0.06)]" 
            : "border-white/5 bg-plum-dark/40 backdrop-blur-md"
        }`}
      >
        {/* Official Brand Logo */}
        <div className="flex shrink-0">
          <a href="#home" className="relative flex items-center group">
             {/* Base Logo */}
             <img 
               src="/logo_wahad.png" 
               alt="Wahad Shay Logo" 
               className="h-10 sm:h-12 md:h-14 lg:h-[68px] w-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
             />
             {/* Tagline Overlay (Turns black when scrolled) */}
             <img 
               src="/logo_wahad.png" 
               alt="" 
               aria-hidden="true"
               className={`absolute inset-0 h-10 sm:h-12 md:h-14 lg:h-[68px] w-auto object-contain pointer-events-none group-hover:scale-[1.02] transition-all duration-300 ${
                 isScrolled ? "opacity-100" : "opacity-0"
               }`}
               style={{
                 filter: "invert(1) brightness(0.2)", // Turns white to dark without making it look fat/stroked
                 clipPath: "inset(75% 0 0 0)" // Only shows the bottom 25% (the tagline)
               }}
             />
          </a>
        </div>
        
        {/* Desktop Navigation with Animated Underline */}
        <nav className="hidden lg:flex items-center justify-center flex-1 px-4">
          <ul className="flex items-center gap-[28px] lg:gap-[32px]">
            {menuItems.map((item) => {
              const itemHash = `#${item.toLowerCase()}`;
              const isActive =
                activeHash === itemHash ||
                (item === "Contact" && activeHash === "#faq");
              
              return (
                <li 
                  key={item}
                  className="relative py-1 group"
                >
                  <a
                    href={itemHash}
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState(null, '', itemHash);
                      window.dispatchEvent(new HashChangeEvent("hashchange"));
                    }}
                    className={`font-body text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 px-1 block uppercase ${
                      isActive
                        ? (isScrolled ? "text-plum font-semibold" : "text-white font-semibold")
                        : (isScrolled ? "text-text-secondary hover:text-plum" : "text-white/70 hover:text-white")
                    }`}
                  >
                    {t(`nav.${item.toLowerCase()}`)}
                  </a>
                  <div className={`absolute left-1/2 -translate-x-1/2 bottom-[-4px] h-[2px] w-[40px] transition-transform duration-300 origin-center ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  } ${
                    isScrolled ? "bg-plum" : "bg-yellow"
                  }`} />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls (Currency Switcher & CTA button) */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          {/* Currency Switcher */}
          <div className={`flex items-center gap-1.5 rounded-full px-4 h-[40px] text-[12px] font-medium border transition-colors ${
            isScrolled 
              ? "bg-neutral-white border-neutral-border text-text-primary" 
              : "bg-white/5 border-white/10 text-white/85"
          }`}>
            <Globe size={13} className={isScrolled ? "text-plum" : "text-yellow"} />
            <button
              onClick={() => setLanguage("EN")}
              className={`font-semibold cursor-pointer transition-colors ${
                language === "EN" 
                  ? (isScrolled ? "text-plum font-bold" : "text-yellow font-bold") 
                  : (isScrolled ? "text-text-secondary hover:text-text-primary" : "hover:text-white")
              }`}
            >
              EN
            </button>
            <span className={isScrolled ? "text-neutral-border" : "text-white/20"}>|</span>
            <button
              onClick={() => setLanguage("AR")}
              className={`font-semibold cursor-pointer transition-colors ${
                language === "AR" 
                  ? (isScrolled ? "text-plum font-bold" : "text-yellow font-bold") 
                  : (isScrolled ? "text-text-secondary hover:text-text-primary" : "hover:text-white")
              }`}
            >
              عربي
            </button>
          </div>

          {/* Action Call-to-action */}
          <a
            href="tel:+971503977424"
            className="rounded-full bg-yellow hover:bg-plum hover:text-white text-plum-dark text-[13px] font-semibold uppercase tracking-wider px-7 h-[46px] flex items-center justify-center border border-transparent shadow-[0_4px_12px_rgba(245,189,32,0.1)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            {t('nav.reserve')}
          </a>
        </div>

        {/* Small Screen Control & Menu Toggle */}
        <div className="flex lg:hidden items-center gap-3 shrink-0">
          {/* Hamburger trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-full p-2.5 border transition-all cursor-pointer focus:outline-none ${
              isScrolled 
                ? "bg-neutral-white border-neutral-border text-text-primary hover:text-plum" 
                : "bg-white/5 border-white/10 text-white/80 hover:text-white"
            }`}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className={`absolute left-4 right-4 top-full mt-2 overflow-hidden rounded-3xl border backdrop-blur-xl p-6 shadow-2xl lg:hidden animate-fade-in origin-top ${
          isScrolled 
            ? "border-neutral-border bg-neutral-white/95 text-text-primary" 
            : "border-white/10 bg-plum-dark/95 text-white"
        }`}>
          <ul className="flex flex-col gap-4 text-center mb-6">
            {menuItems.map((item) => {
              const itemHash = `#${item.toLowerCase()}`;
              const isActive =
                activeHash === itemHash ||
                (item === "Contact" && activeHash === "#faq");
              
              return (
                <li key={item}>
                  <a
                    href={itemHash}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      window.history.pushState(null, '', itemHash);
                      window.dispatchEvent(new HashChangeEvent("hashchange"));
                    }}
                    className={`block font-body text-base font-semibold tracking-wider transition-colors uppercase ${
                      isActive
                        ? (isScrolled ? "text-plum font-bold" : "text-yellow font-bold")
                        : (isScrolled ? "text-text-secondary hover:text-plum" : "text-white/80 hover:text-yellow")
                    }`}
                  >
                    {t(`nav.${item.toLowerCase()}`)}
                  </a>
                </li>
              );
            })}
          </ul>
          
          <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
            {/* Language select */}
            <div className={`flex justify-between items-center px-4 py-2 rounded-xl text-xs ${
              isScrolled ? "bg-neutral-light-beige text-text-primary" : "bg-white/5 text-white/80"
            }`}>
              <span className="font-body font-semibold">Language / لغة</span>
              <div className="flex gap-3">
                <button
                  onClick={() => { setLanguage("EN"); setIsOpen(false); }}
                  className={`font-semibold cursor-pointer ${language === "EN" ? (isScrolled ? "text-plum font-bold" : "text-yellow font-bold") : ""}`}
                >
                  EN
                </button>
                <span className={isScrolled ? "text-neutral-border" : "text-white/20"}>|</span>
                <button
                  onClick={() => { setLanguage("AR"); setIsOpen(false); }}
                  className={`font-semibold cursor-pointer ${language === "AR" ? (isScrolled ? "text-plum font-bold" : "text-yellow font-bold") : ""}`}
                >
                  عربي
                </button>
              </div>
            </div>

            {/* CTA Reserve Table */}
            <a
              href="tel:+971503977424"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3.5 rounded-xl bg-yellow text-plum-dark text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-plum hover:text-white transition-colors block"
            >
              {t('nav.reserve')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;
