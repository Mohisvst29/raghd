import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Inquiry } from "@/models/Inquiry";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await Inquiry.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
