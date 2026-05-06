"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function AdminInquiries() {
  const { t } = useLanguage();
  
  const [inquiries] = useState([
    { id: 1, name: "مؤسسة الحلول اللوجستية", email: "info@logistics.sa", phone: "0501234567", service: "تخليص جمركي", date: "2024-10-25", status: "جديد", message: "نحتاج إلى تسعيرة لتخليص 5 حاويات قادمة من الصين الأسبوع القادم." },
    { id: 2, name: "سالم محمد", email: "salem@mail.com", phone: "0559876543", service: "استشارات", date: "2024-10-24", status: "قيد المراجعة", message: "استفسار بخصوص الوثائق المطلوبة لاستيراد معدات طبية." },
    { id: 3, name: "شركة النقل السريع", email: "ops@fasttrans.com", phone: "0541112233", service: "أخرى", date: "2024-10-23", status: "تم الرد", message: "هل تقدمون خدمات التخزين المبرد داخل الميناء؟" },
  ]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-headline-lg text-primary">{t.admin.sidebar.inquiries}</h1>
          <p className="text-on-surface-variant">مراجعة والرد على رسائل واستفسارات العملاء.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-label-sm hover:bg-surface-container-low transition-colors">
            تصدير (CSV)
          </button>
        </div>
      </div>
      
      <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input className="w-full bg-surface border border-outline-variant rounded-md pr-9 pl-3 py-1.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="البحث في الرسائل..." type="text"/>
          </div>
          <div className="flex gap-2">
            <select className="bg-surface border border-outline-variant rounded-md px-3 py-1.5 text-sm outline-none">
              <option>كل الحالات</option>
              <option>جديد</option>
              <option>قيد المراجعة</option>
              <option>تم الرد</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-surface-container-low text-outline text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">المرسل</th>
                <th className="px-6 py-4 font-semibold">التواصل</th>
                <th className="px-6 py-4 font-semibold">الخدمة المطلوبة</th>
                <th className="px-6 py-4 font-semibold">تاريخ الإرسال</th>
                <th className="px-6 py-4 font-semibold">الحالة</th>
                <th className="px-6 py-4 font-semibold text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-on-surface">{inquiry.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-on-surface-variant">{inquiry.email}</div>
                    <div className="text-xs text-outline" dir="ltr">{inquiry.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">{inquiry.service}</td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">{inquiry.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      inquiry.status === 'جديد' ? 'bg-error-container text-error' :
                      inquiry.status === 'قيد المراجعة' ? 'bg-secondary-container text-on-secondary-container' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-primary hover:text-tertiary transition-colors mx-1" title="عرض التفاصيل والرد">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                    <button className="text-error hover:text-error/80 transition-colors mx-1" title="حذف">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-outline-variant flex justify-between items-center text-sm text-on-surface-variant bg-surface-container-lowest">
          <span>يعرض 1 إلى 3 من أصل 3</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low disabled:opacity-50" disabled>السابق</button>
            <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low disabled:opacity-50" disabled>التالي</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
