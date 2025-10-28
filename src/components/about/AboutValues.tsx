'use client';

const values = [
  {
    title: 'Artisanal Excellence',
    description:
      'Every Fragrance Is Hand-Crafted By Master Perfumers With Decades Of Experience, Ensuring Unparalleled Quality And Uniqueness.',
  },
  {
    title: 'Sustainable Luxury',
    description:
      'We Source Our Ingredients Ethically And Sustainably, Supporting Local Communities While Preserving The Environment.',
  },
  {
    title: 'Emotional Storytelling',
    description:
      'Each Scent Is Designed To Evoke Memories, Emotions, And Experiences, Creating A Personal Journey For Every Wearer.',
  },
  {
    title: 'Timeless Innovation',
    description:
      'We Blend Traditional Perfumery Techniques With Modern Innovation To Create Fragrances That Are Both Classic And Contemporary.',
  },
];

const AboutValues = () => (
  <section className="relative py-16 px-4 sm:px-8 lg:px-24 bg-purple-50">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-light text-purple-900 tracking-[0.2em] mb-4">OUR VALUES</h2>
      <p className="text-lg text-gray-700 mb-10">
        The Principles That Guide Every Decision We Make<br />And Every Fragrance We Create.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">{value.title}</h3>
            <p className="text-gray-700 text-base leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutValues;
