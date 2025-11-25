'use client';

import { useRouter } from 'next/navigation';
import { getProductPageContent } from '@/lib/content';
import { addToCart } from '@/lib/cart';
import ProductHeroScroll from '../components/ProductHeroScroll';
import ProductDetailsScroll from '../components/ProductDetailsScroll';
import TrainingProgramsScroll from '../components/TrainingProgramsScroll';

export default function ProductPage() {
  const router = useRouter();
  const content = getProductPageContent();

  const handleAddToCart = () => {
    addToCart({
      id: 'speed-machine-001',
      name: 'The Speed Machine',
      price: 49900,
      image: '/images/main-photo.jpeg',
    });
    router.push('/cart');
  };

  return (
    <main className="min-h-screen bg-white">
      <ProductHeroScroll onAddToCart={handleAddToCart} />
      <ProductDetailsScroll />
      <TrainingProgramsScroll />
    </main>
  );
}
