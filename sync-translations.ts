import mongoose from 'mongoose';
import { translateObject } from './src/lib/translate.ts';
import { Content } from './src/models/Content.ts';
import { Post } from './src/models/Post.ts';

require('dotenv').config({ path: '.env.local' });

async function syncTranslations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to DB. Starting translation sync...");

    // 1. Sync Content
    const content = await Content.findOne();
    if (content) {
      console.log("Translating Content...");
      const contentObj = JSON.parse(JSON.stringify(content));
      const translatedEn = await translateObject(contentObj);
      await Content.findByIdAndUpdate(content._id, { en: translatedEn }, { new: true });
      console.log("Content translated successfully.");
    } else {
      console.log("No Content found.");
    }

    // 2. Sync Posts
    const posts = await Post.find();
    console.log(`Found ${posts.length} posts to translate.`);
    for (const post of posts) {
      if (!post.en || !post.en.title) {
        console.log(`Translating post: ${post.title}`);
        const postObj = JSON.parse(JSON.stringify(post));
        const translatedEn = await translateObject(postObj);
        await Post.findByIdAndUpdate(post._id, { en: translatedEn }, { new: true });
      } else {
        console.log(`Post ${post.title} already translated.`);
      }
    }

    console.log("Translation sync completed!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to sync translations:", error);
    process.exit(1);
  }
}

syncTranslations();
