import { connectDB } from "@/lib/mongoose";
import { Content } from "@/models/Content";
import ContactContent from "@/components/ContactContent";

export const revalidate = 0;

export default async function Contact() {
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

  return <ContactContent siteContent={siteContent} />;
}
