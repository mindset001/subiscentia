'use client';

const CollectionsHero = () => (
  <section className="relative h-[400px] flex flex-col items-center justify-center overflow-hidden bg-white">
    {/* Background image and purple accent (if needed) can be added here */}
    <div className="absolute inset-0 z-0">
      <img
        src="/images/frag.png"
        alt="Collections Hero Background"
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/60 to-transparent"></div>
    </div>
    <div className="relative z-10 w-full text-center px-4">
      <h1 className="text-[7vw] md:text-[6vw] lg:text-[10em] font-light text-[#46315C] mb-6 tracking-wide leading-tight font-sackers">
        Collections
      </h1>
      <div className="mt-8">
        <p className="text-xs md:text-base font-light tracking-widest text-gray-700 uppercase font-circular">
          Ethereal Beauty, Sustainable Impact<br />
          Where Conscious Luxury Meets Timeless Elegance
        </p>
      </div>
    </div>
  </section>
);

export default CollectionsHero;
