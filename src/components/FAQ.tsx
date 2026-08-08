import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What makes Wahad Shay tea preparation unique?",
    answer: "Our tea is slow-brewed daily using premium organic tea leaves, double-spiced with fresh-crushed green cardamom, and infused with imported saffron filaments. We never use artificial syrups or powders, ensuring a pure authentic flavor.",
  },
  {
    question: "How can I apply for a franchise partnership?",
    answer: "You can submit an application via our Franchise section or contact form. Our expansion team will analyze your territory suitability, local market demographics, and financial capability before hosting an alignment interview.",
  },
  {
    question: "Are there vegan or customizeable sweetening options?",
    answer: "Yes. Clear teas like our Mint Suleimani and several cold-foam coolers are naturally vegan. Additionally, sweetening levels for all hot brews and iced lattes can be fully customized, with organic honey or raw sugar substitutes available.",
  },
  {
    question: "What are your standard boutique café operating hours?",
    answer: "Our flagship hq in Riyadh and all branches across the UAE operate from Saturday to Thursday: 8:00 AM - 12:00 AM, and Fridays from 4:00 PM - 12:00 AM.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-beige relative overflow-hidden select-none">
      {/* Background ambient orbs */}
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-plum/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[400px] h-[400px] bg-yellow/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
            Common Inquiries
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-text-primary">
            <span className="text-shimmer">Frequently Asked Questions</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-body">
            Find answers to questions about our ingredients, brewing rituals, operating details, and franchise opportunities.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                style={{ "--stagger-idx": idx + 1 } as React.CSSProperties}
                className={`reveal-${idx % 2 === 0 ? "left" : "right"} reveal`}
              >
                <div 
                  className={`border rounded-3xl overflow-hidden bg-white transition-all duration-300 ${
                    isOpen 
                      ? "border-plum/30 shadow-[0_10px_25px_rgba(94,38,137,0.04)]" 
                      : "border-neutral-border bg-white"
                  }`}
                >
                  {/* Trigger Header */}
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none select-none"
                  >
                    <div className="flex items-center gap-4 pr-4">
                      <HelpCircle size={18} className={`shrink-0 transition-colors ${isOpen ? "text-plum" : "text-text-secondary"}`} />
                      <span className="font-display text-sm sm:text-base font-bold text-text-primary hover:text-plum transition-colors">
                        {item.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`shrink-0 ${isOpen ? "text-plum" : "text-text-secondary"}`}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  {/* Collapsible Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-neutral-border font-body text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
export default FAQ;
