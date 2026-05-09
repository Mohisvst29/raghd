import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";

import { translateObject } from "@/lib/translate";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Auto-generate slug if empty
    if (body.slug === "") {
      body.slug = body.title ? body.title.trim().replace(/\s+/g, '-').toLowerCase() + '-' + Date.now() : 'post-' + Date.now();
    }
    
    // Auto-translate to English
    const enTranslations = await translateObject(body);
    body.en = enTranslations;
    
    const { id } = await params;
    const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: updatedPost });
  } catch (error: any) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ error: error.message || "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
