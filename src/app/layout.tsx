import type { Metadata } from "next";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.raghadports.com"),
  title: {
    default: "مؤسسة موانئ رغد للتخليص الجمركي | Raghad Ports Customs Clearance",
    template: "%s | مؤسسة موانئ رغد للتخليص الجمركي",
  },
  description: "الشريك الموثوق في التخليص الجمركي والخدمات اللوجستية | Your trusted partner in customs clearance and logistics services",
  keywords: ["تخليص جمركي", "جمارك", "لوجستيات", "شحن بري", "شحن بحري", "شحن جوي", "موانئ رغد", "السعودية", "استيراد وتصدير", "Customs Clearance", "Logistics", "Raghad Ports"],
  authors: [{ name: "مؤسسة موانئ رغد" }],
  creator: "مؤسسة موانئ رغد",
  publisher: "مؤسسة موانئ رغد",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://www.raghadports.com",
    title: "مؤسسة موانئ رغد للتخليص الجمركي | Raghad Ports Customs Clearance",
    description: "الشريك الموثوق في التخليص الجمركي والخدمات اللوجستية | Your trusted partner in customs clearance and logistics services.",
    siteName: "مؤسسة موانئ رغد للتخليص الجمركي",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "مؤسسة موانئ رغد للتخليص الجمركي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مؤسسة موانئ رغد للتخليص الجمركي",
    description: "الشريك الموثوق في التخليص الجمركي والخدمات اللوجستية.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.raghadports.com",
    languages: {
      "ar": "https://www.raghadports.com",
      "en": "https://www.raghadports.com/en",
    },
  },
};

import { connectDB } from "@/lib/mongoose";
import { Settings } from "@/models/Settings";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let dbTheme = {};
  try {
    await connectDB();
    const settings = await Settings.findOne().lean();
    if (settings) {
      dbTheme = {
        colors: settings.colors,
        logoUrl: settings.logoUrl,
        logoSize: settings.logoSize
      };
    }
  } catch (err) {
    console.error("Failed to load settings in layout", err);
  }

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;800&family=Noto+Kufi+Arabic:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <style>{`
          .material-symbols-outlined {
              font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
        `}</style>
      </head>
      <body className="antialiased overflow-x-hidden">
        <ThemeProvider initialTheme={dbTheme}>
          <LanguageProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <FloatingContact />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
