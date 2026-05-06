import { connectDB } from "@/lib/mongoose";
import { Content } from "@/models/Content";
import ServicesContent from "@/components/ServicesContent";

export const revalidate = 0;

export default async function Services() {
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

  return <ServicesContent siteContent={siteContent} />;
}
