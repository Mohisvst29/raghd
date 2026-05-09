import type { Metadata } from "next";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "مؤسسة موانئ رغد للتخليص الجمركي",
  description: "الشريك الموثوق في التخليص الجمركي والخدمات اللوجستية",
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
    <html lang="ar" dir="rtl">
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
