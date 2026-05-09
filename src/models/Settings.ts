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
  logoUrl: { type: String, default: "https://lh3.googleusercontent.com/aida/ADBb0ugQAN_RV5Z0Qj6QbnjgXQTOhDqInmfzS9gX6lYPwDXRnzmsITfO50plYVFKPzUjz_KfMkEyX2fU4I43_qarhh0ytjBbdrVCY-b9KJXWIXmGsnFiZaltGXaCke52D58wu77A2KO4HCuCOvfpSo2xRXDUWU5U_v2h_b_rE0GRLu0NKhE85jWe3GSrztPXtTMGoXx3_DbepWo04cwX3OlCOUTXK39zzGjVFKx5xpkrKvrB3A1s1PCbwWt-zp18JbX2U5mKWT7sp0Ut_sE" },
  logoSize: { type: Number, default: 64 },
  colors: {
    primary: { type: String, default: "#001629" },
    secondary: { type: String, default: "#50606f" },
    surface: { type: String, default: "#f7fafc" },
    background: { type: String, default: "#f7fafc" }
  }
}, { timestamps: true });

export const Settings = mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
