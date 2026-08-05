import { motion } from "framer-motion";
import Button from "./ui/Button";
import { HiEnvelope, HiPhone, HiMapPin, HiClock } from "react-icons/hi2";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-plum-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[20%] left-[5%] w-[300px] h-[300px] bg-[#9333ea] rounded-full blur-[130px] opacity-15 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-yellow text-xs font-bold uppercase tracking-[0.25em] block mb-3">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6">
            Visit Or Write To Us
          </h2>
          <p className="text-grey text-base md:text-lg">
            Connect with our corporate office or find operating hours for our flagship coffee and tea salons.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Details (2/5 span) */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-extrabold text-white">
                Flagship HQ
              </h3>
              <p className="text-grey text-sm md:text-base leading-relaxed">
                Experience our cozy boutique tearooms and explore freshly baked bread varieties.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-plum p-3 text-yellow border border-white/5 shrink-0">
                  <HiMapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-body text-xs font-bold text-white uppercase tracking-wider">Address</h4>
                  <p className="text-grey text-sm mt-1">King Abdulaziz Road, Riyadh, Saudi Arabia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-plum p-3 text-yellow border border-white/5 shrink-0">
                  <HiPhone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-body text-xs font-bold text-white uppercase tracking-wider">Phone</h4>
                  <p className="text-grey text-sm mt-1">+966 11 234 5678</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-plum p-3 text-yellow border border-white/5 shrink-0">
                  <HiEnvelope className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-body text-xs font-bold text-white uppercase tracking-wider">Email</h4>
                  <p className="text-grey text-sm mt-1">info@wahadshay.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-plum p-3 text-yellow border border-white/5 shrink-0">
                  <HiClock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-body text-xs font-bold text-white uppercase tracking-wider">Salons Hours</h4>
                  <p className="text-grey text-sm mt-1">Sat - Thu: 8:00 AM - 12:00 AM<br />Friday: 4:00 PM - 12:00 AM</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form (3/5 span) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 rounded-3xl border border-white/5 bg-plum/30 p-8 md:p-10 backdrop-blur-sm"
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-white/80 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-xl border border-white/10 bg-plum-dark/40 px-4 py-3 text-sm text-white placeholder-grey/50 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow transition-all duration-300"
                    placeholder="Muhammed Shamil"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-white/80 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-xl border border-white/10 bg-plum-dark/40 px-4 py-3 text-sm text-white placeholder-grey/50 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow transition-all duration-300"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold text-white/80 uppercase tracking-wider block">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full rounded-xl border border-white/10 bg-plum-dark/40 px-4 py-3 text-sm text-white placeholder-grey/50 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow transition-all duration-300"
                  placeholder="Franchise Opportunity / Corporate Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-white/80 uppercase tracking-wider block">Your Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-plum-dark/40 px-4 py-3 text-sm text-white placeholder-grey/50 focus:border-yellow focus:outline-none focus:ring-1 focus:ring-yellow transition-all duration-300 resize-none"
                  placeholder="Tell us about your proposal..."
                />
              </div>

              <Button variant="primary" className="w-full">
                Send Inquiry
              </Button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
export default Contact;
