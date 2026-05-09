import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Inquiry } from "@/models/Inquiry";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const inquiry = await Inquiry.create(body);
    return NextResponse.json({ success: true, data: inquiry });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}
