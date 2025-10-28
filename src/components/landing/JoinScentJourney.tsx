'use client';

const JoinScentJourney = () => {
  return (
    <section className="py-12 bg-white">
      {/* Purple header */}
      <div className="bg-purple-100 py-8">
        <h2 className="text-4xl md:text-5xl font-light text-center tracking-[0.2em] text-purple-900">
          JOIN OUR SCENT JOURNEY
        </h2>
      </div>
      {/* Description and form */}
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <p className="text-lg text-gray-700 mb-8">
          Be The First To Discover New Fragrances, Exclusive Collections, And The Stories Behind Each Scent.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Your Email Address"
            className="w-full sm:w-2/3 px-6 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700 text-base"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-purple-800 text-white rounded font-medium text-base hover:bg-purple-900 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default JoinScentJourney;
