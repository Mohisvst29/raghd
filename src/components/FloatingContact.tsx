"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingContact() {
  const [mounted, setMounted] = useState(false);
  const [phone, setPhone] = useState("0506468204");
  const [whatsapp, setWhatsapp] = useState("https://wa.me/966506468204");

  useEffect(() => {
    setMounted(true);
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data?.contact?.phones?.length > 0) {
          setPhone(data.contact.phones[0]);
        }
        if (data?.contact?.socialMedia?.whatsapp) {
          setWhatsapp(data.contact.socialMedia.whatsapp);
        }
      })
      .catch(console.error);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
      {/* Phone Icon */}
      <motion.a
        href={`tel:${phone.replace(/\s+/g, '')}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="اتصل بنا"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
        </svg>
      </motion.a>

      {/* WhatsApp Icon */}
      <motion.a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="تواصل معنا عبر واتساب"
      >
        <svg viewBox="0 0 32 32" className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.008 2.016C8.28 2.016 2 8.3 2 16.033c0 2.476.65 4.885 1.884 6.999L2 30l7.151-1.875A13.926 13.926 0 0 0 16.008 30.05c7.727 0 14.008-6.284 14.008-14.017S23.735 2.016 16.008 2.016zm0 25.666a11.536 11.536 0 0 1-5.918-1.638l-.425-.252-4.4.1.115-4.288-.276-.438A11.583 11.583 0 0 1 4.367 16.03c0-6.42 5.222-11.644 11.641-11.644 6.42 0 11.64 5.224 11.64 11.645 0 6.42-5.22 11.65-11.64 11.65zm6.398-8.73c-.351-.176-2.074-1.025-2.395-1.142-.321-.118-.555-.176-.789.176-.233.351-.905 1.142-1.11 1.376-.204.234-.409.264-.76.088-.35-.176-1.48-.545-2.82-1.74-1.04-1.044-1.744-2.336-1.948-2.688-.205-.351-.022-.542.154-.717.158-.158.35-.409.526-.614.175-.205.233-.351.35-.586.117-.234.058-.439-.029-.614-.088-.176-.789-1.902-1.082-2.604-.286-.684-.577-.591-.789-.602-.199-.01-.433-.012-.667-.012-.234 0-.613.088-.935.439-.321.351-1.227 1.199-1.227 2.926 0 1.726 1.256 3.393 1.431 3.627.175.234 2.473 3.774 5.989 5.293 2.378 1.028 3.238 1.096 4.375.922 1.137-.174 2.074-.848 2.366-1.668.292-.819.292-1.52.204-1.667-.088-.147-.322-.234-.672-.41z"/>
        </svg>
      </motion.a>
    </div>
  );
}
