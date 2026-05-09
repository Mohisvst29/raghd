"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function BlogPostContent({ post }: { post: any }) {
  const { lang, t } = useLanguage();
  
  const currentPost = lang === 'en' && post.en ? {
    ...post,
    title: post.en.title || post.title,
    content: post.en.content || post.content,
    category: post.en.category || post.category,
    viewsLabel: "Views",
  } : {
    ...post,
    viewsLabel: "المشاهدات"
  };

  return (
    <article className="max-w-4xl mx-auto">
      {currentPost.image && (
        <div className="w-full h-64 md:h-96 relative rounded-2xl overflow-hidden mb-8 shadow-md">
          <img src={currentPost.image} alt={currentPost.title} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4 text-sm text-outline mb-6 font-code-sm">
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">{currentPost.category}</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          {new Date(currentPost.createdAt).toLocaleDateString(lang === 'en' ? "en-US" : "ar-SA")}
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">visibility</span>
          {currentPost.viewsLabel}: {currentPost.views + 1}
        </span>
      </div>
      <h1 className="font-display-md text-display-md text-primary mb-6">{currentPost.title}</h1>
      
      <div 
        className="prose prose-lg max-w-none text-on-surface leading-relaxed" 
        dangerouslySetInnerHTML={{ __html: currentPost.content.replace(/\n/g, '<br />') }} 
      />
    </article>
  );
}
