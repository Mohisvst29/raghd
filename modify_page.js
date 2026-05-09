const fs = require('fs');
let code = fs.readFileSync('src/app/admin/content/page.tsx', 'utf8');

const newFunc = `

  const handleNestedChangeEn = (section, field, value) => {
    setContent((prev) => ({
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
`;

code = code.replace('  const handleNestedChange = (section: string, field: string, value: any) => {', newFunc + '  const handleNestedChange = (section: string, field: string, value: any) => {');

// About Title
code = code.replace(
  '<label className="block text-sm font-bold text-on-surface mb-1">العنوان</label>',
  '<label className="block text-sm font-bold text-on-surface mb-1">العنوان (عربي)</label>'
);
code = code.replace(
  '<input type="text" value={content.about.title} onChange={(e) => handleNestedChange("about", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />',
  '<input type="text" value={content.about.title} onChange={(e) => handleNestedChange("about", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />' +
  '\n              <label className="block text-sm font-bold text-on-surface mb-1 mt-3">العنوان (إنجليزي)</label>' +
  '\n              <input type="text" value={content.en?.about?.title || ""} onChange={(e) => handleNestedChangeEn("about", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" dir="ltr" />'
);

// About Description
code = code.replace(
  '<label className="block text-sm font-bold text-on-surface mb-1">الوصف التفصيلي</label>',
  '<label className="block text-sm font-bold text-on-surface mb-1">الوصف التفصيلي (عربي)</label>'
);
code = code.replace(
  '<textarea value={content.about.description} onChange={(e) => handleNestedChange("about", "description", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none h-32" />',
  '<textarea value={content.about.description} onChange={(e) => handleNestedChange("about", "description", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none h-32" />' +
  '\n              <label className="block text-sm font-bold text-on-surface mb-1 mt-3">الوصف التفصيلي (إنجليزي)</label>' +
  '\n              <textarea value={content.en?.about?.description || ""} onChange={(e) => handleNestedChangeEn("about", "description", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none h-32" dir="ltr" />'
);

// Services Main Title
code = code.replace(
  '<label className="block text-sm font-bold text-on-surface mb-1">العنوان الرئيسي</label>',
  '<label className="block text-sm font-bold text-on-surface mb-1">العنوان الرئيسي (عربي)</label>'
);
code = code.replace(
  '<input type="text" value={content.services.title} onChange={(e) => handleNestedChange("services", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />',
  '<input type="text" value={content.services.title} onChange={(e) => handleNestedChange("services", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" />' +
  '\n                <label className="block text-sm font-bold text-on-surface mb-1 mt-3">العنوان الرئيسي (إنجليزي)</label>' +
  '\n                <input type="text" value={content.en?.services?.title || ""} onChange={(e) => handleNestedChangeEn("services", "title", e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary outline-none" dir="ltr" />'
);

fs.writeFileSync('src/app/admin/content/page.tsx', code);
console.log('Modified page.tsx');
