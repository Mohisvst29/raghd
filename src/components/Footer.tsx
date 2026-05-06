"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { t } = useLanguage();
  const { logoUrl, logoSize } = useTheme();

  return (
    <footer className="w-full bg-primary-container dark:bg-on-background">
        <div className="max-w-[1280px] mx-auto px-margin py-stack-lg flex flex-col md:flex-row justify-between items-start gap-gutter">
            <div className="space-y-4 max-w-sm">
                <Link href="/">
                    <img 
                        alt="Raghadports Logo" 
                        className="w-auto object-contain mb-4 transition-all" 
                        style={{ height: `${Math.max(40, logoSize - 16)}px`, maxHeight: '80px' }}
                        src={logoUrl}
                    />
                </Link>
                <p className="text-secondary-fixed-dim font-body-md text-body-md">{t.footer.desc}</p>
            </div>
            
            <div className="flex flex-wrap gap-stack-lg">
                <div className="flex flex-col gap-2">
                    <h5 className="text-on-primary font-bold mb-2">{t.footer.quickLinks}</h5>
                    <Link href="/" className="text-secondary-fixed-dim font-body-md text-body-md hover:text-tertiary transition-colors duration-200">{t.nav.home}</Link>
                    <Link href="/about" className="text-secondary-fixed-dim font-body-md text-body-md hover:text-tertiary transition-colors duration-200">{t.nav.about}</Link>
                    <Link href="/services" className="text-secondary-fixed-dim font-body-md text-body-md hover:text-tertiary transition-colors duration-200">{t.nav.services}</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-on-primary font-bold mb-2">{t.footer.legal}</h5>
                    <Link href="#" className="text-secondary-fixed-dim font-body-md text-body-md hover:text-tertiary transition-colors duration-200">{t.footer.terms}</Link>
                    <Link href="#" className="text-secondary-fixed-dim font-body-md text-body-md hover:text-tertiary transition-colors duration-200">{t.footer.privacy}</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-on-primary font-bold mb-2">{t.footer.externalLinks}</h5>
                    <a href="#" className="text-secondary-fixed-dim font-body-md text-body-md hover:text-tertiary transition-colors duration-200">{t.footer.jeddahPort}</a>
                    <Link href="/contact" className="text-secondary-fixed-dim font-body-md text-body-md hover:text-tertiary transition-colors duration-200">{t.footer.contactUs}</Link>
                </div>
            </div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-margin border-t border-white/10 py-8 text-center md:text-right">
            <p className="text-secondary-fixed-dim font-body-md text-body-md opacity-75">
                {t.footer.copyright}
            </p>
        </div>
    </footer>
  );
}
