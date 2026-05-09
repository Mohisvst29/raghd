import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongoose";
import { Content } from "@/models/Content";

// Default content to seed if DB is empty
const defaultContent = {
  hero: {
    slides: [
      {
        title: "شريككم الموثوق في التخليص الجمركي والخدمات اللوجستية",
        description: "نسهل عمليات الاستيراد والتصدير بحلول سريعة ودقيقة...",
        image: "https://lh3.googleusercontent.com/aida/ADBb0ugQAN_RV5Z0Qj6QbnjgXQTOhDqInmfzS9gX6lYPwDXRnzmsITfO50plYVFKPzUjz_KfMkEyX2fU4I43_qarhh0ytjBbdrVCY-b9KJXWIXmGsnFiZaltGXaCke52D58wu77A2KO4HCuCOvfpSo2xRXDUWU5U_v2h_b_rE0GRLu0NKhE85jWe3GSrztPXtTMGoXx3_DbepWo04cwX3OlCOUTXK39zzGjVFKx5xpkrKvrB3A1s1PCbwWt-zp18JbX2U5mKWT7sp0Ut_sE"
      }
    ]
  },
  about: {
    title: "الخبرة والريادة في الخدمات الجمركية",
    description: "نحن في مؤسسة موانئ رغد متخصصون في مجال الخدمات اللوجستية والتخليص الجمركي...",
    visionTitle: "رؤيتنا",
    visionDesc: "أن نكون الخيار الأول في المملكة للتخليص الجمركي...",
    missionTitle: "رسالتنا",
    missionDesc: "تقديم خدمات متكاملة تضمن راحة العميل وتوافقها التام...",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
  },
  services: {
    title: "خدماتنا المتكاملة",
    subtitle: "حلول لوجستية شاملة مصممة لتلبية احتياجات أعمالكم",
    items: [
      { title: "التخليص الجمركي", short_description: "تخليص الواردات والصادرات وتتبعها بدقة متناهية.", button_text: "اطلب الخدمة الآن", sub_services: ["تخليص واردات", "تخليص صادرات", "ترانزيت"], status: true, order: 1 },
      { title: "الخدمات الاستشارية", short_description: "استشارات جمركية ولوجستية احترافية لتطوير أعمالك.", button_text: "طلب استشارة", sub_services: ["التصنيف الجمركي", "الإعفاءات", "لوائح فسح"], status: true, order: 2 },
      { title: "متابعة الشحنات", short_description: "نظام تتبع لحظي لشحناتك من الانطلاق حتى الوصول.", button_text: "تتبع شحنتك", sub_services: ["تتبع حاويات", "إشعارات يومية", "تقارير مفصلة"], status: true, order: 3 },
      { title: "الخدمات الإضافية", short_description: "خدمات شحن مستودعات وتأمين متكاملة.", button_text: "المزيد", sub_services: ["التخزين", "النقل البري", "التأمين المائي"], status: true, order: 4 },
    ]
  },
  whyUs: {
    title: "لماذا تختارنا؟",
    features: [
      { icon: "speed", title: "سرعة في الإنجاز", description: "إجراءات سريعة لضمان عدم تأخير بضائعكم." },
      { icon: "workspace_premium", title: "خبرة واسعة", description: "فريق عمل خبير بالأنظمة والقوانين الجمركية." },
      { icon: "payments", title: "أسعار منافسة", description: "خدمات احترافية بتكلفة اقتصادية شفافة." },
      { icon: "location_on", title: "موقع استراتيجي", description: "تواجد دائم في قلب ميناء جدة الإسلامي." },
    ]
  },
  blog: {
    title: "أحدث المقالات والأخبار",
    subtitle: "تابع أحدث أخبار التخليص الجمركي واللوجستيات"
  },
  contact: {
    title: "تواصل معنا اليوم",
    description: "فريقنا جاهز للرد على استفساراتكم وتقديم الحلول الجمركية الأمثل لأعمالكم.",
    serviceLabel: "نوع الخدمة المطلوب",
    serviceOptions: "تخليص جمركي, استشارات, نقل وتخزين, أخرى",
    submitBtn: "إرسال الطلب"
  },
  accreditedEntities: {
    title: "الجهات المعتمدة",
    logos: []
  }
};

export async function GET() {
  try {
    await connectDB();
    let content = await Content.findOne();
    
    // Seed default if empty
    if (!content) {
      content = await Content.create(defaultContent);
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    const content = await Content.findOneAndUpdate({}, body, { new: true, upsert: true, strict: false });
    
    return NextResponse.json({ success: true, message: "تم الحفظ بنجاح", data: content });
  } catch (error) {
    console.error("Failed to update content:", error);
    return NextResponse.json({ error: "فشل في حفظ المحتوى" }, { status: 500 });
  }
}
