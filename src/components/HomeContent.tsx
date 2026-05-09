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
  const { t, lang } = useLanguage();

  const currentContent = lang === 'ar' ? siteContent : (siteContent?.en || siteContent);
  
  const heroSlides = currentContent?.hero?.slides?.length > 0 
    ? currentContent.hero.slides.map((slide: any, idx: number) => ({
        ...slide,
        title: slide.title || t.home.heroSlides[idx]?.title,
        description: slide.description || t.home.heroSlides[idx]?.desc,
        buttonText: slide.buttonText || t.home.heroSlides[idx]?.cta,
      }))
    : t.home.heroSlides;

  const about = currentContent?.about || t.home.about;
  const services = currentContent?.services || t.home.services;
  const whyUs = currentContent?.whyUs || t.home.whyUs;
  const contact = currentContent?.contact || t.home.contact;
  const accreditedEntities = siteContent?.accreditedEntities || null;

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

      {/* Premium Services Section */}
      <section className="py-20 bg-surface-container-low" id="services">
        <div className="max-w-[1280px] mx-auto px-margin">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{services.title}</h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">{services.subtitle}</p>
            <div className="w-20 h-1 bg-tertiary-container mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.items && services.items.length > 0 ? (
              services.items
                .filter((s: any) => s.status !== false)
                .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                .map((service: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden border border-outline-variant shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 group flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.main_image || service.image || "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?auto=format&fit=crop&q=80"} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-white/90 text-sm line-clamp-2">{service.short_description || service.features?.split(",")[0]}</p>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6 flex-1">
                      <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">الخدمات المشمولة</h4>
                      <div className="flex flex-wrap gap-2">
                        {(service.sub_services?.length > 0 ? service.sub_services : service.features?.split(","))?.map((item: string, i: number) => item.trim() && (
                          <span key={i} className="inline-flex items-center bg-surface-container text-on-surface-variant text-sm px-3 py-1.5 rounded-full border border-outline-variant">
                            <span className="material-symbols-outlined text-primary text-[14px] ml-1">check_circle</span>
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {service.logos && service.logos.length > 0 && (
                      <div className="mb-8 pt-6 border-t border-outline-variant">
                        <h4 className="text-xs font-bold text-on-surface-variant mb-4">الجهات المرتبطة</h4>
                        <div className="flex gap-4 flex-wrap items-center">
                          {service.logos.map((logo: string, lIdx: number) => (
                            <div key={lIdx} className="bg-surface-container-lowest p-2 rounded-xl border border-outline-variant hover:border-primary/30 hover:shadow-sm transition-all">
                              <img src={logo} alt="Partner Logo" className="h-10 w-auto object-contain mix-blend-multiply" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-auto">
                      <a href={service.button_link || "/contact"} className="flex items-center justify-center gap-2 w-full bg-surface-container text-primary font-bold py-4 rounded-xl border border-outline-variant hover:bg-primary hover:text-white transition-all duration-300 group/btn">
                        {service.button_text || "اطلب الخدمة الآن"}
                        <span className="material-symbols-outlined text-[20px] transform group-hover/btn:-translate-x-1 transition-transform">arrow_back</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-on-surface-variant py-20">لا توجد خدمات مضافة حالياً.</div>
            )}
          </div>
        </div>
      </section>

      {/* Accredited Entities Marquee */}
      {accreditedEntities && accreditedEntities.logos && accreditedEntities.logos.length > 0 && (
        <section className="py-12 bg-white border-y border-outline-variant overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-margin mb-8 text-center">
            <h3 className="text-xl font-bold text-on-surface-variant uppercase tracking-widest">{accreditedEntities.title || "الجهات المعتمدة"}</h3>
          </div>
          <div className="relative w-full flex overflow-x-hidden">
            <div className="flex gap-16 items-center px-8 animate-marquee whitespace-nowrap">
              {accreditedEntities.logos.map((logo: string, idx: number) => (
                <img key={idx} src={logo} alt="Accredited Logo" className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
              ))}
              {/* Duplicate for infinite effect */}
              {accreditedEntities.logos.map((logo: string, idx: number) => (
                <img key={`dup-${idx}`} src={logo} alt="Accredited Logo" className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
              ))}
            </div>
          </div>
        </section>
      )}

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
                      {(contact?.phones?.length > 0 ? contact.phones : ["0506468204", "0568094648"]).map((phone: string, i: number) => (
                        <p key={i} className="text-body-md font-bold text-primary" dir="ltr">{phone}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-primary">mail</span>
                    </div>
                    <div>
                      <p className="text-label-sm text-secondary">{t.home.contact.emailUs}</p>
                      {(contact?.emails?.length > 0 ? contact.emails : ["ceo@raghadports.com"]).map((email: string, i: number) => (
                        <p key={i} className="text-body-md font-bold text-primary">{email}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                    </div>
                    <div>
                      <p className="text-label-sm text-secondary">{t.home.contact.location}</p>
                      {(contact?.locations?.length > 0 ? contact.locations : [t.home.contact.locationDesc]).map((loc: string, i: number) => (
                        <p key={i} className="text-body-md font-bold text-primary">{loc}</p>
                      ))}
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
