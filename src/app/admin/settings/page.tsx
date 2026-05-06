"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminSettings() {
  const { t } = useLanguage();
  const { colors, logoUrl, logoSize, updateColor, updateLogo, updateLogoSize, resetColors } = useTheme();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-headline-lg text-primary">{t.admin.sidebar.settings}</h1>
        <p className="text-on-surface-variant">إعدادات النظام وإدارة حسابات المستخدمين ومعلومات الاتصال بالموقع.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-title-lg text-primary font-bold mb-4 border-b border-outline-variant pb-2">المعلومات العامة للموقع</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">اسم المؤسسة (عربي)</label>
                <input type="text" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" defaultValue="مؤسسة موانئ رغد للتخليص الجمركي" />
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">اسم المؤسسة (إنجليزي)</label>
                <input type="text" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" defaultValue="Raghad Ports Customs Clearance" dir="ltr" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-on-surface mb-1">وصف الموقع (SEO)</label>
                <textarea className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface min-h-[80px]" defaultValue="خبراء التخليص الجمركي في ميناء جدة الإسلامي. نسخر خبراتنا لتيسير تجارتكم وضمان وصول بضائعكم بكفاءة تامة."></textarea>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors">حفظ التغييرات</button>
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-title-lg text-primary font-bold mb-4 border-b border-outline-variant pb-2">معلومات التواصل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">رقم الهاتف الرئيسي</label>
                <input type="text" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" defaultValue="+966506468204" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">البريد الإلكتروني</label>
                <input type="email" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" defaultValue="info@raghadports.sa" dir="ltr" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-on-surface mb-1">رابط الواتساب</label>
                <input type="text" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" defaultValue="https://wa.me/966506468204" dir="ltr" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors">حفظ التغييرات</button>
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-title-lg text-primary font-bold mb-4 border-b border-outline-variant pb-2">إعدادات الشعار (Logo)</h2>
            <p className="text-sm text-on-surface-variant mb-4">قم بتغيير شعار الموقع والتحكم في حجمه. سينعكس التغيير في القائمة العلوية والفوتر مباشرة.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="md:col-span-2">
                <ImageUploader 
                  label="تغيير الشعار (ارفع صورة أو ضع رابط)"
                  currentUrl={logoUrl} 
                  onUpload={updateLogo} 
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex justify-between text-sm font-bold text-on-surface mb-2">
                  <span>حجم الشعار (في القائمة العلوية)</span>
                  <span className="text-primary">{logoSize}px</span>
                </label>
                <input 
                  type="range" 
                  min="32" 
                  max="100" 
                  value={logoSize} 
                  onChange={(e) => updateLogoSize(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-outline mt-1">
                  <span>صغير جداً (32px)</span>
                  <span>كبير جداً (100px)</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center p-4 bg-surface-container-lowest border border-outline-variant border-dashed rounded-lg">
              <img 
                src={logoUrl} 
                alt="Logo Preview" 
                style={{ height: `${logoSize}px`, maxHeight: '100px' }} 
                className="object-contain transition-all"
              />
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-title-lg text-primary font-bold mb-4 border-b border-outline-variant pb-2">المظهر والألوان (Theme)</h2>
            <p className="text-sm text-on-surface-variant mb-4">قم بتغيير الألوان الأساسية للموقع وسينعكس ذلك فوراً على جميع الصفحات (الهيدر، الفوتر، العناوين، الأزرار، إلخ).</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">اللون الأساسي (Primary)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={colors.primary} 
                    onChange={(e) => updateColor("primary", e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer border-none p-0"
                  />
                  <input type="text" value={colors.primary} onChange={(e) => updateColor("primary", e.target.value)} className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 flex-1 focus:ring-1 focus:ring-primary outline-none" dir="ltr" />
                </div>
                <p className="text-xs text-outline mt-1">يُستخدم في العناوين، القوائم، والأزرار الرئيسية.</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">اللون الثانوي (Secondary)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={colors.secondary} 
                    onChange={(e) => updateColor("secondary", e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer border-none p-0"
                  />
                  <input type="text" value={colors.secondary} onChange={(e) => updateColor("secondary", e.target.value)} className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 flex-1 focus:ring-1 focus:ring-primary outline-none" dir="ltr" />
                </div>
                <p className="text-xs text-outline mt-1">يُستخدم في النصوص الفرعية والروابط الثانوية.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">لون السطح (Surface)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={colors.surface} 
                    onChange={(e) => updateColor("surface", e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer border-none p-0"
                  />
                  <input type="text" value={colors.surface} onChange={(e) => updateColor("surface", e.target.value)} className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 flex-1 focus:ring-1 focus:ring-primary outline-none" dir="ltr" />
                </div>
                <p className="text-xs text-outline mt-1">لون خلفية الأقسام المظللة (كالهيدر والفوتر).</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">لون الخلفية (Background)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={colors.background} 
                    onChange={(e) => updateColor("background", e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer border-none p-0"
                  />
                  <input type="text" value={colors.background} onChange={(e) => updateColor("background", e.target.value)} className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 flex-1 focus:ring-1 focus:ring-primary outline-none" dir="ltr" />
                </div>
                <p className="text-xs text-outline mt-1">لون خلفية الموقع الأساسية.</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button onClick={resetColors} className="bg-surface-container-low text-error px-6 py-2 rounded-lg font-bold hover:bg-error/10 border border-error/20 transition-colors">استعادة الألوان الافتراضية</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-title-lg text-primary font-bold mb-4 border-b border-outline-variant pb-2">حساب المدير</h2>
            <div className="flex flex-col items-center mb-6">
              <div className="size-20 rounded-full bg-cover bg-center border-4 border-surface-container-high shadow-sm mb-3" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/ADBb0ugQAN_RV5Z0Qj6QbnjgXQTOhDqInmfzS9gX6lYPwDXRnzmsITfO50plYVFKPzUjz_KfMkEyX2fU4I43_qarhh0ytjBbdrVCY-b9KJXWIXmGsnFiZaltGXaCke52D58wu77A2KO4HCuCOvfpSo2xRXDUWU5U_v2h_b_rE0GRLu0NKhE85jWe3GSrztPXtTMGoXx3_DbepWo04cwX3OlCOUTXK39zzGjVFKx5xpkrKvrB3A1s1PCbwWt-zp18JbX2U5mKWT7sp0Ut_sE')" }}></div>
              <h3 className="font-bold text-on-surface text-lg">أحمد العامري</h3>
              <p className="text-sm text-outline">مدير النظام</p>
            </div>
            <div className="space-y-3">
              <button className="w-full text-center bg-surface-container-low border border-outline-variant text-on-surface py-2 rounded-lg font-bold hover:bg-surface-container-high transition-colors">
                تغيير كلمة المرور
              </button>
              <button className="w-full text-center bg-error/10 text-error border border-error/20 py-2 rounded-lg font-bold hover:bg-error hover:text-white transition-colors">
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
