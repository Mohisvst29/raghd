import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "جديد" },
}, { timestamps: true });

export const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
