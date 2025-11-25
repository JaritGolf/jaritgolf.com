'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCart, getCartTotal, clearCart } from '@/lib/cart';
import { formatPrice, isValidEmail } from '@/lib/utils';
import { type CartItem } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
  });

  useEffect(() => {
    const cartItems = getCart();
    if (cartItems.length === 0) {
      router.push('/cart');
      return;
    }
    setItems(cartItems);
    setTotal(getCartTotal());
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerEmail: formData.email,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Clear cart before redirecting to Stripe
      clearCart();

      // Redirect to Stripe Checkout
      if (data.data.url) {
        window.location.href = data.data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div className="border-2 border-black p-6 md:p-8">
            <h2 className="text-2xl font-bold text-black mb-6">Customer Information</h2>

            {error && (
              <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black focus:border-masters-green outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black focus:border-masters-green outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-black focus:border-masters-green outline-none transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white px-8 py-4 text-lg font-medium hover:bg-masters-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Continue to Payment'}
              </button>

              <p className="text-sm text-black/60 text-center">
                You will be redirected to Stripe for secure payment processing
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="border-2 border-black p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{item.name}</h3>
                      <p className="text-sm text-black/60">Quantity: {item.quantity}</p>
                      <p className="text-masters-green font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-black pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-black">Subtotal:</span>
                  <span className="font-semibold text-black">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-black">Shipping:</span>
                  <span className="font-semibold text-black">FREE</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-black">Total:</span>
                  <span className="text-masters-green">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
