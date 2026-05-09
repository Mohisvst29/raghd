import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary SDK automatically picks up CLOUDINARY_URL from the environment variables.

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "لم يتم اختيار ملف" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using a stream
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "raghad_portal_uploads" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      // End the stream with the buffer
      uploadStream.end(buffer);
    });

    const result: any = await uploadPromise;

    return NextResponse.json({ url: result.secure_url, success: true });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "فشل في رفع الصورة إلى التخزين السحابي" },
      { status: 500 }
    );
  }
}
