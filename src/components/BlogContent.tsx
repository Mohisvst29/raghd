"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BlogContent({ siteContent, posts = [] }: { siteContent: any, posts?: any[] }) {
  const { t, lang } = useLanguage();
  const dbBlog = lang === 'ar' && siteContent?.blog 
    ? siteContent.blog 
    : { ...t.blogPage, heroImage: siteContent?.blog?.heroImage };

  return (
    <>
      <TopNavBar />
      {/* Hero Section */}
      <header className="mt-20 pt-stack-lg pb-stack-lg text-white flex flex-col items-center justify-center text-center px-gutter relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0, 22, 41, 0.85), rgba(0, 43, 73, 0.7)), url('${dbBlog?.heroImage || "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&q=80&w=2000"}')` }}></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl relative z-10"
        >
          <h1 className="font-display-xl text-display-xl mb-4">{dbBlog?.title || t.blogPage.heroTitle}</h1>
          <p className="font-body-lg text-body-lg text-white/90">{dbBlog?.subtitle || t.blogPage.heroDesc}</p>
        </motion.div>
      </header>

      <main className="max-w-container-max mx-auto px-gutter py-stack-lg">
        {/* Featured Post Section */}
        {posts.length > 0 && (
        <section className="mb-stack-lg">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-xl overflow-hidden border border-outline-variant shadow-sm"
          >
            <div className="lg:col-span-7 relative h-64 lg:h-full min-h-[400px]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${posts[0].image || "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&q=80&w=2000"}')` }}></div>
            </div>
            <div className="lg:col-span-5 p-margin flex flex-col justify-center bg-surface-container-low">
              <span className="inline-block px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-label-sm text-label-sm mb-4 w-fit">{posts[0].category || t.blogPage.featuredBadge}</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-4 leading-tight">{posts[0].title}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">{posts[0].excerpt}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-label-sm text-label-sm text-outline flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  {new Date(posts[0].createdAt).toLocaleDateString("ar-SA")}
                </span>
                <a className="text-primary font-bold hover:underline flex items-center gap-1" href={`/blog/${posts[0].slug}`}>
                  {t.blogPage.readMore}
                  <span className="material-symbols-outlined">arrow_back</span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-stack-md border-b border-outline-variant pb-stack-sm overflow-x-auto">
          {t.blogPage.filters.map((filter, i) => (
            <button 
              key={i}
              className={`px-6 py-2 rounded-full font-label-sm transition-colors ${i === 0 ? 'bg-primary text-white hover:opacity-90' : 'bg-white text-on-surface border border-outline-variant hover:bg-surface-container-high'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {posts.slice(1).map((post, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-outline-variant rounded-lg overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300"
            >
              <div className="h-56 overflow-hidden relative">
                <img alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={post.image || "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&q=80&w=500"} />
                <div className="absolute top-4 right-4 bg-primary text-white text-[12px] px-3 py-1 rounded font-bold">{post.category}</div>
              </div>
              <div className="p-stack-sm flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-outline mb-2 font-code-xs">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  {new Date(post.createdAt).toLocaleDateString("ar-SA")}
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-3 leading-snug">{post.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-6">{post.excerpt}</p>
                <a className="mt-auto flex items-center justify-between text-primary font-bold group-hover:text-tertiary transition-colors" href={`/blog/${post.slug}`}>
                  <span>{t.blogPage.readMore}</span>
                  <span className="material-symbols-outlined transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <section className="mt-stack-lg bg-primary-container rounded-2xl p-margin text-center overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="font-headline-lg text-headline-lg text-white mb-4">{t.blogPage.newsletterTitle}</h2>
            <p className="font-body-md text-body-md text-white/80 mb-stack-md max-w-2xl mx-auto">{t.blogPage.newsletterDesc}</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input className="flex-grow px-gutter py-3 rounded-lg border-none focus:ring-2 focus:ring-tertiary-fixed text-on-surface font-body-md" placeholder={t.blogPage.newsletterPlaceholder} type="email" />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-tertiary-fixed text-on-tertiary-fixed font-bold px-stack-md py-3 rounded-lg hover:bg-tertiary transition-colors" 
                type="button"
              >
                {t.blogPage.newsletterSubmit}
              </motion.button>
            </form>
          </div>
          {/* Decorative background elements */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-tertiary-container/10 rounded-full blur-3xl"></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
