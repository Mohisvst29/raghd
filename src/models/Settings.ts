import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  siteNameAr: { type: String, default: "مؤسسة موانئ رغد للتخليص الجمركي" },
  siteNameEn: { type: String, default: "Raghad Ports Customs Clearance" },
  seoDescription: { type: String, default: "خبراء التخليص الجمركي في ميناء جدة الإسلامي. نسخر خبراتنا لتيسير تجارتكم وضمان وصول بضائعكم بكفاءة تامة." },
  phoneNumbers: { type: String, default: "0506468204, 0568094648" }, // Comma separated for multiple
  email: { type: String, default: "ceo@raghadports.com" },
  whatsapp: { type: String, default: "966506468204" },
  adminUsername: { type: String, default: "admin" },
  adminPassword: { type: String, default: "admin21@#" },
}, { timestamps: true });

export const Settings = mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
