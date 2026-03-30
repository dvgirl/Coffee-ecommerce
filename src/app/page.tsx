import {
  ArrowRight,
  Coffee,
  Leaf,
  Package,
  Sparkles,
  Star,
  Waves,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import DeferredVideo from "@/components/home/DeferredVideo";
import ScrollAnimation from "@/components/home/ScrollAnimation";

const HERO_STATS = [
  { value: "48H", label: "fresh roast dispatch" },
  { value: "120+", label: "small batch releases" },
  { value: "4.9", label: "average member rating" },
];

const CATEGORIES = [
  {
    name: "Coffee",
    description: "Single origin roasts with deeper sweetness and clean finish.",
    image: "/categories/coffee.png",
    href: "/shop?category=Coffee",
    icon: Coffee,
  },
  {
    name: "Tea",
    description: "Mountain-grown leaves with floral aroma and calm texture.",
    image: "/categories/tea.png",
    href: "/shop?category=Tea",
    icon: Leaf,
  },
  {
    name: "Spices",
    description: "Rare saffron and aromatic staples chosen like luxury ingredients.",
    image: "/categories/spices.png",
    href: "/shop?category=Spices",
    icon: Sparkles,
  },
  {
    name: "Dryfruit",
    description: "Premium textures and richer taste from carefully selected origins.",
    image: "/categories/dryfruit.png",
    href: "/shop?category=Dryfruit",
    icon: Package,
  },
];

const ARRIVALS = [
  {
    id: "kenya-aa",
    name: "Kenya AA Single Origin",
    price: "$29.00",
    category: "Coffee",
    image: "/products/kenya-aa.png",
    note: "Blackberry brightness, rich citrus acidity, and a clean wine-like finish.",
  },
  {
    id: "himalayan-oolong",
    name: "Himalayan Oolong Tea",
    price: "$28.00",
    category: "Tea",
    image: "/products/himalayan-oolong.png",
    note: "Orchid aroma, wild honey sweetness, and a soft high-altitude finish.",
  },
  {
    id: "kashmiri-saffron",
    name: "Kashmiri Grade A Saffron",
    price: "$55.00",
    category: "Spices",
    image: "/products/kashmiri-saffron.png",
    note: "Deep crimson threads with metallic floral character and lasting intensity.",
  },
];

const BREW_GUIDES = [
  { title: "Pour Over V60", meta: "3 min / medium skill" },
  { title: "Traditional Matcha", meta: "2 min / advanced skill" },
  { title: "Golden Saffron Milk", meta: "5 min / easy skill" },
];

function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <span
      className={[
        "inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em]",
        inverse
          ? "border border-white/15 bg-white/10 text-white"
          : "border border-primary/15 bg-white/80 text-primary",
      ].join(" ")}
    >
      <span className={inverse ? "h-2 w-2 rounded-full bg-white" : "h-2 w-2 rounded-full bg-primary"} />
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  inverse?: boolean;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
      <h2
        className={[
          "text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl lg:text-5xl",
          inverse ? "text-white" : "text-foreground",
        ].join(" ")}
      >
        {title}
      </h2>
      <p className={inverse ? "text-sm leading-7 text-white/72 sm:text-base" : "text-sm leading-7 text-muted sm:text-base"}>
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_top_left,_rgba(178,124,78,0.24),_transparent_42%),linear-gradient(180deg,_#f7efe7_0%,_#fdfbf8_58%,_#fffdfa_100%)]" />
        <div className="absolute inset-0 aurora-grid opacity-35" />
        <div className="absolute left-[8%] top-24 h-56 w-56 rounded-full bg-primary/12 blur-[100px]" />
        <div className="absolute right-[8%] top-28 h-64 w-64 rounded-full bg-coffee-light blur-[110px]" />
      </div>

      <section id="hero" className="scroll-mt-28 px-5 pb-14 pt-8 sm:px-6 md:px-10 md:pb-20 lg:px-16 lg:pt-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <ScrollAnimation className="space-y-7">
            <Eyebrow>2030 Coffee Interface</Eyebrow>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-semibold leading-[0.92] tracking-[-0.07em] text-foreground sm:text-5xl md:text-6xl lg:text-[6rem]">
                A homepage that feels
                <span className="gradient-text"> premium, clear, and future-ready</span>.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base md:text-lg md:leading-8">
                The landing page is now rebuilt as one clean system. Better spacing,
                stronger hierarchy, consistent cards, and smoother responsive stacking
                make the website feel designed by an experienced team.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-primary"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#arrivals"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/80 px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:border-primary/25 hover:text-primary"
              >
                New Arrivals
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="panel-border rounded-[1.5rem] bg-white/78 p-5 backdrop-blur-xl">
                  <p className="text-3xl font-semibold tracking-[-0.05em] text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation animationType="scale-up">
            <div className="panel-border relative overflow-hidden rounded-[2rem] bg-white/78 p-3 backdrop-blur-xl sm:p-4">
              <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
                <div className="relative min-h-[380px] overflow-hidden rounded-[1.6rem] bg-[#1f1410] p-6 text-white sm:min-h-[440px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_30%),linear-gradient(145deg,_rgba(178,124,78,0.56),_rgba(17,11,9,0.96)_68%)]" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="space-y-4">
                      <Eyebrow inverse>Featured Capsule</Eyebrow>
                      <h2 className="max-w-sm text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                        Kenya AA leads the new luxury shelf.
                      </h2>
                      <p className="max-w-sm text-sm leading-7 text-white/72">
                        The hero now uses one strong product story instead of multiple
                        mismatched blocks competing for attention.
                      </p>
                    </div>

                    <div className="relative mx-auto mt-8 h-56 w-full max-w-[320px] sm:h-72">
                      <Image
                        src="/products/kenya-aa.png"
                        alt="Kenya AA Single Origin"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 35vw"
                        className="object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.45)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="panel-border rounded-[1.4rem] bg-[#fbf6f0] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      Experience
                    </p>
                    <div className="mt-4 space-y-4">
                      {[
                        {
                          icon: Zap,
                          title: "Sharper hierarchy",
                          text: "Hero, cards, and sections now follow one readable structure.",
                        },
                        {
                          icon: Waves,
                          title: "Responsive spacing",
                          text: "Cards stack better on mobile and align more naturally on larger screens.",
                        },
                        {
                          icon: Star,
                          title: "Premium consistency",
                          text: "One visual language is used across every homepage section.",
                        },
                      ].map((item) => (
                        <div key={item.title} className="rounded-[1.2rem] border border-black/5 bg-white p-4">
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section id="categories" className="scroll-mt-28 px-5 py-14 sm:px-6 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollAnimation className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Categories"
              title={
                <>
                  One clean design system for every
                  <span className="gradient-text"> product category</span>.
                </>
              }
              description="The homepage now transitions naturally from hero to category discovery. Each card uses the same structure, spacing, and responsive behavior."
            />
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
            >
              Browse all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollAnimation>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {CATEGORIES.map((category, index) => (
              <ScrollAnimation key={category.name} delay={index * 0.08}>
                <Link href={category.href} className="group block h-full">
                  <article className="panel-border relative flex min-h-[340px] h-full flex-col justify-between overflow-hidden rounded-[1.8rem] bg-white/80 p-5 transition-transform duration-300 group-hover:-translate-y-1 sm:min-h-[380px]">
                    <div className="absolute inset-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 1280px) 50vw, 25vw"
                        className="object-cover opacity-18 transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(253,251,248,0.96)_60%,#fdfbf8_100%)]" />
                    </div>

                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-white transition-colors group-hover:bg-primary">
                      <category.icon className="h-5 w-5" />
                    </div>

                    <div className="relative z-10 space-y-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                        {category.name}
                      </p>
                      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                        {category.name} Collection
                      </h3>
                      <p className="text-sm leading-7 text-muted">{category.description}</p>
                    </div>
                  </article>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section id="arrivals" className="scroll-mt-28 px-5 py-14 sm:px-6 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollAnimation className="mb-10">
            <SectionHeading
              eyebrow="New Arrivals"
              title={
                <>
                  Product cards that feel more
                  <span className="gradient-text"> premium and balanced</span>.
                </>
              }
              description="The arrivals section now uses one card style with consistent image framing, content spacing, and hover behavior across screen sizes."
            />
          </ScrollAnimation>

          <div className="grid gap-5 lg:grid-cols-3">
            {ARRIVALS.map((item, index) => (
              <ScrollAnimation key={item.id} delay={index * 0.08}>
                <Link href={`/shop/${item.id}`} className="group block h-full">
                  <article className="panel-border flex h-full flex-col overflow-hidden rounded-[1.9rem] bg-white/84 backdrop-blur-xl transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="relative h-72 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(178,124,78,0.16),_transparent_35%),linear-gradient(180deg,_rgba(245,235,225,0.84),_rgba(255,255,255,0.96))] sm:h-80">
                      <div className="absolute left-4 top-4 z-10 rounded-full border border-primary/15 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                        {item.category}
                      </div>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
                          {item.name}
                        </h3>
                        <span className="text-base font-semibold text-primary sm:text-lg">
                          {item.price}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted">{item.note}</p>
                      <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-5">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          4.9 rating
                        </div>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-foreground transition-colors group-hover:text-primary">
                          Details
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="scroll-mt-28 px-5 py-14 sm:px-6 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <ScrollAnimation className="panel-border rounded-[2rem] bg-[#201511] p-6 text-white sm:p-8 md:p-10">
            <SectionHeading
              eyebrow="Story Block"
              inverse
              title={
                <>
                  A stronger campaign section with a
                  <span className="text-primary"> single visual direction</span>.
                </>
              }
              description="Instead of unrelated styles, this block now connects product storytelling, promo offer, and premium atmosphere in one section."
            />

            <div className="mt-8 space-y-4">
              {[
                "Luxury dark surface for contrast against the light homepage",
                "Focused promo message without extra clutter",
                "Works cleanly on mobile and desktop without breaking the layout",
              ].map((point) => (
                <div key={point} className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] px-4 py-4 text-sm leading-7 text-white/75">
                  {point}
                </div>
              ))}
            </div>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-foreground"
            >
              Shop offer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollAnimation>

          <ScrollAnimation animationType="scale-up">
            <div className="panel-border overflow-hidden rounded-[2rem] bg-white/78 p-3 backdrop-blur-xl sm:p-4">
              <div className="relative h-[420px] overflow-hidden rounded-[1.6rem] bg-foreground sm:h-[520px]">
                <DeferredVideo poster="/videos/brewing-poster.png" src="/videos/brewing-ritual.mp4" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,12,10,0.08),rgba(17,12,10,0.76))]" />

                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-xl">
                  Ritual In Motion
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                      Launch offer
                    </p>
                    <h3 className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                      Flat 50% off on French press when you order roasted coffee.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section id="brew" className="scroll-mt-28 px-5 py-14 sm:px-6 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_0.78fr]">
          <ScrollAnimation className="panel-border rounded-[2rem] bg-white/80 p-6 backdrop-blur-xl sm:p-8 md:p-10">
            <SectionHeading
              eyebrow="Brew Guides"
              title={
                <>
                  Useful content that keeps the design
                  <span className="gradient-text"> elegant and credible</span>.
                </>
              }
              description="Premium UI is not only visual effects. It also needs clean information architecture and easier scanning on smaller screens."
            />

            <div className="mt-8 grid gap-4">
              {BREW_GUIDES.map((guide, index) => (
                <ScrollAnimation key={guide.title} delay={index * 0.08}>
                  <div className="flex flex-col gap-3 rounded-[1.3rem] border border-black/6 bg-[#fcfaf7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                        {guide.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{guide.meta}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation animationType="fade-left" className="grid gap-5">
            <div className="panel-border rounded-[2rem] bg-foreground p-6 text-white sm:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">Design result</p>
              <p className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-primary">2030</p>
              <p className="mt-3 text-sm leading-7 text-white/72">
                Cleaner visual rhythm, fewer mismatched blocks, and better responsiveness
                across the homepage.
              </p>
            </div>

            <div className="panel-border rounded-[2rem] bg-[linear-gradient(135deg,#f6efe7,#ffffff)] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Improvements
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                <li>More consistent card shapes and spacing.</li>
                <li>Better mobile stacking and readable text widths.</li>
                <li>Cleaner section transitions from hero to conversion area.</li>
              </ul>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section id="club" className="scroll-mt-28 px-5 pb-20 pt-14 sm:px-6 md:px-10 md:pt-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollAnimation className="panel-border relative overflow-hidden rounded-[2.1rem] bg-foreground px-6 py-8 text-white sm:px-8 sm:py-10 md:px-12 md:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(178,124,78,0.35),_transparent_28%),linear-gradient(135deg,#201511,#120c0a)]" />
            <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <SectionHeading
                eyebrow="Aura Club"
                inverse
                title={
                  <>
                    Subscription now feels like a
                    <span className="text-primary"> premium final CTA</span>.
                  </>
                }
                description="This closing section is simpler and stronger, so the homepage ends with one clear offer instead of another mismatched layout."
              />

              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.08] p-6 text-center backdrop-blur-xl sm:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-white/58">Member savings</p>
                <p className="mt-3 text-5xl font-semibold tracking-[-0.06em] text-primary sm:text-6xl">
                  15%
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white">Every month</p>
                <Link
                  href="/subscribe"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-primary hover:text-white"
                >
                  Start subscription
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
