"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect, useRef } from "react";

export default function TopNavBar() {
  const { t, toggleLanguage, lang } = useLanguage();
  const { logoUrl, logoSize } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [dbServices, setDbServices] = useState<{ title: string; icon: string }[]>([]);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Fetch services from DB for the dropdown
  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(data => {
        if (data?.services?.items?.length > 0) {
          setDbServices(data.services.items.map((s: any) => ({ title: s.title, icon: s.icon })));
        }
      })
      .catch(() => {});
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Use DB services or fallback to translation items
  const servicesList = dbServices.length > 0
    ? dbServices
    : [
        { icon: "account_balance", title: t.home.services.clearance },
        { icon: "analytics", title: t.home.services.consulting },
        { icon: "distance", title: t.home.services.tracking },
        { icon: "add_business", title: t.home.services.extra },
      ];

  const navLinkClass = "text-secondary dark:text-secondary-fixed-dim font-body-md text-body-md hover:text-primary-container transition-colors duration-200";
  const activeNavClass = "text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1 hover:text-primary-container transition-colors duration-200";

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
          <Link href="/" className={activeNavClass}>{t.nav.home}</Link>
          <Link href="/about" className={navLinkClass}>{t.nav.about}</Link>
          
          {/* Services Dropdown */}
          <div ref={servicesRef} className="relative h-full flex items-center">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              onMouseEnter={() => setIsServicesOpen(true)}
              className={`${navLinkClass} flex items-center gap-1`}
            >
              {t.nav.services}
              <motion.span
                animate={{ rotate: isServicesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="material-symbols-outlined text-[16px]"
              >
                expand_more
              </motion.span>
            </button>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className={`absolute top-full ${lang === 'ar' ? 'right-0' : 'left-0'} mt-0 bg-white border border-outline-variant rounded-xl shadow-xl min-w-[240px] overflow-hidden z-50`}
                >
                  {/* Header */}
                  <div className="px-4 py-3 bg-surface-container-low border-b border-outline-variant">
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider">{t.nav.services}</p>
                  </div>
                  {/* Service Items */}
                  <div className="py-2">
                    {servicesList.map((service, idx) => (
                      <Link
                        key={idx}
                        href="/services"
                        onClick={() => setIsServicesOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <span className="material-symbols-outlined text-primary text-base">{service.icon}</span>
                        </div>
                        <span className="text-sm text-on-surface group-hover:text-primary font-medium transition-colors">{service.title}</span>
                        <span className="material-symbols-outlined text-outline text-sm mr-auto group-hover:text-primary transition-colors">
                          {lang === 'ar' ? 'chevron_left' : 'chevron_right'}
                        </span>
                      </Link>
                    ))}
                  </div>
                  {/* Footer link */}
                  <div className="border-t border-outline-variant px-4 py-3">
                    <Link 
                      href="/services" 
                      onClick={() => setIsServicesOpen(false)}
                      className="text-xs text-primary font-bold flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                      {lang === 'ar' ? 'عرض جميع الخدمات' : 'View all services'}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/why-us" className={navLinkClass}>{t.nav.whyUs}</Link>
          <Link href="/blog" className={navLinkClass}>{t.nav.blog}</Link>
          <Link href="/contact" className={navLinkClass}>{t.nav.contact}</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <button onClick={toggleLanguage} className="flex items-center gap-2 text-primary dark:text-primary-fixed font-label-sm text-label-sm active:scale-95 transition-transform duration-150 hover:opacity-80">
            <span className="material-symbols-outlined">language</span>
            <span>{lang === 'en' ? 'English' : 'العربية'}</span>
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
              
              {/* Mobile Services with sub-items */}
              <div className="space-y-2">
                <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-body-md hover:text-primary-container transition-colors duration-200 flex items-center gap-1">
                  {t.nav.services}
                </Link>
                <div className="pr-4 space-y-2 border-r-2 border-primary/20">
                  {servicesList.map((s, i) => (
                    <Link 
                      key={i} 
                      href="/services"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-primary text-sm">{s.icon}</span>
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>

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
