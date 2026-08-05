import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const menuItems = ["Home", "Menu", "Specials", "Franchise", "Contact"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-6 py-4 md:py-6"
    >
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
              className="relative py-1"
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a
                href={`#${item.toLowerCase()}`}
                className="font-body text-sm font-semibold tracking-wide text-white/80 transition-colors duration-300 hover:text-white px-2"
              >
                {item}
              </a>
              {hoveredItem === item && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute left-2 right-2 bottom-0 h-[2px] bg-yellow"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-6 right-6 top-full mt-2 overflow-hidden rounded-3xl border border-white/10 bg-plum-dark/95 backdrop-blur-lg p-6 shadow-2xl md:hidden"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
export default Navbar;
