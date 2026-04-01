import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

type BeanProps = {
  className: string;
  style?: CSSProperties;
};

function CoffeeBean({ className, style }: BeanProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 140"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="hero-bean-fill" x1="10%" y1="8%" x2="88%" y2="92%">
          <stop offset="0%" stopColor="#d8a57c" />
          <stop offset="48%" stopColor="#8c5935" />
          <stop offset="100%" stopColor="#4e2d1b" />
        </linearGradient>
      </defs>
      <path
        d="M50 6C24 6 7 29 7 60c0 39 22 74 43 74 24 0 43-34 43-74C93 29 75 6 50 6Z"
        fill="url(#hero-bean-fill)"
      />
      <path
        d="M58 18C42 35 36 58 38 85c1 18 7 33 18 45"
        fill="none"
        stroke="#f5e5d6"
        strokeWidth="6"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
}

const LEFT_BEANS = [
  { top: "7%", left: "-0.7rem", width: 76, rotate: "-18deg", opacity: 1 },
  { top: "30%", left: "2.6rem", width: 54, rotate: "24deg", opacity: 0.95 },
  { top: "59%", left: "-1.8rem", width: 132, rotate: "-30deg", opacity: 0.92 },
  { top: "83%", left: "2.5rem", width: 48, rotate: "-36deg", opacity: 0.92 },
];

const RIGHT_BEANS = [
  { top: "8%", right: "-0.7rem", width: 72, rotate: "16deg", opacity: 0.95 },
  { top: "30%", right: "3rem", width: 44, rotate: "-24deg", opacity: 0.92 },
  { top: "56%", right: "2.8rem", width: 58, rotate: "18deg", opacity: 0.92 },
  { top: "72%", right: "-1.2rem", width: 118, rotate: "26deg", opacity: 0.95 },
  { top: "90%", right: "-0.5rem", width: 68, rotate: "-18deg", opacity: 0.94 },
];

export default function ImageBannerSlider() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_center,rgba(245,236,223,0.95)_0%,rgba(245,236,223,0.78)_26%,rgba(246,240,231,0)_52%),linear-gradient(180deg,#f8f3eb_0%,#f5eee4_46%,#f2eae1_100%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[linear-gradient(270deg,rgba(247,241,232,0.96)_0%,rgba(247,241,232,0.88)_38%,rgba(247,241,232,0)_100%)] lg:block" />

      {LEFT_BEANS.map((bean, index) => (
        <CoffeeBean
          key={`left-${index}`}
          className="hero-bean pointer-events-none absolute z-10 hidden md:block"
          style={{
            top: bean.top,
            left: bean.left,
            width: `${bean.width}px`,
            height: `${bean.width * 1.4}px`,
            transform: `rotate(${bean.rotate})`,
            opacity: bean.opacity,
            ["--bean-opacity" as string]: bean.opacity,
          }}
        />
      ))}

      {RIGHT_BEANS.map((bean, index) => (
        <CoffeeBean
          key={`right-${index}`}
          className="hero-bean pointer-events-none absolute z-10 hidden md:block"
          style={{
            top: bean.top,
            right: bean.right,
            width: `${bean.width}px`,
            height: `${bean.width * 1.4}px`,
            transform: `rotate(${bean.rotate})`,
            opacity: bean.opacity,
            ["--bean-opacity" as string]: bean.opacity,
          }}
        />
      ))}

      <div className="relative z-20 container mx-auto grid min-h-[72vh] max-w-7xl items-center gap-10 px-6 py-14 md:px-10 lg:min-h-[760px] lg:grid-cols-[0.94fr_1.06fr] lg:px-12">
        <div className="hero-copy-left mx-auto w-full max-w-[520px] lg:ml-16">
          <p className="text-[1.05rem] font-medium tracking-wide uppercase text-[#B27C4E] sm:text-[1.15rem]">
            Black coffee is awesome.
          </p>

          <h1 className="mt-5 text-[3.25rem] font-black font-serif uppercase leading-[0.9] text-[#2A1C16] sm:text-[4.5rem] lg:text-[6rem]">
            Time Discover
            <span className="block text-[#8B5A2B]">Coffee House</span>
          </h1>

          <p className="mt-6 max-w-[520px] text-lg leading-10 text-[#7A6355] sm:text-[1.05rem] sm:leading-9">
            Experience the decibels like your ears deserve to. Safe for the ears,
            very for the heart. A treat to your ears.
          </p>

          <Link
            href="/shop?category=Coffee"
            className="mt-10 inline-flex items-center gap-4 rounded-full bg-[#B27C4E] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(178,124,78,0.28)] transition-all duration-300 hover:bg-[#8B5A2B] hover:-translate-y-1"
          >
            Explore More
            <ShoppingCart className="h-4 w-4" />
          </Link>
        </div>

        <div className="hero-photo-right relative flex min-h-[320px] items-center justify-center lg:min-h-[560px]">
          <div className="absolute h-56 w-56 rounded-full bg-[#d5ab7e]/20 blur-[90px] sm:h-72 sm:w-72 lg:h-80 lg:w-80" />
          <div className="absolute left-1/2 top-[46%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fbf7f1]/90 blur-[75px] sm:h-60 sm:w-60" />
          <div className="hero-cup-frame relative h-[300px] w-full max-w-[640px] sm:h-[380px] lg:h-[520px]">
            <svg
              viewBox="0 0 1024 1024"
              className="hero-cup-image absolute inset-0 h-full w-full object-contain object-center drop-shadow-[0_28px_45px_rgba(66,40,22,0.14)]"
              aria-label="Coffee splash cup and beans"
              role="img"
            >
              <image
                href="/banners/banner-image-4.png"
                width="100%"
                height="100%"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
