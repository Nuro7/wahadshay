import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Button from "../ui/Button";

const menuItems = ["Home", "Menu", "Specials", "Franchise", "Contact"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-6 py-4 md:py-6"
    >
      <div className="mx-auto max-w-6xl rounded-full border border-white/10 bg-plum-dark/40 backdrop-blur-md px-6 py-3 shadow-[0_4px_30px_rgba(46,26,71,0.2)] md:px-10 flex items-center justify-between">
        <a href="#home" className="font-display text-2xl font-black uppercase tracking-wider text-white">
          Wahad <span className="text-yellow">Shay</span>
        </a>
        
        {/* Desktop navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="font-body text-sm font-semibold tracking-wide text-white/80 transition-colors duration-300 hover:text-yellow"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button variant="primary" className="!px-6 !py-2 !text-sm">
            Franchise
          </Button>
        </div>

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
              <li className="pt-4 border-t border-white/10">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Franchise
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
export default Navbar;
