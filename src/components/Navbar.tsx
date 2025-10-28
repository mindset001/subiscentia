'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Instagram, Menu, X,  Facebook } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'COLLECTIONS', href: '/collections' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Social Icons */}
    <div className="flex justify-center gap-4 text-[#000]">
      <Instagram size={16} />
      <X size={16} />
      <Facebook size={16} />
    </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-col items-center">
            <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Subi Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ease-in-out"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Shopping Cart Icon (Desktop) */}
          <Link href='/cart'>
              <div className="hidden md:block">
            <button className="text-gray-600 hover:text-black transition-colors duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </button>
          </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-black transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-black block px-3 py-2 text-base font-medium tracking-wide transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Shopping Cart */}
            <button className="flex items-center text-gray-600 hover:text-black px-3 py-2 text-base font-medium tracking-wide transition-colors duration-200">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              CART
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;