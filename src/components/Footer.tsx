import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-plum-dark border-t border-white/5 pt-20 pb-10 select-none">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">
          
          {/* Logo & Blurb (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#home" className="inline-block">
              <img 
                src="/logo_wahad.png" 
                alt="Wahad Shay Logo" 
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="text-grey text-xs sm:text-sm leading-relaxed max-w-sm font-body">
              "A World of Flavor in One Place. Prepared with passion, served with elegance." <br />
              Wahad Shay stands as a premier regional sanctuary where authentic tea rituals and European bakery crafts coalesce.
            </p>

            {/* Newsletter Sign Up */}
            <div className="space-y-3 pt-2">
              <h4 className="font-display text-xs font-bold text-yellow uppercase tracking-widest">
                Sign Up For Stories
              </h4>
              
              <AnimatePresence mode="wait">
                {!subscribed ? (
                  <motion.form
                    key="subscribe"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubscribe}
                    className="flex max-w-sm rounded-full overflow-hidden border border-white/10 bg-white/[0.02] focus-within:border-yellow transition-all"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 bg-transparent px-4 py-2 text-xs font-body text-white placeholder-grey/50 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-yellow hover:bg-yellow/90 text-plum-dark px-4 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-400 text-xs font-body"
                  >
                    <div className="h-5 w-5 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                      <Check size={10} />
                    </div>
                    <span>Thank you for subscribing to our journal.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-4 font-body">
            <h4 className="font-display text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#F8EED5]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-grey">
              <li>
                <a href="#home" className="hover:text-yellow transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-yellow transition-colors">About Us</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-yellow transition-colors">Menu Selections</a>
              </li>
              <li>
                <a href="#specials" className="hover:text-yellow transition-colors">Weekly Specials</a>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-4 font-body">
            <h4 className="font-display text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#F8EED5]">
              Partnership
            </h4>
            <ul className="space-y-2.5 text-xs text-grey">
              <li>
                <a href="#franchise" className="hover:text-yellow transition-colors">Franchise Program</a>
              </li>
              <li>
                <a href="#franchise" className="hover:text-yellow transition-colors">Expansion Map</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow transition-colors">Network Inquiries</a>
              </li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div className="space-y-4 font-body">
            <h4 className="font-display text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#F8EED5]">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-grey">
              <li>
                <a href="#faq" className="hover:text-yellow transition-colors">FAQs</a>
              </li>
              <li>
                <span className="hover:text-yellow transition-colors cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-yellow transition-colors cursor-pointer">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-yellow transition-colors cursor-pointer">Licensing</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Sub-footer */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-grey text-[10px] tracking-widest font-numbers font-medium text-center md:text-left">
            &copy; {currentYear} WAHAD SHAY. ALL RIGHTS RESERVED.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-white/50">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-yellow transition-colors">
              <FaInstagram size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-yellow transition-colors">
              <FaXTwitter size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow transition-colors">
              <FaFacebook size={16} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
export default Footer;
