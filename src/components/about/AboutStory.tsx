'use client';

import Image from 'next/image';

const AboutStory = () => (
<div>
       <div className='bg-[#F4E5FF] flex items-center justify-center py-8'>
        <h1 className="text-4xl font-bold text-purple-900 mb-4 capitalize font-sackers">Our Philosophy</h1>
    </div>
      <section className="relative py-12 px-4 sm:px-8 lg:px-24">
    <div className="absolute inset-0 z-0">
      <img
        src="/images/frag.png"
        alt="About Hero Background"
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(1.1)' }}
      />
      
    </div>
    
    <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-purple-100 to-transparent pointer-events-none" />
   
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
      {/* Story Text */}
      <div className="text-left">
        <p className="text-lg text-gray-800 mb-6 font-circular">
          Born From A Passion For The Art Of Perfumery And A Deep Respect For Nature's Aromatic Gifts, Subi Scentia Represents The Marriage Of Traditional Craftsmanship With Contemporary Elegance.
        </p>
        <p className="text-lg text-gray-800 mb-6 font-circular">
          We Source The Finest Natural Ingredients From Sustainable Suppliers Around The World, Working Directly With Farmers And Distillers Who Share Our Commitment To Quality And Environmental Responsibility.
        </p>
        <p className="text-lg text-gray-800 font-circular">
          Every Fragrance In Our Collection Is Designed To Be A Personal Journey—A Scent That Evolves With You, Revealing New Facets As It Mingles With Your Skin's Unique Chemistry.
        </p>
      </div>
      {/* Perfume Bottle Image */}
      <div className="flex justify-center items-center">
        <Image
          src="/images/bottle.png"
          alt="Subi Scentia Perfume Bottle"
          width={700}
          height={600}
          className="object-cover"
        />
      </div>
    </div>
  </section>
</div>
);

export default AboutStory;
