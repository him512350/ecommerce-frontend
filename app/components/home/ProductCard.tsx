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
    <div
      className="product-card"
      style={{
        background: "#fff",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Sale badge */}
      {product.onSale && (
        <span className="sale-badge">Sale!</span>
      )}

      {/* Image */}
      <Link href={`/products/${product.slug}`} style={{ display: "block", overflow: "hidden" }}>
        <div style={{ position: "relative", aspectRatio: "1/1", background: "#f5f0ea" }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: "12px 8px 8px" }}>
        <Link href={`/products/${product.slug}`} style={{ color: "inherit" }}>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 400,
              color: "#333",
              lineHeight: 1.4,
              marginBottom: 6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating !== undefined && product.rating > 0 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 6 }}>
            <div className="star-rating">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </div>
            {product.reviewCount !== undefined && (
              <span style={{ fontSize: "11px", color: "#999" }}>({product.reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div style={{ marginBottom: 8 }}>
          {product.onSale && product.comparePrice ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <del style={{ fontSize: "13px", color: "#999" }}>{product.comparePrice}</del>
              <strong style={{ fontSize: "14px", color: "#333" }}>{product.price}</strong>
            </span>
          ) : (
            <span style={{ fontSize: "14px", color: "#333", fontWeight: 600 }}>{product.price}</span>
          )}
        </div>

        {/* Add to basket */}
        <button className="add-to-basket-btn">Add to basket</button>
      </div>
    </div>
  );
}
