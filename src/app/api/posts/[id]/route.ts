import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Post } from "@/models/Post";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Auto-generate slug if empty
    if (body.slug === "") {
      body.slug = body.title ? body.title.trim().replace(/\s+/g, '-').toLowerCase() + '-' + Date.now() : 'post-' + Date.now();
    }
    
    const updatedPost = await Post.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: updatedPost });
  } catch (error: any) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ error: error.message || "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Post.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
