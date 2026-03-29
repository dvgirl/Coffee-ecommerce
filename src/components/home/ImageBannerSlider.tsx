"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const BANNERS = [
  { img: "/banners/banner-1.png", alt: "Aura Golden Ritual" },
  { img: "/banners/banner-2.png", alt: "Aura Velvet Dusk" },
  { img: "/banners/banner-3.png", alt: "Aura Neon Organic" },
  { img: "/banners/banner-4.png", alt: "Aura Lo-fi Luxury" },
];

export default function ImageBannerSlider() {
  const [index, setIndex] = useState(0);
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    setIsFirstMount(false);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="hero" className="relative w-full aspect-square md:aspect-[16/5] overflow-hidden bg-white group">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={isFirstMount ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={BANNERS[index].img}
            alt={BANNERS[index].alt}
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="100vw"
            className="object-cover"
          />
          {/* Subtle Invisible Overlay for Shop link */}
          <Link href="/shop" className="absolute inset-0 z-0">
            <span className="sr-only">Go to Shop</span>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-700",
              i === index ? "bg-primary scale-125 shadow-[0_0_10px_rgba(178,124,78,0.5)]" : "bg-black/20 hover:bg-black/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
