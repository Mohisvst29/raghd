"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactContent({ siteContent }: { siteContent: any }) {
  const { t } = useLanguage();
  const contact = siteContent?.contact || t.home.contact;

  return (
    <>
      <TopNavBar />
      <main className="mt-20">
        <section className="py-stack-lg min-h-[70vh]">
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
      </main>
      <Footer />
    </>
  );
}
