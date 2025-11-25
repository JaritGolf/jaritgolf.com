import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { type CartItem } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { items, customerEmail } = await request.json() as {
      items: CartItem[];
      customerEmail?: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Convert items to format Stripe expects
    const stripeItems = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}${item.image}`,
    }));

    const session = await createCheckoutSession(stripeItems, customerEmail);

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url,
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create checkout session',
      },
      { status: 500 }
    );
  }
}
