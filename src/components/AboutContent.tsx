"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutContent({ siteContent }: { siteContent: any }) {
  const { t } = useLanguage();
  const about = siteContent?.about || t.home.about;

  return (
    <>
      <TopNavBar />
      <main className="mt-20">
        <section className="py-stack-lg bg-surface min-h-[70vh]">
          <div className="max-w-[1280px] mx-auto px-margin">
            <div className="grid md:grid-cols-2 gap-gutter items-center">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
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
                  <div className="p-stack-sm bg-white border border-outline-variant rounded-xl shadow-sm">
                    <h3 className="font-headline-md text-primary mb-2">{about.visionTitle}</h3>
                    <p className="text-body-md text-on-secondary-container whitespace-pre-line">{about.visionDesc}</p>
                  </div>
                  <div className="p-stack-sm bg-white border border-outline-variant rounded-xl shadow-sm">
                    <h3 className="font-headline-md text-primary mb-2">{about.missionTitle}</h3>
                    <p className="text-body-md text-on-secondary-container whitespace-pre-line">{about.missionDesc}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
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
      </main>
      <Footer />
    </>
  );
}
