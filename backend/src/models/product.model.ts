import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stockQuantity: number;
  sizes?: Array<{
    label: string;
    price: number;
  }>;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  stockQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  sizes: [{
    label: { type: String },
    price: { type: Number }
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', productSchema);