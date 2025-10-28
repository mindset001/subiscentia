'use client';

import { Instagram, X, Facebook } from 'lucide-react';
import Image from 'next/image';
import Frag from '../../../public/images/frag.png';

const ContactFormSection = () => (
  <section className="relative py-12 bg-white overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0 w-full h-full -z-10">
      <Image
        src={Frag}
        alt="Fragrance background"
        fill
        className="object-cover object-center opacity-30"
        priority
      />
      {/* Optional overlay for better contrast */}
      <div className="absolute inset-0 bg-white/60" />
    </div>
    {/* Purple header */}
    <div className="bg-purple-100 py-8 mb-8">
      <h2 className="text-3xl md:text-4xl font-light text-center tracking-[0.2em] text-purple-900 uppercase">
        How Can We Help?
      </h2>
    </div>
    {/* Contact Form */}
    <form className="max-w-4xl mx-auto flex flex-col gap-4 mb-8">
      <input
        type="text"
        placeholder="First Name"
        className="w-full px-6 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700 text-base bg-gray-50"
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full px-6 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700 text-base bg-gray-50"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full px-6 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700 text-base bg-gray-50"
      />
      <textarea
        placeholder="Type Your Message"
        className="w-full px-6 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700 text-base bg-gray-50 min-h-[120px]"
      />
      <button
        type="submit"
        className="w-full px-8 py-3 bg-purple-800 text-white rounded font-medium text-base hover:bg-purple-900 transition-colors mt-4"
      >
        Send Message
      </button>
    </form>
    {/* Social Icons */}
    <div className="flex justify-center gap-8 mt-6 text-[#000]">
      <Instagram size={24} />
      <X size={24} />
      <Facebook size={24} />
    </div>
  </section>
);

export default ContactFormSection;
