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
    <div className="relative w-full aspect-square md:aspect-[137/35] overflow-hidden bg-white group">
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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <CoffeeQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* Professional Image Banners - Flush with Header (Blue Tokai Standard) */}
      <ImageBannerSlider />

      {/* Futuristic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-light/40 via-background to-white z-0" />

        {/* Soft Atmospheric Drifting Orbs */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] mix-blend-multiply"
        />
        <motion.div
          animate={{
            y: [0, 60, 0],
            x: [0, -40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-coffee-medium/10 rounded-full blur-[150px] mix-blend-multiply"
        />

        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 min-h-[calc(100vh-120px)] pt-10 lg:pt-0">

          {/* Hero Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-white/50 backdrop-blur-sm text-primary font-medium text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Next-Gen Roasting
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.05]"
            >
              Brew the <span className="gradient-text italic">Future</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted max-w-xl font-light leading-relaxed"
            >
              Experience a paradigm shift in flavor. Artisan beans, sustainably sourced, and precision-roasted for the modern palate.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link href="/shop" className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-foreground transition-all duration-300 shadow-[0_20px_40px_rgba(198,156,109,0.2)] flex items-center justify-center gap-2 group">
                  Shop Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.button
                onClick={() => setIsQuizOpen(true)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-foreground border border-black/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Find My Match <Coffee className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
              </motion.button>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 h-full flex items-center justify-center relative mt-8 lg:mt-0 pb-20 lg:pb-0">
            {/* 3D-like floating coffee element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -20, 0]
              }}
              transition={{
                opacity: { duration: 1.2, delay: 0.4 },
                scale: { duration: 1.2, delay: 0.4 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative w-64 h-64 md:w-96 md:h-96"
            >
              <div className="absolute inset-0 border border-primary/30 rounded-full animate-[spin_15s_linear_infinite]" />
              <div className="absolute inset-4 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-coffee-light to-white rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
                <Coffee className="w-24 h-24 md:w-32 md:h-32 text-primary drop-shadow-[0_0_15px_rgba(198,156,109,0.3)]" />
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -right-4 md:-right-12 top-1/4 glass px-4 py-3 rounded-xl flex items-center gap-3 backdrop-blur-md border border-black/5"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted mb-0.5">Rating</p>
                  <p className="text-sm font-bold text-foreground">4.9/5.0</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>

      {/* Shop by Category Section */}
      <section className="py-20 lg:py-32 px-6 md:px-12 bg-background relative z-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-coffee-medium/5 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Explore Our <span className="gradient-text italic">Universe</span></h2>
            <p className="text-muted max-w-2xl mx-auto">Beyond exceptional coffee, discover our curated selection of rare teas, artisanal dry fruits, and ethically sourced spices.</p>
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
                    {/* Dynamic Glow Background */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0", category.bgClass)} />

                    {/* Content */}
                    <div className="relative z-10 w-full">
                      <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors border border-black/5 group-hover:border-primary/30 group-hover:scale-110 duration-500">
                        <category.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">{category.title}</h3>
                      <p className="text-muted text-sm leading-relaxed mb-8 group-hover:text-white/80 transition-colors">{category.desc}</p>

                      <div className="mt-auto flex items-center text-sm font-bold text-primary group-hover:text-white transition-colors gap-2">
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

      {/* New Arrivals Section */}
      <section className="py-20 lg:py-32 px-6 md:px-12 bg-background relative z-20">
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

      {/* Promotional Banner Section */}
      <section className="py-20 lg:py-24 px-6 md:px-12 relative z-20">
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
      <section className="py-20 lg:py-32 relative overflow-hidden bg-coffee-light/10">
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

                {/* Abstract Timer/Brewing UI */}
                <div className="relative z-10 w-64 h-64 md:w-80 md:h-80">
                  {/* Outer Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="50%" cy="50%" r="48%" stroke="rgba(0,0,0,0.05)" strokeWidth="4" fill="none" />
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="48%"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-primary drop-shadow-[0_0_10px_rgba(198,156,109,0.8)]"
                      strokeDasharray="1000"
                      strokeDashoffset="1000"
                      animate={{ strokeDashoffset: [1000, 0] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl font-bold text-foreground mb-2 tabular-nums tracking-tighter">02:45</div>
                    <div className="text-primary font-bold tracking-widest uppercase text-sm animate-pulse">Blooming...</div>
                  </div>

                  {/* Water Drops Animation */}
                  <motion.div
                    animate={{ y: [0, 100], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeIn" }}
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-blue-300/50 blur-[1px]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscription Banner */}
      <section className="py-20 lg:py-24 px-6 md:px-12 relative z-20">
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
      <section className="py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
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
    </div>
  );
}
