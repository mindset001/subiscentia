'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import Perf from '../../../public/images/perf2.png';
import Perf2 from '../../../public/images/perf.png';
import Perf3 from '../../../public/images/perf3.png';
import Perf4 from '../../../public/images/perf4.png';
const fragrances = [
  {
    image: Perf,
    name: 'violet reverie',
    collection: 'essence collection',
    description: 'transforming dreams into reality with violet petals, warm cashmere woods violet petals/cashmere woods+1',
    price: '$200',
    rating: 4,
  },
  {
    image: Perf2,
    name: 'violet reverie',
    collection: 'essence collection',
    description: 'transforming dreams into reality with violet petals, warm cashmere woods violet petals/cashmere woods+1',
    price: '$200',
    rating: 4,
  },
  {
    image: Perf3,
    name: 'violet reverie',
    collection: 'essence collection',
    description: 'transforming dreams into reality with violet petals, warm cashmere woods violet petals/cashmere woods+1',
    price: '$200',
    rating: 4,
  },
  {
    image: Perf4,
    name: 'violet reverie',
    collection: 'essence collection',
    description: 'transforming dreams into reality with violet petals, warm cashmere woods violet petals/cashmere woods+1',
    price: '$200',
    rating: 4,
  },
  // Repeat for second row
  {
    image: Perf2,
    name: 'violet reverie',
    collection: 'essence collection',
    description: 'transforming dreams into reality with violet petals, warm cashmere woods violet petals/cashmere woods+1',
    price: '$200',
    rating: 4,
  },
  {
    image: Perf,
    name: 'violet reverie',
    collection: 'essence collection',
    description: 'transforming dreams into reality with violet petals, warm cashmere woods violet petals/cashmere woods+1',
    price: '$200',
    rating: 4,
  },
  {
    image: Perf3,
    name: 'violet reverie',
    collection: 'essence collection',
    description: 'transforming dreams into reality with violet petals, warm cashmere woods violet petals/cashmere woods+1',
    price: '$200',
    rating: 4,
  },
  {
    image: Perf4,
    name: 'violet reverie',
    collection: 'essence collection',
    description: 'transforming dreams into reality with violet petals, warm cashmere woods violet petals/cashmere woods+1',
    price: '$200',
    rating: 4,
  },
];

const MostBelovedFragrances = () => {
  return (
    <section className="relative py-16 px-4 sm:px-8 lg:px-2 overflow-hidden">
      {/* Background Image only at the top */}
      <div className="absolute left-0 top-0 w-full h-48 z-0">
        <Image
          src="/images/frag.png"
          alt="Fragrance Section Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-light text-center tracking-[0.2em] text-purple-900 mb-12">
          MOST BELOVED FRAGRANCES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {fragrances.map((item, idx) => (
            <div key={idx} className="bg-white shadow-sm overflow-hidden border border-gray-100 flex flex-col">
              <div className="w-full h-38 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-2 flex-1 flex flex-col justify-between">
                <div>
                 <div className='flex justify-between'>
                   <span className="inline-block px-2 py-1 text-xs font-medium bg-[#F4E5FF] text-[#000] rounded mb-2">
                    {item.collection}
                  </span>
                   <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < item.rating ? 'text-[#000] fill-[#000]' : 'text-gray-300'} fill={i < item.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                 </div>
                 
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                 <div className='flex'>
                   <p className="text-[10px] text-[#000] mb-2">
                    {item.description}
                  </p>
                  <p className="flex flex-col justify-end text-xs text-gray-400">
                   <span className="text-xl font-semibold text-[#000]">{item.price}</span>
                  </p>
                 </div>
                </div>
                <div className="mt-4 text-right">
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostBelovedFragrances;
