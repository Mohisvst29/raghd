"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function WhyUsContent({ siteContent }: { siteContent: any }) {
  const { t, lang } = useLanguage();
  const currentContent = lang === 'ar' ? siteContent : (siteContent?.en || siteContent);
  const p = t.whyUsPage;

  return (
    <>
      <TopNavBar />
      <main>
        {/* Hero Section */}
        <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden bg-primary-container">
          <img
            src={currentContent?.whyUs?.heroImage || "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=2070&auto=format&fit=crop"}
            alt="Why Us Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/80 to-primary/50" />
          <div className="relative z-10 text-center text-white px-margin">
            <p className="text-tertiary-fixed font-bold text-sm mb-2">{p.tagline}</p>
            <h1 className="text-3xl md:text-4xl font-bold">{p.heroTitle}</h1>
            <p className="mt-3 text-secondary-fixed opacity-90 max-w-2xl mx-auto text-sm md:text-base">{p.heroDesc}</p>
          </div>
        </section>

        {/* Section Header */}
        <section className="py-10 bg-surface text-center">
          <p className="text-tertiary font-bold text-xs tracking-widest uppercase mb-2">{p.tagline}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">{p.sectionTitle}</h2>
        </section>

        {/* Speed + Location Row */}
        <section className="bg-surface pb-10">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Location Card — dark */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-primary-container text-white rounded-2xl p-8 flex flex-col gap-4"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-fixed text-2xl">location_on</span>
                  <span className="text-xs font-bold text-secondary-fixed uppercase tracking-widest">01</span>
                </div>
                <h3 className="text-xl font-bold">{p.locTitle}</h3>
                <p className="text-secondary-fixed opacity-90 text-sm leading-relaxed">{p.locDesc}</p>
              </motion.div>

              {/* Speed Card — light */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-surface-container-low rounded-2xl p-8 flex flex-col gap-4 border border-outline-variant"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">speed</span>
                  </div>
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">02</span>
                </div>
                <h3 className="text-xl font-bold text-primary">{p.speedTitle}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{p.speedDesc}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience + Pricing Row */}
        <section className="bg-surface pb-10">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pricing Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-surface-container-low rounded-2xl p-8 flex flex-col gap-4 border border-outline-variant"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary text-xl">payments</span>
                  </div>
                  <span className="inline-block bg-tertiary-container text-on-tertiary-container text-xs font-bold px-3 py-1 rounded-full">{p.priceBadge}</span>
                </div>
                <h3 className="text-xl font-bold text-primary">{p.priceTitle}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{p.priceDesc}</p>
                <div className="mt-2 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-tertiary text-base">check_circle</span>
                    <span>{p.exp1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-tertiary text-base">check_circle</span>
                    <span>{p.exp2}</span>
                  </div>
                </div>
              </motion.div>

              {/* Experience Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-surface-container-low rounded-2xl p-8 flex flex-col gap-4 border border-outline-variant"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary">{p.expTitle}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{p.expDesc}</p>
                <div className="mt-2 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                    <span>{p.exp1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                    <span>{p.exp2}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Field Presence — image + stats */}
        <section className="bg-surface pb-10">
          <div className="max-w-[1280px] mx-auto px-margin">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-6 bg-surface-container-low rounded-2xl border border-outline-variant overflow-hidden"
            >
              <div className="p-8 flex flex-col justify-center gap-4">
                <p className="text-secondary text-sm">{p.fieldTitle}</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">{p.fieldDesc}</p>
                <div className="flex gap-10 mt-4">
                  <div>
                    <p className="text-3xl font-bold text-primary">15+</p>
                    <p className="text-xs text-secondary">{p.fieldStat2}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">24/7</p>
                    <p className="text-xs text-secondary">{p.fieldStat1}</p>
                  </div>
                </div>
              </div>
              <div className="relative h-56 md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
                  alt="Jeddah Port Operations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-primary-container text-white text-xs font-bold px-3 py-2 rounded-lg">
                  <span>{p.fieldImgTitle}</span><br />
                  <span className="text-tertiary-fixed">{p.fieldImgStat}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-container py-16">
          <div className="max-w-[1280px] mx-auto px-margin text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{p.ctaTitle}</h2>
            <p className="text-secondary-fixed opacity-90 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">{p.ctaDesc}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-tertiary-container text-on-tertiary-container px-8 py-3 rounded-lg font-bold hover:bg-tertiary transition-colors"
                >
                  {p.ctaBtn1}
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
                >
                  {p.ctaBtn2}
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
