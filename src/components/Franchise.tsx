import React, { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  User,
  Briefcase,
  MessageSquare,
  Sparkles
} from "lucide-react";

export function Franchise() {
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeHoverCard, setActiveHoverCard] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    experience: "yes",
    timeline: "immediate",
    message: ""
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;
    setIsSubmitting(true);

    const emailTo = "Info@wahadshaycafe.com";

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${emailTo}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "Form Type": "Franchise Application",
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          "Target Location / City": formData.location || "UAE / GCC",
          "F&B Experience": formData.experience === "yes" ? "Yes, F&B / Retail" : "First Venture",
          "Target Timeline": formData.timeline,
          Message: formData.message || "No additional message provided.",
          _subject: `New Franchise Application: ${formData.name} (${formData.location || "GCC"}) - Wahad Shay`,
          _template: "table",
          _captcha: "false"
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Fallback to mailto
        const subject = encodeURIComponent(`Franchise Application - ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nLocation: ${formData.location}\nExperience: ${formData.experience}\nTimeline: ${formData.timeline}\nMessage: ${formData.message}`
        );
        window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Franchise submit error:", err);
      const subject = encodeURIComponent(`Franchise Application - ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nLocation: ${formData.location}\nExperience: ${formData.experience}\nTimeline: ${formData.timeline}\nMessage: ${formData.message}`
      );
      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetModal = () => {
    setIsSubmitted(false);
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      experience: "yes",
      timeline: "immediate",
      message: ""
    });
  };

  const sendWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `*Wahad Shay Franchise Inquiry*\n\n` +
      `*Name:* ${formData.name || "Prospective Partner"}\n` +
      `*Phone:* ${formData.phone || "N/A"}\n` +
      `*Email:* ${formData.email || "N/A"}\n` +
      `*Proposed Location:* ${formData.location || "UAE"}\n` +
      `*Experience:* ${formData.experience === "yes" ? "Yes, F&B / Retail" : "First Venture"}\n` +
      `*Timeline:* ${formData.timeline}\n` +
      `*Notes:* ${formData.message || "I would like more information on opening a Wahad Shay franchise."}`
    );
    window.open(`https://wa.me/971501234567?text=${text}`, "_blank");
  };

  // Safe translation getters
  const featuresList = (t("about.franchise.features") as Array<{ title: string; desc: string }>) || [
    {
      title: "Managed on Wahad Shay's Proven SOPs & Systems",
      desc: "End-to-end operations guidance and support."
    },
    {
      title: "Masalas & Recipes Controlled Centrally",
      desc: "Standardized taste, quality and consistency."
    },
    {
      title: "Same Quality & Experience Across Every Location",
      desc: "One brand promise, delivered everywhere."
    }
  ];

  const stepsList = (t("about.franchise.steps") as Array<{ title: string; desc: string }>) || [
    {
      title: "Submit Inquiry",
      desc: "Fill out our franchise application form with details about you, your experience, and the proposed location."
    },
    {
      title: "Evaluation & Approval",
      desc: "We evaluate the location feasibility, business potential and alignment with our brand standards."
    },
    {
      title: "Setup & Training",
      desc: "We assist with outlet design, setup and staff training. You get access to our SOPs, systems and complete support."
    },
    {
      title: "Operations & Growth",
      desc: "Centralized operational support ensures consistent standards, smooth day-to-day performance, and continued growth of the outlet."
    }
  ];

  return (
    <section id="franchise" className="py-16 md:py-24 bg-[#FAF6F0] relative overflow-hidden select-none">
      
      {/* Luxury Islamic Geometric Lattice Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z M30 12 L48 30 L30 48 L12 30 Z' fill='%235E2689' fill-opacity='0.5' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px"
        }}
      />
      
      {/* Dynamic ambient floating orbs with smooth motion */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.03, 0.06, 0.03],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-[#5E2689] rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.04, 0.08, 0.04],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[550px] h-[550px] bg-[#F5BD20] rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* TOP ROW: Title & Subtitle (Left) + CTA & 3-Pillars Card (Right) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Brand Statement & Partnership Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Tag badge with shimmer */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5E2689]/8 border border-[#5E2689]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5E2689] animate-pulse" />
              <span className="text-[#2E1A47] text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em]">
                {t("about.franchise.badge") || "PARTNER WITH WAHAD SHAY"}
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.12]">
              <span className="text-[#2E1A47]">{t("about.franchise.title1") || "Be a Part of"}</span>{" "}
              <span className="text-[#E59819] font-serif font-black italic relative inline-block">
                {t("about.franchise.title2") || "Wahad Shay"}
                {/* Decorative underline accent */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-1 left-0 right-0 h-[3px] bg-[#E59819]/40 rounded-full origin-left rtl:origin-right"
                />
              </span>
            </h2>

            <p className="text-[#6B635B] text-base sm:text-lg font-normal leading-relaxed font-body">
              {t("about.franchise.subtitle") || "A proven model. A strong brand. A partnership built for success."}
            </p>

            {/* Amber Left Bar Quote Callout with subtle float */}
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="border-s-[3.5px] border-[#E59819] ps-5 py-1.5 mt-6 bg-gradient-to-r from-[#E59819]/5 to-transparent rounded-e-xl"
            >
              <p className="text-[#2E1A47] text-sm sm:text-base font-medium leading-relaxed">
                {language === "AR"
                  ? "يقدم واحد شاي أكثر من مجرد عمل تجاري – نحن نقدم شراكة حقيقية."
                  : "Wahad Shay offers more than a business – we offer a partnership."}
              </p>
              <p className="text-[#736B63] text-xs sm:text-sm leading-relaxed mt-1.5 font-body">
                {language === "AR"
                  ? "تُدار وفق إجراءات تشغيل قياسية وأنظمة مثبتة لتقديم نفس الجودة والتجربة في كل موقع."
                  : "Managed on our proven SOPs & systems to deliver the same quality and experience across every location."}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Apply Button & 3-Column White Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start lg:items-end"
          >
            
            {/* Top Right "Apply for Franchise" Button with magnetic hover effect */}
            <motion.button
              type="button"
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="group bg-[#F5BD20] hover:bg-[#EAA910] text-[#2E1A47] font-bold text-sm sm:text-base px-6 py-3 rounded-full inline-flex items-center gap-3 shadow-[0_6px_20px_rgba(245,189,32,0.35)] hover:shadow-[0_10px_30px_rgba(245,189,32,0.5)] transition-all cursor-pointer mb-6"
            >
              <div className="w-7 h-7 rounded-full bg-[#2E1A47] flex items-center justify-center text-white flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
                {/* Storefront Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                  <path d="M2 7h20" />
                  <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                </svg>
              </div>
              <span className="font-display font-extrabold">{t("about.franchise.applyBtn") || "Apply for Franchise"}</span>
            </motion.button>

            {/* 3-Column White Card with luxury shadows & hover elevation */}
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(46,26,71,0.06)" }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE4D8] shadow-[0_8px_30px_rgba(46,26,71,0.03)] relative overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#ECE4D8] rtl:md:divide-x-reverse">
                
                {/* Pillar 1: Managed SOPs */}
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center p-4 sm:p-5 group cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#F2EDF8] flex items-center justify-center text-[#5E2689] mb-4 flex-shrink-0 group-hover:scale-110 group-hover:bg-[#5E2689] group-hover:text-white transition-all duration-300 shadow-xs">
                    {/* Clipboard Checklist Icon */}
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <path d="m9 14 2 2 4-4" />
                      <path d="M9 10h6" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-[15px] text-[#2E1A47] group-hover:text-[#5E2689] transition-colors leading-snug">
                    {featuresList[0]?.title || "Managed on Wahad Shay's Proven SOPs & Systems"}
                  </h3>
                  <p className="text-[#736B63] text-xs sm:text-[13px] leading-relaxed mt-2 font-body">
                    {featuresList[0]?.desc || "End-to-end operations guidance and support."}
                  </p>
                </motion.div>

                {/* Pillar 2: Masalas & Recipes */}
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center p-4 sm:p-5 pt-6 md:pt-5 group cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#F2EDF8] flex items-center justify-center text-[#5E2689] mb-4 flex-shrink-0 group-hover:scale-110 group-hover:bg-[#5E2689] group-hover:text-white transition-all duration-300 shadow-xs">
                    {/* Jar with Leaf Recipe Icon */}
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2h8" />
                      <path d="M9 2v3h6V2" />
                      <path d="M6 8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V8z" />
                      <path d="M12 11c-1.5 0-3 1.5-3 3.5 0 2 2.5 3.5 3 3.5s3-1.5 3-3.5c0-2-1.5-3.5-3-3.5z" />
                      <path d="M12 11v7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-[15px] text-[#2E1A47] group-hover:text-[#5E2689] transition-colors leading-snug">
                    {featuresList[1]?.title || "Masalas & Recipes Controlled Centrally"}
                  </h3>
                  <p className="text-[#736B63] text-xs sm:text-[13px] leading-relaxed mt-2 font-body">
                    {featuresList[1]?.desc || "Standardized taste, quality and consistency."}
                  </p>
                </motion.div>

                {/* Pillar 3: Quality & Experience */}
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center p-4 sm:p-5 pt-6 md:pt-5 group cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#F2EDF8] flex items-center justify-center text-[#5E2689] mb-4 flex-shrink-0 group-hover:scale-110 group-hover:bg-[#5E2689] group-hover:text-white transition-all duration-300 shadow-xs">
                    {/* Quality Rosette Badge with Star Icon */}
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="9" r="6" />
                      <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11" />
                      <polygon points="12 6 13 8 15.5 8.5 13.75 10.2 14.2 12.5 12 11.3 9.8 12.5 10.25 10.2 8.5 8.5 11 8 12 6" fill="currentColor" fillOpacity="0.2" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-[15px] text-[#2E1A47] group-hover:text-[#5E2689] transition-colors leading-snug">
                    {featuresList[2]?.title || "Same Quality & Experience Across Every Location"}
                  </h3>
                  <p className="text-[#736B63] text-xs sm:text-[13px] leading-relaxed mt-2 font-body">
                    {featuresList[2]?.desc || "One brand promise, delivered everywhere."}
                  </p>
                </motion.div>

              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* ======================================================== */}
        {/* MIDDLE SECTION: Section Header Divider */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 my-14 md:my-20"
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#E59819]/50 to-[#E59819]/30 flex-1 max-w-xs" />
          <div className="flex items-center gap-2.5 text-[#2E1A47] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase">
            <span className="text-[#E59819] text-xs animate-spin-slow">◆</span>
            <span>{t("about.franchise.processTitle") || "OUR FRANCHISE PROCESS"}</span>
            <span className="text-[#E59819] text-xs animate-spin-slow">◆</span>
          </div>
          <div className="h-[1px] bg-gradient-to-r from-[#E59819]/30 via-[#E59819]/50 to-transparent flex-1 max-w-xs" />
        </motion.div>

        {/* ======================================================== */}
        {/* STEPPER CARDS GRID: 4 Process Steps with Connectors */}
        {/* ======================================================== */}
        <div className="relative">
          
          {/* Connecting dashed line behind cards (Desktop only) */}
          <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-0 border-t-2 border-dashed border-[#E59819]/50 z-0">
            {/* Connector Dots */}
            <div className="absolute left-[33%] -top-[9px] -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#5E2689] shadow-xs animate-pulse" />
            <div className="absolute left-[66%] -top-[9px] -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#5E2689] shadow-xs animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            
            {/* Step 1: Submit Inquiry */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(46,26,71,0.08)" }}
              onHoverStart={() => setActiveHoverCard(0)}
              onHoverEnd={() => setActiveHoverCard(null)}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#ECE4D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 relative flex flex-col items-center text-center group min-h-[310px] cursor-pointer"
            >
              <span className="absolute top-5 left-5 rtl:left-auto rtl:right-5 px-3 py-0.5 rounded-full bg-[#F2EDF8] text-[#5E2689] font-numbers font-bold text-xs group-hover:bg-[#5E2689] group-hover:text-white transition-colors duration-300">
                01
              </span>
              
              <div className="w-16 h-16 rounded-full border-2 border-[#E59819] bg-[#FAF6F0]/60 flex items-center justify-center text-[#E59819] mb-5 group-hover:scale-110 group-hover:bg-[#F5BD20] group-hover:text-white group-hover:border-[#F5BD20] transition-all duration-300 shadow-xs">
                {/* Document / Inquiry Pen Icon */}
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>

              <h4 className="font-display font-bold text-base sm:text-lg text-[#2E1A47] group-hover:text-[#5E2689] transition-colors leading-snug">
                {stepsList[0]?.title || "Submit Inquiry"}
              </h4>

              <p className="text-[#736B63] text-xs sm:text-[13px] leading-relaxed mt-2.5 font-body">
                {stepsList[0]?.desc || "Fill out our franchise application form with details about you, your experience, and the proposed location."}
              </p>
            </motion.div>

            {/* Step 2: Evaluation & Approval */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(46,26,71,0.08)" }}
              onHoverStart={() => setActiveHoverCard(1)}
              onHoverEnd={() => setActiveHoverCard(null)}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#ECE4D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 relative flex flex-col items-center text-center group min-h-[310px] cursor-pointer"
            >
              <span className="absolute top-5 left-5 rtl:left-auto rtl:right-5 px-3 py-0.5 rounded-full bg-[#F2EDF8] text-[#5E2689] font-numbers font-bold text-xs group-hover:bg-[#5E2689] group-hover:text-white transition-colors duration-300">
                02
              </span>

              <div className="w-16 h-16 rounded-full border-2 border-[#E59819] bg-[#FAF6F0]/60 flex items-center justify-center text-[#E59819] mb-5 group-hover:scale-110 group-hover:bg-[#F5BD20] group-hover:text-white group-hover:border-[#F5BD20] transition-all duration-300 shadow-xs">
                {/* Magnifying Glass with Chart Bars */}
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="13" x2="8" y2="11" />
                  <line x1="11" y1="13" x2="11" y2="9" />
                  <line x1="14" y1="13" x2="14" y2="7" />
                </svg>
              </div>

              <h4 className="font-display font-bold text-base sm:text-lg text-[#2E1A47] group-hover:text-[#5E2689] transition-colors leading-snug">
                {stepsList[1]?.title || "Evaluation & Approval"}
              </h4>

              <p className="text-[#736B63] text-xs sm:text-[13px] leading-relaxed mt-2.5 font-body">
                {stepsList[1]?.desc || "We evaluate the location feasibility, business potential and alignment with our brand standards."}
              </p>
            </motion.div>

            {/* Step 3: Setup & Training */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(46,26,71,0.08)" }}
              onHoverStart={() => setActiveHoverCard(2)}
              onHoverEnd={() => setActiveHoverCard(null)}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#ECE4D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 relative flex flex-col items-center text-center group min-h-[310px] cursor-pointer"
            >
              <span className="absolute top-5 left-5 rtl:left-auto rtl:right-5 px-3 py-0.5 rounded-full bg-[#F2EDF8] text-[#5E2689] font-numbers font-bold text-xs group-hover:bg-[#5E2689] group-hover:text-white transition-colors duration-300">
                03
              </span>

              <div className="w-16 h-16 rounded-full border-2 border-[#E59819] bg-[#FAF6F0]/60 flex items-center justify-center text-[#E59819] mb-5 group-hover:scale-110 group-hover:bg-[#F5BD20] group-hover:text-white group-hover:border-[#F5BD20] transition-all duration-300 shadow-xs">
                {/* Connected Training / Team Network Nodes */}
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="7" r="3" />
                  <circle cx="6" cy="17" r="3" />
                  <circle cx="18" cy="17" r="3" />
                  <path d="M9.5 9.5 7.5 14.5" />
                  <path d="M14.5 9.5 16.5 14.5" />
                  <path d="M9 17h6" />
                </svg>
              </div>

              <h4 className="font-display font-bold text-base sm:text-lg text-[#2E1A47] group-hover:text-[#5E2689] transition-colors leading-snug">
                {stepsList[2]?.title || "Setup & Training"}
              </h4>

              <p className="text-[#736B63] text-xs sm:text-[13px] leading-relaxed mt-2.5 font-body">
                {stepsList[2]?.desc || "We assist with outlet design, setup and staff training. You get access to our SOPs, systems and complete support."}
              </p>
            </motion.div>

            {/* Step 4: Operations & Growth */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(46,26,71,0.08)" }}
              onHoverStart={() => setActiveHoverCard(3)}
              onHoverEnd={() => setActiveHoverCard(null)}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#ECE4D8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 relative flex flex-col items-center text-center group min-h-[310px] cursor-pointer"
            >
              <span className="absolute top-5 left-5 rtl:left-auto rtl:right-5 px-3 py-0.5 rounded-full bg-[#F2EDF8] text-[#5E2689] font-numbers font-bold text-xs group-hover:bg-[#5E2689] group-hover:text-white transition-colors duration-300">
                04
              </span>

              <div className="w-16 h-16 rounded-full border-2 border-[#E59819] bg-[#FAF6F0]/60 flex items-center justify-center text-[#E59819] mb-5 group-hover:scale-110 group-hover:bg-[#F5BD20] group-hover:text-white group-hover:border-[#F5BD20] transition-all duration-300 shadow-xs">
                {/* Growth Chart with Upward Arrow */}
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                  <path d="M19 5v4h-4" />
                </svg>
              </div>

              <h4 className="font-display font-bold text-base sm:text-lg text-[#2E1A47] group-hover:text-[#5E2689] transition-colors leading-snug">
                {stepsList[3]?.title || "Operations & Growth"}
              </h4>

              <p className="text-[#736B63] text-xs sm:text-[13px] leading-relaxed mt-2.5 font-body">
                {stepsList[3]?.desc || "Centralized operational support ensures consistent standards, smooth day-to-day performance, and continued growth of the outlet."}
              </p>
            </motion.div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM BANNER: Hands Heart Icon + Brand Motto */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(94,38,137,0.06)" }}
          className="bg-[#FAF2E8] border border-[#ECDCC9] rounded-2xl py-4 sm:py-5 px-6 sm:px-8 mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-start shadow-xs transition-all duration-300"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            className="text-[#5E2689] flex-shrink-0"
          >
            {/* Hands Cupping Heart Icon */}
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9" />
              <path d="M2 13h4a2 2 0 0 1 2 2v1" />
              <path d="M22 13h-4a2 2 0 0 0-2 2v1" />
            </svg>
          </motion.div>
          <p className="text-[#2E1A47] text-sm sm:text-base font-normal">
            <span>{t("about.franchise.bottomBanner.text1") || "With Wahad Shay, you're never on your own."}</span>{" "}
            <span className="font-bold text-[#2E1A47]">{t("about.franchise.bottomBanner.text2") || "We grow together, We win together."}</span>
          </p>
        </motion.div>

      </div>

      {/* ======================================================== */}
      {/* FRANCHISE APPLICATION MODAL (Animated with AnimatePresence) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-[#2E1A47]/60 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 25 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-3xl shadow-2xl border border-[#ECE4D8] w-full max-w-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto"
            >
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 rtl:right-auto rtl:left-5 w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#ECE4D8] text-[#2E1A47] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Modal Header */}
                  <div className="text-center sm:text-start mb-6 pe-8 rtl:pe-0 rtl:ps-8">
                    <span className="text-[#5E2689] text-xs font-bold uppercase tracking-[0.2em] block mb-1">
                      {t("about.franchise.badge") || "PARTNER WITH WAHAD SHAY"}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-[#2E1A47]">
                      {t("about.franchise.modal.title") || "Franchise Application"}
                    </h3>
                    <p className="text-[#736B63] text-xs sm:text-sm mt-1.5 leading-relaxed font-body">
                      {t("about.franchise.modal.subtitle") || "Partner with Wahad Shay and bring authentic luxury chai & café culture to your region."}
                    </p>
                  </div>

                  {/* Modal Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2E1A47] uppercase tracking-wider mb-1.5">
                          {t("about.franchise.modal.name") || "Full Name"} *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#A5A5A5] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={t("about.franchise.modal.namePlaceholder") || "e.g. Tariq Al Mansoori"}
                            className="w-full ps-10 pe-4 rtl:ps-4 rtl:pe-10 py-2.5 bg-[#FAF6F0] border border-[#ECE4D8] rounded-xl text-[#2E1A47] text-sm focus:outline-none focus:border-[#5E2689] focus:ring-2 focus:ring-[#5E2689]/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2E1A47] uppercase tracking-wider mb-1.5">
                          {t("about.franchise.modal.phone") || "Phone / WhatsApp"} *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#A5A5A5] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t("about.franchise.modal.phonePlaceholder") || "+971 50 123 4567"}
                            className="w-full ps-10 pe-4 rtl:ps-4 rtl:pe-10 py-2.5 bg-[#FAF6F0] border border-[#ECE4D8] rounded-xl text-[#2E1A47] text-sm focus:outline-none focus:border-[#5E2689] focus:ring-2 focus:ring-[#5E2689]/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2E1A47] uppercase tracking-wider mb-1.5">
                          {t("about.franchise.modal.email") || "Email Address"} *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#A5A5A5] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t("about.franchise.modal.emailPlaceholder") || "tariq@example.com"}
                            className="w-full ps-10 pe-4 rtl:ps-4 rtl:pe-10 py-2.5 bg-[#FAF6F0] border border-[#ECE4D8] rounded-xl text-[#2E1A47] text-sm focus:outline-none focus:border-[#5E2689] focus:ring-2 focus:ring-[#5E2689]/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2E1A47] uppercase tracking-wider mb-1.5">
                          {t("about.franchise.modal.location") || "Proposed City / Country"} *
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-[#A5A5A5] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            name="location"
                            required
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder={t("about.franchise.modal.locationPlaceholder") || "e.g. Dubai, Abu Dhabi, Riyadh"}
                            className="w-full ps-10 pe-4 rtl:ps-4 rtl:pe-10 py-2.5 bg-[#FAF6F0] border border-[#ECE4D8] rounded-xl text-[#2E1A47] text-sm focus:outline-none focus:border-[#5E2689] focus:ring-2 focus:ring-[#5E2689]/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Prior Experience */}
                    <div>
                      <label className="block text-xs font-bold text-[#2E1A47] uppercase tracking-wider mb-1.5">
                        {t("about.franchise.modal.experience") || "Prior F&B or Retail Experience"}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, experience: "yes" }))}
                          className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            formData.experience === "yes"
                              ? "bg-[#F2EDF8] border-[#5E2689] text-[#5E2689] shadow-xs"
                              : "bg-[#FAF6F0] border-[#ECE4D8] text-[#736B63] hover:border-[#5E2689]/40"
                          }`}
                        >
                          <Briefcase className="w-4 h-4" />
                          <span>{t("about.franchise.modal.experienceYes") || "Yes, I have F&B experience"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, experience: "no" }))}
                          className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            formData.experience === "no"
                              ? "bg-[#F2EDF8] border-[#5E2689] text-[#5E2689] shadow-xs"
                              : "bg-[#FAF6F0] border-[#ECE4D8] text-[#736B63] hover:border-[#5E2689]/40"
                          }`}
                        >
                          <User className="w-4 h-4" />
                          <span>{t("about.franchise.modal.experienceNo") || "No, this is my first venture"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Investment Timeline */}
                    <div>
                      <label className="block text-xs font-bold text-[#2E1A47] uppercase tracking-wider mb-1.5">
                        {t("about.franchise.modal.timeline") || "Expected Investment Timeline"}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "immediate", label: t("about.franchise.modal.timelineImmediate") || "1-3 Months" },
                          { id: "medium", label: t("about.franchise.modal.timelineMedium") || "3-6 Months" },
                          { id: "future", label: t("about.franchise.modal.timelineFuture") || "6-12 Months" }
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, timeline: item.id }))}
                            className={`py-2 px-3 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                              formData.timeline === item.id
                                ? "bg-[#F5BD20]/20 border-[#F5BD20] text-[#2E1A47] font-bold shadow-xs"
                                : "bg-[#FAF6F0] border-[#ECE4D8] text-[#736B63] hover:border-[#5E2689]/30"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-xs font-bold text-[#2E1A47] uppercase tracking-wider mb-1.5">
                        {t("about.franchise.modal.message") || "Additional Information / Proposed Site Notes"}
                      </label>
                      <div className="relative">
                        <MessageSquare className="w-4 h-4 text-[#A5A5A5] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3 pointer-events-none" />
                        <textarea
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={t("about.franchise.modal.messagePlaceholder") || "Tell us about your proposed site, business background, or questions..."}
                          className="w-full ps-10 pe-4 rtl:ps-4 rtl:pe-10 py-2.5 bg-[#FAF6F0] border border-[#ECE4D8] rounded-xl text-[#2E1A47] text-sm focus:outline-none focus:border-[#5E2689] focus:ring-2 focus:ring-[#5E2689]/20 transition-all resize-none font-body"
                        />
                      </div>
                    </div>

                    {/* Form Submission Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-[#5E2689] hover:bg-[#4E1F73] text-white font-bold py-3 px-6 rounded-xl inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            <span>{t("about.franchise.modal.submitting") || "Submitting..."}</span>
                          </div>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{t("about.franchise.modal.submitBtn") || "Submit Application"}</span>
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={sendWhatsAppInquiry}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold py-3 px-6 rounded-xl inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{language === "AR" ? "مراسلة عبر واتساب" : "Direct WhatsApp"}</span>
                      </motion.button>
                    </div>

                  </form>
                </>
              ) : (
                /* Success Confirmation State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F2EDF8] text-[#5E2689] flex items-center justify-center mx-auto mb-2 animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-[#5E2689]" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-[#2E1A47]">
                    {t("about.franchise.modal.successTitle") || "Application Submitted Successfully!"}
                  </h3>
                  <p className="text-[#736B63] text-sm max-w-md mx-auto leading-relaxed font-body">
                    {t("about.franchise.modal.successDesc") || "Thank you for your interest in partnering with Wahad Shay. Our franchise expansion team will review your application and get in touch within 24-48 hours."}
                  </p>
                  <div className="pt-4 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={sendWhatsAppInquiry}
                      className="bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold py-2.5 px-6 rounded-xl inline-flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{language === "AR" ? "متابعة الطلب عبر واتساب" : "Follow up on WhatsApp"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetModal}
                      className="bg-[#FAF6F0] hover:bg-[#ECE4D8] text-[#2E1A47] font-bold py-2.5 px-6 rounded-xl text-sm transition-all cursor-pointer"
                    >
                      {t("about.franchise.modal.closeBtn") || "Close"}
                    </button>
                  </div>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default Franchise;
