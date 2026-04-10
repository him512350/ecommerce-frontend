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

interface Props {
  title: string;
  products: Product[];
  columns?: number;
  viewAllHref?: string;
}

export default function ProductSection({ title, products, columns = 4, viewAllHref }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) el.querySelectorAll("[data-reveal],[data-reveal-stagger]").forEach((t) => t.classList.add("visible"));
        });
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cols = Math.min(columns, products.length);
  const gridCols: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  };

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-5 py-12">
      <div className="grid gap-10" style={{ gridTemplateColumns: "200px 1fr" }}>
        {/* Title column */}
        <div data-reveal className="pt-1">
          <h2
            className="text-[clamp(1.3rem,2.5vw,1.9rem)] font-bold leading-snug text-gray-800"
            style={{ fontFamily: "var(--font-serif)" }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="inline-block mt-4 text-[13px] text-gray-700 border-b border-[#e9d3c4] pb-0.5 hover:text-[#c9a98a] transition-colors"
            >
              View all →
            </Link>
          )}
        </div>

        {/* Grid */}
        <div data-reveal-stagger className={`grid gap-4 ${gridCols[cols] ?? "grid-cols-4"}`}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
