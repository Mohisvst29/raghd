"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function ContactContent({ siteContent }: { siteContent: any }) {
  const { t, lang } = useLanguage();
  
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert(t.common.fillRequired);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert(t.common.sendSuccess);
        setFormData({ name: "", phone: "", service: "", message: "" });
      }
    } catch (err) {
      alert(t.common.sendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseP = t.contactPage;
  const currentContent = lang === 'ar' ? siteContent : (siteContent?.en || siteContent);
  const contact = currentContent?.contact ? { ...currentContent.contact, heroImage: siteContent?.contact?.heroImage } : { ...t.home.contact, heroImage: siteContent?.contact?.heroImage };
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
            alt={p.heroTitle}
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
                  {((contact?.phones && Array.isArray(contact.phones) && contact.phones.filter(Boolean).length > 0) ? contact.phones.filter(Boolean) : ["0506468204", "0568094648"]).map((phone: string, i: number) => (
                    <p key={i} className="text-primary font-bold mt-1" dir="ltr">{phone}</p>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 px-8 py-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">mail</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">{p.infoEmail}</p>
                  {((contact?.emails && Array.isArray(contact.emails) && contact.emails.filter(Boolean).length > 0) ? contact.emails.filter(Boolean) : ["ceo@raghadports.com"]).map((email: string, i: number) => (
                    <p key={i} className="text-primary font-bold mt-1">{email}</p>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 px-8 py-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">{p.infoLocation}</p>
                  {((contact?.locations && Array.isArray(contact.locations) && contact.locations.filter(Boolean).length > 0) ? contact.locations.filter(Boolean) : [t.contactPage.infoLocationDefault]).map((loc: string, i: number) => (
                    <p key={i} className="text-primary font-bold mt-1">{loc}</p>
                  ))}
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
                    alt={p.mapLabel}
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-primary mb-1">{t.home.contact.formName}</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.home.contact.formNamePlaceholder}
                        className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary bg-surface"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary mb-1">{t.home.contact.formPhone}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.home.contact.formPhonePlaceholder}
                        className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary bg-surface"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary mb-1">{contact?.serviceLabel || t.home.contact.formService}</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary bg-surface text-right"
                    >
                      <option value="">{t.home.contact.formService}</option>
                      {p.formServiceOptions.map((opt: string, i: number) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-primary mb-1">{t.home.contact.formMessage}</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.common.writeRequestDetails}
                      className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary bg-surface resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? t.common.submitting : (contact?.submitBtn || t.common.sendMessage)}
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
