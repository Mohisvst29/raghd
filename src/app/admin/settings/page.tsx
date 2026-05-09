"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminSettings() {
  const { t } = useLanguage();
  const { colors, logoUrl, logoSize, updateColor, updateLogo, updateLogoSize, resetColors } = useTheme();

  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load settings:", err);
        setIsLoading(false);
      });
  }, []);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...settings,
        logoUrl,
        logoSize,
        colors
      };
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      alert("تم حفظ الإعدادات العامة بنجاح!");
    } catch (err) {
      alert("حدث خطأ أثناء حفظ الإعدادات!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSettingsChange = (field: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  if (isLoading || !settings) {
    return <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div></div>;
  }

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
                <input type="text" value={settings.siteNameAr} onChange={(e) => handleSettingsChange("siteNameAr", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" />
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">اسم المؤسسة (إنجليزي)</label>
                <input type="text" value={settings.siteNameEn} onChange={(e) => handleSettingsChange("siteNameEn", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" dir="ltr" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-on-surface mb-1">وصف الموقع (SEO)</label>
                <textarea value={settings.seoDescription} onChange={(e) => handleSettingsChange("seoDescription", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface min-h-[80px]"></textarea>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={handleSaveSettings} disabled={isSaving} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50">حفظ الإعدادات</button>
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-title-lg text-primary font-bold mb-4 border-b border-outline-variant pb-2">معلومات التواصل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-on-surface mb-1">أرقام الهاتف (يمكنك إضافة أكثر من رقم مفصول بفاصلة)</label>
                <input type="text" value={settings.phoneNumbers} onChange={(e) => handleSettingsChange("phoneNumbers", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" dir="ltr" placeholder="0506468204, 0568094648" />
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">البريد الإلكتروني</label>
                <input type="email" value={settings.email} onChange={(e) => handleSettingsChange("email", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">رقم الواتساب الرئيسي (مع رمز الدولة)</label>
                <input type="text" value={settings.whatsapp} onChange={(e) => handleSettingsChange("whatsapp", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" dir="ltr" placeholder="966506468204" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={handleSaveSettings} disabled={isSaving} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50">حفظ الإعدادات</button>
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
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">اسم المستخدم</label>
                <input 
                  type="text" 
                  value={settings.adminUsername || "admin"} 
                  onChange={(e) => handleSettingsChange("adminUsername", e.target.value)} 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" 
                  dir="ltr" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">كلمة المرور</label>
                <input 
                  type="text" 
                  value={settings.adminPassword || "admin21@#"} 
                  onChange={(e) => handleSettingsChange("adminPassword", e.target.value)} 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none text-on-surface" 
                  dir="ltr" 
                />
              </div>
              
              <div className="pt-2">
                <button onClick={handleSaveSettings} disabled={isSaving} className="w-full text-center bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50">
                  حفظ بيانات الدخول
                </button>
              </div>

              <div className="pt-4 border-t border-outline-variant mt-4">
                <button onClick={() => window.location.href = '/admin/login'} className="w-full text-center bg-error/10 text-error border border-error/20 py-2 rounded-lg font-bold hover:bg-error hover:text-white transition-colors">
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
