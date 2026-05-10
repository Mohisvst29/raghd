"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutContent({ siteContent }: { siteContent: any }) {
  const { t, lang } = useLanguage();
  
  // When English: use translation files for text, CMS only for images
  const enContent = siteContent?.en || {};
  const about = lang === 'ar'
    ? (siteContent?.about ? { ...siteContent.about } : { ...t.home.about })
    : {
        ...t.home.about,
        title: enContent?.about?.title || t.home.about.heading,
        heading: enContent?.about?.title || t.home.about.heading,
        description: enContent?.about?.description || t.home.about.desc,
        desc: enContent?.about?.description || t.home.about.desc,
        visionTitle: t.home.about.visionTitle,
        visionDesc: t.home.about.visionDesc,
        missionTitle: t.home.about.missionTitle,
        missionDesc: t.home.about.missionDesc,
        // Keep images from CMS
        heroImage: siteContent?.about?.heroImage,
        image: siteContent?.about?.image,
      };

  return (
    <>
      <TopNavBar />
      <main>
        {/* Hero Section */}
        <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
          <img
            src={about.heroImage || siteContent?.about?.heroImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuCogNq19PXsuSh1TARASmOKuHGGlWYEPJi-ZlhXqP0SD3rkKdsL-eRm_ggr6yKri8pU4zSZ03ER-YyqK86ueXu6GS2qzAaLFq6MZd8tdWjGUGviA3UbmGUu_CGqtzaGl5WHRj8iTvsrhylAIuBOerilc9XPKCmvIbpTUjiG_d9_6UFRYowAPLN265xA-qqQiHx7z-Lg0vY-VatrMBUYHMEusn6jkUSUwKfvIbwEVgpUlsKgKKi7sQOjNSl-cmrwuPjZnOC6OUYDsHRg"}
            alt={t.common.aboutImageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/75 to-primary/40" />
          <div className="relative z-10 text-center text-white px-margin">
            <h1 className="text-3xl md:text-4xl font-bold">{about.title || about.heading}</h1>
          </div>
        </section>

        {/* Main About Section */}
        <section className="py-stack-lg bg-surface">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="grid md:grid-cols-2 gap-gutter items-center">
              {/* Image with badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  alt={t.common.aboutImageAlt}
                  className="w-full h-[420px] object-cover"
                  src={about.image || siteContent?.about?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCogNq19PXsuSh1TARASmOKuHGGlWYEPJi-ZlhXqP0SD3rkKdsL-eRm_ggr6yKri8pU4zSZ03ER-YyqK86ueXu6GS2qzAaLFq6MZd8tdWjGUGviA3UbmGUu_CGqtzaGl5WHRj8iTvsrhylAIuBOerilc9XPKCmvIbpTUjiG_d9_6UFRYowAPLN265xA-qqQiHx7z-Lg0vY-VatrMBUYHMEusn6jkUSUwKfvIbwEVgpUlsKgKKi7sQOjNSl-cmrwuPjZnOC6OUYDsHRg"}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6">
                  <p className="text-white font-bold text-2xl">+15</p>
                  <p className="text-secondary-fixed text-sm">{t.common.yearsOfExperience}</p>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-stack-sm"
              >
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span className="w-8 h-1 bg-primary inline-block"></span>
                  <span className="text-xs uppercase tracking-wider">{t.home.about.identity}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary leading-snug">
                  {t.home.about.heading}
                </h2>
                <p className="text-on-surface-variant leading-relaxed text-sm whitespace-pre-line">
                  {about.description || about.desc}
                </p>

                {/* Vision & Mission */}
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-5 bg-surface-container-low border border-outline-variant rounded-xl shadow-sm flex gap-4 items-start"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">visibility</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">{about.visionTitle}</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{about.visionDesc}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-5 bg-surface-container-low border border-outline-variant rounded-xl shadow-sm flex gap-4 items-start"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">flag</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">{about.missionTitle}</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{about.missionDesc}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Strategic Goals */}
        <section className="py-stack-lg bg-surface-container-low">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">{t.aboutPage.strategicGoals}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.aboutPage.goals.map((goal, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 text-center shadow-sm border border-outline-variant"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="material-symbols-outlined text-primary">{goal.icon}</span>
                  </div>
                  <h3 className="font-bold text-primary mb-1 text-sm">{goal.title}</h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed">{goal.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Bar */}
        <section className="bg-primary-container py-6">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
              {t.aboutPage.values.map((val, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="py-3 font-bold text-lg border-b-2 border-tertiary-fixed cursor-default"
                >
                  {val}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
