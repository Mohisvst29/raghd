"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesContent({ siteContent }: { siteContent: any }) {
  const { t } = useLanguage();
  const services = siteContent?.services || t.home.services;

  return (
    <>
      <TopNavBar />
      <main className="mt-20">
        <section className="py-stack-lg bg-surface-container-low min-h-[70vh]">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="text-center mb-stack-lg">
              <h2 className="font-headline-lg text-headline-lg text-primary">{services.title}</h2>
              <p className="text-body-md text-on-surface-variant mt-2">{services.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {services.items && services.items.length > 0 ? (
                services.items.map((service: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white p-stack-md border border-outline-variant hover:border-primary transition-all duration-300 group shadow-sm rounded-lg"
                  >
                    <span className="material-symbols-outlined text-primary text-5xl mb-stack-sm block" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {service.icon}
                    </span>
                    <h3 className="font-headline-md text-primary mb-stack-sm">{service.title}</h3>
                    <ul className="text-body-md text-on-secondary-container space-y-2">
                      {service.features?.split(",").map((item: string, i: number) => (
                        <li key={i}>• {item.trim()}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))
              ) : (
                [
                  { icon: "account_balance", title: t.home.services.clearance, items: t.home.services.clearanceItems },
                  { icon: "analytics", title: t.home.services.consulting, items: t.home.services.consultingItems },
                  { icon: "distance", title: t.home.services.tracking, items: t.home.services.trackingItems },
                  { icon: "add_business", title: t.home.services.extra, items: t.home.services.extraItems }
                ].map((service, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white p-stack-md border border-outline-variant hover:border-primary transition-all duration-300 group shadow-sm rounded-lg"
                  >
                    <span className="material-symbols-outlined text-primary text-5xl mb-stack-sm block" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {service.icon}
                    </span>
                    <h3 className="font-headline-md text-primary mb-stack-sm">{service.title}</h3>
                    <ul className="text-body-md text-on-secondary-container space-y-2">
                      {service.items.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
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
