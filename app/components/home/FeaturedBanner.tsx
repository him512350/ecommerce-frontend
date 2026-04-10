"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) el.querySelectorAll("[data-reveal]").forEach((t) => t.classList.add("visible")); }); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="grid grid-cols-1 md:grid-cols-2 bg-stone-50 overflow-hidden">
      {/* Left — photography */}
      <div data-reveal className="relative min-h-[400px] md:min-h-[600px] overflow-hidden">
        <Link href="/products/starrytale-n15-wonder-treatment-cream" className="block relative h-full min-h-[400px] md:min-h-[600px]">
          <Image
            src="https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2022/04/%E9%8B%AAN15.jpg?fit=4672%2C7008&ssl=1"
            alt="N.15 Wonder Treatment Cream"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </Link>
      </div>

      {/* Right — info */}
      <div data-reveal className="flex flex-col justify-center px-10 md:px-14 py-14 bg-white">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3" style={{ fontFamily: "var(--font-sans)" }}>
          Starrytale
        </p>
        <h2 className="text-[clamp(1.3rem,2vw,2rem)] font-bold leading-snug text-gray-800 mb-4" style={{ fontFamily: "var(--font-serif)" }}>
          N.15 Wonder Treatment Cream
        </h2>
        <p className="text-sm text-gray-500 italic mb-8 leading-relaxed">
          &ldquo;Experience The Wonder Than Ever&rdquo;
        </p>
        <Link
          href="/products/starrytale-n15-wonder-treatment-cream"
          className="inline-flex items-center bg-[#111] text-white text-sm px-7 py-3 hover:bg-[#808080] transition-colors w-fit tracking-wide"
        >
          Discover →
        </Link>

        <div className="mt-8 relative aspect-[3/2] max-w-md overflow-hidden">
          <Link href="/products/starrytale-n15-wonder-treatment-cream" className="block relative h-full">
            <Image
              src="https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2022/04/DSC09798.jpg?fit=1024%2C683&ssl=1"
              alt="N.15 Detail"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
