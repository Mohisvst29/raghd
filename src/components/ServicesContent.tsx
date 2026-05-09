"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function ServicesContent({ siteContent }: { siteContent: any }) {
  const { t } = useLanguage();
  const p = t.servicesPage;

  return (
    <>
      <TopNavBar />
      <main>
        {/* Hero Section */}
        <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
          <img
            src={siteContent?.services?.heroImage || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"}
            alt="Services Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/80 to-primary/50" />
          <div className="relative z-10 text-center text-white px-margin">
            <h1 className="text-3xl md:text-4xl font-bold">{p.heroTitle}</h1>
            <p className="mt-3 text-secondary-fixed opacity-90 max-w-2xl mx-auto text-sm md:text-base">{p.heroDesc}</p>
          </div>
        </section>

        {/* Premium Services Section */}
        <section className="py-20 bg-surface-container-low" id="services">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{siteContent?.services?.title || p.heroTitle}</h2>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">{siteContent?.services?.subtitle || p.heroDesc}</p>
              <div className="w-20 h-1 bg-tertiary-container mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {siteContent?.services?.items && siteContent.services.items.length > 0 ? (
                siteContent.services.items
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
        {siteContent?.accreditedEntities && siteContent.accreditedEntities.logos && siteContent.accreditedEntities.logos.length > 0 && (
          <section className="py-12 bg-white border-y border-outline-variant overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-margin mb-8 text-center">
              <h3 className="text-xl font-bold text-on-surface-variant uppercase tracking-widest">{siteContent.accreditedEntities.title || "الجهات المعتمدة"}</h3>
            </div>
            <div className="relative w-full flex overflow-x-hidden">
              <div className="flex gap-16 items-center px-8 animate-marquee whitespace-nowrap">
                {siteContent.accreditedEntities.logos.map((logo: string, idx: number) => (
                  <img key={idx} src={logo} alt="Accredited Logo" className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
                ))}
                {/* Duplicate for infinite effect */}
                {siteContent.accreditedEntities.logos.map((logo: string, idx: number) => (
                  <img key={`dup-${idx}`} src={logo} alt="Accredited Logo" className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-surface-container-low py-14 border-t border-outline-variant">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-primary">{p.ctaTitle}</h2>
                <p className="text-on-surface-variant text-sm mt-2">{p.ctaDesc}</p>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-colors text-sm"
                  >
                    {p.ctaBtn1}
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary/5 transition-colors text-sm"
                >
                  {p.ctaBtn2}
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
