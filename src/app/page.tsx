import { connectDB } from "@/lib/mongoose";
import { Content } from "@/models/Content";
import HomeContent from "@/components/HomeContent";

export const revalidate = 0; // Disable cache so changes reflect immediately

export default async function Home() {
  let siteContent = null;
  
  try {
    await connectDB();
    const dbContent = await Content.findOne();
    if (dbContent) {
      siteContent = JSON.parse(JSON.stringify(dbContent));
    }
  } catch (error) {
    console.error("Failed to fetch content server-side:", error);
  }

  return <HomeContent siteContent={siteContent} />;
}
