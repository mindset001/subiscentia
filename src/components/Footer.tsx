'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const navigationLinks = [
    { name: 'HOME', href: '/' },
    { name: 'COLLECTIONS', href: '/collections' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'CART', href: '/cart' },
  ];

  return (
    <footer className="bg-[#F4E5FF]  text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Logo, Tagline, Social Icons */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Subi Scentia Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>

            {/* Tagline */}
            <div className="max-w-md">
              <p className="text-gray-700 text-sm leading-relaxed font-circular">
                Crafting Moments Of Quiet Luxury Through The Art Of Fragrance. 
                Each Scent Tells A Story Of Timeless Elegance And Conscious Craftsmanship
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </Link>
              <Link 
                href="#" 
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </Link>
              <Link 
                href="#" 
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </Link>
            </div>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="lg:flex lg:justify-end">
            <div className="space-y-4">
              {navigationLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sackers block text-gray-700 hover:text-gray-900 text-sm font-medium tracking-wide transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Large Branding Text and Copyright */}
        <div className="mt-16 pt-8 border-t border-purple-300/50">
          {/* Large Branding Text */}
          <div className="text-center mb-8">
            <h2 className="font-sackers text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 tracking-[0.2em] leading-tight">
              SUBI SCENTIA
            </h2>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-600 text-xs font-circular">
              © 2025 Subi Scentia. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;