'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate verification
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-masters-green"></div>
          <p className="mt-4 text-black">Verifying your order...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-16 w-16 text-masters-green"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-xl text-black/70 mb-8">
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>

        {sessionId && (
          <p className="text-sm text-black/60 mb-8">
            Order reference: {sessionId.slice(0, 12)}...
          </p>
        )}

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-black text-white px-8 py-4 text-lg font-medium hover:bg-masters-green transition-all duration-300"
          >
            Return to Home
          </Link>
          
          <p className="text-sm text-black/60">
            You will receive a shipping confirmation email soon.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-masters-green"></div>
          <p className="mt-4 text-black">Loading...</p>
        </div>
      </main>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
