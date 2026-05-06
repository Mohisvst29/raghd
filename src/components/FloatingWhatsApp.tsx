"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.a
      href="https://wa.me/966506468204"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      aria-label="تواصل معنا عبر واتساب"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M12.031 21.033C10.428 21.033 8.878 20.603 7.502 19.8L3 21l1.2-4.502c-.88-1.376-1.345-2.926-1.345-4.529C2.855 6.46 7.315 2 12.815 2 18.315 2 22.775 6.46 22.775 11.96c0 5.5-4.46 9.96-9.96 9.96h-.784zM12.815 3.5C8.14 3.5 4.355 7.285 4.355 11.96c0 1.554.405 3.064 1.173 4.414l-1.042 3.921 4.025-1.053c1.32.748 2.805 1.144 4.304 1.144 4.675 0 8.46-3.785 8.46-8.46C21.275 7.285 17.49 3.5 12.815 3.5z"/>
        <path d="M16.964 14.836c-.22-.11-1.32-.66-1.523-.733-.203-.073-.35-.11-.497.11-.147.22-.572.733-.702.88-.13.147-.26.165-.48.055-.22-.11-.94-.347-1.792-1.11-.662-.593-1.11-1.326-1.24-1.547-.13-.22-.014-.34.096-.45.1-.1.22-.256.33-.385.11-.13.147-.22.22-.367.073-.147.037-.275-.018-.385-.055-.11-.497-1.21-.68-1.656-.178-.43-.36-.37-.497-.378-.13-.008-.276-.008-.423-.008-.147 0-.385.055-.588.275-.203.22-.772.77-.772 1.884 0 1.114.79 2.19 8.1 3.2 2.215 3.195 2.62 3.655 3.1 3.655.48 0 1.543-.642 1.763-1.265.22-.624.22-1.16.147-1.275-.073-.11-.26-.184-.48-.294z"/>
      </svg>
    </motion.a>
  );
}
