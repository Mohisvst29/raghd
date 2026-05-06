"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function AdminBlog() {
  const { t } = useLanguage();

  const [posts] = useState([
    { id: 1, title: "التحول الرقمي في الموانئ السعودية: رؤية 2030 وأثرها على التخليص الجمركي", category: "أخبار الموانئ", date: "2024-10-25", views: 1240, status: "منشور" },
    { id: 2, title: "كيف تتجنب غرامات التأخير (Demurrage) في ميناء جدة الإسلامي؟", category: "تخليص جمركي", date: "2024-10-20", views: 890, status: "منشور" },
    { id: 3, title: "دليلك الشامل لرموز النظام المنسق (HS Codes) للواردات الغذائية", category: "استشارات", date: "2024-10-18", views: 56, status: "مسودة" },
  ]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-headline-lg text-primary">{t.admin.sidebar.blog}</h1>
          <p className="text-on-surface-variant">إدارة مقالات المدونة، إضافة وتعديل وحذف المقالات.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          أضف مقال جديد
        </button>
      </div>
      
      <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input className="w-full bg-surface border border-outline-variant rounded-md pr-9 pl-3 py-1.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="البحث في المقالات..." type="text"/>
          </div>
          <div className="flex gap-2">
            <select className="bg-surface border border-outline-variant rounded-md px-3 py-1.5 text-sm outline-none">
              <option>كل التصنيفات</option>
              <option>أخبار الموانئ</option>
              <option>تخليص جمركي</option>
              <option>استشارات</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-surface-container-low text-outline text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">عنوان المقال</th>
                <th className="px-6 py-4 font-semibold">التصنيف</th>
                <th className="px-6 py-4 font-semibold">تاريخ النشر</th>
                <th className="px-6 py-4 font-semibold">المشاهدات</th>
                <th className="px-6 py-4 font-semibold">الحالة</th>
                <th className="px-6 py-4 font-semibold text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-on-surface max-w-sm truncate" title={post.title}>{post.title}</div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">{post.category}</td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">{post.date}</td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">{post.views.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      post.status === 'منشور' ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <button className="text-primary hover:text-primary/80 transition-colors mx-1" title="تعديل">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button className="text-tertiary hover:text-tertiary/80 transition-colors mx-1" title="عرض بالموقع">
                      <span className="material-symbols-outlined text-[20px]">open_in_new</span>
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
