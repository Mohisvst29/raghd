"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function AdminServices() {
  const { t } = useLanguage();

  const [services] = useState([
    { id: 1, title: "التخليص الجمركي للصادر", category: "التخليص الجمركي", status: "نشط", price: "يبدأ من 500 ريال" },
    { id: 2, title: "التخليص الجمركي للوارد", category: "التخليص الجمركي", status: "نشط", price: "يبدأ من 500 ريال" },
    { id: 3, title: "استشارات تحديد الـ HS Code", category: "الاستشارات", status: "نشط", price: "حسب الطلب" },
    { id: 4, title: "التخزين المبرد", category: "خدمات إضافية", status: "غير نشط", price: "غير متوفر حالياً" },
  ]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-headline-lg text-primary">{t.admin.sidebar.services}</h1>
          <p className="text-on-surface-variant">إدارة الخدمات اللوجستية والتخليص الجمركي الخاصة بالمؤسسة.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          إضافة خدمة
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div key={service.id} whileHover={{ y: -4 }} className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${service.status === 'نشط' ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container-high text-on-surface-variant'}`}>
                {service.status}
              </span>
              <div className="flex gap-2">
                <button className="text-outline hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button className="text-outline hover:text-error transition-colors">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
            <h3 className="text-title-lg text-primary font-bold mb-1">{service.title}</h3>
            <p className="text-on-surface-variant text-sm mb-4">{service.category}</p>
            
            <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
              <span className="text-outline text-sm">التكلفة المتوقعة:</span>
              <span className="font-bold text-on-surface">{service.price}</span>
            </div>
          </motion.div>
        ))}

        <motion.button whileHover={{ scale: 1.02 }} className="bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-xl p-6 shadow-sm flex flex-col items-center justify-center h-full min-h-[200px] text-outline hover:text-primary hover:border-primary transition-colors">
          <span className="material-symbols-outlined text-4xl mb-2">add_circle</span>
          <span className="font-bold">إضافة خدمة جديدة</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
