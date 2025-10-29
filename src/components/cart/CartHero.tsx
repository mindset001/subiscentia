'use client';

const CartHero = () => (
  <section className="relative h-[400px] flex flex-col items-center justify-center overflow-hidden bg-white">
    {/* Background image and purple accent (if needed) can be added here */}
    <div className="absolute inset-0 z-0">
      <img
        src="/images/frag.png"
        alt="Collections Hero Background"
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/60 to-transparent"></div>
    </div>
    <div className="relative z-10 w-full text-center px-4">
      <h1 className="text-[10vw] font-light text-purple-900 mb-6 tracking-wide leading-tight" style={{ fontFamily: 'inherit' }}>
       Shopping Cart
      </h1>
      <div className="mt-8 flex justify-center">
        <p className="w-[70%] text-xs md:text-[24px] font-light tracking-widest text-gray-700 uppercase">
         2 items in your cart
        </p>
      </div>
    </div>
  </section>
);

export default CartHero;
