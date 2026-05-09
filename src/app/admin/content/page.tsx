"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [editLang, setEditLang] = useState<"ar" | "en">("ar");

  // Fetch initial content
  useEffect(() => {
    fetch("/api/content")
      .then(async res => {
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        if (!data.accreditedEntities) {
          data.accreditedEntities = { title: "الجهات المعتمدة", logos: [] };
        }
        if (data.services && (!data.services.items || data.services.items.length === 0)) {
          data.services.items = [
            { title: "التخليص الجمركي", short_description: "تخليص الواردات والصادرات وتتبعها بدقة متناهية.", button_text: "اطلب الخدمة الآن", sub_services: ["تخليص واردات", "تخليص صادرات", "ترانزيت"], status: true, order: 1 },
            { title: "الخدمات الاستشارية", short_description: "استشارات جمركية ولوجستية احترافية لتطوير أعمالك.", button_text: "طلب استشارة", sub_services: ["التصنيف الجمركي", "الإعفاءات", "لوائح فسح"], status: true, order: 2 },
            { title: "متابعة الشحنات", short_description: "نظام تتبع لحظي لشحناتك من الانطلاق حتى الوصول.", button_text: "تتبع شحنتك", sub_services: ["تتبع حاويات", "إشعارات يومية", "تقارير مفصلة"], status: true, order: 3 },
            { title: "الخدمات الإضافية", short_description: "خدمات شحن مستودعات وتأمين متكاملة.", button_text: "المزيد", sub_services: ["التخزين", "النقل البري", "التأمين المائي"], status: true, order: 4 },
          ];
        }
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



  const handleNestedChangeEn = (section: string, field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      en: {
        ...(prev.en || {}),
        [section]: {
          ...(prev.en?.[section] || {}),
          [field]: value
        }
      }
    }));
  };
  const handleNestedChange = (section: string, field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (isLoading) {
    return <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div></div>;
  }

  if (!content || !content.hero) {
    return <div className="p-20 text-center text-error font-bold text-lg">فشل في تحميل المحتوى من قاعدة البيانات. يرجى التأكد من تشغيل MongoDB.</div>;
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
        {["hero", "about", "services", "whyus", "blog", "contact", "accreditedEntities"].map((tab) => (
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
            {tab === "accreditedEntities" && "الجهات المعتمدة"}
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
                        <label className="block text-sm font-bold text-on-surface mb-1">العنوان الرئيسي (عربي)</label>
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
            <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant mb-4">
              <ImageUploader 
                label="صورة الهيرو (الخلفية العلوية لصفحة من نحن)"
                currentUrl={content.about.heroImage}
                onUpload={(url) => handleNestedChange("about", "heroImage", url)}
              />
              {content.about.heroImage && (
                <img src={content.about.heroImage} className="mt-4 h-32 w-full object-cover rounded-lg" alt="About Hero" />
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">العنوان (عربي)</label>
              <input type="text" value={content.about.title} onChange={(e) => handleNestedChange("about", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
              <label className="block text-sm font-bold text-on-surface mb-1 mt-3">العنوان (إنجليزي)</label>
              <input type="text" value={content.en?.about?.title || ""} onChange={(e) => handleNestedChangeEn("about", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">الوصف التفصيلي (عربي)</label>
              <textarea value={content.about.description} onChange={(e) => handleNestedChange("about", "description", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none h-32" />
              <label className="block text-sm font-bold text-on-surface mb-1 mt-3">الوصف التفصيلي (إنجليزي)</label>
              <textarea value={content.en?.about?.description || ""} onChange={(e) => handleNestedChangeEn("about", "description", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none h-32" dir="ltr" />
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
            <h2 className="text-title-lg text-primary font-bold mb-4">إدارة قسم: الخدمات (يظهر في الرئيسية وصفحة الخدمات المستقلة)</h2>
            <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant mb-4">
              <ImageUploader 
                label="صورة الهيرو (تظهر في أعلى صفحة الخدمات المستقلة فقط - وليس الرئيسية)"
                currentUrl={content.services.heroImage}
                onUpload={(url) => handleNestedChange("services", "heroImage", url)}
              />
              {content.services.heroImage && (
                <img src={content.services.heroImage} className="mt-4 h-32 w-full object-cover rounded-lg" alt="Services Hero" />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">العنوان الرئيسي</label>
                <input type="text" value={content.services.title} onChange={(e) => handleNestedChange("services", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
                <label className="block text-sm font-bold text-on-surface mb-1 mt-3">العنوان الرئيسي (إنجليزي)</label>
                <input type="text" value={content.en?.services?.title || ""} onChange={(e) => handleNestedChangeEn("services", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" dir="ltr" />
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
                    const newItems = [...content.services.items, { icon: "star", image: "", main_image: "", title: "خدمة جديدة", slug: "new-service", short_description: "", features: "", sub_services: [], logos: [], button_text: "اطلب الخدمة", button_link: "/contact", status: true, order: content.services.items.length + 1 }];
                    setContent({ ...content, services: { ...content.services, items: newItems } });
                  }}
                  className="text-primary text-sm flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span> إضافة خدمة
                </button>
              </h3>
              
              {content.services.items.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((item: any, idx: number) => (
                <div key={idx} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant relative shadow-sm">
                  <button 
                    onClick={() => {
                      const newItems = [...content.services.items];
                      newItems.splice(idx, 1);
                      setContent({ ...content, services: { ...content.services, items: newItems } });
                    }}
                    className="absolute top-4 left-4 text-error text-xs p-1 font-bold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span> حذف
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">اسم الخدمة</label>
                      <input 
                        type="text" 
                        value={item.title || ""} 
                        onChange={(e) => {
                          const newItems = [...content.services.items];
                          newItems[idx].title = e.target.value;
                          setContent({ ...content, services: { ...content.services, items: newItems } });
                        }}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">الرابط المخصص (Slug)</label>
                      <input 
                        type="text" 
                        value={item.slug || ""} 
                        onChange={(e) => {
                          const newItems = [...content.services.items];
                          newItems[idx].slug = e.target.value;
                          setContent({ ...content, services: { ...content.services, items: newItems } });
                        }}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none text-left" dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-on-surface mb-1">وصف مختصر</label>
                    <textarea 
                      value={item.short_description || ""} 
                      onChange={(e) => {
                        const newItems = [...content.services.items];
                        newItems[idx].short_description = e.target.value;
                        setContent({ ...content, services: { ...content.services, items: newItems } });
                      }}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none h-20" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <ImageUploader 
                        label="الصورة الرئيسية"
                        currentUrl={item.main_image || item.image}
                        onUpload={(url) => {
                          const newItems = [...content.services.items];
                          newItems[idx].main_image = url;
                          newItems[idx].image = url; // Fallback
                          setContent({ ...content, services: { ...content.services, items: newItems } });
                        }}
                      />
                      {(item.main_image || item.image) && (
                        <img src={item.main_image || item.image} className="mt-2 h-20 w-full object-cover rounded-lg" alt="Main" />
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">الخدمات الفرعية (مفصولة بفاصلة)</label>
                      <textarea 
                        value={(item.sub_services?.length > 0 ? item.sub_services.join(", ") : item.features) || ""} 
                        onChange={(e) => {
                          const newItems = [...content.services.items];
                          const subArr = e.target.value.split(",").map(s => s.trim());
                          newItems[idx].sub_services = subArr;
                          newItems[idx].features = e.target.value; // Fallback
                          setContent({ ...content, services: { ...content.services, items: newItems } });
                        }}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none h-20" 
                      />
                    </div>
                  </div>

                  <div className="bg-surface-container-high p-4 rounded-xl mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-on-surface">شعارات الجهات (Logos)</label>
                      <ImageUploader 
                        label=""
                        currentUrl=""
                        onUpload={(url) => {
                          const newItems = [...content.services.items];
                          if (!newItems[idx].logos) newItems[idx].logos = [];
                          newItems[idx].logos.push(url);
                          setContent({ ...content, services: { ...content.services, items: newItems } });
                        }}
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {item.logos && item.logos.map((logo: string, lIdx: number) => (
                        <div key={lIdx} className="relative group">
                          <img src={logo} className="h-12 w-12 object-contain bg-white rounded border border-outline-variant p-1" alt="Logo" />
                          <button 
                            onClick={() => {
                              const newItems = [...content.services.items];
                              newItems[idx].logos.splice(lIdx, 1);
                              setContent({ ...content, services: { ...content.services, items: newItems } });
                            }}
                            className="absolute -top-2 -right-2 bg-error text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {(!item.logos || item.logos.length === 0) && (
                        <span className="text-xs text-on-surface-variant italic">لا يوجد شعارات، يمكنك الرفع من الزر أعلاه</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">نص الزر</label>
                      <input 
                        type="text" 
                        value={item.button_text || "اطلب الخدمة"} 
                        onChange={(e) => {
                          const newItems = [...content.services.items];
                          newItems[idx].button_text = e.target.value;
                          setContent({ ...content, services: { ...content.services, items: newItems } });
                        }}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">رابط الزر</label>
                      <input 
                        type="text" 
                        value={item.button_link || "/contact"} 
                        onChange={(e) => {
                          const newItems = [...content.services.items];
                          newItems[idx].button_link = e.target.value;
                          setContent({ ...content, services: { ...content.services, items: newItems } });
                        }}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none text-left" dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">الترتيب</label>
                      <input 
                        type="number" 
                        value={item.order || 0} 
                        onChange={(e) => {
                          const newItems = [...content.services.items];
                          newItems[idx].order = parseInt(e.target.value) || 0;
                          setContent({ ...content, services: { ...content.services, items: newItems } });
                        }}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none text-center" 
                      />
                    </div>
                    <div className="flex items-center gap-2 h-[38px]">
                      <input 
                        type="checkbox" 
                        checked={item.status !== false} 
                        onChange={(e) => {
                          const newItems = [...content.services.items];
                          newItems[idx].status = e.target.checked;
                          setContent({ ...content, services: { ...content.services, items: newItems } });
                        }}
                        className="w-4 h-4 text-primary bg-surface-container-low border-outline-variant rounded focus:ring-primary focus:ring-2"
                      />
                      <label className="text-xs font-bold text-on-surface">مفعل</label>
                    </div>
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
            <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant mb-4">
              <ImageUploader 
                label="صورة الهيرو (الخلفية العلوية لصفحة لماذا نحن)"
                currentUrl={content.whyUs.heroImage}
                onUpload={(url) => handleNestedChange("whyUs", "heroImage", url)}
              />
              {content.whyUs.heroImage && (
                <img src={content.whyUs.heroImage} className="mt-4 h-32 w-full object-cover rounded-lg" alt="Why Us Hero" />
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">العنوان الرئيسي</label>
              <input type="text" value={content.whyUs.title} onChange={(e) => handleNestedChange("whyUs", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => {
                  const newFeatures = [...(content.whyUs.features || []), { icon: "star", title: "ميزة جديدة", description: "وصف الميزة الجديدة" }];
                  setContent({ ...content, whyUs: { ...content.whyUs, features: newFeatures } });
                }}
                className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">add</span> إضافة ميزة
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {(content.whyUs.features || []).map((feature: any, idx: number) => (
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
            <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant mb-4">
              <ImageUploader 
                label="صورة الهيرو (الخلفية العلوية لصفحة المدونة)"
                currentUrl={content.blog.heroImage}
                onUpload={(url) => handleNestedChange("blog", "heroImage", url)}
              />
              {content.blog.heroImage && (
                <img src={content.blog.heroImage} className="mt-4 h-32 w-full object-cover rounded-lg" alt="Blog Hero" />
              )}
            </div>
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
            <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant mb-4">
              <ImageUploader 
                label="صورة الهيرو (الخلفية العلوية لصفحة اتصل بنا)"
                currentUrl={content.contact.heroImage}
                onUpload={(url) => handleNestedChange("contact", "heroImage", url)}
              />
              {content.contact.heroImage && (
                <img src={content.contact.heroImage} className="mt-4 h-32 w-full object-cover rounded-lg" alt="Contact Hero" />
              )}
            </div>
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
                
                {/* Phones */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-on-surface">أرقام الجوال</label>
                    <button onClick={() => handleNestedChange("contact", "phones", [...(content.contact.phones || []), ""])} className="text-xs bg-primary text-white px-2 py-1 rounded">إضافة رقم</button>
                  </div>
                  {(content.contact.phones || []).map((phone: string, idx: number) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input type="text" value={phone} onChange={(e) => {
                        const newArr = [...(content.contact.phones || [])];
                        newArr[idx] = e.target.value;
                        handleNestedChange("contact", "phones", newArr);
                      }} className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" dir="ltr" />
                      <button onClick={() => {
                        const newArr = [...(content.contact.phones || [])];
                        newArr.splice(idx, 1);
                        handleNestedChange("contact", "phones", newArr);
                      }} className="bg-error text-white px-3 rounded-lg text-xs">حذف</button>
                    </div>
                  ))}
                </div>

                {/* Emails */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-on-surface">البريد الإلكتروني</label>
                    <button onClick={() => handleNestedChange("contact", "emails", [...(content.contact.emails || []), ""])} className="text-xs bg-primary text-white px-2 py-1 rounded">إضافة إيميل</button>
                  </div>
                  {(content.contact.emails || []).map((email: string, idx: number) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input type="email" value={email} onChange={(e) => {
                        const newArr = [...(content.contact.emails || [])];
                        newArr[idx] = e.target.value;
                        handleNestedChange("contact", "emails", newArr);
                      }} className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" dir="ltr" />
                      <button onClick={() => {
                        const newArr = [...(content.contact.emails || [])];
                        newArr.splice(idx, 1);
                        handleNestedChange("contact", "emails", newArr);
                      }} className="bg-error text-white px-3 rounded-lg text-xs">حذف</button>
                    </div>
                  ))}
                </div>

                {/* Locations */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-on-surface">العناوين والمقرات</label>
                    <button onClick={() => handleNestedChange("contact", "locations", [...(content.contact.locations || []), ""])} className="text-xs bg-primary text-white px-2 py-1 rounded">إضافة عنوان</button>
                  </div>
                  {(content.contact.locations || []).map((loc: string, idx: number) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input type="text" value={loc} onChange={(e) => {
                        const newArr = [...(content.contact.locations || [])];
                        newArr[idx] = e.target.value;
                        handleNestedChange("contact", "locations", newArr);
                      }} className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
                      <button onClick={() => {
                        const newArr = [...(content.contact.locations || [])];
                        newArr.splice(idx, 1);
                        handleNestedChange("contact", "locations", newArr);
                      }} className="bg-error text-white px-3 rounded-lg text-xs">حذف</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-on-surface border-b border-outline-variant pb-2">روابط وسائل التواصل الاجتماعي</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['whatsapp', 'twitter', 'linkedin', 'instagram', 'facebook', 'snapchat', 'tiktok'].map(platform => (
                    <div key={platform}>
                      <label className="block text-sm font-bold text-on-surface mb-1 capitalize">{platform}</label>
                      <input 
                        type="url" 
                        value={content.contact?.socialMedia?.[platform] || ''} 
                        onChange={(e) => {
                          const updatedSocial = { ...(content.contact.socialMedia || {}), [platform]: e.target.value };
                          handleNestedChange("contact", "socialMedia", updatedSocial);
                        }} 
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" dir="ltr" placeholder={`https://${platform}.com/...`}
                      />
                    </div>
                  ))}
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

        {/* ACCREDITED ENTITIES SECTION */}
        {activeTab === "accreditedEntities" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-title-lg text-primary font-bold mb-4">إدارة قسم: الجهات المعتمدة</h2>
            
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant relative shadow-sm">
              <div className="mb-6">
                <label className="block text-sm font-bold text-on-surface mb-1">عنوان القسم</label>
                <input 
                  type="text" 
                  value={content.accreditedEntities.title || "الجهات المعتمدة"} 
                  onChange={(e) => handleNestedChange("accreditedEntities", "title", e.target.value)} 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none max-w-md" 
                />
              </div>

              <div className="bg-surface-container-high p-4 rounded-xl mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">شعارات الجهات (اللوجوهات)</h3>
                    <p className="text-xs text-on-surface-variant mt-1">قم برفع شعارات الجهات المعتمدة لتظهر في شريط متحرك أسفل الموقع</p>
                  </div>
                  <ImageUploader 
                    label="إضافة شعار جديد"
                    currentUrl=""
                    onUpload={(url) => {
                      const newLogos = [...(content.accreditedEntities.logos || [])];
                      newLogos.push(url);
                      handleNestedChange("accreditedEntities", "logos", newLogos);
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                  {content.accreditedEntities.logos && content.accreditedEntities.logos.map((logo: string, lIdx: number) => (
                    <div key={lIdx} className="relative group bg-white rounded-lg border border-outline-variant p-4 aspect-square flex items-center justify-center">
                      <img src={logo} className="max-w-full max-h-full object-contain" alt="Accredited Logo" />
                      <button 
                        onClick={() => {
                          const newLogos = [...content.accreditedEntities.logos];
                          newLogos.splice(lIdx, 1);
                          handleNestedChange("accreditedEntities", "logos", newLogos);
                        }}
                        className="absolute -top-2 -right-2 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-error/90"
                        title="حذف الشعار"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  ))}
                  {(!content.accreditedEntities.logos || content.accreditedEntities.logos.length === 0) && (
                    <div className="col-span-full py-8 text-center text-sm text-on-surface-variant italic border-2 border-dashed border-outline-variant rounded-xl">
                      لا يوجد شعارات مضافة، قم برفع شعارات لعرضها في الشريط المتحرك
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
