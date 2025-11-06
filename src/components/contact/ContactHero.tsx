'use client';

const ContactHero = () => (
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
      <h1 className="text-[7vw] md:text-[6vw] lg:text-[5vw] font-light text-purple-900 mb-6 tracking-wide leading-tight font-sackers">
        Connect with <br />Subi Scentia
      </h1>
      <div className="mt-8 flex justify-center">
        <p className="w-[70%] text-xs md:text-[14px] font-light tracking-widest text-gray-700 uppercase font-circular">
          Whether you need guidance choosing the perfect fragrance or have questions about our collections, our expert team is here to help you discover your signature scent.
        </p>
      </div>
    </div>
  </section>
);

export default ContactHero;
