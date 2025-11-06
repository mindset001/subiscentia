'use client';

const AboutHero = () => (
  <section className="relative h-[420px] flex items-center justify-center overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <img
        src="/images/frag.png"
        alt="About Hero Background"
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(1.1)' }}
      />
      {/* Soft white overlay for readability */}
      <div className="absolute inset-0 bg-white/70"></div>
    </div>
    <div className="relative z-10 w-full text-center px-4">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-purple-900 mb-6 tracking-wide leading-tight font-sackers">
        Crafting Stories<br />Through Scentions
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-gray-700 font-circular">
        At Subi Scentia, We Believe That Fragrance Is More Than Just Scent—It's A Gateway To Memory, Emotion, And The Deepest Parts Of The Human Experience. Each Bottle We Create Is A Carefully Crafted Narrative, Designed To Transport You To Moments Both Remembered And Yet To Be Discovered.
      </p>
    </div>
  </section>
);

export default AboutHero;
