"use client";

import { Coffee, Star, ShoppingBag, Filter, Heart, ArrowDownAZ, ArrowUpZA, ArrowDown10, ArrowUp01, Search, ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/CartContext";
import { useState, useMemo, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, VARIANTS } from "@/lib/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "rating-desc";

function ShopContent() {
  const { addToCart, toggleFavorite, isFavorite } = useAppContext();
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("category");
  
  // Filters & State
  const [filter, setFilter] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParams) {
      setFilter(categoryParams);
    }
  }, [categoryParams]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 50]);
  
  const [selectedVariants, setSelectedVariants] = useState<Record<number, string>>(
    Object.fromEntries(PRODUCTS.map(p => [p.id, "250g"]))
  );

  // Derived filtered & sorted products
  const processedProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // 1. Category filter
      if (filter !== "All" && p.category !== filter) return false;
      
      // 2. Search filter
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // 3. Price Range Filter (based on current variant selected)
      const currentVariantWeight = selectedVariants[p.id] || "250g";
      const variantMult = VARIANTS.find(v => v.weight === currentVariantWeight)?.multiplier || 1.0;
      const displayPrice = p.basePrice * variantMult;
      if (displayPrice < priceRange[0] || displayPrice > priceRange[1]) return false;
      
      return true;

    }).sort((a, b) => {
      // 4. Sorting logic
      const aVariantWeight = selectedVariants[a.id] || "250g";
      const aMult = VARIANTS.find(v => v.weight === aVariantWeight)?.multiplier || 1.0;
      const priceA = a.basePrice * aMult;

      const bVariantWeight = selectedVariants[b.id] || "250g";
      const bMult = VARIANTS.find(v => v.weight === bVariantWeight)?.multiplier || 1.0;
      const priceB = b.basePrice * bMult;

      switch(sortBy) {
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "price-asc": return priceA - priceB;
        case "price-desc": return priceB - priceA;
        case "rating-desc": return b.rating - a.rating;
        default: return 0;
      }
    });

  }, [filter, searchQuery, priceRange, sortBy, selectedVariants]);


  return (
    <div className="pt-32 pb-24 px-6 md:px-12 container mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our <span className="gradient-text italic">Collection</span></h1>
        <p className="text-muted max-w-xl">Explore our full range of artisan-roasted beans, sourced from the finest farms around the globe.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Mobile Filter Toggle Button */}
        <button 
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="lg:hidden w-full glass p-4 rounded-2xl flex items-center justify-between font-bold text-foreground border border-black/5 hover:border-primary/50 transition-colors"
        >
           <span className="flex items-center gap-2"><Filter className="w-5 h-5 text-primary" /> Filter & Sort</span>
           <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">{processedProducts.length} Results</span>
        </button>

        {/* Left Sidebar - Filters & Sorting */}
        <AnimatePresence>
          {(isMobileFilterOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
            <motion.aside 
              initial={typeof window !== 'undefined' && window.innerWidth < 1024 ? { opacity: 0, height: 0 } : { opacity: 0, x: -20 }}
              animate={typeof window !== 'undefined' && window.innerWidth < 1024 ? { opacity: 1, height: "auto" } : { opacity: 1, x: 0 }}
              exit={typeof window !== 'undefined' && window.innerWidth < 1024 ? { opacity: 0, height: 0 } : {}}
              className="w-full lg:w-72 glass p-6 rounded-3xl shrink-0 lg:sticky lg:top-32 space-y-8 overflow-hidden"
            >
              {/* Search */}
          <div>
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
               <input 
                 type="text" 
                 placeholder="Search roasts..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-black/5 border border-black/10 rounded-xl py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
               />
             </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4 flex items-center gap-2"><Filter className="w-4 h-4" /> Categories</h3>
            <div className="flex flex-col gap-2">
              {["All", "Coffee", "Tea", "Spices", "Dryfruit"].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors w-full",
                    filter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-black/5 text-muted hover:text-foreground"
                  )}
                >
                  {f === "All" ? "All Products" : f}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
             <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">Price Range</h3>
             <div className="px-2">
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  step="1"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center mt-4 glass p-2 rounded-lg text-sm font-medium">
                  <span>$10</span>
                  <span className="text-muted">to</span>
                  <span>${priceRange[1]}</span>
                </div>
             </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">Sort By</h3>
            <div className="flex flex-col gap-2">
               {[
                 { id: "name-asc", label: "A to Z", icon: ArrowDownAZ },
                 { id: "name-desc", label: "Z to A", icon: ArrowUpZA },
                 { id: "price-asc", label: "Price: Low to High", icon: ArrowUp01 },
                 { id: "price-desc", label: "Price: High to Low", icon: ArrowDown10 },
                 { id: "rating-desc", label: "Highest Rated", icon: Star },
               ].map(s => (
                 <button 
                   key={s.id}
                   onClick={() => setSortBy(s.id as SortOption)}
                   className={cn(
                     "flex items-center gap-3 text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full",
                     sortBy === s.id ? "bg-black/10 text-foreground" : "hover:bg-black/5 text-muted hover:text-foreground"
                   )}
                 >
                   <s.icon className={cn("w-4 h-4", sortBy === s.id ? "text-primary" : "text-muted")} /> 
                   {s.label}
                 </button>
               ))}
            </div>
          </div>

            <button 
              onClick={() => { setFilter("All"); setSearchQuery(""); setSortBy("name-asc"); setPriceRange([10, 50]); }}
              className="w-full text-xs text-muted hover:text-primary transition-colors text-center uppercase tracking-wide font-bold pt-4 border-t border-black/5"
            >
               Reset Filters
            </button>
            <button
               onClick={() => setIsMobileFilterOpen(false)}
               className="lg:hidden w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-white hover:text-black transition-colors shadow-lg shadow-primary/20"
            >
               View {processedProducts.length} Results
            </button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Right Content - Product Grid */}
        <div className="flex-1">
          {processedProducts.length === 0 ? (
             <div className="glass p-12 rounded-3xl flex flex-col items-center justify-center text-center h-[50vh]">
               <Filter className="w-12 h-12 text-primary/30 mb-4" />
               <h3 className="text-2xl font-serif font-bold mb-2">No Roasts Found</h3>
               <p className="text-muted">We couldn't find any coffee matching your current filters. Try adjusting your preferences!</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {processedProducts.map((product, index) => {
                const currentVariantStr = selectedVariants[product.id] || "250g";
                const variantObj = VARIANTS.find(v => v.weight === currentVariantStr) || VARIANTS[1];
                const displayPrice = product.basePrice * variantObj.multiplier;
                const isFav = isFavorite(product.id);

                return (
                  <motion.div
                    key={product.id}
                    layout // Animate layout changes like sorting
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="glass rounded-2xl overflow-hidden group flex flex-col h-full relative"
                  >
                    <button 
                      className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/50 backdrop-blur-md hover:bg-white/80 transition-colors shadow-lg"
                      aria-label="Toggle favorite"
                    >
                      <Heart className={cn("w-4 h-4 transition-colors", isFav ? "fill-red-500 text-red-500" : "text-foreground")} />
                    </button>

                    <Link href={`/shop/${product.id}`} className="h-56 bg-coffee-medium/10 relative flex items-center justify-center p-8 overflow-hidden group-hover:bg-coffee-medium/20 transition-colors duration-500 block">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <Coffee className="w-24 h-24 text-primary/30 group-hover:scale-110 group-hover:text-primary/50 transition-all duration-700 z-0" />
                      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-primary border border-primary/20">
                        {product.category}
                      </div>
                      
                      {/* View Details Overlay */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <span className="bg-primary text-white font-bold px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-all">
                           View Details <ArrowRight className="w-4 h-4" />
                         </span>
                      </div>
                    </Link>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <h3 className="text-lg font-serif font-bold group-hover:text-primary transition-colors leading-tight">{product.name}</h3>
                        <span className="font-bold text-lg text-primary shrink-0">${displayPrice.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted flex-grow mb-4 leading-relaxed">{product.notes}</p>
                      
                      {/* Variant Selector */}
                      <div className="flex gap-1.5 mt-auto mb-4 bg-black/5 p-1.5 rounded-xl border border-black/5">
                        {VARIANTS.map(v => (
                          <button
                            key={v.weight}
                            onClick={() => setSelectedVariants(prev => ({ ...prev, [product.id]: v.weight }))}
                            className={cn(
                              "flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all",
                              currentVariantStr === v.weight 
                                ? "bg-primary text-white shadow-md shadow-primary/20" 
                                : "text-muted hover:text-foreground hover:bg-black/5"
                            )}
                          >
                            {v.weight}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-black/5">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                          <span className="text-sm font-bold">{product.rating}</span>
                        </div>
                        
                        <button 
                          onClick={() => addToCart({ 
                            id: product.id,
                            name: product.name,
                            basePrice: product.basePrice,
                            price: displayPrice,
                            quantity: 1,
                            variant: currentVariantStr,
                            image: ""
                          })}
                          className="bg-black/5 hover:bg-primary text-foreground hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 group/btn border border-black/10 hover:border-transparent"
                        >
                          <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" /> Add
                        </button>
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
