"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  return (
    <>
      <TopNavBar />
      
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden bg-primary-container">
        <div className="absolute inset-0 opacity-20">
          <img alt="Services Hero" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ4iFx1rXRUWu4_AM9PZZsOskeYM4vThkEOdS60KTeO1QXs3SIXJ_mP7SgbgMwzwi0axAjjUNjhsmfS_jq3AokALCOgL8A-3R6JePOTqTJp87zyz7WlPopyjZsc6Sb0bWf72ulpVATNciW00X2OhCOCFMYAdCYsNEOXJHS-AsX0V3ScxStneqfNvVh2nl5MNF57V4h9K4_JUIVlUPse2dVEKdjAsFKjm89vy7p5voALrGZJIeQH4W3s9cILXZea6gOOazChDsf-wGK" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-container-max mx-auto px-gutter text-center"
        >
          <h1 className="font-display-xl text-display-xl text-white mb-6">{t.servicesPage.heroTitle}</h1>
          <p className="font-body-lg text-body-lg text-white/80 max-w-2xl mx-auto">
            {t.servicesPage.heroDesc}
          </p>
        </motion.div>
      </header>

      {/* Main Content: Services Bento Grid */}
      <main className="max-w-container-max mx-auto px-gutter py-stack-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          {/* Service 1: Customs Clearance (Dominant Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-surface-container-lowest border border-outline-variant p-margin group hover:border-primary transition-all"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <span className="material-symbols-outlined text-4xl text-primary mb-4">terminal</span>
                <h2 className="font-headline-md text-headline-md text-primary mb-4">{t.servicesPage.clearanceTitle}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  {t.servicesPage.clearanceDesc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-surface-container-low p-4 border-r-4 border-primary">
                    <span className="font-label-sm text-label-sm text-primary block mb-1">{t.servicesPage.clearanceImport}</span>
                    <p className="text-xs text-on-surface-variant">{t.servicesPage.clearanceImportDesc}</p>
                  </div>
                  <div className="bg-surface-container-low p-4 border-r-4 border-primary">
                    <span className="font-label-sm text-label-sm text-primary block mb-1">{t.servicesPage.clearanceExport}</span>
                    <p className="text-xs text-on-surface-variant">{t.servicesPage.clearanceExportDesc}</p>
                  </div>
                  <div className="bg-surface-container-low p-4 border-r-4 border-primary">
                    <span className="font-label-sm text-label-sm text-primary block mb-1">{t.servicesPage.clearanceTransit}</span>
                    <p className="text-xs text-on-surface-variant">{t.servicesPage.clearanceTransitDesc}</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-64 h-64 overflow-hidden rounded-lg">
                <img alt="Customs" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCopCE2n9Y-1TPEP96xzla4rWb1VLwREfJ_kwKOpkU9Vfk7nW9GB9Chn8z70UDUAm5Tudu--5VjFVzVbNjmjKoBsLuYcemJT9MkE3f9ALXiSXlBnmq4Kg-8ievIsCKr7DqOSU8Cgs9lxBT3f3dlBQEAIludrQmVose4dcDpKyRcc_NzPfyeD4dwwf940Y4lK8mBXK-G1nzS0Kx81DORS8VsDPf7t9zfhxbdgVVsiuy11hJ_YZiMpKhKIeAerI0ykhf304fQzBeJqpF2" />
              </div>
            </div>
          </motion.div>

          {/* Service 2: Consulting (Vertical Card) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-primary text-on-primary p-margin flex flex-col justify-between"
          >
            <div>
              <span className="material-symbols-outlined text-4xl text-tertiary-fixed mb-4">analytics</span>
              <h2 className="font-headline-md text-headline-md mb-4">{t.servicesPage.consultTitle}</h2>
              <p className="font-body-md text-body-md text-on-primary/80 mb-8">
                {t.servicesPage.consultDesc}
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-label-sm">{t.servicesPage.consult1}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-label-sm">{t.servicesPage.consult2}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-label-sm">{t.servicesPage.consult3}</span>
                </li>
              </ul>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 border border-tertiary-fixed text-tertiary-fixed py-3 px-6 hover:bg-tertiary-fixed hover:text-primary transition-all"
            >
              {t.servicesPage.consultBtn}
            </motion.button>
          </motion.div>

          {/* Service 3: Tracking (Landscape Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 bg-surface-container-highest p-margin flex flex-col"
          >
            <span className="material-symbols-outlined text-4xl text-primary mb-4">location_on</span>
            <h2 className="font-headline-md text-headline-md text-primary mb-2">{t.servicesPage.trackTitle}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              {t.servicesPage.trackDesc}
            </p>
            <div className="mt-auto">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-xs font-bold text-primary">{t.servicesPage.trackStatus}</span>
                <div className="flex-1 h-1 bg-outline-variant relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "66%" }}
                    transition={{ duration: 1 }}
                    className="absolute left-0 top-0 h-full bg-primary"
                  ></motion.div>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant">{t.servicesPage.trackNote}</p>
            </div>
          </motion.div>

          {/* Service 4: Additional Services (Square Card) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 bg-surface-container-lowest border border-outline-variant p-margin"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
              <div className="flex flex-col justify-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-4">add_box</span>
                <h2 className="font-headline-md text-headline-md text-primary mb-2">{t.servicesPage.extraTitle}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {t.servicesPage.extraDesc}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 p-4 bg-background border border-outline-variant">
                  <span className="material-symbols-outlined text-primary">description</span>
                  <div>
                    <h3 className="font-label-sm text-primary">{t.servicesPage.extra1Title}</h3>
                    <p className="text-xs text-on-surface-variant">{t.servicesPage.extra1Desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-background border border-outline-variant">
                  <span className="material-symbols-outlined text-primary">warehouse</span>
                  <div>
                    <h3 className="font-label-sm text-primary">{t.servicesPage.extra2Title}</h3>
                    <p className="text-xs text-on-surface-variant">{t.servicesPage.extra2Desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-background border border-outline-variant">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                  <div>
                    <h3 className="font-label-sm text-primary">{t.servicesPage.extra3Title}</h3>
                    <p className="text-xs text-on-surface-variant">{t.servicesPage.extra3Desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Call to Action Section */}
      <section className="bg-surface-container-high py-stack-lg border-t border-outline-variant">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-right">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">{t.servicesPage.ctaTitle}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{t.servicesPage.ctaDesc}</p>
          </div>
          <div className="flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-4 font-label-sm text-label-sm hover:opacity-90 transition-all"
            >
              {t.servicesPage.ctaBtn1}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border border-outline text-primary px-8 py-4 font-label-sm text-label-sm hover:bg-surface-container-low transition-all"
            >
              {t.servicesPage.ctaBtn2}
            </motion.button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
