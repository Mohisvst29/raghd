"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface ImageUploaderProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUploader({ currentUrl, onUpload, label = "صورة", className = "" }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload");
      }

      const data = await response.json();
      setPreview(data.url);
      onUpload(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("حدث خطأ أثناء رفع الصورة.");
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-bold text-on-surface mb-2">{label}</label>
      
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-primary-container text-on-primary-container hover:bg-primary-container/80 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isUploading ? "hourglass_empty" : "upload"}
          </span>
          {isUploading ? "جاري الرفع..." : "اختر صورة من الجهاز"}
        </button>
        
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
        />
        
        <div className="flex-1">
          <input 
            type="text" 
            value={preview} 
            onChange={(e) => {
              setPreview(e.target.value);
              onUpload(e.target.value);
            }}
            placeholder="أو ضع رابط الصورة (URL) هنا"
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none" 
            dir="ltr" 
          />
        </div>
      </div>
    </div>
  );
}
