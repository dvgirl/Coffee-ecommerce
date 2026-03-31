"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    id: "coffee",
    eyebrow: "Fresh Coffee",
    title: "Start every morning with a rich and real",
    accent: "coffee ritual",
    description: "Aromatic roasted beans and smooth blends for cafe-style moments at home.",
    cta: "Shop Coffee",
    href: "/shop?category=Coffee",
    image: "/banners/banner-1.png",
    alt: "Real coffee cup with roasted coffee beans on a table",
    imageClassName: "object-[78%_center]",
  },
  {
    id: "tea",
    eyebrow: "Pure Tea",
    title: "Bring calm to your routine with vibrant",
    accent: "whole-leaf tea",
    description: "Refreshing teas with natural aroma and a soothing taste for slow daily rituals.",
    cta: "Shop Tea",
    href: "/shop?category=Tea",
    image: "/categories/tea.png",
    alt: "Real green tea leaves in a bowl",
    imageClassName: "object-cover",
  },
  {
    id: "dryfruit",
    eyebrow: "Premium Dry Fruits",
    title: "Pair your day with nourishing dry fruits and",
    accent: "rich texture",
    description: "Wholesome almonds, cashews, dates, and premium mixes curated for flavor and quality.",
    cta: "Shop Dry Fruits",
    href: "/shop?category=Dryfruit",
    image: "/categories/dryfruit.png",
    alt: "Real dry fruits arranged in a bowl",
    imageClassName: "object-cover",
  },
  {
    id: "spices",
    eyebrow: "Bold Spices",
    title: "Fill your kitchen with warm spice notes and",
    accent: "real depth",
    description: "Handpicked spices that bring color, aroma, and bold depth to every dish.",
    cta: "Shop Spices",
    href: "/shop?category=Spices",
    image: "/categories/spices.png",
    alt: "Real spices displayed in bowls",
    imageClassName: "object-cover",
  },
];

const BEANS_LEFT = [
  { top: "10%", left: "2%", size: 50, rotate: -18, opacity: 0.18 },
  { top: "32%", left: "7%", size: 34, rotate: 18, opacity: 0.12 },
  { top: "62%", left: "3%", size: 46, rotate: -30, opacity: 0.18 },
  { top: "82%", left: "8%", size: 30, rotate: 12, opacity: 0.1 },
];

const BEANS_RIGHT = [
  { top: "12%", right: "3%", size: 48, rotate: 20, opacity: 0.18 },
  { top: "36%", right: "8%", size: 34, rotate: -20, opacity: 0.12 },
  { top: "64%", right: "4%", size: 44, rotate: 28, opacity: 0.18 },
  { top: "84%", right: "9%", size: 30, rotate: -16, opacity: 0.1 },
];

type BeanProps = {
  beanId: string;
  top: string;
  left?: string;
  right?: string;
  size: number;
  rotate: number;
  opacity: number;
};

function CoffeeBean({ beanId, top, left, right, size, rotate, opacity }: BeanProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 140"
      className="pointer-events-none absolute z-10"
      style={{
        top,
        left,
        right,
        width: `${size}px`,
        height: `${size * 1.4}px`,
        transform: `rotate(${rotate}deg)`,
        opacity,
      }}
    >
      <defs>
        <linearGradient id={beanId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ddb88e" />
          <stop offset="50%" stopColor="#8b5a2b" />
          <stop offset="100%" stopColor="#4b2e1c" />
        </linearGradient>
      </defs>
      <path
        d="M50 6C24 6 7 29 7 60c0 39 22 74 43 74 24 0 43-34 43-74C93 29 75 6 50 6Z"
        fill={`url(#${beanId})`}
      />
      <path
        d="M58 18C42 35 36 58 38 85c1 18 7 33 18 45"
        fill="none"
        stroke="#f6e6d3"
        strokeWidth="6"
        strokeLinecap="round"
        strokeOpacity="0.72"
      />
    </svg>
  );
}

export default function ImageBannerSlider() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const slide = SLIDES[index];
  const sectionMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -72 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 42 },
        transition: { duration: 1.18, ease: [0.16, 1, 0.3, 1] },
      };

  const textMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -54 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 1.08, delay: 0.06, ease: [0.16, 1, 0.3, 1] },
      };

  const imageMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -34, scale: 0.985 },
        animate: { opacity: 1, x: 0, scale: 1 },
        transition: { duration: 1.18, delay: 0.14, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-[#ead7c3]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,252,247,0.92),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(178,124,78,0.2),transparent_28%),linear-gradient(125deg,#fbf4ec_0%,#f2e3d2_30%,#e3c2a2_62%,#c79668_100%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="absolute -left-24 top-16 h-52 w-52 rounded-full bg-white/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-primary/14 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(53,33,20,0.08),transparent_45%,rgba(53,33,20,0.1))]" />

      {BEANS_LEFT.map((bean, beanIndex) => (
        <CoffeeBean key={`left-${beanIndex}`} beanId={`hero-bean-left-${beanIndex}`} {...bean} />
      ))}
      {BEANS_RIGHT.map((bean, beanIndex) => (
        <CoffeeBean key={`right-${beanIndex}`} beanId={`hero-bean-right-${beanIndex}`} {...bean} />
      ))}

      <div className="relative z-20 container mx-auto flex min-h-[72vh] max-w-7xl items-center px-6 py-10 md:px-10 lg:min-h-[680px] lg:px-12 lg:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="grid w-full items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]"
            initial={"initial" in sectionMotion ? sectionMotion.initial : false}
            animate={"animate" in sectionMotion ? sectionMotion.animate : undefined}
            exit={"exit" in sectionMotion ? sectionMotion.exit : undefined}
            transition={"transition" in sectionMotion ? sectionMotion.transition : undefined}
          >
            <motion.div
              className="max-w-2xl"
              initial={"initial" in textMotion ? textMotion.initial : false}
              animate={"animate" in textMotion ? textMotion.animate : undefined}
              transition={"transition" in textMotion ? textMotion.transition : undefined}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/45 bg-white/45 px-4 py-2 shadow-[0_14px_32px_rgba(52,31,19,0.08)] backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(178,124,78,0.6)]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-primary">{slide.eyebrow}</p>
              </div>

              <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-[1.02] text-foreground sm:text-5xl lg:text-[3.7rem]">
                {slide.title}
                <span className="mt-1.5 block font-serif text-[1.02em] font-medium italic text-primary">
                  {slide.accent}
                </span>
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-muted md:text-base">
                {slide.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={slide.href}
                  className="rounded-full bg-coffee-dark px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_18px_36px_rgba(42,28,22,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_22px_42px_rgba(42,28,22,0.2)]"
                >
                  {slide.cta}
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border border-foreground/10 bg-white/58 px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-foreground shadow-[0_12px_28px_rgba(255,255,255,0.16)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/78"
                >
                  Our Story
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {SLIDES.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndex(itemIndex)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      itemIndex === index ? "w-12 bg-coffee-dark" : "w-6 bg-coffee-dark/25 hover:bg-coffee-dark/45"
                    }`}
                    aria-label={`Show ${item.eyebrow} banner`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex justify-end"
              initial={"initial" in imageMotion ? imageMotion.initial : false}
              animate={"animate" in imageMotion ? imageMotion.animate : undefined}
              transition={"transition" in imageMotion ? imageMotion.transition : undefined}
            >
              <div className="relative h-[250px] w-full max-w-[660px] overflow-hidden rounded-[1.75rem] border border-white/45 bg-white/55 shadow-[0_26px_70px_rgba(52,31,19,0.12)] ring-1 ring-white/30 sm:h-[320px] lg:h-[430px]">
                <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_42%,rgba(255,255,255,0.08))]" />
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 88vw, 52vw"
                  className={slide.imageClassName}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(42,28,22,0.06))]" />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
