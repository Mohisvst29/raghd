import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
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
      {
        icon: "account_balance",
        title: "التخليص الجمركي",
        features: "التخليص للوارد, التخليص للصادر, خدمات الترانزيت"
      },
      {
        icon: "analytics",
        title: "الخدمات الاستشارية",
        features: "تحديد HS Code, حساب الرسوم الجمركية, مراجعة المستندات"
      }
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
    
    let content = await Content.findOne();
    if (content) {
      // Update existing
      Object.assign(content, body);
      await content.save();
    } else {
      // Create new
      content = await Content.create(body);
    }
    
    return NextResponse.json({ success: true, message: "تم الحفظ بنجاح", data: content });
  } catch (error) {
    console.error("Failed to update content:", error);
    return NextResponse.json({ error: "فشل في حفظ المحتوى" }, { status: 500 });
  }
}
