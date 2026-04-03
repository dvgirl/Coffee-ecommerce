"use client";

import { Coffee, Star, ShoppingBag, Filter, Heart, ArrowDownAZ, ArrowUpZA, ArrowDown10, ArrowUp01, Search, ArrowRight, LayoutGrid, List, Columns2, Grid2X2, Grid3X3, ChevronDown, Check, Plus, Minus } from "lucide-react";
import { useAppContext } from "@/context/CartContext";
import { useState, useMemo, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, VARIANTS } from "@/lib/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type SortOption = "featured" | "best-selling" | "name-asc" | "name-desc" | "price-asc" | "price-desc" | "date-old" | "date-new";
//add to git 
// Custom hook for media query
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

function ShopContent() {
  const { addToCart, toggleFavorite, isFavorite } = useAppContext();
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("category");

  // Filters & State
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [availability, setAvailability] = useState<{ inStock: boolean; outOfStock: boolean }>({ inStock: true, outOfStock: true });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [minInput, setMinInput] = useState("0");
  const [maxInput, setMaxInput] = useState("100");
  const [gridCols, setGridCols] = useState(3);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Default to list view on mobile for better accessibility of actions
  useEffect(() => {
    if (isMobile) {
      setGridCols(1);
    } else {
      setGridCols(3);
    }
  }, [isMobile]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    availability: true,
    price: true,
    categories: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    if (categoryParams) {
      setCategory(categoryParams);
    }
  }, [categoryParams]);

  // Sync range slider with numeric inputs
  useEffect(() => {
    setMinInput(priceRange[0].toString());
    setMaxInput(priceRange[1].toString());
  }, [priceRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMinInput(val);
    const num = parseInt(val);
    if (!isNaN(num)) {
      setPriceRange([Math.min(num, priceRange[1]), priceRange[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMaxInput(val);
    const num = parseInt(val);
    if (!isNaN(num)) {
      setPriceRange([priceRange[0], Math.max(num, priceRange[0])]);
    }
  };

  const [selectedVariants, setSelectedVariants] = useState<Record<number, string>>(
    Object.fromEntries(PRODUCTS.map(p => [p.id, "250g"]))
  );
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(PRODUCTS.map(p => [p.id, 1]))
  );

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  // Derived filtered & sorted products
  const processedProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // 1. Category filter
      if (category !== "All" && p.category !== category) return false;

      // 2. Search filter
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      // 3. Availability filter
      if (!availability.inStock && p.inStock) return false;
      if (!availability.outOfStock && !p.inStock) return false;

      // 4. Price Range Filter (based on current variant selected)
      const currentVariantWeight = selectedVariants[p.id] || "250g";
      const variantMult = VARIANTS.find(v => v.weight === currentVariantWeight)?.multiplier || 1.0;
      const displayPrice = p.basePrice * variantMult;
      if (displayPrice < priceRange[0] || displayPrice > priceRange[1]) return false;

      return true;

    }).sort((a, b) => {
      const aVariantWeight = selectedVariants[a.id] || "250g";
      const aMult = VARIANTS.find(v => v.weight === aVariantWeight)?.multiplier || 1.0;
      const priceA = a.basePrice * aMult;

      const bVariantWeight = selectedVariants[b.id] || "250g";
      const bMult = VARIANTS.find(v => v.weight === bVariantWeight)?.multiplier || 1.0;
      const priceB = b.basePrice * bMult;

      switch (sortBy) {
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "price-asc": return priceA - priceB;
        case "price-desc": return priceB - priceA;
        case "date-new": return b.id - a.id; // Mocking date with ID
        case "date-old": return a.id - b.id;
        default: return 0;
      }
    });

  }, [category, searchQuery, availability, priceRange, sortBy, selectedVariants]);

  const sortLabels: Record<SortOption, string> = {
    "featured": "Featured",
    "best-selling": "Best selling",
    "name-asc": "Alphabetically, A-Z",
    "name-desc": "Alphabetically, Z-A",
    "price-asc": "Price, low to high",
    "price-desc": "Price, high to low",
    "date-old": "Date, old to new",
    "date-new": "Date, new to old"
  };

  const gridIcons = [
    { cols: 1, icon: List },
    { cols: 3, icon: LayoutGrid },
  ];

  return (
    <div className="pt-8 md:pt-8 lg:pt-8 xl:pt-12 pb-4 md:pb-6 px-5 md:px-12 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 xl:mb-6"
      >
        {/* ── Mobile-first banner ── */}
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-end lg:text-left lg:justify-between gap-4 lg:gap-6">

          <div className="flex-1 flex flex-col items-center lg:items-start">
            {/* Premium accent badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 mb-3 backdrop-blur-sm shadow-sm"
            >
              <Coffee className="h-3 w-3 text-primary shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Artisan · Small Batch · Premium
              </span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold mb-2 xl:mb-2">
              Our <span className="gradient-text italic">Collection</span>
            </h1>
            <p className="text-muted text-xs md:text-sm max-w-sm lg:max-w-xl">
              Artisan-roasted beans, sourced from the finest farms around the globe.
            </p>

            {/* Quick-stat pills — mobile only */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-2 mt-3 lg:hidden flex-wrap justify-center"
            >
              {[
                { label: "Products", value: `${PRODUCTS.length}+` },
                { label: "Countries", value: "12" },
                { label: "Roasts", value: "4 Types" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-1.5 rounded-full bg-black/5 border border-black/8 px-3 py-1"
                >
                  <span className="text-xs font-black text-foreground">{stat.value}</span>
                  <span className="text-[10px] text-muted font-semibold">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Search bar – full width on mobile, constrained on desktop */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative group w-full sm:w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search our collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-black/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
              />
            </div>
          </div>
        </div>

        {/* Subtle divider */}
        <div className="mt-5 h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="lg:hidden w-full glass p-4 rounded-2xl flex items-center justify-between font-bold text-foreground border border-black/5 hover:border-primary/50 transition-colors"
        >
          <span className="flex items-center gap-2"><Filter className="w-5 h-5 text-primary" /> Filter & Sort</span>
          <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">{processedProducts.length} Results</span>
        </button>

        {/* Sidebar - Filters */}
        <aside className={cn(
          "w-full lg:w-72 shrink-0 space-y-10 lg:sticky lg:top-32 transition-all duration-300",
          isMobileFilterOpen ? "block" : "hidden lg:block"
        )}>
          <div className="space-y-10 glass p-8 rounded-[2rem] border border-black/5 shadow-xl shadow-black/5">
            {/* Availability */}
            <div className="border-b border-black/5 pb-8 overflow-hidden">
              <button
                onClick={() => toggleSection('availability')}
                className="flex items-center justify-between w-full mb-6 group"
              >
                <h3 className="text-lg font-bold text-foreground font-serif group-hover:text-primary transition-colors">Availability</h3>
                <ChevronDown className={cn("w-4 h-4 text-muted transition-transform duration-300", expandedSections.availability && "rotate-180")} />
              </button>
              <AnimatePresence>
                {expandedSections.availability && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4"
                  >
                    {[
                      { id: 'inStock', label: 'In stock', count: PRODUCTS.filter(p => p.inStock).length },
                      { id: 'outOfStock', label: 'Out of stock', count: PRODUCTS.filter(p => !p.inStock).length }
                    ].map(item => (
                      <label key={item.id} className="flex items-center group cursor-pointer">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={availability[item.id as keyof typeof availability]}
                            onChange={() => setAvailability(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof availability] }))}
                            className="peer appearance-none w-5 h-5 border-2 border-black/10 rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer"
                          />
                          <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity left-0.5 pointer-events-none" />
                        </div>
                        <span className="ml-3 text-sm font-medium text-muted group-hover:text-foreground transition-colors">{item.label} ({item.count})</span>
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price Filter */}
            <div className="border-b border-black/5 pb-8 overflow-hidden">
              <button
                onClick={() => toggleSection('price')}
                className="flex items-center justify-between w-full mb-6 font-serif group"
              >
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">Price</h3>
                <ChevronDown className={cn("w-4 h-4 text-muted transition-transform duration-300", expandedSections.price && "rotate-180")} />
              </button>
              <AnimatePresence>
                {expandedSections.price && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="relative h-2 bg-black/5 rounded-full px-2">
                      <div
                        className="absolute h-full bg-primary/40 rounded-full"
                        style={{
                          left: `${(priceRange[0] / 100) * 100}%`,
                          right: `${100 - (priceRange[1] / 100) * 100}%`
                        }}
                      />
                      <input
                        type="range"
                        min="0" max="100" value={priceRange[0]}
                        onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value), priceRange[1]), priceRange[1]])}
                        className="absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                      />
                      <input
                        type="range"
                        min="0" max="100" value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Math.max(parseInt(e.target.value), priceRange[0])])}
                        className="absolute inset-0 w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                      />
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold text-muted mb-1 block">Min</span>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xs">$</span>
                          <input
                            type="text" value={minInput} onChange={handleMinChange}
                            className="w-full bg-black/5 border border-black/10 rounded-xl py-2 pl-6 pr-2 text-sm font-bold focus:outline-none focus:border-primary/40"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold text-muted mb-1 block">Max</span>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xs">$</span>
                          <input
                            type="text" value={maxInput} onChange={handleMaxChange}
                            className="w-full bg-black/5 border border-black/10 rounded-xl py-2 pl-6 pr-2 text-sm font-bold focus:outline-none focus:border-primary/40"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Categories */}
            <div className="overflow-hidden">
              <button
                onClick={() => toggleSection('categories')}
                className="flex items-center justify-between w-full mb-6 font-serif group"
              >
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">Categories</h3>
                <ChevronDown className={cn("w-4 h-4 text-muted transition-transform duration-300", expandedSections.categories && "rotate-180")} />
              </button>
              <AnimatePresence>
                {expandedSections.categories && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-col gap-2"
                  >
                    {["All", "Coffee", "Tea", "Spices", "Dryfruit"].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all border",
                          category === cat
                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                            : "bg-white border-black/5 text-muted hover:border-primary/20 hover:text-foreground hover:bg-black/5"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => { setCategory("All"); setSearchQuery(""); setSortBy("name-asc"); setPriceRange([0, 100]); setAvailability({ inStock: true, outOfStock: true }); }}
              className="w-full text-[10px] text-muted hover:text-primary transition-colors text-center uppercase tracking-widest font-bold pt-6 border-t border-black/5"
            >
              Reset All Filters
            </button>
          </div>
        </aside>

        {/* Right Content */}
        <div className="flex-1 space-y-8">
          {/* Top Bar - Sorting & Grid View */}
          <div className="glass p-4 rounded-[1.5rem] border border-black/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative z-40">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex items-center justify-between gap-3 px-6 py-2.5 bg-white border border-black/5 rounded-xl text-sm font-bold text-foreground hover:border-primary/40 transition-all w-full md:w-64"
                >
                  <span className="truncate">{sortLabels[sortBy]}</span>
                  <ChevronDown className={cn("w-4 h-4 text-muted transition-transform", isSortDropdownOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isSortDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/5 rounded-2xl shadow-2xl z-50 overflow-hidden p-2"
                    >
                      {(Object.keys(sortLabels) as SortOption[]).map(option => (
                        <button
                          key={option}
                          onClick={() => { setSortBy(option); setIsSortDropdownOpen(false); }}
                          className={cn(
                            "w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                            sortBy === option ? "bg-primary text-white" : "hover:bg-black/5 text-muted hover:text-foreground"
                          )}
                        >
                          {sortLabels[option]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="hidden md:block h-6 w-px bg-black/10" />
              <span className="hidden md:block text-xs font-bold text-muted uppercase tracking-wider">{processedProducts.length} Roasts</span>
            </div>

            <div className="hidden md:flex items-center gap-2 p-1 bg-black/5 rounded-xl overflow-hidden self-end md:self-auto">
              {gridIcons.map((item) => (
                <button
                  key={item.cols}
                  onClick={() => setGridCols(item.cols)}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    gridCols === item.cols
                      ? "bg-white text-primary shadow-sm"
                      : "text-muted hover:text-foreground hover:bg-white/50"
                  )}
                  aria-label={`${item.cols} Column View`}
                >
                  <item.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {processedProducts.length === 0 ? (
            <div className="glass p-20 rounded-[3rem] flex flex-col items-center justify-center text-center h-[50vh] border border-black/5">
              <Coffee className="w-16 h-16 text-primary/20 mb-6 animate-pulse" />
              <h3 className="text-3xl font-serif font-bold mb-4">No Magic Found</h3>
              <p className="text-muted max-w-sm">We couldn't find any roasts matching your current selections. Try expanding your search!</p>
              <button
                onClick={() => { setCategory("All"); setPriceRange([0, 100]); setAvailability({ inStock: true, outOfStock: true }); }}
                className="mt-8 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className={cn(
              "grid gap-8 transition-all duration-500",
              gridCols === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            )}>
              {processedProducts.map((product) => {
                const currentVariantStr = selectedVariants[product.id] || "250g";
                const variantObj = VARIANTS.find(v => v.weight === currentVariantStr) || VARIANTS[1];
                const displayPrice = product.basePrice * variantObj.multiplier;
                const isFav = isFavorite(product.id);
                const isDetailed = gridCols === 1 || isMobile;
                const qty = quantities[product.id] || 0;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "bg-white rounded-xl overflow-hidden group border border-black/5 hover:border-black/10 transition-all",
                      isDetailed ? "flex flex-col md:flex-row p-4 md:p-4 gap-4 md:gap-8 min-h-[160px]" : "flex flex-col h-full relative"
                    )}
                  >
                    {!isDetailed && (
                      <button
                        className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
                        onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
                      >
                        <Heart className={cn("w-4 h-4", isFav ? "fill-red-500 text-red-500" : "text-foreground")} />
                      </button>
                    )}

                    {/* Image Section */}
                    <Link
                      href={`/shop/${product.id}`}
                      className={cn(
                        "relative bg-black/5 flex items-center justify-center rounded-lg overflow-hidden shrink-0",
                        isDetailed ? "w-full h-64 md:w-40 md:h-40" : "h-56 w-full"
                      )}
                    >
                      <Coffee className="w-12 h-12 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded-full text-[8px] uppercase tracking-tighter font-bold text-primary">
                        {product.category}
                      </div>
                    </Link>

                    {/* Content Section */}
                    <div className={cn(
                      "flex flex-col flex-grow",
                      isDetailed ? "justify-center py-1" : "p-4"
                    )}>
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex flex-col">
                          <h3 className={cn(
                            "font-bold text-foreground group-hover:text-primary transition-colors leading-tight",
                            isDetailed ? "text-lg md:text-xl" : "text-base"
                          )}>
                            {product.name}
                          </h3>
                        </div>
                        {!isDetailed && (
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-primary">${displayPrice}</span>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-secondary-foreground/60">
                              <Star className="w-2.5 h-2.5 fill-primary text-primary" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {isDetailed && (
                        <div className="flex flex-col gap-1 mb-2">
                          <div className="flex items-center gap-1.5 font-bold text-xs">
                            <span className="text-secondary-foreground inline-flex items-center gap-0.5">${displayPrice}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-secondary-foreground/60">
                            <Star className="w-3 h-3 fill-primary text-primary" />
                            <span>{product.rating} (88)</span>
                          </div>
                        </div>
                      )}

                      <p className={cn(
                        "text-muted leading-snug",
                        isDetailed ? "text-xs md:text-sm mb-4 line-clamp-2" : "text-[11px] mb-4 line-clamp-2"
                      )}>
                        {product.notes}
                      </p>

                      <div className={cn(
                        "flex flex-col gap-3 mt-auto",
                        isDetailed ? "pt-2" : "pt-4"
                      )}>
                        {/* Unified Action Pill */}
                        <div className="flex items-center w-full bg-white border border-primary/20 rounded-xl overflow-hidden shadow-sm h-12 md:h-11">
                          {/* Quantity Selector Section */}
                          <div className="flex items-center h-full px-1">
                            <button
                              onClick={() => updateQuantity(product.id, -1)}
                              className="w-12 md:w-10 h-full flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all rounded-lg"
                              title="Decrease"
                            >
                              <Minus className="w-5 h-5 md:w-4 md:h-4" />
                            </button>
                            <span className="w-8 md:w-10 text-center text-sm md:text-xs font-black text-primary">
                              {qty || 1}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, 1)}
                              className="w-12 md:w-10 h-full flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all rounded-lg"
                              title="Increase"
                            >
                              <Plus className="w-5 h-5 md:w-4 md:h-4" />
                            </button>
                          </div>

                          {/* Divider */}
                          <div className="w-[1px] h-8 md:h-6 bg-primary/10" />

                          {/* Add to Cart Section */}
                          <button
                            disabled={!product.inStock}
                            onClick={() => addToCart({
                              id: product.id,
                              name: product.name,
                              basePrice: product.basePrice,
                              price: displayPrice,
                              quantity: qty || 1,
                              variant: currentVariantStr,
                              image: ""
                            })}
                            className={cn(
                              "flex-grow h-full text-xs md:text-[10px] font-black uppercase tracking-widest transition-all",
                              product.inStock
                                ? "text-primary hover:bg-primary hover:text-white"
                                : "text-black/20 cursor-not-allowed bg-black/5"
                            )}
                          >
                            Add to Cart
                          </button>
                        </div>

                        {/* Buy Now / Quick Check Action - Refined */}
                        <Link
                          href="/checkout"
                          onClick={() => {
                            addToCart({
                              id: product.id,
                              name: product.name,
                              basePrice: product.basePrice,
                              price: displayPrice,
                              quantity: qty || 1,
                              variant: currentVariantStr,
                              image: ""
                            });
                          }}
                          className={cn(
                            "w-full py-3.5 md:py-3 rounded-xl text-xs md:text-[10px] font-black transition-all uppercase tracking-widest text-center shadow-md",
                            product.inStock
                              ? "bg-primary text-white hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
                              : "bg-black/10 text-black/40 cursor-not-allowed"
                          )}
                        >
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>}>
      <ShopContent />
    </Suspense>
  );
}
