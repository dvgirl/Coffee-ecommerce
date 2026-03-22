"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Coffee, ChevronDown, Package, ShieldCheck, Leaf, Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import CoffeeQuiz from "@/components/quiz/CoffeeQuiz";
import Image from "next/image";

const BANNERS = [
  { img: "/banners/banner-image-1.png", alt: "Aura Golden Ritual" },
  { img: "/banners/banner-image-2.png", alt: "Aura Velvet Dusk" },
  { img: "/banners/banner-image-1.png", alt: "Aura Neon Organic" },
  { img: "/banners/banner-image-2.png", alt: "Aura Lo-fi Luxury" },
];

const ImageBannerSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-square md:aspect-[16/5] overflow-hidden bg-white group">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={BANNERS[index].img}
            alt={BANNERS[index].alt}
            fill // This makes it fill the parent container
            priority // Good for hero banners to load instantly
            className="object-cover"
          />
          {/* Subtle Invisible Overlay for Shop link */}
          <Link href="/shop" className="absolute inset-0 z-0">
            <span className="sr-only">Go to Shop</span>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Indicators - Minimalist Dot Style (Blue Tokai Inspiration) */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-700",
              i === index ? "bg-primary scale-125 shadow-[0_0_10px_rgba(178,124,78,0.5)]" : "bg-black/20 hover:bg-black/40"
            )}
          />
        ))}
      </div>
    </div>
  );
};

const CATEGORIES = [
  { name: "Coffee", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop", href: "/shop?category=Coffee" },
  { name: "Tea", img: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=2070&auto=format&fit=crop", href: "/shop?category=Tea" },
  { name: "Spices", img: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=2070&auto=format&fit=crop", href: "/shop?category=Spices" },
  { name: "Dryfruit", img: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=2070&auto=format&fit=crop", href: "/shop?category=Dryfruit" },
  { name: "Offers", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop", href: "/offers" },
];

const CategoryMenu = () => {
  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-8 pb-4 pt-6 scrollbar-hide snap-x snap-mandatory justify-start md:justify-center items-center">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="flex flex-col items-center gap-6 group min-w-[110px] snap-center transition-all duration-700"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-black/5 group-hover:border-primary/20 transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_50px_rgba(178,124,78,0.15)] group-hover:-translate-y-3 bg-white">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] md:text-xs font-bold text-muted group-hover:text-primary transition-all duration-500 text-center uppercase tracking-[0.25em]">
                  {cat.name}
                </span>
                <div className="w-0 h-[1.5px] bg-primary group-hover:w-8 transition-all duration-500 rounded-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <CoffeeQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* Professional Image Banners - Flush with Header (Blue Tokai Standard) */}
      <ImageBannerSlider />

      {/* Round Menu Categories */}
      <CategoryMenu />



      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted"
      >
      </motion.div>

      {/* New Arrivals Section */}
      <section className="py-10 lg:py-16 px-6 md:px-12 bg-coffee-light/30 relative z-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">New <span className="gradient-text italic">Arrivals</span></h2>
              <p className="text-muted max-w-xl">Fresh off the harvest. Discover our latest limited-edition micro-lots and seasonal blends.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/shop" className="group flex items-center gap-2 text-primary font-bold hover:text-foreground transition-colors">
                View All Products <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 10, name: "Himalayan Oolong", category: "Tea", price: "$28", rating: 4.9, notes: "Orchid, Honey, Stone Fruit", icon: Leaf },
              { id: 6, name: "Kenya AA", category: "Coffee", price: "$29", rating: 4.9, notes: "Blackberry, Wine, Grapefruit", icon: Coffee },
              { id: 18, name: "Kashmiri Saffron", category: "Spices", price: "$55", rating: 5.0, notes: "Hay, Honey, Metallic", icon: Star }
            ].map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl overflow-hidden group cursor-pointer border border-black/5 hover:border-primary/20 transition-all duration-300 shadow-lg"
              >
                <Link href={`/shop/${product.id}`} className="block h-full">
                  <div className="h-64 bg-coffee-medium/20 relative flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    {/* Dynamic glow based on category */}
                    <div className={cn(
                      "absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500",
                      product.category === "Coffee" ? "bg-[#8B5A2B]" : product.category === "Tea" ? "bg-[#4CAF50]" : "bg-[#FF9800]"
                    )} />
                    <product.icon className="w-24 h-24 text-white/20 group-hover:scale-110 group-hover:text-primary/50 transition-all duration-700 z-0" />
                    <div className="absolute top-4 left-4 z-20 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase font-bold text-primary border border-primary/20">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors text-foreground">{product.name}</h3>
                      <span className="font-bold text-lg text-primary">{product.price}</span>
                    </div>
                    <p className="text-sm text-muted mb-4 line-clamp-2">{product.notes}</p>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/5">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-bold">{product.rating}</span>
                      </div>
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-10 lg:py-16 px-6 md:px-12 bg-background relative z-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-coffee-medium/5 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 relative"
          >
            {/* Abundant Decorative Small Cups */}
            <div className="absolute inset-0 -top-20 -bottom-20 w-full pointer-events-none overflow-visible hidden md:block">
              {[...Array(12)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ 
                    y: [0, (i % 2 === 0 ? -20 : 20), 0], 
                    rotate: [0, (i % 3 === 0 ? 15 : -15), 0],
                    x: [0, (i % 4 === 0 ? 10 : -10), 0]
                  }}
                  transition={{ 
                    duration: 4 + (i % 3), 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: i * 0.4 
                  }}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${(i * 8.5) % 100}%`,
                    top: `${(i * 13) % 100}%`,
                    opacity: 0.05 + ((i % 5) * 0.04)
                  }}
                >
                  <Coffee 
                    className={cn(
                      "text-primary/40",
                      i % 4 === 0 ? "w-4 h-4" : i % 4 === 1 ? "w-6 h-6" : i % 4 === 2 ? "w-8 h-8" : "w-10 h-10"
                    )} 
                  />
                </motion.div>
              ))}
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground relative z-10">Test The <span className="gradient-text italic">Magic</span></h2>
            <p className="text-muted max-w-2xl mx-auto relative z-10">Beyond exceptional coffee, discover our curated selection of rare teas, artisanal dry fruits, and ethically sourced spices.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "Coffee",
                title: "Artisan Coffee",
                desc: "Single-origin beans and masterful blends roasted to perfection.",
                icon: Coffee,
                bgClass: "from-[#8B5A2B]/20 to-black",
                delay: 0
              },
              {
                id: "Tea",
                title: "Rare Teas",
                desc: "Hand-rolled oolongs, ceremonial matcha, and delicate white teas.",
                icon: Leaf,
                bgClass: "from-[#4CAF50]/20 to-black",
                delay: 0.2
              },
              {
                id: "Spices",
                title: "Exotic Spices",
                desc: "Kashmiri Saffron, True Ceylon Cinnamon, and Tellicherry Black Pepper.",
                icon: Star,
                bgClass: "from-[#FF9800]/20 to-black",
                delay: 0.4
              },
              {
                id: "Dryfruit",
                title: "Premium Dry Fruits",
                desc: "Jumbo Medjool Dates, Afghan Pistachios, and Turkish Figs.",
                icon: Package,
                bgClass: "from-[#9C27B0]/20 to-black",
                delay: 0.6
              }
            ].map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: category.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <Link href={`/shop?category=${category.id}`} className="block h-full">
                  <div className={cn(
                    "h-full p-8 rounded-3xl glass border border-white/5 relative overflow-hidden flex flex-col items-start text-left transition-all duration-500",
                    "hover:shadow-[0_0_40px_rgba(178,124,78,0.05)] hover:border-black/10"
                  )}>

                    {/* Content */}
                    <div className="relative z-10 w-full">
                      <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors border border-black/5 group-hover:border-primary/30 group-hover:scale-110 duration-500">
                        <category.icon className="w-6 h-6 text-primary transition-colors" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">{category.title}</h3>
                      <p className="text-muted text-sm leading-relaxed mb-8 group-hover:text-foreground transition-colors">{category.desc}</p>

                      <div className="mt-auto flex items-center text-sm font-bold text-primary transition-colors gap-2">
                        Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Promotional Banner Section */}
      <section className="py-10 lg:py-16 px-6 md:px-12 relative z-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] overflow-hidden relative glass border-primary/10 bg-gradient-to-r from-coffee-light/50 to-white shadow-xl shadow-primary/5"
          >
            {/* Wavy/Futuristic Abstract Pattern Background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z" fill="url(#grad1)" />
                <path d="M0,70 Q25,40 50,70 T100,70 L100,100 L0,100 Z" fill="url(#grad2)" opacity="0.5" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C69C6D" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#F5EBE1" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C69C6D" stopOpacity="1" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 p-8 md:p-16">
              <div className="w-full lg:w-1/2 space-y-8">
                <h3 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                  Press your way to a rich, <span className="gradient-text italic">flavourful</span>, & full-bodied brew!
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-widest text-primary uppercase">
                  <span>EASY-TO-USE</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>TRAVEL-FRIENDLY</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>VERSATILE</span>
                </div>

                <div className="glass px-6 py-4 rounded-xl border border-primary/10 bg-white/40 inline-block">
                  <p className="text-foreground text-sm md:text-base font-medium">
                    ENJOY FLAT <span className="text-primary font-bold">50% OFF</span> ON A BRAND-NEW FRENCH PRESS<br />WHEN YOU ORDER ROASTED COFFEE.
                  </p>
                </div>

                <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-foreground hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(178,124,78,0.3)] hover:shadow-[0_0_50px_rgba(0,0,0,0.1)] uppercase tracking-wide">
                  Buy Now
                </button>
              </div>

              <div className="w-full lg:w-1/2 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden glass border-black/5 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544422675-ebcb3dc86c48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
                {/* Stylized French Press Representation Backup */}
                <Coffee className="w-32 h-32 md:w-48 md:h-48 text-primary opacity-80 animate-pulse-slow relative z-10" />
                <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay">
                  <div className="w-64 h-64 border border-black/5 rounded-full animate-[spin_20s_linear_infinite]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preparation Guides Section */}
      <section className="py-10 lg:py-16 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary font-medium text-sm mb-4">
                <Coffee className="w-4 h-4" /> Brew Like a Pro
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Master the <span className="gradient-text italic">Craft</span>
              </h2>
              <p className="text-lg text-muted leading-relaxed">
                Unlock the full potential of your beans, leaves, and spices. Our interactive guides walk you through precise measurements, timings, and techniques for the perfect extraction every time.
              </p>

              <div className="pt-8 space-y-4">
                {[
                  { title: "Pour Over (V60)", time: "3:00 Min", difficulty: "Medium", icon: Coffee },
                  { title: "Traditional Matcha", time: "1:30 Min", difficulty: "Hard", icon: Leaf },
                  { title: "Golden Saffron Milk", time: "5:00 Min", difficulty: "Easy", icon: Star }
                ].map((guide, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    whileHover={{ x: 10 }}
                    className="glass p-4 rounded-xl flex items-center justify-between cursor-pointer group hover:border-primary/30 transition-all border border-black/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center group-hover:bg-primary/20 transition-colors shadow-sm">
                        <guide.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{guide.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted font-medium mt-1">
                          <span>⏱️ {guide.time}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span>Level: {guide.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 relative h-[500px]"
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden glass border-primary/20 shadow-xl shadow-primary/5 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-coffee-dark/80 to-primary/10 animate-pulse-slow" />

                {/* Aesthetic Coffee Video */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                  <source src="https://cdn.shopify.com/videos/c/o/v/e2b557a3730f49969da2ad109ec44e63.mp4" type="video/mp4" />
                </video>

                {/* Subtle Overlays for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />

                {/* Decorative Elements */}
                <div className="relative z-20 flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5 mb-4"
                  >
                    <Coffee className="w-8 h-8 text-primary shadow-glow" />
                  </motion.div>
                  <p className="text-white font-bold tracking-widest uppercase text-xs">Aura Brewing Ritual</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscription Banner */}
      <section className="py-10 lg:py-16 px-6 md:px-12 relative z-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-coffee-medium z-0" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0" />

            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl">
                <h3 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Never Run Out of <span className="italic">Magic</span></h3>
                <p className="text-foreground/80 text-lg mb-8">
                  Join the Aura Club. Get freshly roasted beans delivered to your door every month. Save 15% and unlock exclusive micro-lots.
                </p>
                <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-white/90 transition-colors shadow-2xl flex items-center gap-2 group">
                  Start Subscription <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative">
                <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse blur-xl" />
                <div className="absolute inset-4 border-2 border-dashed border-white/30 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground">
                  <span className="text-5xl font-bold">15%</span>
                  <span className="text-xl mt-1 font-bold">OFF</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-10 lg:py-16 relative overflow-hidden bg-coffee-light/15">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-10 md:p-16 max-w-4xl w-full text-center border-primary/20 bg-white/40"
          >
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-primary text-primary" />)}
            </div>
            <h3 className="text-2xl md:text-4xl font-medium leading-relaxed mb-8 italic text-foreground">
              "Aura Coffee didn't just meet my expectations; they redefined what I thought coffee could taste like. The shipping was fast, the unboxing experience was premium, and the taste is truly next-level."
            </h3>
            <div>
              <p className="text-primary font-bold text-lg">Eleanor V.</p>
              <p className="text-muted text-sm">Verified Buyer</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div >
  );
}
