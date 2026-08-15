import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const menuItems = ["Home", "About", "Specials", "Franchise", "Gallery", "Contact"];

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
      className={`fixed inset-x-0 top-0 z-50 w-full px-4 sm:px-6 md:px-8 py-2 md:py-3 transition-all duration-500 ${isScrolled ? "translate-y-0" : "translate-y-1"
        }`}
    >
      <div
        className={`mx-auto max-w-[1440px] rounded-full border transition-all duration-500 flex items-center justify-between px-3 sm:px-6 md:px-8 py-1 md:py-2 ${isScrolled
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
              className="h-8 xs:h-10 sm:h-11 md:h-12 lg:h-14 w-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
            />
            {/* Tagline Overlay (Turns black when scrolled) */}
            <img
              src="/logo_wahad.png"
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-8 xs:h-10 sm:h-11 md:h-12 lg:h-14 w-auto object-contain pointer-events-none group-hover:scale-[1.02] transition-all duration-300 ${isScrolled ? "opacity-100" : "opacity-0"
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
                    className={`font-body text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 px-1 block uppercase ${isActive
                      ? (isScrolled ? "text-plum font-semibold" : "text-white font-semibold")
                      : (isScrolled ? "text-text-secondary hover:text-plum" : "text-white/70 hover:text-white")
                      }`}
                  >
                    {t(`nav.${item.toLowerCase()}`)}
                  </a>
                  <div className={`absolute left-1/2 -translate-x-1/2 bottom-[-4px] h-[2px] w-[40px] transition-transform duration-300 origin-center ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    } ${isScrolled ? "bg-plum" : "bg-yellow"
                    }`} />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls (Currency Switcher & CTA button) */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          {/* Currency Switcher */}
          <div className={`flex items-center gap-1.5 rounded-full px-4 h-[40px] text-[12px] font-medium border transition-colors ${isScrolled
            ? "bg-neutral-white border-neutral-border text-text-primary"
            : "bg-white/5 border-white/10 text-white/85"
            }`}>
            <Globe size={13} className={isScrolled ? "text-plum" : "text-yellow"} />
            <button
              onClick={() => setLanguage("EN")}
              className={`font-semibold cursor-pointer transition-colors ${language === "EN"
                ? (isScrolled ? "text-plum font-bold" : "text-yellow font-bold")
                : (isScrolled ? "text-text-secondary hover:text-text-primary" : "hover:text-white")
                }`}
            >
              EN
            </button>
            <span className={isScrolled ? "text-neutral-border" : "text-white/20"}>|</span>
            <button
              onClick={() => setLanguage("AR")}
              className={`font-semibold cursor-pointer transition-colors ${language === "AR"
                ? (isScrolled ? "text-plum font-bold" : "text-yellow font-bold")
                : (isScrolled ? "text-text-secondary hover:text-text-primary" : "hover:text-white")
                }`}
            >
              عربي
            </button>
          </div>


        </div>

        {/* Small Screen Control & Menu Toggle */}
        <div className="flex lg:hidden items-center gap-3 shrink-0">
          {/* Hamburger trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-full w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 flex items-center justify-center border transition-all cursor-pointer focus:outline-none ${isScrolled
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
        <div className="fixed inset-0 w-screen h-screen lg:hidden flex flex-col bg-white text-text-primary z-[9999] animate-fade-in">
          {/* Header Section */}
          <div className="flex items-start justify-end pt-6 px-6 pb-4 border-b border-neutral-border/40">

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-text-primary hover:text-plum transition-colors cursor-pointer focus:outline-none rounded-full hover:bg-neutral-light-beige"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links List */}
          <ul className="flex-1 overflow-y-auto px-6 py-2 flex flex-col">
            {menuItems.map((item) => {
              const itemHash = `#${item.toLowerCase()}`;
              const isActive =
                activeHash === itemHash ||
                (item === "Contact" && activeHash === "#faq");

              return (
                <li key={item} className="border-b border-neutral-border/40 py-4">
                  <a
                    href={itemHash}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      window.history.pushState(null, '', itemHash);
                      window.dispatchEvent(new HashChangeEvent("hashchange"));
                    }}
                    className={`block text-start text-[16px] tracking-[0.02em] uppercase transition-colors ${isActive
                      ? "text-text-primary font-bold"
                      : "text-text-secondary font-medium hover:text-text-primary"
                      }`}
                  >
                    {t(`nav.${item.toLowerCase()}`)}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Bottom Action Section */}
          <div className="mt-auto px-6 pb-8 pt-4 border-t border-neutral-border/40 bg-white">
            {/* Contact Now Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                window.history.pushState(null, '', '#contact');
                window.dispatchEvent(new HashChangeEvent("hashchange"));
              }}
              className="block w-full bg-yellow hover:bg-plum text-plum-dark hover:text-white font-semibold py-4 rounded-xl text-center text-[15px] tracking-wide transition-all duration-300 shadow-[0_4px_12px_rgba(245,189,32,0.2)] hover:shadow-[0_8px_20px_rgba(94,38,137,0.25)] cursor-pointer"
            >
              {t("mobileMenu.contactNow")}
            </a>

            {/* Language Selector */}
            <div className="flex justify-center items-center gap-3 mt-4 text-[13px] font-semibold text-text-secondary">
              <span className="font-body text-xs text-text-secondary/70">Language / لغة:</span>
              <button
                onClick={() => { setLanguage("EN"); setIsOpen(false); }}
                className={`cursor-pointer py-0.5 px-2 rounded transition-colors ${language === "EN" ? "text-plum font-bold border-b border-plum" : "hover:text-text-primary"}`}
              >
                EN
              </button>
              <span className="text-neutral-300">|</span>
              <button
                onClick={() => { setLanguage("AR"); setIsOpen(false); }}
                className={`cursor-pointer py-0.5 px-2 rounded transition-colors ${language === "AR" ? "text-plum font-bold border-b border-plum" : "hover:text-text-primary"}`}
              >
                عربي
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;
