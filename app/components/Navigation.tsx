'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getCart } from '@/lib/cart';

export default function Navigation() {
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.jpg"
            alt="The Speed Machine"
            width={60}
            height={60}
            className="object-contain"
          />
        </Link>
        
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href="/product"
            className="text-black hover:text-masters-green transition-colors font-medium"
          >
            Product
          </Link>
          <Link
            href="/cart"
            className="relative text-black hover:text-masters-green transition-colors font-medium"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-masters-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

