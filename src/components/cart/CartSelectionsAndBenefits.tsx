'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CartSelectionsAndBenefits = () => {
  const { cart, updateQuantity, removeItem, loading } = useCart();

  if (loading) {
    return (
      <section className="w-full bg-white flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-circular">Loading cart...</p>
        </div>
      </section>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <section className="w-full bg-white flex justify-center items-center py-12">
        <div className="text-center">
          <p className="text-gray-600 font-circular text-lg">Your cart is empty</p>
          <a href="/collections" className="mt-4 inline-block text-purple-900 hover:underline">
            Continue Shopping
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white flex flex-col md:flex-row gap-12 py-4 px-6 md:px-12">
      {/* Selections */}
      <div className="flex-1">
        <h2 className="text-lg md:text-xl font-light tracking-[0.2em] text-purple-900 mb-6 uppercase">
          Your Selections
        </h2>
        <div className="flex flex-col gap-6">
          {cart.items.map((item, idx) => (
            <div key={item._id || idx} className="flex bg-white border border-gray-200 p-4 ">
              <div className="flex flex-col md:flex-row items-center flex-1">
                <div className="w-20 h-20 mr-4 relative overflow-hidden">
                  <Image 
                    src={item.product?.images?.[0] || '/images/perf.png'} 
                    alt={item.product?.name || 'Product'} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-purple-900">
                      {item.product?.name || 'Product'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{item.size}</div>
                  <div className="flex items-center gap-2 mt-3">
                    <button 
                      onClick={() => item._id && updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity === 1}
                      className="px-2 py-1 border border-gray-300 rounded text-purple-900 disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button 
                      onClick={() => item._id && updateQuantity(item._id, item.quantity + 1)}
                      className="px-2 py-1 border border-gray-300 rounded text-purple-900"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-right min-w-[80px]">
                <button 
                  onClick={() => item._id && removeItem(item._id)}
                  className="text-gray-400 hover:text-purple-700"
                >
                  <Trash2 size={18} />
                </button>
                <span className="text-base font-semibold text-purple-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="flex-1 md:pl-8">
        <h2 className="text-lg md:text-xl font-light tracking-[0.2em] text-[#46315C] mb-6 uppercase">
          Included Benefits
        </h2>
        <ul className="space-y-5">
          <li>
            <span className="font-medium text-[#46315C]">Free Shipping</span>
            <div className="text-xs text-[#46315C]">On Orders Over $50</div>
          </li>
          <li>
            <span className="font-medium text-[#46315C]">Luxury Packaging</span>
            <div className="text-xs text-[#46315C]">Complimentary Gift Wrapping</div>
          </li>
          <li>
            <span className="font-medium text-[#46315C]">30-Days Returns</span>
            <div className="text-xs text-[#46315C]">Satisfaction Guaranteed</div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CartSelectionsAndBenefits;
