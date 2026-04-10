"use client";

import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
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

interface ProductSectionProps {
  title: string;
  products: Product[];
  columns?: number;
  viewAllHref?: string;
}

export default function ProductSection({
  title,
  products,
  columns = 4,
  viewAllHref,
}: ProductSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll("[data-reveal], [data-reveal-stagger]").forEach((t) =>
              t.classList.add("visible")
            );
          }
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cols = Math.min(columns, products.length);

  return (
    <section
      ref={sectionRef}
      style={{ padding: "48px 20px", maxWidth: 1200, margin: "0 auto" }}
    >
      <div
        className="product-section-inner"
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "0 40px",
          alignItems: "start",
        }}
      >
        {/* Title column */}
        <div data-reveal>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
              fontWeight: 700,
              color: "#333",
              lineHeight: 1.3,
            }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {viewAllHref && (
            <Link
              href={viewAllHref}
              style={{
                display: "inline-block",
                marginTop: 16,
                fontSize: "13px",
                color: "#333",
                borderBottom: "1px solid var(--accent)",
                paddingBottom: 2,
              }}
            >
              View all →
            </Link>
          )}
        </div>

        {/* Products grid */}
        <div
          data-reveal-stagger
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 16,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
