import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Define User Schema (inline to avoid import issues)
    const userSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String },
      role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Admin credentials
    const adminEmail = 'admin@subiscentia.com';
    const adminPassword = 'Admin@2025!';
    const adminName = 'Subi Admin';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      // Create admin user
      const admin = new User({
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: 'admin',
      });

      await admin.save();
      
      console.log('✅ Admin user created successfully!');
      console.log('-----------------------------------');
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
      console.log('-----------------------------------');
      console.log('⚠️  Save these credentials securely!');
    }

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
