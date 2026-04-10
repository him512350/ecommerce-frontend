"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll("[data-reveal]").forEach((t) => t.classList.add("visible"));
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="featured-banner-inner">
      {/* Left: Product Photography */}
      <div data-reveal className="featured-banner__photo">
        <Link href="/products/starrytale-n15-wonder-treatment-cream">
          <Image
            src="https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2022/04/%E9%8B%AAN15.jpg?fit=4672%2C7008&ssl=1"
            alt="N.15 Wonder Treatment Cream"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </Link>
      </div>

      {/* Right: Brand story */}
      <div data-reveal className="featured-banner__info">
        <p className="featured-banner__eyebrow">Starrytale</p>
        <h2 className="featured-banner__title">N.15 Wonder Treatment Cream</h2>
        <p className="featured-banner__quote">&ldquo;Experience The Wonder Than Ever&rdquo;</p>
        <Link href="/products/starrytale-n15-wonder-treatment-cream" className="featured-banner__cta">
          Discover →
        </Link>
        <div className="featured-banner__detail-img">
          <Link href="/products/starrytale-n15-wonder-treatment-cream">
            <Image
              src="https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2022/04/DSC09798.jpg?fit=1024%2C683&ssl=1"
              alt="N.15 Detail"
              fill
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
