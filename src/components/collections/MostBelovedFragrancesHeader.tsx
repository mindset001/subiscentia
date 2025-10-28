'use client';

const MostBelovedFragrancesHeader = () => (
  <section className="relative py-10  bg-white">
    <div className="absolute inset-0 z-0">
      <img
        src="/images/frag.png"
        alt="Most Beloved Fragrances Background"
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/60 to-transparent"></div>
    </div>
    <div className="relative z-10 text-left">
      <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-purple-900 mb-4 uppercase">
        Most Beloved Fragrances
      </h2>
      <p className="text-base md:text-lg text-gray-700 font-light">
        Each collection tells a unique olfactory story, crafted  with the finest ingredients and inspired by moments of pure beauty and emotion.
      </p>
    </div>
  </section>
);

export default MostBelovedFragrancesHeader;
