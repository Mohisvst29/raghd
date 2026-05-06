import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  hero: {
    slides: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
      }
    ]
  },
  about: {
    title: { type: String },
    description: { type: String },
    visionTitle: { type: String },
    visionDesc: { type: String },
    missionTitle: { type: String },
    missionDesc: { type: String },
    image: { type: String },
  },
  services: {
    title: { type: String },
    subtitle: { type: String },
    items: [
      {
        icon: { type: String },
        title: { type: String },
        features: { type: String }, // Comma separated string
      }
    ]
  },
  whyUs: {
    title: { type: String },
    features: [
      {
        icon: { type: String },
        title: { type: String },
        description: { type: String },
      }
    ]
  },
  blog: {
    title: { type: String },
    subtitle: { type: String },
  },
  contact: {
    title: { type: String },
    description: { type: String },
    serviceLabel: { type: String },
    serviceOptions: { type: String }, // Comma separated string
    submitBtn: { type: String },
  }
}, { timestamps: true });

export const Content = mongoose.models.Content || mongoose.model("Content", ContentSchema);
