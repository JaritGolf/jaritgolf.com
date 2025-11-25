'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { type Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white border-2 border-black hover:border-masters-green transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0] || '/images/main-photo.jpeg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-bold text-black mb-2 group-hover:text-masters-green transition-colors">
          {product.name}
        </h3>

        <p className="text-black/70 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-masters-green">
            {formatPrice(product.price)}
          </span>

          <span className="px-4 py-2 bg-black text-white group-hover:bg-masters-green transition-colors">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}


