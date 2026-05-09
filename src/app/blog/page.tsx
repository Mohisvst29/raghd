import { connectDB } from "@/lib/mongoose";
import { Content } from "@/models/Content";
import BlogContent from "@/components/BlogContent";

import { Post } from "@/models/Post";

export const revalidate = 0;

export default async function Blog() {
  let siteContent = null;
  let posts = [];
  
  try {
    await connectDB();
    const dbContent = await Content.findOne();
    if (dbContent) {
      siteContent = JSON.parse(JSON.stringify(dbContent));
    }
    const dbPosts = await Post.find({ status: "منشور" }).sort({ createdAt: -1 });
    posts = JSON.parse(JSON.stringify(dbPosts));
  } catch (error) {
    console.error("Failed to fetch content server-side:", error);
  }

  return <BlogContent siteContent={siteContent} posts={posts} />;
}
