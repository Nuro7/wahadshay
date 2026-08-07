import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const menuItems = ["Home", "Menu", "Specials", "Franchise", "Contact"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 py-4 md:py-6 animate-fade-in">
      <div className="mx-auto max-w-6xl rounded-full border border-white/10 bg-plum-dark/40 backdrop-blur-md px-6 py-3.5 shadow-[0_4px_30px_rgba(46,26,71,0.2)] md:px-10 flex items-center justify-between">
        
        {/* Official Brand Logo */}
        <a href="#home" className="flex items-center">
          <img 
            src="/logo_wahad.png" 
            alt="Wahad Shay Logo" 
            className="h-10 md:h-12 w-auto object-contain"
          />
        </a>
        
        {/* Desktop Navigation with Animated Underline */}
        <ul className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => (
            <li 
              key={item}
              className="relative py-1 group"
            >
              <a
                href={`#${item.toLowerCase()}`}
                className="font-body text-sm font-semibold tracking-wide text-white/80 transition-colors duration-300 hover:text-white px-2 block"
              >
                {item}
              </a>
              <div className="absolute left-2 right-2 bottom-0 h-[2px] bg-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </li>
          ))}
        </ul>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full p-2 text-white/80 transition-colors hover:text-white md:hidden cursor-pointer focus:outline-none"
        >
          {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`absolute left-6 right-6 top-full mt-2 overflow-hidden rounded-3xl border border-white/10 bg-plum-dark/95 backdrop-blur-lg p-6 shadow-2xl md:hidden transition-all duration-300 origin-top ${
          isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-5 text-center">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block font-body text-lg font-semibold tracking-wide text-white/80 transition-colors hover:text-yellow"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
export default Navbar;
