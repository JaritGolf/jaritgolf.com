'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProductPageContent } from '@/lib/content';
import { addToCart } from '@/lib/cart';
import { formatPrice } from '@/lib/utils';

export default function ProductDetails() {
  const router = useRouter();
  const content = getProductPageContent().product_details_section;
  const [showSticky, setShowSticky] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: 'speed-machine-001',
      name: 'The Speed Machine',
      price: 49900,
      image: '/images/main-photo.jpeg',
    });
    router.push('/cart');
  };

  // Show sticky cart after scrolling
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setShowSticky(window.scrollY > 800);
    });
  }

  return (
    <section className="py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12 md:mb-16 text-center leading-tight">
          {content.header}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {content.specs.map((spec, index) => (
            <div
              key={index}
              className="bg-white border-2 border-black p-6 md:p-8 hover:border-masters-green transition-all duration-300 group hover:shadow-xl"
            >
              <h3 className="text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-masters-green transition-colors">
                {spec.title}
              </h3>
              <p className="text-base md:text-lg text-black/70 leading-relaxed">
                {spec.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Cart Sidebar */}
      {showSticky && (
        <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
          <div className="bg-white border-4 border-black p-6 shadow-2xl min-w-[300px]">
            <h3 className="text-2xl font-bold text-black mb-2">The Speed Machine</h3>
            <p className="text-3xl font-bold text-masters-green mb-6">
              {formatPrice(49900)}
            </p>
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white px-6 py-4 font-medium hover:bg-masters-green transition-all duration-300 hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

