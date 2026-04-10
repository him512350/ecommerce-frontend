"use client";

import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number | string;
  name: string;
  slug: string;
  price: string;
  comparePrice?: string;
  image: string;
  onSale?: boolean;
  rating?: number;
  reviewCount?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white relative overflow-hidden text-center group transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      {product.onSale && (
        <span className="absolute top-2 left-2 z-10 bg-[#e9d3c4] text-black text-[11px] font-semibold px-2 py-0.5">
          Sale!
        </span>
      )}

      <Link href={`/products/${product.slug}`} className="block overflow-hidden">
        <div className="relative w-full aspect-square bg-stone-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-2 pb-3">
        <Link href={`/products/${product.slug}`}>
          <h3
            className="text-[13px] text-gray-700 leading-snug mb-1.5 line-clamp-2"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
          >
            {product.name}
          </h3>
        </Link>

        {product.rating && product.rating > 0 && (
          <div className="flex items-center justify-center gap-1 mb-1.5">
            <span className="text-[#4b4f58] text-xs">{"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}</span>
            {product.reviewCount && <span className="text-[11px] text-gray-400">({product.reviewCount})</span>}
          </div>
        )}

        <div className="mb-2">
          {product.onSale && product.comparePrice ? (
            <span className="flex items-center justify-center gap-2">
              <del className="text-[13px] text-gray-400">{product.comparePrice}</del>
              <strong className="text-sm text-gray-800">{product.price}</strong>
            </span>
          ) : (
            <span className="text-sm font-semibold text-gray-800">{product.price}</span>
          )}
        </div>

        <button
          className="w-full bg-[#111] text-white text-[13px] py-2 px-3 cursor-pointer border-0 transition-colors duration-150 hover:bg-[#808080]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Add to basket
        </button>
      </div>
    </div>
  );
}
