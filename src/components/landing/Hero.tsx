'use client';

import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Purple Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-400/80 via-purple-500/70 to-purple-600/80"></div> */}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl sm:text-[15em] md:text-9xl lg:text-[20rem] font-light text-[#46315C] tracking-wider leading-none">
          Subi
        </h1>
     
      </div>
    </section>
  );
};

export default Hero;