"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { t } = useLanguage();
  const { logoUrl, logoSize } = useTheme();
  const [socialMedia, setSocialMedia] = useState<any>({});

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data?.contact?.socialMedia) {
          setSocialMedia(data.contact.socialMedia);
        }
      })
      .catch(console.error);
  }, []);

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
                    {socialMedia?.twitter && (
                      <a href={socialMedia.twitter} target="_blank" className="text-secondary-fixed-dim hover:text-white transition-colors" aria-label="Twitter">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </a>
                    )}
                    {/* LinkedIn */}
                    {socialMedia?.linkedin && (
                      <a href={socialMedia.linkedin} target="_blank" className="text-secondary-fixed-dim hover:text-white transition-colors" aria-label="LinkedIn">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    )}
                    {/* Instagram */}
                    {socialMedia?.instagram && (
                      <a href={socialMedia.instagram} target="_blank" className="text-secondary-fixed-dim hover:text-white transition-colors" aria-label="Instagram">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </a>
                    )}
                    {/* Facebook */}
                    {socialMedia?.facebook && (
                      <a href={socialMedia.facebook} target="_blank" className="text-secondary-fixed-dim hover:text-white transition-colors" aria-label="Facebook">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                      </a>
                    )}
                    {/* Snapchat */}
                    {socialMedia?.snapchat && (
                      <a href={socialMedia.snapchat} target="_blank" className="text-secondary-fixed-dim hover:text-white transition-colors" aria-label="Snapchat">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.164 24c-.218 0-.422-.057-.611-.169-.479-.286-.967-.577-1.464-.875l-.011-.007c-1.892-1.144-3.905-2.359-5.918-2.584-.717-.08-1.554-.251-2.28-.684-1.127-.674-1.66-2.094-1.571-3.23.011-.141.04-.265.071-.358.115-.349.336-.714.654-1.077.587-.665 1.62-1.289 2.923-1.764.126-.046.16-.217.06-.301-1.309-1.074-2.189-2.203-2.613-3.351-.271-.735-.367-1.464-.287-2.165.253-2.235 2.502-4.148 5.645-4.801.357-.074.725-.13 1.1-.165C8.808 3.518 10.378 0 12 0c1.623 0 3.193 3.518 4.14 5.467.375.035.743.091 1.1.165 3.143.653 5.392 2.566 5.645 4.801.08.701-.016 1.43-.287 2.165-.424 1.148-1.304 2.277-2.613 3.351-.1.084-.066.255.06.301 1.303.475 2.336 1.099 2.923 1.764.318.363.539.728.654 1.077.031.093.06.217.071.358.089 1.136-.444 2.556-1.571 3.23-.726.433-1.563.604-2.28.684-2.013.225-4.026 1.44-5.918 2.584l-.011.007c-.497.298-.985.589-1.464.875-.189.112-.393.169-.611.169h-.001z"/></svg>
                      </a>
                    )}
                    {/* TikTok */}
                    {socialMedia?.tiktok && (
                      <a href={socialMedia.tiktok} target="_blank" className="text-secondary-fixed-dim hover:text-white transition-colors" aria-label="TikTok">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v8.12c-.05 2.87-1.63 5.58-4.23 6.74-2.73 1.25-6.13 1.01-8.62-.64-2.58-1.69-4.06-4.65-3.8-7.7.23-2.78 2.15-5.26 4.81-6.2 1.06-.37 2.2-.49 3.3-.41v4.11c-1.12.01-2.28.23-3.15.93-1.16.92-1.68 2.47-1.39 3.94.27 1.34 1.22 2.53 2.5 3.01 1.7.64 3.73.43 5.16-.76.99-.81 1.54-2.06 1.53-3.34V.02z"/></svg>
                      </a>
                    )}
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
