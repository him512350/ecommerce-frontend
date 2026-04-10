"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const heroSlides = [
  {
    id: 1,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM.jpeg?resize=1600%2C900&ssl=1",
    href: null,
  },
  {
    id: 2,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetA-Icon-p1.jpg?w=2160&ssl=1",
    href: "/products/202604-seta-radiant-brightening-set",
  },
  {
    id: 3,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetB-Icon_p1.jpg?w=2160&ssl=1",
    href: "/products/202604-setb-de-blemish-solution",
  },
  {
    id: 4,
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/Wonder-Aroma-Odyssey-The-Glow-50ml.png?w=2500&ssl=1",
    href: "/shop/product-category/special-item",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => setCurrent(index);
  const next = () => setCurrent((c) => (c + 1) % heroSlides.length);
  const prev = () => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", background: "#f5f0ea", overflow: "hidden" }}>
      {/* Slide container — fixed aspect ratio */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "43.75%" /* 16:7 */ }}>
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.8s ease",
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            {slide.href ? (
              <Link href={slide.href} style={{ display: "block", position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  priority={i === 0}
                />
              </Link>
            ) : (
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  priority={i === 0}
                />
              </div>
            )}
          </div>
        ))}

        {/* Prev / Next */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", zIndex:10, background:"rgba(0,0,0,0.25)", border:"none", color:"#fff", width:40, height:40, fontSize:22, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
        >‹</button>
        <button
          onClick={next}
          aria-label="Next slide"
          style={{ position:"absolute", right:16, top:"50%", transform:"translateY(-50%)", zIndex:10, background:"rgba(0,0,0,0.25)", border:"none", color:"#fff", width:40, height:40, fontSize:22, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
        >›</button>

        {/* Dots */}
        <div style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8, zIndex:10 }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{ width: i===current?24:8, height:8, borderRadius:4, background: i===current?"#e9d3c4":"rgba(255,255,255,0.6)", border:"none", cursor:"pointer", padding:0, transition:"width 0.3s ease, background 0.3s ease" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
