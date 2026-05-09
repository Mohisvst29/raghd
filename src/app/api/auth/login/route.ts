import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Settings } from "@/models/Settings";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, password } = await req.json();
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    if (settings.adminUsername === username && settings.adminPassword === password) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
