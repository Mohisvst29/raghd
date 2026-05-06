import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  fullName: string;
  phone: string;
  serviceType: string;
  message: string;
  status: string;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  serviceType: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'قيد المراجعة' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
