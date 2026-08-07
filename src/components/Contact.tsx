import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight, Instagram, Twitter, Check } from "lucide-react";
import Button from "./ui/Button";

export function Contact() {
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
    <section id="contact" className="py-24 md:py-32 bg-plum-dark relative overflow-hidden select-none">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] bg-plum/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[380px] h-[380px] bg-yellow/3 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white">
            Visit Or Write To Us
          </h2>
          <p className="text-grey text-base font-body">
            Connect with our franchise office or request operations details for our luxury coffee and tea salons.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Details & Links (2/5 span) */}
          <div className="reveal lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-black text-[#F8EED5]">
                Flagship HQ Salon
              </h3>
              <p className="text-grey text-sm leading-relaxed font-body">
                Experience our quiet, ambient boutique Lounges and explore freshly baked bread selections.
              </p>
            </div>

            {/* Information Cards List */}
            <div className="space-y-4 font-body">
              {/* Address */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="rounded-full bg-plum p-3.5 text-yellow w-fit shrink-0">
                  <MapPin size={18} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-[10px] text-grey uppercase font-bold tracking-widest">Address</h4>
                  <p className="text-white text-sm mt-1">King Abdulaziz Road, Riyadh, Saudi Arabia</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-yellow hover:text-[#ffd03d] text-xs font-semibold inline-flex items-center gap-1 mt-2 transition-colors cursor-pointer"
                  >
                    Open in Google Maps
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="rounded-full bg-plum p-3.5 text-yellow w-fit shrink-0">
                  <Clock size={18} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-[10px] text-grey uppercase font-bold tracking-widest">Café Hours</h4>
                  <p className="text-white text-sm mt-1 leading-relaxed">
                    Sat - Thu: 8:00 AM - 12:00 AM <br />
                    Friday: 4:00 PM - 12:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Channels */}
            <div className="space-y-4 border-t border-white/5 pt-6">
              <h4 className="font-display text-xs font-bold text-yellow uppercase tracking-widest">
                Quick Action Channels
              </h4>
              <div className="flex flex-wrap gap-3 font-body">
                <a
                  href="tel:+966112345678"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all duration-300 cursor-pointer"
                >
                  <Phone size={14} className="text-yellow" />
                  Call Salon
                </a>
                <a
                  href="mailto:info@wahadshay.com"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all duration-300 cursor-pointer"
                >
                  <Mail size={14} className="text-yellow" />
                  Email Support
                </a>
                <a
                  href="https://wa.me/966112345678"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 text-green-400 text-xs font-semibold transition-all duration-300 cursor-pointer"
                >
                  <MessageSquare size={14} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form (3/5 span) */}
          <div className="reveal lg:col-span-3 glass-card p-8 md:p-10 relative min-h-[460px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 font-body"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-plum-dark/40 px-4 py-3 text-sm text-white placeholder-grey/50 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow transition-all duration-300"
                        placeholder="Muhammed Shamil"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-plum-dark/40 px-4 py-3 text-sm text-white placeholder-grey/50 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow transition-all duration-300"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-plum-dark/40 px-4 py-3 text-sm text-white placeholder-grey/50 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow transition-all duration-300"
                      placeholder="Franchise Application / Corporate Inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">Your Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-plum-dark/40 px-4 py-3 text-sm text-white placeholder-grey/50 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow transition-all duration-300 resize-none"
                      placeholder="Describe your franchise or corporate proposal..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-yellow text-plum-dark text-xs font-black uppercase tracking-widest hover:bg-yellow/90 transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    {isSubmitting ? "Sending Inquiry..." : "Submit Inquiry"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-6 py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mx-auto">
                    <Check size={28} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-white uppercase tracking-wide">
                      Message Dispatched
                    </h3>
                    <p className="text-grey text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Wahad Shay. Our corporate relationship managers will review your submission and reply shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-white/10 text-white text-xs font-semibold hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
export default Contact;
