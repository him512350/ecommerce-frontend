"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    bg: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM.jpeg?w=1600&ssl=1",
    href: null,
    label: "Hero Banner",
  },
  {
    id: 2,
    bg: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetA-Icon-p1.jpg?w=2160&ssl=1",
    href: null,
    label: "Banner 2",
  },
  {
    id: 3,
    bg: "https://littlestardusthk.com/wp-content/uploads/elementor/css/post-20722.css",
    href: "/shop/product-category/special-item/wonder-aroma-odyssey",
    label: "Wonder Aroma Odyssey",
  },
  {
    id: 4,
    bg: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetA-Icon-p1.jpg?w=2160&ssl=1",
    href: "/products/202604-seta-radiant-brightening-set",
    label: "Set A",
  },
  {
    id: 5,
    bg: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetB-Icon_p1.jpg?w=2160&ssl=1",
    href: "/products/202604-setb-de-blemish-solution",
    label: "Set B",
  },
];

// Actual hero slide images from the real website
const heroSlides = [
  {
    id: 1,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM.jpeg?resize=1600%2C900&ssl=1",
    href: null,
  },
  {
    id: 2,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetA-Icon-p1.jpg?resize=1600%2C900&ssl=1",
    href: "/products/202604-seta-radiant-brightening-set",
  },
  {
    id: 3,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetB-Icon_p1.jpg?resize=1600%2C900&ssl=1",
    href: "/products/202604-setb-de-blemish-solution",
  },
  {
    id: 4,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/Wonder-Aroma-Odyssey-The-Glow-50ml.png?resize=1600%2C900&ssl=1",
    href: "/shop/product-category/special-item",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const next = () => goTo((current + 1) % heroSlides.length);
  const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const slide = heroSlides[current];

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden", background: "#f5f0ea" }}>
      {/* Slides */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/7", minHeight: 300 }}>
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.8s ease",
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            {s.href ? (
              <Link href={s.href} style={{ display: "block", height: "100%" }}>
                <Image
                  src={s.image}
                  alt={`Slide ${s.id}`}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  priority={i === 0}
                />
              </Link>
            ) : (
              <Image
                src={s.image}
                alt={`Slide ${s.id}`}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority={i === 0}
              />
            )}
          </div>
        ))}

        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "rgba(0,0,0,0.25)",
            border: "none",
            color: "#fff",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "rgba(0,0,0,0.25)",
            border: "none",
            color: "#fff",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ›
        </button>

        {/* Pagination */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
            zIndex: 10,
          }}
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? "#e9d3c4" : "rgba(255,255,255,0.6)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
