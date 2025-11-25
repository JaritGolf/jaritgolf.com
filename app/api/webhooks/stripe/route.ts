import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/stripe';
import prisma from '@/lib/db';
import { OrderStatus } from '@/types';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  try {
    const event = constructWebhookEvent(body, signature);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      
      case 'payment_intent.succeeded':
        console.log('Payment intent succeeded:', event.data.object.id);
        break;
      
      case 'payment_intent.payment_failed':
        console.log('Payment intent failed:', event.data.object.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    // Parse items from metadata
    const items = JSON.parse(session.metadata?.items || '[]');
    
    if (!items.length) {
      console.error('No items found in session metadata');
      return;
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        customerEmail: session.customer_email || session.customer_details?.email || '',
        customerName: session.customer_details?.name || 'Guest',
        customerPhone: session.customer_details?.phone,
        total: session.amount_total || 0,
        status: OrderStatus.PAID,
        stripeSessionId: session.id,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    console.log('Order created successfully:', order.id);
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}
