"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhyUsContent({ siteContent }: { siteContent: any }) {
  const { t } = useLanguage();
  const whyUs = siteContent?.whyUs || t.home.whyUs;

  return (
    <>
      <TopNavBar />
      <main className="mt-20">
        <section className="py-stack-lg bg-primary-container text-white min-h-[70vh]">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="text-center mb-stack-lg">
              <h2 className="font-headline-lg text-headline-lg text-secondary-fixed">{whyUs.title}</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
              {whyUs.features && whyUs.features.length > 0 ? (
                whyUs.features.map((feature: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="text-center space-y-stack-sm"
                  >
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 hover:bg-white/20 transition-colors">
                      <span className="material-symbols-outlined text-tertiary-fixed text-4xl">{feature.icon}</span>
                    </div>
                    <h4 className="font-headline-md">{feature.title}</h4>
                    <p className="text-body-md text-secondary-fixed opacity-80 whitespace-pre-line">{feature.description}</p>
                  </motion.div>
                ))
              ) : (
                [
                  { icon: "speed", title: t.home.whyUs.speed, desc: t.home.whyUs.speedDesc },
                  { icon: "workspace_premium", title: t.home.whyUs.exp, desc: t.home.whyUs.expDesc },
                  { icon: "payments", title: t.home.whyUs.price, desc: t.home.whyUs.priceDesc },
                  { icon: "location_on", title: t.home.whyUs.location, desc: t.home.whyUs.locationDesc }
                ].map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="text-center space-y-stack-sm"
                  >
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 hover:bg-white/20 transition-colors">
                      <span className="material-symbols-outlined text-tertiary-fixed text-4xl">{feature.icon}</span>
                    </div>
                    <h4 className="font-headline-md">{feature.title}</h4>
                    <p className="text-body-md text-secondary-fixed opacity-80">{feature.desc}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
