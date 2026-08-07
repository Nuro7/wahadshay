import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";

interface NavbarProps {
  currency: "AED" | "SAR";
  onCurrencyChange: (curr: "AED" | "SAR") => void;
}

const menuItems = ["Home", "About", "Menu", "Specials", "Franchise", "Contact"];

export function Navbar({ currency, onCurrencyChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`fixed inset-x-0 top-0 z-50 px-4 md:px-8 py-4 transition-all duration-500 ${
        isScrolled ? "translate-y-0" : "translate-y-1"
      }`}
    >
      <div 
        className={`mx-auto max-w-7xl rounded-full border transition-all duration-500 flex items-center justify-between px-6 md:px-10 py-3 ${
          isScrolled 
            ? "border-white/10 bg-plum-dark/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(11,6,23,0.7)]" 
            : "border-white/5 bg-plum-dark/40 backdrop-blur-md"
        }`}
      >
        {/* Official Brand Logo */}
        <a href="#home" className="flex items-center shrink-0">
          <img 
            src="/logo_wahad.png" 
            alt="Wahad Shay Logo" 
            className="h-10 md:h-12 w-auto object-contain hover:scale-102 transition-transform duration-300"
          />
        </a>
        
        {/* Desktop Navigation with Animated Underline */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {menuItems.map((item) => (
              <li 
                key={item}
                className="relative py-1 group"
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className="font-body text-xs font-semibold tracking-wider text-white/70 transition-colors duration-300 hover:text-white px-2 block uppercase"
                >
                  {item}
                </a>
                <div className="absolute left-2 right-2 bottom-0 h-[2px] bg-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls (Currency Switcher & CTA button) */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Currency Switcher */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-white/85">
            <Globe size={13} className="text-yellow" />
            <button
              onClick={() => onCurrencyChange("AED")}
              className={`font-semibold cursor-pointer transition-colors ${currency === "AED" ? "text-yellow font-bold" : "hover:text-white"}`}
            >
              AED
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => onCurrencyChange("SAR")}
              className={`font-semibold cursor-pointer transition-colors ${currency === "SAR" ? "text-yellow font-bold" : "hover:text-white"}`}
            >
              SAR
            </button>
          </div>

          {/* Action Call-to-action */}
          <a
            href="#contact"
            className="rounded-full bg-yellow hover:bg-[#ffd03d] text-plum-dark text-xs font-black uppercase tracking-widest px-6 py-2.5 border border-transparent shadow-[0_4px_12px_rgba(245,189,32,0.15)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer block"
          >
            Reserve Table
          </a>
        </div>

        {/* Small Screen Control & Menu Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Hamburger trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-2.5 bg-white/5 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer focus:outline-none"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="absolute left-4 right-4 top-full mt-2 overflow-hidden rounded-3xl border border-white/10 bg-plum-dark/95 backdrop-blur-xl p-6 shadow-2xl lg:hidden animate-fade-in origin-top">
          <ul className="flex flex-col gap-4 text-center mb-6">
            {menuItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="block font-body text-base font-semibold tracking-wider text-white/80 transition-colors hover:text-yellow uppercase"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
            {/* Currency select */}
            <div className="flex justify-between items-center px-4 py-2 bg-white/5 rounded-xl text-xs text-white/80">
              <span className="font-body font-semibold">Store Currency</span>
              <div className="flex gap-3">
                <button
                  onClick={() => { onCurrencyChange("AED"); setIsOpen(false); }}
                  className={`font-semibold cursor-pointer ${currency === "AED" ? "text-yellow font-bold" : ""}`}
                >
                  AED (UAE)
                </button>
                <span className="text-white/20">|</span>
                <button
                  onClick={() => { onCurrencyChange("SAR"); setIsOpen(false); }}
                  className={`font-semibold cursor-pointer ${currency === "SAR" ? "text-yellow font-bold" : ""}`}
                >
                  SAR (KSA)
                </button>
              </div>
            </div>

            {/* CTA Reserve Table */}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3.5 rounded-xl bg-yellow text-plum-dark text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-yellow/90 block"
            >
              Reserve Table
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;
