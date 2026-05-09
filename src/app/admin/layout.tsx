"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:static top-0 right-0 h-full w-72 bg-surface-container-low border-l border-outline-variant flex flex-col z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between gap-3 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary-container text-white flex items-center justify-center rounded">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <span className="text-headline-md text-primary font-bold">رغد للموانيئ</span>
          </div>
          <button className="lg:hidden text-outline" onClick={() => setIsSidebarOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <Link href="/admin" className={`flex items-center gap-3 px-3 py-3 rounded-lg font-semibold ${pathname === '/admin' ? 'bg-secondary-container text-on-secondary-container' : 'hover:bg-surface-container-high text-on-surface-variant'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span>لوحة القيادة</span>
          </Link>
          
          <div className="pt-4 pb-2 px-3 text-label-sm text-outline uppercase tracking-wider">المحتوى</div>
          <Link href="/admin/content" className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${pathname === '/admin/content' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'hover:bg-surface-container-high text-on-surface-variant'}`}>
            <span className="material-symbols-outlined">edit_document</span>
            <span>تعديل محتوى الموقع</span>
          </Link>
          <Link href="/admin/blog" className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${pathname === '/admin/blog' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'hover:bg-surface-container-high text-on-surface-variant'}`}>
            <span className="material-symbols-outlined">article</span>
            <span>المدونة</span>
          </Link>
          
          <div className="pt-4 pb-2 px-3 text-label-sm text-outline uppercase tracking-wider">العمليات</div>
          <Link href="/admin/inquiries" className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${pathname === '/admin/inquiries' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'hover:bg-surface-container-high text-on-surface-variant'}`}>
            <span className="material-symbols-outlined">mail</span>
            <span>الاستفسارات</span>
            <span className="mr-auto bg-error text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">12</span>
          </Link>
          
          <div className="pt-8 mt-auto border-t border-outline-variant">
            <Link href="/admin/settings" className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${pathname === '/admin/settings' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'hover:bg-surface-container-high text-on-surface-variant'}`}>
              <span className="material-symbols-outlined">settings</span>
              <span>الإعدادات</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-background">
        {/* Top Bar */}
        <header className="h-20 bg-surface border-b border-outline-variant flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4 w-1/2 lg:w-1/3">
            <button className="lg:hidden text-on-surface p-2" onClick={() => setIsSidebarOpen(true)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="relative w-full max-w-md hidden sm:block">
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full bg-surface-container-low border border-outline-variant rounded-lg pr-10 pl-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="البحث..." type="text"/>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-full hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-on-surface">notifications</span>
              <span className="absolute top-2 left-2 size-2 bg-error rounded-full border-2 border-surface"></span>
            </button>
            <div className="flex items-center gap-3 pr-6 border-r border-outline-variant">
              <div className="text-left">
                <p className="text-sm font-bold text-on-surface">المدير العام</p>
                <p className="text-xs text-outline">مدير النظام</p>
              </div>
              <div className="size-10 rounded-full bg-cover bg-center border border-outline-variant" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/ADBb0ugQAN_RV5Z0Qj6QbnjgXQTOhDqInmfzS9gX6lYPwDXRnzmsITfO50plYVFKPzUjz_KfMkEyX2fU4I43_qarhh0ytjBbdrVCY-b9KJXWIXmGsnFiZaltGXaCke52D58wu77A2KO4HCuCOvfpSo2xRXDUWU5U_v2h_b_rE0GRLu0NKhE85jWe3GSrztPXtTMGoXx3_DbepWo04cwX3OlCOUTXK39zzGjVFKx5xpkrKvrB3A1s1PCbwWt-zp18JbX2U5mKWT7sp0Ut_sE')" }}></div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
