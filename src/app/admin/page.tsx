"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminDashboard() {
  const { t } = useLanguage();

  return (
    <>
      {/* Breadcrumbs / Title */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-headline-lg text-primary">{t.admin.dashboard.title}</h1>
        <p className="text-on-surface-variant">{t.admin.dashboard.subtitle}</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-secondary-container rounded-lg text-primary">
              <span className="material-symbols-outlined">anchor</span>
            </div>
            <span className="text-emerald-600 text-xs font-bold flex items-center">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> 5%
            </span>
          </div>
          <p className="text-outline text-sm font-medium">{t.admin.dashboard.totalServices}</p>
          <h3 className="text-display-xl text-primary mt-1">24</h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-secondary-container rounded-lg text-primary">
              <span className="material-symbols-outlined">article</span>
            </div>
            <span className="text-emerald-600 text-xs font-bold flex items-center">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
            </span>
          </div>
          <p className="text-outline text-sm font-medium">{t.admin.dashboard.blogPosts}</p>
          <h3 className="text-display-xl text-primary mt-1">156</h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm border-r-4 border-r-error">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-error-container rounded-lg text-error">
              <span className="material-symbols-outlined">mark_email_unread</span>
            </div>
            <span className="text-error text-xs font-bold flex items-center">{t.admin.dashboard.new}</span>
          </div>
          <p className="text-outline text-sm font-medium">{t.admin.dashboard.unread}</p>
          <h3 className="text-display-xl text-primary mt-1">12</h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-secondary-container rounded-lg text-primary">
              <span className="material-symbols-outlined">visibility</span>
            </div>
            <span className="text-emerald-600 text-xs font-bold flex items-center">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> 18%
            </span>
          </div>
          <p className="text-outline text-sm font-medium">{t.admin.dashboard.visits}</p>
          <h3 className="text-display-xl text-primary mt-1">4.5k</h3>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities (Table) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-2 bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <h2 className="text-headline-md text-primary">{t.admin.dashboard.recentInquiries}</h2>
            <button className="text-primary font-bold text-sm hover:underline">{t.admin.dashboard.viewAll}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-surface-container-low text-outline text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">{t.admin.dashboard.tableSender}</th>
                  <th className="px-6 py-4 font-semibold">{t.admin.dashboard.tableSubject}</th>
                  <th className="px-6 py-4 font-semibold">{t.admin.dashboard.tableDate}</th>
                  <th className="px-6 py-4 font-semibold">{t.admin.dashboard.tableStatus}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-on-surface">مؤسسة الحلول اللوجستية</div>
                    <div className="text-xs text-outline">info@logistics.sa</div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">طلب تسعيرة تخليص جمركي</td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">منذ ساعتين</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">قيد المراجعة</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-on-surface">سالم محمد الحربي</div>
                    <div className="text-xs text-outline">salem@mail.com</div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">استفسار عن الشحنات الدولية</td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">منذ 5 ساعات</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">قيد المراجعة</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-on-surface">شركة النقل السريع</div>
                    <div className="text-xs text-outline">ops@fasttrans.com</div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">تحديث بيانات السجل التجاري</td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">أمس، 04:30 م</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">تم الرد</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
          <h2 className="text-headline-md text-primary mb-6">{t.admin.dashboard.quickActions}</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-primary-container text-white hover:opacity-90 transition-opacity">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">add_circle</span>
                <span className="font-bold">{t.admin.dashboard.addPost}</span>
              </div>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-surface-container-high text-primary border border-outline-variant hover:bg-surface-variant transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">payments</span>
                <span className="font-bold">{t.admin.dashboard.updatePrices}</span>
              </div>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-surface-container-high text-primary border border-outline-variant hover:bg-surface-variant transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">edit_square</span>
                <span className="font-bold">{t.admin.dashboard.editHero}</span>
              </div>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            
            <div className="mt-8 p-4 bg-tertiary-fixed rounded-lg border border-tertiary-container">
              <div className="flex items-center gap-2 text-on-tertiary-container mb-2">
                <span className="material-symbols-outlined">tips_and_updates</span>
                <span className="font-bold text-sm">{t.admin.dashboard.tip}</span>
              </div>
              <p className="text-xs text-on-tertiary-container leading-relaxed">
                {t.admin.dashboard.tipDesc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
