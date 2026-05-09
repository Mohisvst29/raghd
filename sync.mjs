import mongoose from 'mongoose';

async function translateArToEn(text) {
  if (!text || typeof text !== 'string') return text;
  const arabicPattern = /[\u0600-\u06FF]/;
  if (!arabicPattern.test(text)) return text;

  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(text)}`);
    if (!res.ok) return text;
    const data = await res.json();
    return data[0].map(item => item[0]).join('');
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

async function translateObject(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') return await translateArToEn(obj);
  
  if (Array.isArray(obj)) {
    return await Promise.all(obj.map(item => translateObject(item)));
  }
  
  if (typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === '_id' || key === 'id' || key === 'slug' || key.toLowerCase().includes('url') || key.toLowerCase().includes('image') || key.toLowerCase().includes('icon')) {
          newObj[key] = obj[key];
        } else {
          newObj[key] = await translateObject(obj[key]);
        }
      }
    }
    return newObj;
  }
  return obj;
}

const contentSchema = new mongoose.Schema({}, { strict: false });
const postSchema = new mongoose.Schema({}, { strict: false });

const Content = mongoose.models.Content || mongoose.model("Content", contentSchema, "contents");
const Post = mongoose.models.Post || mongoose.model("Post", postSchema, "posts");

async function syncTranslations() {
  try {
    await mongoose.connect('mongodb+srv://mshebl215_db_user:tVb1A74WZp9DniTW@cluster0.2xvsey9.mongodb.net/raghad?retryWrites=true&w=majority&appName=Cluster0');
    console.log("Connected to DB.");

    const content = await Content.findOne();
    if (content) {
      console.log("Translating Content...");
      const contentObj = JSON.parse(JSON.stringify(content));
      const translatedEn = await translateObject(contentObj);
      await Content.findByIdAndUpdate(content._id, { en: translatedEn }, { new: true });
      console.log("Content translated successfully.");
    }

    const posts = await Post.find();
    for (const post of posts) {
      if (!post.en || !post.en.title) {
        console.log(`Translating post: ${post.title}`);
        const postObj = JSON.parse(JSON.stringify(post));
        const translatedEn = await translateObject(postObj);
        await Post.findByIdAndUpdate(post._id, { en: translatedEn }, { new: true });
      }
    }

    console.log("Done!");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

syncTranslations();
