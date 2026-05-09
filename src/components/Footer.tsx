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
                <p className="text-secondary-fixed-dim font-body-md text-body-md mb-6">{t.footer.desc}</p>
                <div className="flex gap-4">
                    {/* Twitter/X */}
                    <a href="#" target="_blank" className="text-secondary-fixed-dim hover:text-white transition-colors" aria-label="Twitter">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    {/* LinkedIn */}
                    <a href="#" target="_blank" className="text-secondary-fixed-dim hover:text-white transition-colors" aria-label="LinkedIn">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    {/* Instagram */}
                    <a href="#" target="_blank" className="text-secondary-fixed-dim hover:text-white transition-colors" aria-label="Instagram">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    {/* Facebook */}
                    <a href="#" target="_blank" className="text-secondary-fixed-dim hover:text-white transition-colors" aria-label="Facebook">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                </div>
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
