'use client';

import Image from 'next/image';

const florals = [
  { image: '/images/floral1.jpg' },
  { image: '/images/floral2.jpg' },
  { image: '/images/floral3.jpg' },
  { image: '/images/floral4.jpg' },
  { image: '/images/floral5.jpg' },
  { image: '/images/floral6.jpg' },
  { image: '/images/floral7.jpg' },
  { image: '/images/floral8.jpg' },
  { image: '/images/floral9.jpg' },
];

const LuminousFlorals = () => {
  return (
    <section className="py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
          {florals.map((item, idx) => (
            <div key={idx} className="relative h-64 rounded-lg overflow-hidden shadow">
              <Image
                src={item.image}
                alt="Luminous Floral"
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-white/80 text-gray-800 rounded mb-2">
                  luminous florals
                </span>
                <h3 className="text-2xl font-light text-white mb-2 tracking-wide">
                  light finds you
                </h3>
                <p className="text-sm text-white/80">
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
