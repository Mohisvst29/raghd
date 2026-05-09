import { connectDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  await connectDB();
  const dbPost = await Post.findOne({ slug: params.slug });
  
  if (!dbPost) {
    notFound();
  }

  // Increment view count
  await Post.findByIdAndUpdate(dbPost._id, { $inc: { views: 1 } });

  const post = JSON.parse(JSON.stringify(dbPost));

  return (
    <>
      <TopNavBar />
      <main className="mt-20 py-20 px-4">
        <article className="max-w-4xl mx-auto">
          {post.image && (
            <div className="w-full h-64 md:h-96 relative rounded-2xl overflow-hidden mb-8">
              <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">{post.category}</span>
            <span>{new Date(post.createdAt).toLocaleDateString("ar-SA")}</span>
            <span>المشاهدات: {post.views + 1}</span>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-6">{post.title}</h1>
          
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
        </article>
      </main>
      <Footer />
    </>
  );
}
