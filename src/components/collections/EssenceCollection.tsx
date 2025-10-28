'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

const fragrances = [
  { image: '/images/fragrance1.jpg', name: 'violet reverie', price: '$200', rating: 4 },
  { image: '/images/fragrance2.jpg', name: 'violet reverie', price: '$200', rating: 4 },
  { image: '/images/fragrance3.jpg', name: 'violet reverie', price: '$200', rating: 4 },
  { image: '/images/fragrance4.jpg', name: 'violet reverie', price: '$200', rating: 4 },
  { image: '/images/fragrance1.jpg', name: 'violet reverie', price: '$200', rating: 4 },
  { image: '/images/fragrance2.jpg', name: 'violet reverie', price: '$200', rating: 4 },
  { image: '/images/fragrance3.jpg', name: 'violet reverie', price: '$200', rating: 4 },
  { image: '/images/fragrance4.jpg', name: 'violet reverie', price: '$200', rating: 4 },
];

const EssenceCollection = () => (
  <section className="bg-white">
    {/* Banner */}
    <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8">
      <Image
        src="/images/flower.png"
        alt="Essence Collection Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-3xl md:text-5xl font-light text-white mb-2 tracking-wide">Essence Collection</h2>
        <p className="text-base md:text-lg text-white/80 font-light">
          Pure, Undiluted Expressions Of Nature's Most Precious Aromatics<br />
          Minimalist Elegance Meets Raw Botanical Power
        </p>
      </div>
    </div>
    {/* Fragrance Grid */}
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {fragrances.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 flex flex-col">
            <div className="w-full h-48 relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded mb-2">
                  essence collection
                </span>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < item.rating ? 'text-purple-500 fill-purple-500' : 'text-gray-300'} fill={i < item.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  transforming dreams into reality with violet petals, warm cashmere woods
                </p>
                <p className="text-xs text-gray-400">
                  violet petals/cashmere woods+1
                </p>
              </div>
              <div className="mt-4 text-right">
                <span className="text-xl font-bold text-purple-700">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EssenceCollection;
