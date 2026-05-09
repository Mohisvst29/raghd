"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

export default function AdminInquiries() {
  const { t } = useLanguage();
  
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (Array.isArray(data)) {
        setInquiries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الاستفسار؟")) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq._id !== id));
      }
    } catch (err) {
      alert("حدث خطأ أثناء الحذف");
    }
  };

  if (isLoading) return <div className="p-20 text-center">جاري التحميل...</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-headline-lg text-primary">{t.admin.sidebar.inquiries}</h1>
          <p className="text-on-surface-variant">مراجعة والرد على رسائل واستفسارات العملاء.</p>
        </div>
      </div>
      
      <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden">
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
              {inquiries.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-on-surface-variant">لا توجد رسائل حالياً</td></tr>
              )}
              {inquiries.map((inquiry) => (
                <tr key={inquiry._id} className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-on-surface">{inquiry.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-on-surface-variant">{inquiry.phone}</div>
                    <div className="text-xs text-outline">{inquiry.email}</div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">{inquiry.service}</td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">{new Date(inquiry.createdAt).toLocaleDateString("ar-SA")}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container`}>
                      {inquiry.status || "جديد"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => alert(inquiry.message)} className="text-primary hover:text-tertiary transition-colors mx-1" title="عرض الرسالة">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                    <button onClick={() => handleDelete(inquiry._id)} className="text-error hover:text-error/80 transition-colors mx-1" title="حذف">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
