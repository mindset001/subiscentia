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
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-light text-black tracking-wider leading-none">
          Subi
        </h1>
     
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;