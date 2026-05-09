"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutContent({ siteContent }: { siteContent: any }) {
  const { t, lang } = useLanguage();
  const currentContent = lang === 'ar' ? siteContent : (siteContent?.en || siteContent);
  const about = currentContent?.about ? { ...currentContent.about, heroImage: siteContent?.about?.heroImage } : { ...t.home.about, heroImage: siteContent?.about?.heroImage };

  return (
    <>
      <TopNavBar />
      <main>
        {/* Hero Section */}
        <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
          <img
            src={about.heroImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuCogNq19PXsuSh1TARASmOKuHGGlWYEPJi-ZlhXqP0SD3rkKdsL-eRm_ggr6yKri8pU4zSZ03ER-YyqK86ueXu6GS2qzAaLFq6MZd8tdWjGUGviA3UbmGUu_CGqtzaGl5WHRj8iTvsrhylAIuBOerilc9XPKCmvIbpTUjiG_d9_6UFRYowAPLN265xA-qqQiHx7z-Lg0vY-VatrMBUYHMEusn6jkUSUwKfvIbwEVgpUlsKgKKi7sQOjNSl-cmrwuPjZnOC6OUYDsHRg"}
            alt="About Hero"
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
                  alt="About Raghad Ports"
                  className="w-full h-[420px] object-cover"
                  src={about.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCogNq19PXsuSh1TARASmOKuHGGlWYEPJi-ZlhXqP0SD3rkKdsL-eRm_ggr6yKri8pU4zSZ03ER-YyqK86ueXu6GS2qzAaLFq6MZd8tdWjGUGviA3UbmGUu_CGqtzaGl5WHRj8iTvsrhylAIuBOerilc9XPKCmvIbpTUjiG_d9_6UFRYowAPLN265xA-qqQiHx7z-Lg0vY-VatrMBUYHMEusn6jkUSUwKfvIbwEVgpUlsKgKKi7sQOjNSl-cmrwuPjZnOC6OUYDsHRg"}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6">
                  <p className="text-white font-bold text-2xl">+15</p>
                  <p className="text-secondary-fixed text-sm">{lang === 'ar' ? "عاماً من الخبرة" : "Years of Experience"}</p>
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
                  <span className="text-xs uppercase tracking-wider">{lang === 'ar' ? "تعريف الهوية" : "Identity"}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary leading-snug">
                  {lang === 'ar' ? "خبرة عريقة في قلب ميناء جدة الإسلامي" : "Deep Expertise in the Heart of Jeddah Islamic Port"}
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
              <h2 className="text-2xl md:text-3xl font-bold text-primary">{lang === 'ar' ? "الأهداف الاستراتيجية" : "Strategic Goals"}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "trending_up", title: "النمو المستدام", desc: "تعزيز حضورنا التجاري في المملكة وخارجها." },
                { icon: "diversity_3", title: "تمكين الكفاءات", desc: "الاستثمار في الكوادر البشرية وتطوير قدراتهم." },
                { icon: "precision_manufacturing", title: "التحول الرقمي", desc: "تبني التقنيات الرقمية لرفع كفاءة العمليات." },
                { icon: "verified", title: "جودة تعالمية", desc: "الحصول على شهادات الاعتراف الدولي." }
              ].map((goal, idx) => {
                const title = lang === 'ar' ? goal.title :
                  idx === 0 ? "Sustainable Growth" :
                  idx === 1 ? "Empowering Talent" :
                  idx === 2 ? "Digital Transformation" :
                  "Global Quality";
                const desc = lang === 'ar' ? goal.desc :
                  idx === 0 ? "Enhancing our commercial presence in the Kingdom and abroad." :
                  idx === 1 ? "Investing in human resources and developing their capabilities." :
                  idx === 2 ? "Adopting digital technologies to raise operational efficiency." :
                  "Obtaining international recognition certificates.";
                return (
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
                  <h3 className="font-bold text-primary mb-1 text-sm">{title}</h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed">{desc}</p>
                </motion.div>
              );
            })}
            </div>
          </div>
        </section>

        {/* Values Bar */}
        <section className="bg-primary-container py-6">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
              {(lang === 'ar' ? ["للنزاهة", "للاحترافية", "للابتكار", "للالتزام"] : ["Integrity", "Professionalism", "Innovation", "Commitment"]).map((val, i) => (
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
