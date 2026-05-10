"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";

export default function TopNavBar() {
  const { t, toggleLanguage, lang } = useLanguage();
  const { logoUrl, logoSize } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 w-full z-50 bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline h-20"
    >
      <div className="max-w-[1280px] mx-auto px-margin flex justify-between items-center h-full">
        <div className="flex items-center gap-4">
          <Link href="/">
            <img 
              alt={t.common.logoAlt} 
              className="w-auto object-contain transition-all" 
              style={{ height: `${logoSize}px`, maxHeight: '80px' }}
              src={logoUrl}
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-stack-md h-full">
          <Link href="/" className="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1 hover:text-primary-container transition-colors duration-200">{t.nav.home}</Link>
          <Link href="/about" className="text-secondary dark:text-secondary-fixed-dim font-body-md text-body-md hover:text-primary-container transition-colors duration-200">{t.nav.about}</Link>
          <Link href="/services" className="text-secondary dark:text-secondary-fixed-dim font-body-md text-body-md hover:text-primary-container transition-colors duration-200">{t.nav.services}</Link>
          <Link href="/why-us" className="text-secondary dark:text-secondary-fixed-dim font-body-md text-body-md hover:text-primary-container transition-colors duration-200">{t.nav.whyUs}</Link>
          <Link href="/blog" className="text-secondary dark:text-secondary-fixed-dim font-body-md text-body-md hover:text-primary-container transition-colors duration-200">{t.nav.blog}</Link>
          <Link href="/contact" className="text-secondary dark:text-secondary-fixed-dim font-body-md text-body-md hover:text-primary-container transition-colors duration-200">{t.nav.contact}</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <button onClick={toggleLanguage} className="flex items-center gap-2 text-primary dark:text-primary-fixed font-label-sm text-label-sm active:scale-95 transition-transform duration-150 hover:opacity-80">
            <span className="material-symbols-outlined">language</span>
            <span>{t.nav.lang}</span>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex items-center text-primary dark:text-primary-fixed hover:opacity-80 transition-opacity"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-4xl">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-surface border-b border-outline-variant overflow-hidden"
          >
            <div className="flex flex-col px-margin py-4 space-y-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-bold hover:text-primary-container transition-colors duration-200">{t.nav.home}</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-body-md hover:text-primary-container transition-colors duration-200">{t.nav.about}</Link>
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-body-md hover:text-primary-container transition-colors duration-200">{t.nav.services}</Link>
              <Link href="/why-us" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-body-md hover:text-primary-container transition-colors duration-200">{t.nav.whyUs}</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-body-md hover:text-primary-container transition-colors duration-200">{t.nav.blog}</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-body-md hover:text-primary-container transition-colors duration-200">{t.nav.contact}</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
