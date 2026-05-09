"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactContent({ siteContent }: { siteContent: any }) {
  const { t, lang } = useLanguage();
  const baseP = t.contactPage;
  const contact = lang === 'ar' && siteContent?.contact 
    ? siteContent.contact 
    : { ...t.home.contact, heroImage: siteContent?.contact?.heroImage };
  
  const p = {
    ...baseP,
    formTitle: contact?.title || baseP.formTitle,
    heroDesc: contact?.description || baseP.heroDesc,
    formServiceOptions: contact?.serviceOptions ? contact.serviceOptions.split(",").map((s: string) => s.trim()) : baseP.formServiceOptions,
  };

  return (
    <>
      <TopNavBar />
      <main>
        {/* Hero Section - Dark */}
        <section className="relative h-64 md:h-72 flex items-center justify-center overflow-hidden">
          <img
            src={contact?.heroImage || "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=2070&auto=format&fit=crop"}
            alt="Contact Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90" />
          <div className="relative z-10 text-center text-white px-margin">
            <h1 className="text-3xl md:text-4xl font-bold">{p.heroTitle}</h1>
            <p className="mt-3 text-secondary-fixed opacity-90 max-w-xl mx-auto text-sm md:text-base">{p.heroDesc}</p>
          </div>
        </section>

        {/* Info Cards Row */}
        <section className="bg-surface border-b border-outline-variant">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-outline-variant">
              {/* Phones */}
              <div className="flex items-center gap-4 px-8 py-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">phone_in_talk</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">{p.infoPhones}</p>
                  <p className="text-primary font-bold mt-1" dir="ltr">0506468204</p>
                  <p className="text-primary font-bold" dir="ltr">0568094648</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 px-8 py-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">mail</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">{p.infoEmail}</p>
                  <p className="text-primary font-bold mt-1">ceo@raghadports.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 px-8 py-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">{p.infoLocation}</p>
                  <p className="text-primary font-bold mt-1">{lang === 'ar' ? "ميناء جدة الإسلامي، مبنى الخدمات اللوجستية" : "Jeddah Islamic Port, Logistics Building"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map + Form */}
        <section className="py-stack-lg bg-surface">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Map / Image side */}
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop"
                    alt="Jeddah Islamic Port"
                    className="w-full h-72 object-cover grayscale"
                  />
                  <div className="absolute bottom-4 right-4 bg-primary-container text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {p.mapLabel}
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant">
                  <p className="text-on-surface-variant text-sm leading-relaxed italic text-right">"{p.quote}"</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant">
                <h2 className="text-2xl font-bold text-primary mb-1">{p.formTitle}</h2>
                <div className="w-12 h-1 bg-tertiary-container rounded-full mb-6"></div>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-primary mb-1">{t.home.contact.formName}</label>
                      <input
                        type="text"
                        placeholder={t.home.contact.formNamePlaceholder}
                        className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary bg-surface"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary mb-1">{t.home.contact.formPhone}</label>
                      <input
                        type="tel"
                        placeholder={t.home.contact.formPhonePlaceholder}
                        className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary bg-surface"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary mb-1">{dbContact?.serviceLabel || t.home.contact.formService}</label>
                    <select className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary bg-surface text-right">
                      {p.formServiceOptions.map((opt: string, i: number) => (
                        <option key={i}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary mb-1">{t.home.contact.formMessage}</label>
                    <textarea
                      rows={4}
                      placeholder={lang === 'ar' ? "اكتب تفاصيل طلبك هنا..." : "Write your request details here..."}
                      className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary bg-surface resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full bg-primary text-white py-4 rounded-lg font-bold text-sm hover:bg-primary-container transition-colors shadow-md"
                  >
                    {dbContact?.submitBtn || (lang === 'ar' ? "إرسال الرسالة" : "Send Message")}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
