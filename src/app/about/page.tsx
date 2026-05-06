import { connectDB } from "@/lib/mongoose";
import { Content } from "@/models/Content";
import AboutContent from "@/components/AboutContent";

export const revalidate = 0;

export default async function About() {
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

  return <AboutContent siteContent={siteContent} />;
}
