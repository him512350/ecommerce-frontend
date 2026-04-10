"use client";

import { useEffect, useRef } from "react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Autoplay silently
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <section style={{ width: "100%", overflow: "hidden", maxHeight: 500, background: "#111" }}>
      <video
        ref={videoRef}
        src="https://littlestardusthk.com/wp-content/uploads/2023/09/video-output-6206C58E-7995-42F5-8240-C2371C8BBEB5.mov"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        aria-label="Little Stardust brand video"
      />
    </section>
  );
}
