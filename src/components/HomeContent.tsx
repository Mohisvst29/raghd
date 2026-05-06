"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface HomeContentProps {
  siteContent: any;
}

export default function HomeContent({ siteContent }: HomeContentProps) {
  const { t } = useLanguage();

  // Helper to fallback to translations if DB content is missing
  const heroSlides = siteContent?.hero?.slides?.length > 0 
    ? siteContent.hero.slides 
    : t.home.heroSlides;

  const about = siteContent?.about || t.home.about;
  const services = siteContent?.services || t.home.services;
  const whyUs = siteContent?.whyUs || t.home.whyUs;
  const contact = siteContent?.contact || t.home.contact;

  return (
    <>
      <TopNavBar />
      
      {/* Hero Section */}
      <HeroSlider slides={heroSlides} />

      {/* About Us Section */}
      <section className="py-stack-lg bg-surface" id="about">
        <div className="max-w-[1280px] mx-auto px-margin">
          <div className="grid md:grid-cols-2 gap-gutter items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-stack-sm"
            >
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="w-8 h-1 bg-primary"></span>
                <span className="text-label-sm uppercase tracking-wider">من نحن</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary">{about.title || about.heading}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
                {about.description || about.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-gutter mt-stack-md">
                <motion.div whileHover={{ y: -5 }} className="p-stack-sm bg-white border border-outline-variant rounded-xl shadow-sm">
                  <h3 className="font-headline-md text-primary mb-2">{about.visionTitle}</h3>
                  <p className="text-body-md text-on-secondary-container whitespace-pre-line">{about.visionDesc}</p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="p-stack-sm bg-white border border-outline-variant rounded-xl shadow-sm">
                  <h3 className="font-headline-md text-primary mb-2">{about.missionTitle}</h3>
                  <p className="text-body-md text-on-secondary-container whitespace-pre-line">{about.missionDesc}</p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img 
                alt="About Raghad Ports" 
                className="rounded-2xl shadow-2xl w-full h-[450px] object-cover" 
                src={about.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCogNq19PXsuSh1TARASmOKuHGGlWYEPJi-ZlhXqP0SD3rkKdsL-eRm_ggr6yKri8pU4zSZ03ER-YyqK86ueXu6GS2qzAaLFq6MZd8tdWjGUGviA3UbmGUu_CGqtzaGl5WHRj8iTvsrhylAIuBOerilc9XPKCmvIbpTUjiG_d9_6UFRYowAPLN265xA-qqQiHx7z-Lg0vY-VatrMBUYHMEusn6jkUSUwKfvIbwEVgpUlsKgKKi7sQOjNSl-cmrwuPjZnOC6OUYDsHRg"}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-stack-lg bg-surface-container-low" id="services">
        <div className="max-w-[1280px] mx-auto px-margin">
          <div className="text-center mb-stack-lg">
            <h2 className="font-headline-lg text-headline-lg text-primary">{services.title}</h2>
            <p className="text-body-md text-on-surface-variant mt-2">{services.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* If DB items exist, map them. Else fallback to translations */}
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

      {/* Why Choose Us */}
      <section className="py-stack-lg bg-primary-container text-white" id="why-us">
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

      {/* Contact Section */}
      <section className="py-stack-lg" id="contact">
        <div className="max-w-[1280px] mx-auto px-margin">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-outline-variant grid md:grid-cols-2">
            
            <div className="p-stack-lg bg-surface-container relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="font-headline-lg text-primary mb-stack-sm">{contact.title}</h2>
                <p className="text-body-md text-on-surface-variant mb-stack-md whitespace-pre-line">{contact.description || contact.desc}</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-primary">call</span>
                    </div>
                    <div>
                      <p className="text-label-sm text-secondary">{t.home.contact.callUs}</p>
                      <p className="text-body-md font-bold text-primary" dir="ltr">0506468204 | 0568094648</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-primary">mail</span>
                    </div>
                    <div>
                      <p className="text-label-sm text-secondary">{t.home.contact.emailUs}</p>
                      <p className="text-body-md font-bold text-primary">ceo@raghadports.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                    </div>
                    <div>
                      <p className="text-label-sm text-secondary">{t.home.contact.location}</p>
                      <p className="text-body-md font-bold text-primary">{t.home.contact.locationDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-stack-lg bg-white">
              <form className="space-y-4">
                <div>
                  <label className="block text-label-sm text-primary mb-1">{t.home.contact.formName}</label>
                  <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary p-3 bg-surface" placeholder={t.home.contact.formNamePlaceholder} type="text" />
                </div>
                <div>
                  <label className="block text-label-sm text-primary mb-1">{t.home.contact.formPhone}</label>
                  <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary p-3 bg-surface" placeholder={t.home.contact.formPhonePlaceholder} type="tel" />
                </div>
                <div>
                  <label className="block text-label-sm text-primary mb-1">{contact.serviceLabel || t.home.contact.formService}</label>
                  <select className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary p-3 bg-surface">
                    {contact.serviceOptions ? (
                      contact.serviceOptions.split(",").map((opt: string, i: number) => (
                        <option key={i}>{opt.trim()}</option>
                      ))
                    ) : (
                      t.home.contact.formServiceOptions.map((opt, i) => (
                        <option key={i}>{opt}</option>
                      ))
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-label-sm text-primary mb-1">{t.home.contact.formMessage}</label>
                  <textarea className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary p-3 bg-surface" placeholder={t.home.contact.formMessagePlaceholder} rows={4}></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-primary-container transition-all shadow-md"
                >
                  {contact.submitBtn || contact.submit}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
