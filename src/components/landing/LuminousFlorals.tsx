'use client';

import Image from 'next/image';
import Flower from '../../../public/images/flower.png';
import Flower2 from '../../../public/images/flower2.png';
import Flower3 from '../../../public/images/flower3.png';
import Flower4 from '../../../public/images/flower4.png';
import Flower5 from '../../../public/images/flower5.png';
import Flower6 from '../../../public/images/flower6.png';
import Flower7 from '../../../public/images/flower7.png';

const florals = [
  { image: Flower},
  { image: Flower2 },
  { image: Flower3 },
  { image: Flower4 },
  { image: Flower5 },
  { image: Flower6 },
  { image: Flower7 },
  { image: Flower3 },
  { image: Flower4 },
];

const LuminousFlorals = () => {
  return (
    <section className="py-12 px-4 sm:px-8 lg:px-2 bg-[#F4E5FF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-2">
          {florals.map((item, idx) => (
            <div key={idx} className="relative h-64 rounded-lg overflow-hidden shadow">
              <Image
                src={item.image}
                alt="Luminous Floral"
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="font-circular absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-white/80 text-gray-800 rounded mb-2">
                  luminous florals
                </span>
                <h3 className="text-2xl font-light text-white mb-2 tracking-wide">
                  light finds you
                </h3>
                <p className="text-sm text-white/80 font-circular">
                  where dawn meets skin in whispered promises<br />of bergamot and white tea
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuminousFlorals;
