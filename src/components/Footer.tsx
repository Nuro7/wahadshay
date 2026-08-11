import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Phone } from "lucide-react";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { useLanguage } from "../i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    window.history.pushState(null, '', hash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  return (
    <footer className="bg-plum-dark pt-16 md:pt-20 pb-[30px] select-none">
      <div className="premium-container">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[40%_30%_30%] gap-y-10 gap-x-8 lg:gap-x-12 pb-10 md:pb-12">

          {/* Logo & Brand Story */}
          <div className="flex flex-col items-start">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="inline-block mb-6 md:mb-7 -ml-4 md:-ml-5">
              <img
                src="/logo_wahad.png"
                alt="Wahad Shay Logo"
                className="h-10 sm:h-11 md:h-12 lg:h-14 w-auto object-contain object-left group-hover:scale-[1.02] transition-transform duration-300"
              />
            </a>
            <p className="text-[#D4CFC9] text-[14px] md:text-[15px] lg:text-[16px] leading-[1.7] max-w-[440px] font-body whitespace-pre-line text-left mb-6">
              {t('footer.brandStory')}
            </p>

          </div>

          {/* Explore Column */}
          <div className="flex flex-col font-body">
            <h4 className="font-display text-[13px] md:text-[14px] font-bold uppercase tracking-[0.08em] text-white mb-5 md:mb-6">
              {t('footer.explore')}
            </h4>
            <ul className="flex flex-col space-y-3.5">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-white/70 hover:text-yellow transition-colors duration-300 block">{t('footer.home')}</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-white/70 hover:text-yellow transition-colors duration-300 block">{t('footer.aboutUs')}</a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => handleLinkClick(e, '#menu')} className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-white/70 hover:text-yellow transition-colors duration-300 block">{t('footer.theMenu')}</a>
              </li>
              <li>
                <a href="#franchise" onClick={(e) => handleLinkClick(e, '#franchise')} className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-white/70 hover:text-yellow transition-colors duration-300 block">{t('footer.ourFranchise')}</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-white/70 hover:text-yellow transition-colors duration-300 block">{t('footer.contact')}</a>
              </li>
            </ul>
          </div>

          {/* Partnership Column */}
          <div className="flex flex-col font-body">
            <h4 className="font-display text-[13px] md:text-[14px] font-bold uppercase tracking-[0.08em] text-white mb-5 md:mb-6">
              {t('footer.partnership')}
            </h4>
            <ul className="flex flex-col space-y-3.5">
              <li>
                <a href="#franchise" onClick={(e) => handleLinkClick(e, '#franchise')} className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-white/70 hover:text-yellow transition-colors duration-300 block">{t('footer.franchiseProgram')}</a>
              </li>
              <li>
                <a href="#franchise" onClick={(e) => handleLinkClick(e, '#franchise')} className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-white/70 hover:text-yellow transition-colors duration-300 block">{t('footer.expansionMap')}</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="text-[14px] md:text-[15px] lg:text-[16px] font-normal text-white/70 hover:text-yellow transition-colors duration-300 block">{t('footer.networkInquiries')}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.14] w-full" />

        {/* Copyright Bar */}
        <div className="pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-5 w-full">
          {/* Copyright (Left) */}
          <div className="flex-1 flex justify-center md:justify-start w-full">
            <p className="text-white/50 text-[11px] md:text-[12px] tracking-[0.06em] font-numbers font-medium uppercase text-center md:text-left">
              {t('footer.copyright').replace('{year}', currentYear.toString())}
            </p>
          </div>

          {/* Developer Credit (Center) */}
          <div className="flex-1 flex justify-center w-full">
            <span className="text-[#AFA6C8] text-[12px] md:text-[13px] font-body text-center">
              Developed by{' '}
              <a href="https://nuro7.com/" target="_blank" rel="noreferrer" className="text-white hover:text-yellow transition-colors font-medium inline-block">
                Nuro 7
              </a>
            </span>
          </div>

          {/* Social Links (Right) */}
          <div className="flex-1 flex justify-center md:justify-end items-center gap-[20px] text-white/60 w-full mt-2 md:mt-0">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-yellow hover:-translate-y-0.5 transition-all duration-300 block">
              <FaInstagram size={19} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-yellow hover:-translate-y-0.5 transition-all duration-300 block">
              <FaXTwitter size={19} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow hover:-translate-y-0.5 transition-all duration-300 block">
              <FaFacebook size={19} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
export default Footer;
