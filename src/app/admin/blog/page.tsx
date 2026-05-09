"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminBlog() {
  const { t } = useLanguage();

  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(confirm("هل أنت متأكد من حذف هذا المقال؟")) {
      try {
        await fetch(`/api/posts/${id}`, { method: "DELETE" });
        setPosts(posts.filter(p => p._id !== id));
      } catch (err) {
        alert("فشل الحذف");
      }
    }
  };

  const handleEdit = (post: any) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setCurrentPost({ title: "", slug: "", category: "عام", excerpt: "", content: "", status: "مسودة", image: "" });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const method = currentPost._id ? "PUT" : "POST";
      const url = currentPost._id ? `/api/posts/${currentPost._id}` : "/api/posts";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentPost)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "فشل الحفظ");
      
      alert("تم الحفظ بنجاح!");
      setIsEditing(false);
      fetchPosts();
    } catch (err: any) {
      alert("حدث خطأ أثناء الحفظ: " + err.message);
    }
  };

  if (isEditing) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-primary">{currentPost._id ? "تعديل مقال" : "إضافة مقال جديد"}</h2>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">إلغاء</button>
            <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors">حفظ المقال</button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">عنوان المقال</label>
              <input type="text" value={currentPost.title} onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">الرابط (Slug)</label>
              <input type="text" value={currentPost.slug} onChange={(e) => setCurrentPost({...currentPost, slug: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary" dir="ltr" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">التصنيف</label>
              <input type="text" value={currentPost.category} onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1">الحالة</label>
              <select value={currentPost.status} onChange={(e) => setCurrentPost({...currentPost, status: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary">
                <option value="منشور">منشور</option>
                <option value="مسودة">مسودة</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-on-surface mb-1">نبذة (Excerpt)</label>
            <textarea value={currentPost.excerpt} onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary" rows={2}></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold text-on-surface mb-1">المحتوى</label>
            <textarea value={currentPost.content} onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary h-64"></textarea>
          </div>
          <div>
            <ImageUploader 
              label="صورة المقال"
              currentUrl={currentPost.image}
              onUpload={(url) => setCurrentPost({...currentPost, image: url})}
            />
            {currentPost.image && <img src={currentPost.image} className="mt-4 h-32 object-cover rounded-lg" alt="Preview" />}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-headline-lg text-primary">{t.admin.sidebar.blog}</h1>
          <p className="text-on-surface-variant">إدارة مقالات المدونة، إضافة وتعديل وحذف المقالات.</p>
        </div>
        <button onClick={handleAdd} className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          أضف مقال جديد
        </button>
      </div>
      
      <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-outline">جاري التحميل...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-outline">لا توجد مقالات مضافة بعد.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-surface-container-low text-outline text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">عنوان المقال</th>
                  <th className="px-6 py-4 font-semibold">التصنيف</th>
                  <th className="px-6 py-4 font-semibold">التاريخ</th>
                  <th className="px-6 py-4 font-semibold">المشاهدات</th>
                  <th className="px-6 py-4 font-semibold">الحالة</th>
                  <th className="px-6 py-4 font-semibold text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-on-surface max-w-sm truncate" title={post.title}>{post.title}</div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">{post.category}</td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">{new Date(post.createdAt).toLocaleDateString("ar-SA")}</td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">{post.views || 0}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        post.status === 'منشور' ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container-high text-on-surface-variant'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button onClick={() => handleEdit(post)} className="text-primary hover:text-primary/80 transition-colors mx-1" title="تعديل">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(post._id)} className="text-error hover:text-error/80 transition-colors mx-1" title="حذف">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
