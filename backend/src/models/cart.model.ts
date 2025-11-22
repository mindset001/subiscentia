import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  _id?: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  quantity: number;
  size: string;
  price: number;
}

export interface ICart extends Document {
  user?: mongoose.Types.ObjectId;
  sessionId?: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  size: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sessionId: {
    type: String
  },
  items: [CartItemSchema]
}, {
  timestamps: true
});

// Index for faster lookups
CartSchema.index({ user: 1 });
CartSchema.index({ sessionId: 1 });

export default mongoose.model<ICart>('Cart', CartSchema);
