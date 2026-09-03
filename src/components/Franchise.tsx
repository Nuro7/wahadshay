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
  MessageSquare
} from "lucide-react";

export function Franchise({ isHomePage = false }: { isHomePage?: boolean } = {}) {
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    experience: "yes",
    timeline: "immediate",
    message: ""
  });

  // iOS Safari scroll locking fix: Removed naive overflow="hidden" on body as it causes freezing.
  // The fixed modal overlay naturally traps focus and scroll on desktop.

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
    setIsSubmitting(true);

    try {
      // Submit seamlessly in background to Info@wahadshaycafe.com
      const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai", dateStyle: "full", timeStyle: "medium" });
      await fetch("https://formsubmit.co/ajax/Info@wahadshaycafe.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `🏢 [FRANCHISE LEAD] ${formData.name.toUpperCase()} — ${formData.location || "UAE"}`,
          _template: "table",
          _captcha: "false",
          "📁 APPLICATION CATEGORY": "🏛️ Commercial Franchise & Territory Partnership",
          "👤 APPLICANT FULL NAME": formData.name,
          "📱 PHONE / WHATSAPP": formData.phone,
          "✉️ APPLICANT EMAIL": formData.email,
          "📍 TARGET EMIRATE / PROPOSED CITY": formData.location,
          "💼 PRIOR F&B / RETAIL EXPERIENCE": formData.experience === "yes" ? "✅ Yes — Experienced F&B Operator" : "🆕 No — First Venture",
          "⏳ PLANNED INVESTMENT TIMELINE": formData.timeline === "immediate" ? "🚀 Immediate (1-3 Months)" : formData.timeline === "medium" ? "📅 Mid-Term (3-6 Months)" : "🗓️ Long-Term (6-12 Months)",
          "📝 PROPOSAL / ADDITIONAL NOTES": formData.message || "None provided",
          "🕒 SUBMITTED AT (UAE TIME)": timestamp,
        }),
      });
    } catch {
      // Fallback
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
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
    window.open(`https://wa.me/971554946176?text=${text}`, "_blank");
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
    <section id="franchise" className="section-padding bg-neutral-ivory border-t border-neutral-border/40 relative overflow-hidden select-none">
      
      {/* Background ambient luxury light */}
      <div className="absolute top-[5%] right-[-10%] w-[500px] h-[500px] bg-plum/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-10%] w-[450px] h-[450px] bg-yellow/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="premium-container relative z-10 space-y-16 md:space-y-20">
        
        {/* ======================================================== */}
        {/* TOP ROW: Brand Header & Info (Left) + CTA & 3-Pillars Card (Right) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Brand Statement & Editorial Quote */}
          <div className="reveal-left reveal lg:col-span-5 space-y-6">
            
            <div className="space-y-3.5">
              {/* Tag Badge */}
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-plum/40 block" />
                <span className="typo-eyebrow text-plum">
                  {t("about.franchise.badge") || "PARTNER WITH WAHAD SHAY"}
                </span>
              </div>

              {/* Headline with metallic shimmer & plum branding */}
              {isHomePage ? (
                <h2 className="typo-section-title text-text-primary leading-[1.04]">
                  <span className="text-shimmer block">{t("about.franchise.title1") || "Be a Part of"}</span>
                  <span className="text-plum font-extrabold block">{t("about.franchise.title2") || "Wahad Shay"}</span>
                </h2>
              ) : (
                <h1 className="typo-section-title text-text-primary leading-[1.04]">
                  <span className="text-shimmer block">{t("about.franchise.title1") || "Be a Part of"}</span>
                  <span className="text-plum font-extrabold block">{t("about.franchise.title2") || "Wahad Shay"}</span>
                </h1>
              )}

              <p className="typo-body text-text-secondary pt-0.5">
                {t("about.franchise.subtitle") || "A proven model. A strong brand. A partnership built for success."}
              </p>
            </div>

            {/* Luxury Editorial Quote Callout */}
            <div className="border-s-4 border-yellow bg-white/90 backdrop-blur-md p-6 rounded-r-2xl border-y border-e border-neutral-border shadow-xs space-y-2 transition-all hover:shadow-md">
              <p className="typo-h4 text-text-primary font-bold">
                {language === "AR"
                  ? "يقدم واحد شاي أكثر من مجرد عمل تجاري – نحن نقدم شراكة حقيقية."
                  : "Wahad Shay offers more than a business – we offer a partnership."}
              </p>
              <p className="typo-body-sm text-text-secondary">
                {language === "AR"
                  ? "تُدار وفق إجراءات تشغيل قياسية وأنظمة مثبتة لتقديم نفس الجودة والتجربة في كل موقع."
                  : "Managed on our proven SOPs & systems to deliver the same quality and experience across every location."}
              </p>
            </div>
          </div>

          {/* Right Column: 3-Pillars Feature Card with Integrated CTA Footer */}
          <div className="reveal-right reveal lg:col-span-7 flex flex-col lg:mt-6">

            {/* 3-Column Luxury Feature Card */}
            <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-neutral-border shadow-[0_8px_30px_rgba(43,37,32,0.04)] relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-border/80 rtl:md:divide-x-reverse">
                
                {/* Pillar 1: Managed SOPs */}
                <div className="flex flex-col items-center text-center p-4 sm:p-5 group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-plum/5 border border-plum/10 flex items-center justify-center text-plum mb-4 flex-shrink-0 group-hover:scale-110 group-hover:bg-plum group-hover:text-white group-hover:border-plum group-hover:shadow-[0_8px_20px_rgba(94,38,137,0.25)] transition-all duration-500 shadow-xs">
                    {/* Clipboard Checklist Icon */}
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <path d="m9 14 2 2 4-4" />
                      <path d="M9 10h6" />
                    </svg>
                  </div>
                  <h3 className="typo-h4 font-semibold text-text-primary group-hover:text-plum transition-colors leading-snug">
                    {featuresList[0]?.title || "Managed on Wahad Shay's Proven SOPs & Systems"}
                  </h3>
                  <p className="typo-body-sm text-text-secondary mt-2">
                    {featuresList[0]?.desc || "End-to-end operations guidance and support."}
                  </p>
                </div>

                {/* Pillar 2: Masalas & Recipes */}
                <div className="flex flex-col items-center text-center p-4 sm:p-5 pt-6 md:pt-5 group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-plum/5 border border-plum/10 flex items-center justify-center text-plum mb-4 flex-shrink-0 group-hover:scale-110 group-hover:bg-plum group-hover:text-white group-hover:border-plum group-hover:shadow-[0_8px_20px_rgba(94,38,137,0.25)] transition-all duration-500 shadow-xs">
                    {/* Jar Recipe Icon */}
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2h8" />
                      <path d="M9 2v3" />
                      <path d="M15 2v3" />
                      <rect width="14" height="15" x="5" y="5" rx="3" />
                      <circle cx="12" cy="13" r="2.5" />
                    </svg>
                  </div>
                  <h3 className="typo-h4 font-semibold text-text-primary group-hover:text-plum transition-colors leading-snug">
                    {featuresList[1]?.title || "Authentic Masalas & Recipes"}
                  </h3>
                  <p className="typo-body-sm text-text-secondary mt-2">
                    {featuresList[1]?.desc || "Direct supply of signature blends and spices."}
                  </p>
                </div>

                {/* Pillar 3: Quality Control */}
                <div className="flex flex-col items-center text-center p-4 sm:p-5 pt-6 md:pt-5 group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-plum/5 border border-plum/10 flex items-center justify-center text-plum mb-4 flex-shrink-0 group-hover:scale-110 group-hover:bg-plum group-hover:text-white group-hover:border-plum group-hover:shadow-[0_8px_20px_rgba(94,38,137,0.25)] transition-all duration-500 shadow-xs">
                    {/* Shield Check Icon */}
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="typo-h4 font-semibold text-text-primary group-hover:text-plum transition-colors leading-snug">
                    {featuresList[2]?.title || "Regular Audits & Quality Control"}
                  </h3>
                  <p className="typo-body-sm text-text-secondary mt-2">
                    {featuresList[2]?.desc || "Routine monitoring for peak consistency."}
                  </p>
                </div>

              </div>

              {/* Integrated Card Action Footer */}
              <div className="mt-6 pt-6 border-t border-neutral-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-center sm:text-start rtl:sm:text-end">
                  <span className="w-2 h-2 rounded-full bg-yellow animate-pulse flex-shrink-0 hidden sm:inline-block" />
                  <p className="text-text-primary text-xs sm:text-sm font-semibold font-display">
                    {language === "AR"
                      ? "جاهز لبدء رحلة شراكتك مع واحد شاي؟"
                      : "Ready to launch your Wahad Shay partnership?"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-yellow via-[#F5BD20] to-[#E5AB15] text-plum-dark font-display font-black text-xs sm:text-sm shadow-[0_4px_18px_rgba(245,189,32,0.3)] hover:shadow-[0_8px_25px_rgba(245,189,32,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex-shrink-0 w-full sm:w-auto"
                  >
                    <div className="w-6 h-6 rounded-full bg-plum-dark flex items-center justify-center text-white flex-shrink-0 group-hover:rotate-12 transition-transform duration-300 shadow-xs">
                      {/* Storefront Icon */}
                      <svg className="w-3.5 h-3.5 text-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l1-5h16l1 5" />
                        <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
                        <path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
                        <path d="M9 21v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6" />
                      </svg>
                    </div>
                    <span className="tracking-wide">{t("about.franchise.applyBtn") || "Apply for Franchise"}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* REFINED BRAND PROCESS DIVIDER (Apple/Jewelry Minimal Floating Badge) */}
        {/* ======================================================== */}
        <div className="reveal flex items-center justify-center gap-4 my-14 md:my-18 max-w-xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-plum/20 to-plum/40 flex-1" />
          <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/90 border border-neutral-border shadow-xs backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-pulse" />
            <span className="text-plum text-xs font-bold tracking-[0.25em] uppercase font-display">
              {t("about.franchise.processTitle") || "OUR FRANCHISE PROCESS"}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-pulse" />
          </div>
          <div className="h-px bg-gradient-to-l from-transparent via-plum/20 to-plum/40 flex-1" />
        </div>

        {/* ======================================================== */}
        {/* STEPPER CARDS GRID: 4 Process Steps with Editorial Flow */}
        {/* ======================================================== */}
        <div className="relative">
          
          {/* Subtle Desktop Connector Track */}
          <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-0 border-t border-dashed border-plum/20 z-0">
            <div className="absolute left-[33%] -top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-plum shadow-xs" />
            <div className="absolute left-[66%] -top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-plum shadow-xs" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
            
            {/* Step 1: Submit Inquiry */}
            <div
              style={{ "--stagger-idx": 1 } as React.CSSProperties}
              className="reveal luxury-card luxury-card-hover group p-7 sm:p-8 rounded-3xl bg-white border border-neutral-border flex flex-col items-center text-center relative shadow-[0_4px_20px_rgba(43,37,32,0.03)] hover:shadow-[0_15px_40px_rgba(94,38,137,0.09)] transition-all duration-500 cursor-default"
            >
              {/* Number Badge */}
              <span className="absolute top-5 left-5 rtl:left-auto rtl:right-5 px-3 py-1 rounded-full bg-plum/5 text-plum border border-plum/10 typo-badge group-hover:bg-plum group-hover:text-white transition-all duration-300">
                01
              </span>
              
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-neutral-ivory border border-neutral-border/80 text-plum group-hover:bg-gradient-to-br group-hover:from-plum group-hover:to-plum-dark group-hover:text-white group-hover:border-plum group-hover:scale-110 shadow-xs group-hover:shadow-[0_10px_25px_rgba(94,38,137,0.25)] transition-all duration-500 flex items-center justify-center mb-5 mt-2">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>

              <h4 className="typo-h4 font-semibold text-text-primary group-hover:text-plum transition-colors leading-snug">
                {stepsList[0]?.title || "Submit Inquiry"}
              </h4>

              <p className="typo-body-sm text-text-secondary mt-2.5">
                {stepsList[0]?.desc || "Fill out our franchise application form with details about you, your experience, and the proposed location."}
              </p>
            </div>

            {/* Step 2: Evaluation & Approval */}
            <div
              style={{ "--stagger-idx": 2 } as React.CSSProperties}
              className="reveal luxury-card luxury-card-hover group p-7 sm:p-8 rounded-3xl bg-white border border-neutral-border flex flex-col items-center text-center relative shadow-[0_4px_20px_rgba(43,37,32,0.03)] hover:shadow-[0_15px_40px_rgba(94,38,137,0.09)] transition-all duration-500 cursor-default"
            >
              <span className="absolute top-5 left-5 rtl:left-auto rtl:right-5 px-3 py-1 rounded-full bg-plum/5 text-plum border border-plum/10 typo-badge group-hover:bg-plum group-hover:text-white transition-all duration-300">
                02
              </span>

              <div className="w-16 h-16 rounded-2xl bg-neutral-ivory border border-neutral-border/80 text-plum group-hover:bg-gradient-to-br group-hover:from-plum group-hover:to-plum-dark group-hover:text-white group-hover:border-plum group-hover:scale-110 shadow-xs group-hover:shadow-[0_10px_25px_rgba(94,38,137,0.25)] transition-all duration-500 flex items-center justify-center mb-5 mt-2">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="13" x2="8" y2="11" />
                  <line x1="11" y1="13" x2="11" y2="9" />
                  <line x1="14" y1="13" x2="14" y2="7" />
                </svg>
              </div>

              <h4 className="typo-h4 font-semibold text-text-primary group-hover:text-plum transition-colors leading-snug">
                {stepsList[1]?.title || "Evaluation & Approval"}
              </h4>

              <p className="typo-body-sm text-text-secondary mt-2.5">
                {stepsList[1]?.desc || "We evaluate the location feasibility, business potential and alignment with our brand standards."}
              </p>
            </div>

            {/* Step 3: Setup & Training */}
            <div
              style={{ "--stagger-idx": 3 } as React.CSSProperties}
              className="reveal luxury-card luxury-card-hover group p-7 sm:p-8 rounded-3xl bg-white border border-neutral-border flex flex-col items-center text-center relative shadow-[0_4px_20px_rgba(43,37,32,0.03)] hover:shadow-[0_15px_40px_rgba(94,38,137,0.09)] transition-all duration-500 cursor-default"
            >
              <span className="absolute top-5 left-5 rtl:left-auto rtl:right-5 px-3 py-1 rounded-full bg-plum/5 text-plum border border-plum/10 typo-badge group-hover:bg-plum group-hover:text-white transition-all duration-300">
                03
              </span>

              <div className="w-16 h-16 rounded-2xl bg-neutral-ivory border border-neutral-border/80 text-plum group-hover:bg-gradient-to-br group-hover:from-plum group-hover:to-plum-dark group-hover:text-white group-hover:border-plum group-hover:scale-110 shadow-xs group-hover:shadow-[0_10px_25px_rgba(94,38,137,0.25)] transition-all duration-500 flex items-center justify-center mb-5 mt-2">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>

              <h4 className="typo-h4 font-semibold text-text-primary group-hover:text-plum transition-colors leading-snug">
                {stepsList[2]?.title || "Setup & Training"}
              </h4>

              <p className="typo-body-sm text-text-secondary mt-2.5">
                {stepsList[2]?.desc || "We assist with outlet design, setup and staff training. You get access to our SOPs, systems and complete support."}
              </p>
            </div>

            {/* Step 4: Operations & Growth */}
            <div
              style={{ "--stagger-idx": 4 } as React.CSSProperties}
              className="reveal luxury-card luxury-card-hover group p-7 sm:p-8 rounded-3xl bg-white border border-neutral-border flex flex-col items-center text-center relative shadow-[0_4px_20px_rgba(43,37,32,0.03)] hover:shadow-[0_15px_40px_rgba(94,38,137,0.09)] transition-all duration-500 cursor-default"
            >
              <span className="absolute top-5 left-5 rtl:left-auto rtl:right-5 px-3 py-1 rounded-full bg-plum/5 text-plum border border-plum/10 typo-badge group-hover:bg-plum group-hover:text-white transition-all duration-300">
                04
              </span>

              <div className="w-16 h-16 rounded-2xl bg-neutral-ivory border border-neutral-border/80 text-plum group-hover:bg-gradient-to-br group-hover:from-plum group-hover:to-plum-dark group-hover:text-white group-hover:border-plum group-hover:scale-110 shadow-xs group-hover:shadow-[0_10px_25px_rgba(94,38,137,0.25)] transition-all duration-500 flex items-center justify-center mb-5 mt-2">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>

              <h4 className="typo-h4 font-semibold text-text-primary group-hover:text-plum transition-colors leading-snug">
                {stepsList[3]?.title || "Operations & Growth"}
              </h4>

              <p className="typo-body-sm text-text-secondary mt-2.5">
                {stepsList[3]?.desc || "Centralized operational support ensures consistent standards, smooth day-to-day performance, and continued growth of the outlet."}
              </p>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM BANNER: Editorial Signature Motto */}
        {/* ======================================================== */}
        <div className="reveal bg-white/90 border border-neutral-border rounded-2xl py-5 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-start shadow-xs transition-all hover:shadow-md">
          <div className="text-plum flex-shrink-0">
            {/* Hands Cupping Heart Icon */}
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9" />
              <path d="M2 13h4a2 2 0 0 1 2 2v1" />
              <path d="M22 13h-4a2 2 0 0 0-2 2v1" />
            </svg>
          </div>
          <p className="typo-body text-text-primary">
            <span>{t("about.franchise.bottomBanner.text1") || "With Wahad Shay, you're never on your own."}</span>{" "}
            <span className="font-bold text-plum">{t("about.franchise.bottomBanner.text2") || "We grow together, We win together."}</span>
          </p>
        </div>

      </div>

      {/* ======================================================== */}
      {/* FRANCHISE APPLICATION MODAL (Animated with AnimatePresence) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-plum-dark/60 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-3xl shadow-2xl border border-neutral-border w-full max-w-2xl p-6 sm:p-8 z-10 my-auto sm:my-8 shrink-0"
            >
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 rtl:right-auto rtl:left-5 w-9 h-9 rounded-full bg-neutral-ivory hover:bg-neutral-sand text-text-primary flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Modal Header */}
                  <div className="text-center sm:text-start mb-6 pe-8 rtl:pe-0 rtl:ps-8">
                    <span className="typo-eyebrow text-plum block mb-1">
                      {t("about.franchise.badge") || "PARTNER WITH WAHAD SHAY"}
                    </span>
                    <h3 className="typo-h3 text-text-primary">
                      {t("about.franchise.modal.title") || "Franchise Application"}
                    </h3>
                    <p className="typo-body-sm text-text-secondary mt-1.5 leading-relaxed">
                      {t("about.franchise.modal.subtitle") || "Partner with Wahad Shay and bring authentic luxury chai & café culture to your region."}
                    </p>
                  </div>

                  {/* Modal Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="text-start rtl:text-end">
                        <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5 text-start rtl:text-end">
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
                            className="w-full h-[46px] ps-10 pe-4 bg-neutral-ivory border border-neutral-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-plum focus:ring-2 focus:ring-plum/20 transition-all text-start rtl:text-end"
                          />
                        </div>
                      </div>

                      <div className="text-start rtl:text-end">
                        <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5 text-start rtl:text-end">
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
                            className="w-full h-[46px] ps-10 pe-4 bg-neutral-ivory border border-neutral-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-plum focus:ring-2 focus:ring-plum/20 transition-all text-start rtl:text-end"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="text-start rtl:text-end">
                        <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5 text-start rtl:text-end">
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
                            className="w-full h-[46px] ps-10 pe-4 bg-neutral-ivory border border-neutral-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-plum focus:ring-2 focus:ring-plum/20 transition-all text-start rtl:text-end"
                          />
                        </div>
                      </div>

                      <div className="text-start rtl:text-end">
                        <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5 text-start rtl:text-end">
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
                            className="w-full h-[46px] ps-10 pe-4 bg-neutral-ivory border border-neutral-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-plum focus:ring-2 focus:ring-plum/20 transition-all text-start rtl:text-end"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Prior Experience */}
                    <div className="text-start rtl:text-end">
                      <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5 text-start rtl:text-end">
                        {t("about.franchise.modal.experience") || "Prior F&B or Retail Experience"}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, experience: "yes" }))}
                          className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            formData.experience === "yes"
                              ? "bg-plum/10 border-plum text-plum shadow-xs font-bold"
                              : "bg-neutral-ivory border-neutral-border text-text-secondary hover:border-plum/40"
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
                              ? "bg-plum/10 border-plum text-plum shadow-xs font-bold"
                              : "bg-neutral-ivory border-neutral-border text-text-secondary hover:border-plum/40"
                          }`}
                        >
                          <User className="w-4 h-4" />
                          <span>{t("about.franchise.modal.experienceNo") || "No, this is my first venture"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Investment Timeline */}
                    <div className="text-start rtl:text-end">
                      <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5 text-start rtl:text-end">
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
                            className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                              formData.timeline === item.id
                                ? "bg-yellow/25 border-yellow text-plum-dark font-bold shadow-xs"
                                : "bg-neutral-ivory border-neutral-border text-text-secondary hover:border-plum/30"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="text-start rtl:text-end">
                      <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5 text-start rtl:text-end">
                        {t("about.franchise.modal.message") || "Additional Information / Proposed Site Notes"}
                      </label>
                      <div className="relative">
                        <MessageSquare className="w-4 h-4 text-[#A5A5A5] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3.5 pointer-events-none" />
                        <textarea
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={t("about.franchise.modal.messagePlaceholder") || "Tell us about your proposed site, business background, or questions..."}
                          className="w-full ps-10 pe-4 py-3 bg-neutral-ivory border border-neutral-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-plum focus:ring-2 focus:ring-plum/20 transition-all resize-none font-body text-start rtl:text-end"
                        />
                      </div>
                    </div>

                    {/* Form Submission Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-plum hover:bg-plum-dark text-white font-bold py-3 px-6 rounded-xl inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
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
                      </button>

                      <button
                        type="button"
                        onClick={sendWhatsAppInquiry}
                        className="bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold py-3 px-6 rounded-xl inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{language === "AR" ? "مراسلة عبر واتساب" : "Direct WhatsApp"}</span>
                      </button>
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
                  <div className="w-16 h-16 rounded-full bg-plum/10 text-plum flex items-center justify-center mx-auto mb-2 animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-plum" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-text-primary">
                    {t("about.franchise.modal.successTitle") || "Application Submitted Successfully!"}
                  </h3>
                  <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed font-body">
                    {t("about.franchise.modal.successDesc") || "Thank you for your interest in partnering with Wahad Shay. Our franchise expansion team will review your application and get in touch within 24-48 hours."}
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={sendWhatsAppInquiry}
                      className="bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold py-2.5 px-5 rounded-xl inline-flex items-center gap-2 text-sm shadow-md transition-all cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{language === "AR" ? "متابعة الطلب عبر واتساب" : "WhatsApp"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetModal}
                      className="bg-neutral-ivory hover:bg-neutral-sand text-text-primary font-bold py-2.5 px-5 rounded-xl text-sm transition-all cursor-pointer"
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
