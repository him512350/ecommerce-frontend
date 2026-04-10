"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const igPosts = [
  { id: 1, image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM.jpeg?resize=600%2C600&ssl=1", href: "https://www.instagram.com/p/DW3Z8AAiGF0/", alt: "Joy Bloom 4月滿額贈品" },
  { id: 2, image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM-1.jpeg?resize=600%2C600&ssl=1", href: "https://www.instagram.com/p/DWvriRtDS_F/", alt: "Happy Easter" },
  { id: 3, image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM-2.jpeg?resize=600%2C600&ssl=1", href: "https://www.instagram.com/p/DWnQixOiChQ/", alt: "Easter Glow Promotion" },
  { id: 4, image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetB-Icon_p1.jpg?resize=600%2C600&ssl=1", href: "https://www.instagram.com/p/DWlKwl8GJa5/", alt: "4月優惠 Set B" },
  { id: 5, image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetA-Icon-p1.jpg?resize=600%2C600&ssl=1", href: "https://www.instagram.com/p/DWlDx2GAQ9m/", alt: "4月優惠 Set A" },
  { id: 6, image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/Wonder-Aroma-Odyssey-The-Glow-50ml.png?resize=600%2C600&ssl=1", href: "https://www.instagram.com/p/DWkvL-4ghK6/", alt: "Wonder Aroma Odyssey" },
];

export default function InstagramSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) el.querySelectorAll("[data-reveal],[data-reveal-stagger]").forEach((t) => t.classList.add("visible")); }); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-5 py-12">
      <div data-reveal className="text-center mb-8">
        <Link
          href="https://www.instagram.com/littlestardustc/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[clamp(1rem,2vw,1.4rem)] text-gray-800 tracking-wide hover:text-[#c9a98a] transition-colors"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          @littlestardustc
        </Link>
      </div>

      <div data-reveal-stagger className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {igPosts.map((post) => (
          <Link
            key={post.id}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-square overflow-hidden bg-stone-100 group"
          >
            <Image
              src={post.image}
              alt={post.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
          </Link>
        ))}
      </div>
    </section>
  );
}
