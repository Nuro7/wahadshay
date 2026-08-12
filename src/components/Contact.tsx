import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight, Instagram, Twitter, Check } from "lucide-react";
import Button from "./ui/Button";
import { useLanguage } from "../i18n/LanguageContext";

export function Contact() {
  const { t, language } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding-landing bg-neutral-ivory relative overflow-hidden select-none">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] bg-plum/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[380px] h-[380px] bg-yellow/2 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="premium-container relative z-10">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="text-plum text-xs font-bold uppercase tracking-[0.25em] block">
            {t('contact.badge')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black text-text-primary">
            <span className="text-shimmer">{t('contact.title')}</span>
          </h2>
          <p className="text-text-secondary text-base font-body">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          
          {/* Contact Details & Links (2/5 span) */}
          <div className={`reveal-${language === 'AR' ? 'right' : 'left'} reveal lg:col-span-2 space-y-10`}>
            <div className="space-y-4">
              <h3 className="font-display text-3xl font-black text-plum tracking-tight">
                {t('contact.hqTitle')}
              </h3>
              <p className="text-text-secondary text-base leading-relaxed font-body max-w-sm">
                {t('contact.hqDesc')}
              </p>
            </div>

            {/* Information Cards List */}
            <div className="space-y-5 font-body">
              {/* Address */}
              <div className="glass-card glass-card-hover p-6 rounded-2xl flex items-center gap-5 group cursor-pointer transition-all duration-500">
                <div className="text-plum transition-colors duration-500 shrink-0 micro-transition micro-icon">
                  <MapPin size={24} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-[11px] text-text-secondary uppercase font-black tracking-widest mb-1.5">{t('contact.addressLabel')}</h4>
                  <p className="text-text-primary text-sm font-medium leading-relaxed group-hover:text-plum transition-colors duration-300">{t('contact.address')}</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-plum hover:text-plum-dark text-xs font-bold inline-flex items-center gap-1.5 mt-3 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t('contact.openInMaps')}
                    <ArrowRight size={14} className="micro-transition rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="glass-card glass-card-hover p-6 rounded-2xl flex items-center gap-5 group transition-all duration-500">
                <div className="text-plum transition-colors duration-500 shrink-0 micro-transition micro-icon">
                  <Clock size={24} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-[11px] text-text-secondary uppercase font-black tracking-widest mb-1.5">{t('contact.hoursLabel')}</h4>
                  <p className="text-text-primary text-sm font-medium leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                    <span className="block mb-1">{t('contact.hoursLine1')}</span>
                    <span className="block text-text-secondary">{t('contact.hoursLine2')}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Channels */}
            <div className="space-y-5 border-t border-neutral-border pt-8">
              <h4 className="font-display text-[11px] font-black text-text-secondary uppercase tracking-[0.2em]">
                {t('contact.quickActionLabel')}
              </h4>
              <div className="flex flex-wrap gap-3.5 font-body">
                <a
                  href="tel:+966112345678"
                  className="flex items-center gap-0 sm:gap-2.5 p-3.5 sm:px-5 sm:py-3 rounded-xl bg-white hover:bg-neutral-white border border-neutral-border text-text-primary text-xs font-bold shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <Phone size={16} className="text-plum shrink-0" />
                  <span className="hidden sm:inline">{t('contact.callHq')}</span>
                </a>
                <a
                  href="mailto:info@wahadshay.com"
                  className="flex items-center gap-0 sm:gap-2.5 p-3.5 sm:px-5 sm:py-3 rounded-xl bg-white hover:bg-neutral-white border border-neutral-border text-text-primary text-xs font-bold shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <Mail size={16} className="text-plum shrink-0" />
                  <span className="hidden sm:inline">{t('contact.emailSupport')}</span>
                </a>
                <a
                  href="https://wa.me/966112345678"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-0 sm:gap-2.5 p-3.5 sm:px-5 sm:py-3 rounded-xl bg-plum text-white border border-transparent font-bold text-xs shadow-md shadow-plum/20 hover:shadow-lg hover:shadow-plum/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <MessageSquare size={16} className="text-white shrink-0" />
                  <span className="hidden sm:inline">{t('contact.whatsapp')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form (3/5 span) */}
          <div className={`reveal-${language === 'AR' ? 'left' : 'right'} reveal lg:col-span-3 luxury-card luxury-card-hover p-8 md:p-12 relative min-h-[500px] flex flex-col justify-center`}>
            
            {/* Ambient luxury inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white to-neutral-ivory/30 pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-plum/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 w-full h-full">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="space-y-7 font-body"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                      <div className="space-y-2.5 group">
                        <label htmlFor="name" className="text-[11px] font-black text-text-primary/70 uppercase tracking-widest block transition-colors group-focus-within:text-plum">{t('contact.form.nameLabel')}</label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl border border-neutral-border bg-white px-5 py-3.5 text-sm font-medium text-text-primary placeholder-text-secondary/40 focus:border-plum focus:outline-none focus:ring-4 focus:ring-plum/10 transition-all duration-300 shadow-sm"
                          placeholder={t('contact.form.namePlaceholder')}
                        />
                      </div>
                      <div className="space-y-2.5 group">
                        <label htmlFor="email" className="text-[11px] font-black text-text-primary/70 uppercase tracking-widest block transition-colors group-focus-within:text-plum">{t('contact.form.emailLabel')}</label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-neutral-border bg-white px-5 py-3.5 text-sm font-medium text-text-primary placeholder-text-secondary/40 focus:border-plum focus:outline-none focus:ring-4 focus:ring-plum/10 transition-all duration-300 shadow-sm"
                          placeholder={t('contact.form.emailPlaceholder')}
                        />
                      </div>
                    </div>

                    <div className="space-y-2.5 group">
                      <label htmlFor="subject" className="text-[11px] font-black text-text-primary/70 uppercase tracking-widest block transition-colors group-focus-within:text-plum">{t('contact.form.subjectLabel')}</label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-neutral-border bg-white px-5 py-3.5 text-sm font-medium text-text-primary placeholder-text-secondary/40 focus:border-plum focus:outline-none focus:ring-4 focus:ring-plum/10 transition-all duration-300 shadow-sm"
                        placeholder={t('contact.form.subjectPlaceholder')}
                      />
                    </div>

                    <div className="space-y-2.5 group">
                      <label htmlFor="message" className="text-[11px] font-black text-text-primary/70 uppercase tracking-widest block transition-colors group-focus-within:text-plum">{t('contact.form.messageLabel')}</label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border border-neutral-border bg-white px-5 py-4 text-sm font-medium text-text-primary placeholder-text-secondary/40 focus:border-plum focus:outline-none focus:ring-4 focus:ring-plum/10 transition-all duration-300 shadow-sm resize-none"
                        placeholder={t('contact.form.messagePlaceholder')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative overflow-hidden flex items-center justify-center gap-2 py-4 sm:py-5 rounded-xl bg-yellow text-plum-dark text-[13px] font-black uppercase tracking-[0.15em] hover:bg-plum hover:text-white hover:shadow-xl hover:shadow-plum/20 transition-all duration-500 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? t('contact.form.submitting') : t('contact.form.submitBtn')}
                        {!isSubmitting && <ArrowRight size={16} className="transition-transform duration-300 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />}
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-6 py-16 flex flex-col items-center justify-center h-full"
                  >
                    <div className="w-20 h-20 rounded-full bg-plum/5 border border-plum/20 flex items-center justify-center text-plum relative mb-2">
                      <div className="absolute inset-0 rounded-full bg-plum/10 animate-ping opacity-20" />
                      <Check size={36} className="relative z-10" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-display text-2xl font-black text-plum tracking-tight">
                        {t('contact.success.title')}
                      </h3>
                      <p className="text-text-secondary text-sm md:text-base max-w-sm mx-auto leading-relaxed font-body font-medium">
                        {t('contact.success.desc')}
                      </p>
                    </div>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-8 py-3.5 rounded-full border border-neutral-border text-text-primary text-xs font-bold uppercase tracking-widest hover:bg-neutral-light-beige hover:border-plum/30 transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      {t('contact.success.sendAnother')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
export default Contact;
