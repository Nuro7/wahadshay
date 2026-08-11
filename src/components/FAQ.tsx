import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData = useMemo(() => {
    return t('faq.items') as Array<{ question: string, answer: string }>;
  }, [t]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding bg-[#F8F5EF] relative overflow-hidden select-none">
      {/* Background ambient orbs */}
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-plum/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[400px] h-[400px] bg-yellow/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
            {t('faq.badge')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black text-text-primary">
            <span className="text-shimmer">{t('faq.title')}</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-body">
            {t('faq.subtitle')}
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
                    className={`w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none select-none ${language === 'AR' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`flex items-center gap-4 ${language === 'AR' ? 'pl-4' : 'pr-4'} ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
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
                        <div className="px-6 pb-6 pt-2 border-t border-neutral-border font-body text-sm sm:text-base text-text-secondary leading-relaxed">
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
