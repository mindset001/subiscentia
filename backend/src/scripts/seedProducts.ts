import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Define Product Schema
    const productSchema = new mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      images: [{ type: String }],
      stockQuantity: { type: Number, required: true },
      sizes: [{
        label: { type: String },
        price: { type: Number }
      }],
      isPublished: { type: Boolean, default: false },
      publishedAt: { type: Date }
    }, { timestamps: true });

    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

    // Sample products
    const products = [
      {
        name: 'Violet Reverie',
        description: 'A delicate symphony of violet petals, warm cashmere, and golden amber that captures the essence of ethereal beauty and timeless elegance.',
        price: 200,
        category: 'Floral',
        images: ['/images/perf2.png', '/images/perf3.png', '/images/perf4.png'],
        stockQuantity: 50,
        isPublished: false,
        sizes: [
          { label: '30 ML', price: 150 },
          { label: '50 ML', price: 200 },
          { label: '100 ML', price: 350 }
        ]
      },
      {
        name: 'Lavender Dreams',
        description: 'An enchanting blend of fresh lavender fields, soft vanilla, and white musk that evokes peaceful twilight moments and serene contemplation.',
        price: 180,
        category: 'Floral',
        images: ['/images/perf.png'],
        stockQuantity: 45,
        isPublished: false,
        sizes: [
          { label: '30 ML', price: 130 },
          { label: '50 ML', price: 180 },
          { label: '100 ML', price: 320 }
        ]
      },
      {
        name: 'Midnight Rose',
        description: 'A mysterious fusion of dark roses, sandalwood, and black pepper that embodies the allure of a moonlit garden.',
        price: 220,
        category: 'Oriental',
        images: ['/images/perf2.png'],
        stockQuantity: 30,
        isPublished: false,
        sizes: [
          { label: '30 ML', price: 170 },
          { label: '50 ML', price: 220 },
          { label: '100 ML', price: 380 }
        ]
      },
      {
        name: 'Ocean Breeze',
        description: 'A refreshing composition of sea salt, citrus, and white tea that captures the invigorating essence of coastal mornings.',
        price: 195,
        category: 'Fresh',
        images: ['/images/perf3.png'],
        stockQuantity: 60,
        isPublished: false,
        sizes: [
          { label: '30 ML', price: 145 },
          { label: '50 ML', price: 195 },
          { label: '100 ML', price: 340 }
        ]
      },
      {
        name: 'Amber Mystique',
        description: 'A warm embrace of golden amber, patchouli, and tonka bean that weaves a tale of ancient mysteries and modern sophistication.',
        price: 240,
        category: 'Oriental',
        images: ['/images/perf4.png'],
        stockQuantity: 25,
        isPublished: false,
        sizes: [
          { label: '30 ML', price: 190 },
          { label: '50 ML', price: 240 },
          { label: '100 ML', price: 420 }
        ]
      }
    ];

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${insertedProducts.length} products!`);
    
    // Display products
    console.log('\n📦 Products:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} (${product.category}) - $${product.price}`);
    });

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
