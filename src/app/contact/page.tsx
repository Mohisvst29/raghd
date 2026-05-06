"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <>
      <TopNavBar />
      <main className="mt-24">
        {/* Hero Branding Section */}
        <section className="relative h-[320px] w-full overflow-hidden flex items-center justify-center">
          <img 
            alt="Jeddah Islamic Port" 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.3]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQhlw23V9Lknz72imeGnZAgWn8gjOxgAgAdkBHVO6zciRy_9ly7MZr4HqC8GbuwTpzHZuHnPTGjbY1wHWk2JPFKn5iB6GMtkRz2k4sQYkgG--qg3oDIQi_cCzo-rSEW08EfgI5B4_bWMWzG4zrIIiraq265mComx9YdBpOuj5RQrtWg9CvnTBFWnEANtu9s0oLxAOkijqRXSEsoynesFDdtOg4iJnetB7X3InIWBTCqf78b-owOcww4WhvdUIEIrt1p90jcQwiLYJA"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center px-gutter"
          >
            <h1 className="text-display-xl font-display-xl text-white mb-4">{t.contactPage.heroTitle}</h1>
            <p className="text-body-lg font-body-lg text-white/80 max-w-2xl mx-auto">{t.contactPage.heroDesc}</p>
          </motion.div>
        </section>

        {/* Contact Info Bento Grid */}
        <section className="max-w-container-max mx-auto px-gutter -mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              { icon: "phone_in_talk", title: t.contactPage.infoPhones, lines: ["0506468204", "0568094648"], ltr: true },
              { icon: "mail", title: t.contactPage.infoEmail, lines: ["ceo@raghadports.com"], ltr: false },
              { icon: "location_on", title: t.contactPage.infoLocation, lines: [t.home.contact.locationDesc], ltr: false }
            ].map((info, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-surface-container-lowest p-stack-md border border-outline-variant flex items-start gap-unit shadow-sm"
              >
                <span className="material-symbols-outlined text-primary text-headline-lg">{info.icon}</span>
                <div>
                  <h3 className="font-headline-md text-primary mb-2">{info.title}</h3>
                  {info.lines.map((line, i) => (
                    <p key={i} className={`font-body-md text-on-surface-variant ${info.ltr ? 'dir-ltr text-right' : ''}`}>{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Form and Map Section */}
        <section className="max-w-container-max mx-auto px-gutter py-stack-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
            {/* Contact Form (7 columns) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-surface-container-lowest p-margin border border-outline-variant"
            >
              <div className="mb-stack-md">
                <h2 className="text-headline-lg font-headline-lg text-primary mb-unit">{t.contactPage.formTitle}</h2>
                <div className="h-1 w-16 bg-tertiary"></div>
              </div>
              <form className="space-y-gutter">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="space-y-2">
                    <label className="font-label-sm text-on-surface-variant block">{t.home.contact.formName}</label>
                    <input className="w-full bg-surface border border-outline-variant p-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder={t.home.contact.formNamePlaceholder} type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm text-on-surface-variant block">{t.home.contact.formPhone}</label>
                    <input className="w-full bg-surface border border-outline-variant p-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder={t.home.contact.formPhonePlaceholder} type="tel" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm text-on-surface-variant block">{t.home.contact.formService}</label>
                  <select className="w-full bg-surface border border-outline-variant p-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all appearance-none">
                    {t.contactPage.formServiceOptions.map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm text-on-surface-variant block">{t.home.contact.formMessage}</label>
                  <textarea className="w-full bg-surface border border-outline-variant p-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" placeholder={t.home.contact.formMessagePlaceholder} rows={5}></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-white w-full md:w-auto px-12 py-4 font-label-sm hover:bg-primary-container transition-all shadow-sm" 
                  type="button"
                >
                  {t.home.contact.submit}
                </motion.button>
              </form>
            </motion.div>

            {/* Map (5 columns) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col gap-gutter"
            >
              <div className="h-full min-h-[400px] border border-outline-variant grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden relative">
                <img 
                  alt="Location Map" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi_NAjvj6iIgT2DRajm54hCsi8EuBlFZC6IdGiCjT6vKsJhPJmwRpTCS0-BlxKpV7kxVnrzhN7j1LAQh897guIK9yy-LJH9VHZwUU8JlMbfKT4vW-NasZIeJHbbc2l4jX7oQd4HROaKEF0XNZbb6NiJj3HYglkJV4jUV4UlbQrxXzJObyFtmIb2S5I0iIcCdD--qFT_cSTygtwxgTwqYbRwhtwzFl5e4bmKqfOMS9HidD9gnORTOHN05gLVOTfJHzbPEoOf0iJOUm-"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary text-white px-4 py-2 flex items-center gap-2 shadow-lg">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    <span className="font-label-sm">{t.contactPage.mapLabel}</span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-high p-gutter border-r-4 border-tertiary">
                <p className="text-body-md text-on-surface italic">
                  &quot;{t.contactPage.quote}&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
