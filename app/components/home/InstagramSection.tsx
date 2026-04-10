"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const igPosts = [
  {
    id: 1,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM.jpeg?resize=600%2C600&ssl=1",
    href: "https://www.instagram.com/p/DW3Z8AAiGF0/",
    alt: "Joy Bloom 星悅綻放 4月滿額贈品",
  },
  {
    id: 2,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM-1.jpeg?resize=600%2C600&ssl=1",
    href: "https://www.instagram.com/p/DWvriRtDS_F/",
    alt: "Happy Easter",
  },
  {
    id: 3,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM-2.jpeg?resize=600%2C600&ssl=1",
    href: "https://www.instagram.com/p/DWnQixOiChQ/",
    alt: "Easter Glow Promotion",
  },
  {
    id: 4,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetB-Icon_p1.jpg?resize=600%2C600&ssl=1",
    href: "https://www.instagram.com/p/DWlKwl8GJa5/",
    alt: "4月優惠 Set B De-Blemish Solution",
  },
  {
    id: 5,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetA-Icon-p1.jpg?resize=600%2C600&ssl=1",
    href: "https://www.instagram.com/p/DWlDx2GAQ9m/",
    alt: "4月優惠 Set A Radiant Brightening Set",
  },
  {
    id: 6,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/Wonder-Aroma-Odyssey-The-Glow-50ml.png?resize=600%2C600&ssl=1",
    href: "https://www.instagram.com/p/DWkvL-4ghK6/",
    alt: "Wonder Aroma Odyssey The Glow",
  },
];

export default function InstagramSection() {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ padding: "48px 20px", maxWidth: 1200, margin: "0 auto" }}
    >
      <div data-reveal style={{ textAlign: "center", marginBottom: 32 }}>
        <Link
          href="https://www.instagram.com/littlestardustc/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1rem, 2vw, 1.4rem)",
            color: "#333",
            letterSpacing: "0.05em",
          }}
        >
          @littlestardustc
        </Link>
      </div>

      <div
        className="instagram-grid"
        data-reveal-stagger
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        {igPosts.map((post) => (
          <Link
            key={post.id}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              position: "relative",
              aspectRatio: "1/1",
              overflow: "hidden",
              background: "#f5f0ea",
            }}
          >
            <Image
              src={post.image}
              alt={post.alt}
              fill
              style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
              }
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
