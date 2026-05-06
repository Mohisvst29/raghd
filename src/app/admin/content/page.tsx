"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<any>(null);

  // Fetch initial content
  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load content:", err);
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("تم حفظ التغييرات بنجاح!");
    } catch (err) {
      alert("حدث خطأ أثناء الحفظ!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNestedChange = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (isLoading || !content) {
    return <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div></div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-headline-lg text-primary">تعديل محتوى الموقع</h1>
          <p className="text-on-surface-variant">التحكم في النصوص، الصور، والأقسام الموجودة في الصفحة الرئيسية.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isSaving ? <span className="material-symbols-outlined animate-spin text-sm">sync</span> : <span className="material-symbols-outlined text-sm">save</span>}
          {isSaving ? "جاري الحفظ..." : "حفظ جميع التغييرات"}
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-outline-variant mb-6 gap-6 overflow-x-auto pb-2">
        {["hero", "about", "services", "whyus", "blog", "contact"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold transition-colors relative whitespace-nowrap ${
              activeTab === tab ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab === "hero" && "الهيرو (السلايدر)"}
            {tab === "about" && "من نحن"}
            {tab === "services" && "الخدمات"}
            {tab === "whyus" && "لماذا نحن"}
            {tab === "blog" && "المدونة بالرئيسية"}
            {tab === "contact" && "نموذج الاتصال"}
            {activeTab === tab && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm min-h-[500px]">
        {/* HERO SECTION */}
        {activeTab === "hero" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-title-lg text-primary font-bold mb-4">إدارة صور ونصوص الهيرو (Slider)</h2>
            
            <div className="space-y-6">
              {content.hero.slides.map((slide: any, index: number) => (
                <div key={index} className="border border-outline-variant rounded-lg p-4 bg-surface-container-lowest">
                  <div className="flex justify-between items-center mb-4 border-b border-outline-variant pb-2">
                    <h3 className="font-bold text-on-surface">شريحة رقم {index + 1}</h3>
                    <button 
                      onClick={() => {
                        const newSlides = [...content.hero.slides];
                        newSlides.splice(index, 1);
                        setContent({ ...content, hero: { ...content.hero, slides: newSlides } });
                      }}
                      className="text-error hover:text-error/80 text-sm font-bold flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span> حذف
                    </button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-on-surface mb-1">العنوان الرئيسي</label>
                        <input 
                          type="text" 
                          value={slide.title}
                          onChange={(e) => {
                            const newSlides = [...content.hero.slides];
                            newSlides[index].title = e.target.value;
                            setContent({ ...content, hero: { ...content.hero, slides: newSlides } });
                          }}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-on-surface mb-1">الوصف</label>
                        <textarea 
                          value={slide.description}
                          onChange={(e) => {
                            const newSlides = [...content.hero.slides];
                            newSlides[index].description = e.target.value;
                            setContent({ ...content, hero: { ...content.hero, slides: newSlides } });
                          }}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" 
                          rows={3} 
                        />
                      </div>
                    </div>
                    <div>
                      <ImageUploader 
                        label="الصورة"
                        currentUrl={slide.image}
                        onUpload={(url) => {
                          const newSlides = [...content.hero.slides];
                          newSlides[index].image = url;
                          setContent({ ...content, hero: { ...content.hero, slides: newSlides } });
                        }}
                      />
                      {slide.image && (
                        <div className="mt-3 h-24 overflow-hidden rounded-lg">
                          <img src={slide.image} className="w-full h-full object-cover" alt="Preview" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button 
                onClick={() => {
                  setContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      slides: [...content.hero.slides, { title: "عنوان جديد", description: "وصف جديد", image: "" }]
                    }
                  });
                }}
                className="w-full py-4 border-2 border-dashed border-primary/50 text-primary rounded-lg font-bold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">add_circle</span>
                إضافة شريحة (صورة) جديدة للهيرو
              </button>
            </div>
          </motion.div>
        )}

        {/* ABOUT US SECTION */}
        {activeTab === "about" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-title-lg text-primary font-bold mb-4">إدارة قسم: من نحن</h2>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">العنوان</label>
              <input type="text" value={content.about.title} onChange={(e) => handleNestedChange("about", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">الوصف التفصيلي</label>
              <textarea value={content.about.description} onChange={(e) => handleNestedChange("about", "description", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none h-32" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant">
                <label className="block text-sm font-bold text-on-surface mb-1">مربع الرؤية (العنوان)</label>
                <input type="text" value={content.about.visionTitle} onChange={(e) => handleNestedChange("about", "visionTitle", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none mb-3" />
                <label className="block text-sm font-bold text-on-surface mb-1">مربع الرؤية (الوصف)</label>
                <textarea value={content.about.visionDesc} onChange={(e) => handleNestedChange("about", "visionDesc", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" rows={2} />
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant">
                <label className="block text-sm font-bold text-on-surface mb-1">مربع الرسالة (العنوان)</label>
                <input type="text" value={content.about.missionTitle} onChange={(e) => handleNestedChange("about", "missionTitle", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none mb-3" />
                <label className="block text-sm font-bold text-on-surface mb-1">مربع الرسالة (الوصف)</label>
                <textarea value={content.about.missionDesc} onChange={(e) => handleNestedChange("about", "missionDesc", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" rows={2} />
              </div>
            </div>
            <div>
              <ImageUploader 
                label="الصورة المرفقة"
                currentUrl={content.about.image}
                onUpload={(url) => handleNestedChange("about", "image", url)}
              />
              {content.about.image && (
                <img src={content.about.image} className="mt-4 h-32 object-cover rounded-lg" alt="About" />
              )}
            </div>
          </motion.div>
        )}

        {/* SERVICES SECTION */}
        {activeTab === "services" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-title-lg text-primary font-bold mb-4">إدارة قسم: الخدمات المباشرة بالرئيسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">العنوان الرئيسي</label>
                <input type="text" value={content.services.title} onChange={(e) => handleNestedChange("services", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">العنوان الفرعي (Subtitle)</label>
                <input type="text" value={content.services.subtitle} onChange={(e) => handleNestedChange("services", "subtitle", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="font-bold text-on-surface border-b border-outline-variant pb-2 flex justify-between">
                عناصر الخدمات
                <button 
                  onClick={() => {
                    const newItems = [...content.services.items, { icon: "star", title: "خدمة جديدة", features: "نقطة 1, نقطة 2" }];
                    setContent({ ...content, services: { ...content.services, items: newItems } });
                  }}
                  className="text-primary text-sm flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span> إضافة
                </button>
              </h3>
              
              {content.services.items.map((item: any, idx: number) => (
                <div key={idx} className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant relative">
                  <button 
                    onClick={() => {
                      const newItems = [...content.services.items];
                      newItems.splice(idx, 1);
                      setContent({ ...content, services: { ...content.services, items: newItems } });
                    }}
                    className="absolute top-2 left-2 text-error text-xs p-1"
                  >
                    حذف
                  </button>
                  <div className="flex gap-4">
                    <div className="w-16">
                      <label className="block text-xs font-bold text-on-surface mb-1">الأيقونة</label>
                      <input 
                        type="text" 
                        value={item.icon} 
                        onChange={(e) => {
                          const newItems = [...content.services.items];
                          newItems[idx].icon = e.target.value;
                          setContent({ ...content, services: { ...content.services, items: newItems } });
                        }}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-2 py-2 text-center text-sm focus:ring-1 focus:ring-primary outline-none" dir="ltr" 
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-on-surface mb-1">اسم الخدمة</label>
                      <input 
                        type="text" 
                        value={item.title} 
                        onChange={(e) => {
                          const newItems = [...content.services.items];
                          newItems[idx].title = e.target.value;
                          setContent({ ...content, services: { ...content.services, items: newItems } });
                        }}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" 
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-xs font-bold text-on-surface mb-1">النقاط الفرعية (مفصولة بفاصلة)</label>
                    <input 
                      type="text" 
                      value={item.features} 
                      onChange={(e) => {
                        const newItems = [...content.services.items];
                        newItems[idx].features = e.target.value;
                        setContent({ ...content, services: { ...content.services, items: newItems } });
                      }}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* WHY US SECTION */}
        {activeTab === "whyus" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-title-lg text-primary font-bold mb-4">إدارة قسم: لماذا تختارنا</h2>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">العنوان الرئيسي</label>
              <input type="text" value={content.whyUs.title} onChange={(e) => handleNestedChange("whyUs", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => {
                  const newFeatures = [...content.whyUs.features, { icon: "star", title: "ميزة جديدة", description: "وصف الميزة الجديدة" }];
                  setContent({ ...content, whyUs: { ...content.whyUs, features: newFeatures } });
                }}
                className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">add</span> إضافة ميزة
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {content.whyUs.features.map((feature: any, idx: number) => (
                <div key={idx} className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant space-y-3 relative">
                  <button 
                    onClick={() => {
                      const newFeatures = [...content.whyUs.features];
                      newFeatures.splice(idx, 1);
                      setContent({ ...content, whyUs: { ...content.whyUs, features: newFeatures } });
                    }}
                    className="absolute top-2 left-2 text-error text-xs p-1"
                  >
                    حذف
                  </button>
                  <div className="flex items-center justify-between pr-8">
                    <h3 className="font-bold text-primary">الميزة #{idx + 1}</h3>
                    <input 
                      type="text" 
                      value={feature.icon} 
                      onChange={(e) => {
                        const newF = [...content.whyUs.features];
                        newF[idx].icon = e.target.value;
                        setContent({ ...content, whyUs: { ...content.whyUs, features: newF } });
                      }}
                      className="w-16 bg-surface-container-low border border-outline-variant rounded px-2 py-1 text-center text-xs outline-none" dir="ltr" title="رمز الأيقونة" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-on-surface mb-1">عنوان الميزة</label>
                    <input 
                      type="text" 
                      value={feature.title} 
                      onChange={(e) => {
                        const newF = [...content.whyUs.features];
                        newF[idx].title = e.target.value;
                        setContent({ ...content, whyUs: { ...content.whyUs, features: newF } });
                      }}
                      className="w-full bg-surface-container-low border border-outline-variant rounded px-3 py-2 text-sm outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-on-surface mb-1">وصف الميزة</label>
                    <textarea 
                      value={feature.description} 
                      onChange={(e) => {
                        const newF = [...content.whyUs.features];
                        newF[idx].description = e.target.value;
                        setContent({ ...content, whyUs: { ...content.whyUs, features: newF } });
                      }}
                      className="w-full bg-surface-container-low border border-outline-variant rounded px-3 py-2 text-sm outline-none" rows={2} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* BLOG & CONTACT SECTION */}
        {activeTab === "blog" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-title-lg text-primary font-bold mb-4">إدارة قسم: المدونة (الصفحة الرئيسية)</h2>
            <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1">عنوان القسم</label>
                  <input type="text" value={content.blog.title} onChange={(e) => handleNestedChange("blog", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1">الوصف الفرعي</label>
                  <input type="text" value={content.blog.subtitle} onChange={(e) => handleNestedChange("blog", "subtitle", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "contact" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-title-lg text-primary font-bold mb-4">إدارة قسم: اتصل بنا (نموذج التواصل)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-on-surface border-b border-outline-variant pb-2">النصوص الجانبية</h3>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1">العنوان الرئيسي</label>
                  <input type="text" value={content.contact.title} onChange={(e) => handleNestedChange("contact", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1">وصف القسم</label>
                  <textarea value={content.contact.description} onChange={(e) => handleNestedChange("contact", "description", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" rows={3} />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-on-surface border-b border-outline-variant pb-2">نصوص النموذج (Form)</h3>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1">تسمية قائمة "نوع الخدمة"</label>
                  <input type="text" value={content.contact.serviceLabel} onChange={(e) => handleNestedChange("contact", "serviceLabel", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1">الخيارات المتاحة (مفصولة بفاصلة)</label>
                  <input type="text" value={content.contact.serviceOptions} onChange={(e) => handleNestedChange("contact", "serviceOptions", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-1">نص زر الإرسال</label>
                  <input type="text" value={content.contact.submitBtn} onChange={(e) => handleNestedChange("contact", "submitBtn", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
