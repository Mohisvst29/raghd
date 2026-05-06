"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary mock login logic
    if (email === "admin@raghadports.com" && password === "admin123") {
      router.push("/admin");
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-outline-variant p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary-container rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm">
            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              security
            </span>
          </div>
          <h1 className="text-headline-md font-bold text-primary">تسجيل الدخول</h1>
          <p className="text-body-sm text-on-surface-variant mt-2">مرحباً بك في لوحة تحكم مؤسسة رغد للموانئ</p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-error">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-label-sm font-bold text-on-surface mb-1">البريد الإلكتروني</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg pr-10 pl-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                placeholder="admin@raghadports.com"
                required
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-label-sm font-bold text-on-surface">كلمة المرور</label>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline">lock</span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg pr-10 pl-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-md flex justify-center items-center gap-2"
            >
              <span>دخول للوحة التحكم</span>
              <span className="material-symbols-outlined text-sm">login</span>
            </motion.button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-xs text-outline">
          <p>للاختبار استخدم:</p>
          <p className="mt-1" dir="ltr">admin@raghadports.com / admin123</p>
        </div>
      </motion.div>
    </div>
  );
}
