'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCart, updateCartItemQuantity, removeFromCart, getCartTotal, clearCart, type CartItem } from '@/lib/cart';

export default function Cart() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cartItems = getCart();
    setItems(cartItems);
    setTotal(getCartTotal());
    setIsLoading(false);

    // Listen for cart updates
    const handleStorageChange = () => {
      const updatedCart = getCart();
      setItems(updatedCart);
      setTotal(getCartTotal());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartItemQuantity(id, quantity);
    const updatedCart = getCart();
    setItems(updatedCart);
    setTotal(getCartTotal());
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    const updatedCart = getCart();
    setItems(updatedCart);
    setTotal(getCartTotal());
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="text-center py-20">
          <p className="text-xl text-black/70">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8">Shopping Cart</h1>
        <div className="text-center py-20">
          <p className="text-2xl md:text-3xl text-black/70 mb-6">Your cart is empty</p>
          <button
            onClick={() => router.push('/product')}
            className="px-8 py-4 bg-masters-green text-white text-lg font-semibold rounded hover:bg-black transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-black/10 rounded-lg p-6 flex flex-col md:flex-row gap-6"
            >
              {/* Product Image */}
              <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">{item.name}</h3>
                  <p className="text-xl md:text-2xl text-black/70 mb-4">
                    ${(item.price / 100).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mb-4">
                  <label htmlFor={`quantity-${item.id}`} className="text-lg font-semibold text-black">
                    Quantity:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-10 h-10 border-2 border-black/30 rounded flex items-center justify-center hover:bg-black/5 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10) || 1;
                        handleQuantityChange(item.id, newQuantity);
                      }}
                      className="w-16 h-10 border-2 border-black/30 rounded text-center text-lg font-semibold"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-10 h-10 border-2 border-black/30 rounded flex items-center justify-center hover:bg-black/5 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-auto text-red-600 hover:text-red-800 text-lg font-semibold underline"
                  >
                    Remove
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-xl md:text-2xl font-bold text-black">
                  Subtotal: ${((item.price * item.quantity) / 100).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-black/10 rounded-lg p-6 sticky top-24">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg text-black/70">
                <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg text-black/70">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t-2 border-black/10 pt-4">
                <div className="flex justify-between text-2xl font-bold text-black">
                  <span>Total</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full px-8 py-4 bg-masters-green text-white text-lg font-semibold rounded hover:bg-black transition-colors mb-4"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => router.push('/product')}
              className="w-full px-8 py-4 border-2 border-black/30 text-black text-lg font-semibold rounded hover:bg-black/5 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

