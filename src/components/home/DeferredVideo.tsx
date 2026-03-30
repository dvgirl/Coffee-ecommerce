"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function DeferredVideo({ src, poster }: { src: string, poster: string }) {
  const [showVideo, setShowVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShowVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {!showVideo ? (
        <Image
          src={poster}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
