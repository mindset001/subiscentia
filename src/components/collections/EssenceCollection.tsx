'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { MostBelovedFragrances } from '../landing';

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
  <section className="bg-white px-4">
    {/* Banner */}
    <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 ">
      <Image
        src="/images/flower.png"
        alt="Essence Collection Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-3xl md:text-5xl font-light text-white mb-2 tracking-wide">Essence Collection</h2>
        <p className="text-base md:text-lg text-white/80 font-light font-circular">
          Pure, Undiluted Expressions Of Nature's Most Precious Aromatics<br />
          Minimalist Elegance Meets Raw Botanical Power
        </p>
      </div>
    </div>
    {/* Fragrance Grid */}

    <MostBelovedFragrances />
  </section>
);

export default EssenceCollection;
