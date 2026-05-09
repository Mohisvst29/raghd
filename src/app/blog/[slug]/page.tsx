import { connectDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/BlogPostContent";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB();
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const dbPost = await Post.findOne({ $or: [{ slug }, { slug: decodedSlug }] }).lean();
  
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
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  );
}
