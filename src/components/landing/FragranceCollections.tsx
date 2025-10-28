'use client';

import Image from 'next/image';

const FragranceCollections = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden px-6">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/frag.png"
          alt="Fragrance Collection Background"
          fill
          className="object-cover"
          priority
        />
  {/* Blurry white overlay with smooth gradient blend */}
  <div
    className="absolute left-0 top-0 w-full h-[10%] pointer-events-none"
    style={{
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 80%, rgba(255,255,255,0) 100%)',
      backdropFilter: 'blur(32px)'
    }}
  ></div>
      </div>

      <div className="w-full relative z-10  flex flex-col gap-4 justify-between">
        <div className="items-center">
          
          {/* Left Side - Text Content */}
          <div className=" flex flex-col items-center">
            {/* Main Heading */}
            <div className="">
              <h2 className="text-sm text-gray-700 font-medium tracking-wider text-center">
                Ethereal Beauty, Sustainable Impact
              </h2>
              <h3 className="text-lg text-gray-800 font-light leading-relaxed">
                Where Conscious Luxury Meets Timeless Elegance
              </h3>
            </div>

            {/* Large Title */}
            <div className="mt-14 mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-wide leading-tight">
                FRAGRANCE   COLLECTIONS
              </h1>
        
            </div>

            {/* Subtitle */}
           <div className='w-full flex justify-between mt-4'>
             <div className="w-1/4">
              <h4 className="text-xl font-light text-gray-800 tracking-wide">
                STORIES
              </h4>
              <h4 className="text-xl font-light text-gray-800 tracking-wide">
                IN SCENTS
              </h4>
            </div>

            {/* Description */}
            <div className="w-2/4">
              <p className="text-[20px] text-gray-700 leading-relaxed font-light flex flex-col text-right">
                EACH COLLECTION WHISPERS ITS OWN TALE, CRAFTED FOR 
                THOSE WHO UNDERSTAND THAT FRAGRANCE IS THE INVISIBLE 
                THREAD OF MEMORY AND EMOTION.
              </p>
            </div>
           </div>


          </div>

        

        </div>
      </div>
    </section>
  );
};

export default FragranceCollections;