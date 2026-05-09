import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

import { translateObject } from "@/lib/translate";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Auto-generate slug if empty
    if (!body.slug) {
      body.slug = body.title ? body.title.trim().replace(/\s+/g, '-').toLowerCase() + '-' + Date.now() : 'post-' + Date.now();
    }
    
    // Auto-translate to English
    const enTranslations = await translateObject(body);
    body.en = enTranslations;
    
    const newPost = await Post.create(body);
    return NextResponse.json({ success: true, data: newPost });
  } catch (error: any) {
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: error.message || "Failed to create post" }, { status: 500 });
  }
}
