import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'customer';
  newsletterSubscribed: boolean;
  orders: Schema.Types.ObjectId[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  },
  newsletterSubscribed: {
    type: Boolean,
    default: false
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);