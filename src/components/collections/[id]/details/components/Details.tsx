'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface CollectionDetailsProps {
  collectionId: string;
}

interface Product {
  _id: string;
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
}

const defaultSizes = [
  { label: '30 ML', price: 150 },
  { label: '50 ML', price: 200 },
  { label: '100 ML', price: 350 },
];

const Details = ({ collectionId }: CollectionDetailsProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (collectionId) {
      loadProduct();
    }
  }, [collectionId]);

  const loadProduct = async () => {
    try {
      const response = await api.getProduct(collectionId);
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const sizes = product?.sizes && product.sizes.length > 0 ? product.sizes : defaultSizes;
  const images = product?.images && product.images.length > 0 ? product.images : ['/images/perf2.png', '/images/perf3.png', '/images/perf4.png'];

  // Mock product ID - in real app this would come from props/API
  const productId = collectionId || '673d2a1b2c3d4e5f6a7b8c9d';

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await addToCart(productId, quantity, sizes[selectedSize].label);
      // Optionally show success message or redirect to cart
      router.push('/cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full py-12 bg-white flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-circular">Loading product...</p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="w-full py-12 bg-white flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 font-circular">Product not found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-4  bg-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full -z-8">
        <Image
          src="/images/frag.png"
          alt="Fragrance background"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>
      {/* Top images */}
      <div className="flex gap-4 justify-center mb-8">
        {images.map((src, idx) => (
          <div key={idx} className="w-20 h-20 overflow-hidden relative border border-gray-200">
            <Image src={src} alt="Product" fill className="object-cover" />
          </div>
        ))}
      </div>


      {/* Title & Description */}
    <div className='w-full flex flex-col items-left px-4 md:px-10'>
          <h1 className="text-4xl md:text-6xl font-light tracking-[.8em] text-[#46315C] mb-4 uppercase font-sackers">
            {product.name}
          </h1>
     <div className='flex flex-col md:flex-row justify-between '>
         <p className="w-[55%] text-[#46315C]  mb-4 text-base md:text-lg tracking-[.4rem] font-circular">
        {product.description}
      </p>
      <div className="flex justify-center items-center mb-8">
        {[1,2,3,4,5].map((n) => (
          <Star key={n} size={20} className={n <= 4 ? 'fill-[#000] text-[#000]' : 'text-gray-300'} />
        ))}
      </div>
     </div>
      {/* Rating */}
      
      {/* Size & Quantity */}
      <div className="w-full flex flex-col md:flex-row gap-8 justify-between mb-8">
        {/* Size selector */}
        <div>
          <div className="text-[20px] font-light tracking-[0.2em] text-purple-900 mb-2 uppercase">Select Size</div>
          <div className="flex gap-2">
            {sizes.map((size, idx) => (
              <button
                key={size.label}
                className={`px-6 py-2 w-[200px] h-[50px] rounded font-medium text-sm border transition-colors ${selectedSize === idx ? 'bg-[#46315C] text-white' : 'bg-purple-100 text-purple-900'}`}
                onClick={() => setSelectedSize(idx)}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
        {/* Quantity selector */}
        <div className='w-full flex flex-col '>
          <div className="text-[20px] font-light tracking-[0.2em] text-purple-900 mb-2 uppercase">Quantity</div>
          <div className="flex  w-[200px] h-[50px] border rounded justify-between items-center px-2 py-1 bg-white">
            <button
              className="text-lg text-[#46315C] disabled:opacity-40"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity === 1}
            >-</button>
            <span className=" select-none text-base">{quantity}</span>
            <button
              className=" text-[24px] text-[#46315C]"
              onClick={() => setQuantity(q => q + 1)}
            >+</button>
          </div>
        </div>
      </div>
      {/* Price */}
      <div className="text-3xl font-semibold text-[#46315C] mb-8">${sizes[selectedSize].price * quantity}</div>
        {/* Add to Cart Button */}
        <div className="flex justify-center">
          <button 
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full md:w-1/2 flex items-center justify-center gap-2 px-8 py-4 bg-[#46315C] text-white rounded font-medium text-base hover:bg-purple-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span className="material-icons">shopping_cart</span>
            {adding ? 'Adding...' : 'Add To Cart'}
          </button>
        </div>

        {/* Fragrance Profile & The Story Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fragrance Profile */}
          <div className="border border-gray-200 rounded-lg p-8 bg-white">
            <h2 className="text-2xl font-light tracking-[0.2em] text-purple-900 mb-6 uppercase">Fragrance Profile</h2>
            <div className="space-y-2 text-base font-circular">
              <div><span className="flex flex-col font-semibold text-purple-900">Personality:</span> <span>For The Dreamer Who Finds Beauty In Quiet Moments</span></div>
              <div><span className="flex flex-col font-semibold text-purple-900">Occasion:</span> <span>Perfect For Intimate Evenings And Reflective Mornings</span></div>
              <div><span className="flex flex-col font-semibold text-purple-900">Season:</span> <span>Spring & Summer</span></div>
              <div><span className="flex flex-col font-semibold text-purple-900">Longevity:</span> <span>6-8 Hours</span></div>
            </div>
          </div>
          {/* The Story */}
          <div className="border border-gray-200 rounded-lg p-8 bg-white">
            <h2 className="text-2xl font-light tracking-[0.2em] text-purple-900 mb-6 uppercase">The Story</h2>
            <p className="text-[16px] text-gray-700 font-circular">
              Violet Reverie Is An Olfactory Poem Written In The Language Of Dreams. This Exquisite Fragrance Opens With The Delicate Whisper Of Violet Petals, Kissed By Morning Dew And Touched By The First Light Of Dawn. As The Scent Unfolds, Warm Cashmere Woods Embrace The Senses, Creating A Cocoon Of Comfort And Sophistication. The Base Notes Of Golden Amber Add Depth And Luminosity, Leaving A Trail Of Mysterious Allure That Speaks To The Soul.
            </p>
          </div>
        </div>
    </div>
    </section>
  );
};

export default Details;
