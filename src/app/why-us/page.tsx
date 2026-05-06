"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhyUs() {
  const { t } = useLanguage();

  return (
    <>
      <TopNavBar />
      <main className="pt-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center bg-primary-container overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSSnOT5yjkxD-za1L3_wWe2TJ41hDczARiY_pAa91rXfeh5nBlXY9nfyvLuLWo58wJwkXXmQHCudiPztOvtA4iZSnJwMbJ6H5B3I3C08oCZ4Uv-Lo3hien478DirRZUBSCmH3Jrc0Mol2yS-cCMcPg-KNIMI4nOs9YT2msZnP-We2ljjPb_xuyRqV3Zz7j3o6mmTM27mwvgoh-w5l5o9iU9vMyWVsPvBFjm8eiBM0O0dlGFb9E-4p59oWpSzsBvWhg2j5P40AO_Rlh"
              alt="Hero bg"
            />
          </div>
          <div className="relative z-10 max-w-container-max mx-auto px-gutter w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="font-display-xl text-display-xl text-white mb-4">{t.whyUsPage.heroTitle}</h1>
              <p className="font-body-lg text-body-lg text-primary-fixed leading-relaxed">
                {t.whyUsPage.heroDesc}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Competitive Advantages Bento Grid */}
        <section className="py-stack-lg max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16">
            <span className="text-tertiary font-label-sm tracking-widest uppercase">{t.whyUsPage.tagline}</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mt-2">{t.whyUsPage.sectionTitle}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Speed Advantage */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 bg-surface-container-lowest border border-outline-variant p-8 rounded-lg flex flex-col justify-between group hover:border-primary transition-colors duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="material-symbols-outlined text-4xl text-tertiary mb-4">speed</span>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">{t.whyUsPage.speedTitle}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                    {t.whyUsPage.speedDesc}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="text-display-xl font-bold text-primary-container opacity-20 group-hover:opacity-100 transition-opacity">01</div>
                </div>
              </div>
              <div className="mt-8 bg-surface-container-low h-2 w-full rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="bg-primary h-full"
                ></motion.div>
              </div>
            </motion.div>

            {/* Strategic Location */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-4 bg-primary-container text-white p-8 rounded-lg relative overflow-hidden group"
            >
              <div className="relative z-10">
                <span className="material-symbols-outlined text-4xl text-tertiary-fixed mb-4">location_on</span>
                <h3 className="font-headline-md text-headline-md mb-2">{t.whyUsPage.locTitle}</h3>
                <p className="font-body-md text-body-md opacity-80">
                  {t.whyUsPage.locDesc}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-[180px]">anchor</span>
              </div>
            </motion.div>

            {/* Regulatory Expertise */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-5 bg-surface-container-lowest border border-outline-variant p-8 rounded-lg group hover:shadow-lg transition-all duration-300"
            >
              <span className="material-symbols-outlined text-4xl text-tertiary mb-4">gavel</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">{t.whyUsPage.expTitle}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t.whyUsPage.expDesc}
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-on-surface-variant font-body-md">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {t.whyUsPage.exp1}
                </li>
                <li className="flex items-center gap-2 text-on-surface-variant font-body-md">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  {t.whyUsPage.exp2}
                </li>
              </ul>
            </motion.div>

            {/* Competitive Pricing */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 bg-surface-container-high p-8 rounded-lg flex flex-col md:flex-row items-center gap-8 border border-outline-variant"
            >
              <div className="flex-1">
                <span className="material-symbols-outlined text-4xl text-tertiary mb-4">payments</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">{t.whyUsPage.priceTitle}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {t.whyUsPage.priceDesc}
                </p>
              </div>
              <div className="w-full md:w-48 h-48 bg-white rounded-full border-8 border-primary-fixed flex flex-center items-center justify-center text-center p-4">
                <span className="font-headline-lg text-primary">{t.whyUsPage.priceBadge}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Port Visual Component */}
        <section className="py-stack-lg bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-2xl relative group"
            >
              <img 
                className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3dt9zsiZkOLla_39JB5isMmyU2AgLzHZC41xSx0goxFAQbJo_LaDBq2wGFM7DYAd9HdraI1yhrxrp3Nn4vl1o_z6rbhh7TCxi_cO3fJ__H50XoBInJZL0E9i3UBkKQWkIzMagvuhInwqhUxUcYtTzddrbTM5WmpxMhqGwLS8YyHUELQhBd8G7OtlyzNgV8V8ztzs_XQ9tGgcX8JaqA98fpnUXqBhRDaFMLgvEhxpX79AIDTWSraVIGCvu1NZAjZxESUInjh_wXzhX"
                alt="Port operation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-6 right-6 text-white">
                <p className="font-label-sm">{t.whyUsPage.fieldImgTitle}</p>
                <h4 className="font-headline-md">{t.whyUsPage.fieldImgStat}</h4>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-headline-lg text-primary mb-6">{t.whyUsPage.fieldTitle}</h2>
              <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
                {t.whyUsPage.fieldDesc}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-white rounded border border-outline-variant hover:shadow-md transition-shadow">
                  <span className="text-display-xl font-bold text-primary block">24/7</span>
                  <span className="text-label-sm text-on-surface-variant">{t.whyUsPage.fieldStat1}</span>
                </div>
                <div className="p-4 bg-white rounded border border-outline-variant hover:shadow-md transition-shadow">
                  <span className="text-display-xl font-bold text-primary block">+15</span>
                  <span className="text-label-sm text-on-surface-variant">{t.whyUsPage.fieldStat2}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-stack-lg max-w-container-max mx-auto px-gutter text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-container rounded-xl p-stack-md text-white flex flex-col items-center gap-6"
          >
            <h2 className="font-headline-lg text-headline-lg">{t.whyUsPage.ctaTitle}</h2>
            <p className="font-body-md opacity-80 max-w-xl">
              {t.whyUsPage.ctaDesc}
            </p>
            <div className="flex gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-tertiary-container text-on-tertiary-container px-8 py-3 rounded-full font-label-sm font-bold hover:brightness-110 transition-all">{t.whyUsPage.ctaBtn1}</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="border border-white text-white px-8 py-3 rounded-full font-label-sm hover:bg-white hover:text-primary transition-all">{t.whyUsPage.ctaBtn2}</motion.button>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
