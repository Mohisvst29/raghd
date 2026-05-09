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
    heroImage: { type: String },
    title: { type: String },
    description: { type: String },
    visionTitle: { type: String },
    visionDesc: { type: String },
    missionTitle: { type: String },
    missionDesc: { type: String },
    image: { type: String },
  },
  services: {
    heroImage: { type: String },
    title: { type: String },
    subtitle: { type: String },
    items: [
      {
        icon: { type: String },
        image: { type: String }, // Legacy
        main_image: { type: String },
        title: { type: String },
        slug: { type: String },
        short_description: { type: String },
        features: { type: String }, // Legacy
        sub_services: [{ type: String }],
        logos: [{ type: String }],
        button_text: { type: String },
        button_link: { type: String },
        status: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
      }
    ]
  },
  whyUs: {
    heroImage: { type: String },
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
    heroImage: { type: String },
    title: { type: String },
    subtitle: { type: String },
  },
  contact: {
    heroImage: { type: String },
    title: { type: String },
    description: { type: String },
    serviceLabel: { type: String },
    serviceOptions: { type: String }, // Comma separated string
    submitBtn: { type: String },
  },
  accreditedEntities: {
    title: { type: String },
    logos: [{ type: String }],
  }
}, { timestamps: true, strict: false });

delete mongoose.models.Content;
export const Content = mongoose.model("Content", ContentSchema);
