import { connectDB } from "@/lib/mongoose";
import { Content } from "@/models/Content";
import WhyUsContent from "@/components/WhyUsContent";

export const revalidate = 0;

export default async function WhyUsPage() {
  let siteContent = null;
  try {
    await connectDB();
    const dbContent = await Content.findOne().lean();
    if (dbContent) {
      siteContent = JSON.parse(JSON.stringify(dbContent));
    }
  } catch (error) {
    console.error("Failed to fetch content server-side:", error);
  }
  return <WhyUsContent siteContent={siteContent} />;
}
