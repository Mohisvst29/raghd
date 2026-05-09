import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, default: "عام" },
  excerpt: { type: String },
  content: { type: String },
  image: { type: String },
  status: { type: String, default: "مسودة" }, // منشور أو مسودة
  views: { type: Number, default: 0 },
  en: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true, strict: false });

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
