import mongoose, { Document, Schema } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  subscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const newsletterSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  subscribed: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<INewsletter>('Newsletter', newsletterSchema);