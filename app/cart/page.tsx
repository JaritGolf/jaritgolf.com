import Cart from '../components/Cart';

export const metadata = {
  title: 'Shopping Cart | The Speed Machine',
  description: 'Review your cart and proceed to checkout',
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <Cart />
    </main>
  );
}
