'use client';

import { useState, FormEvent } from 'react';
import { message } from 'antd';
import { api } from '@/lib/api';

const JoinScentJourney = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      message.warning('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const response = await api.subscribeNewsletter(email);
      
      if (response.message) {
        message.success(response.message);
        setEmail(''); // Clear the input
      }
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      const errorMessage = error.message || 'Failed to subscribe. Please try again.';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-white">
      {/* Purple header */}
      <div className="bg-purple-100 py-8">
        <h2 className="font-sackers text-4xl md:text-5xl font-light text-center tracking-[0.2em] text-[#46315C]">
          JOIN OUR SCENT JOURNEY
        </h2>
      </div>
      {/* Description and form */}
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <p className="text-lg text-gray-700 mb-8 font-circular">
          Be The First To Discover New Fragrances, Exclusive Collections, And The Stories Behind Each Scent.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:px-4 items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full sm:w-2/3 px-6 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700 text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-purple-800 text-white rounded font-medium text-base hover:bg-purple-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default JoinScentJourney;
