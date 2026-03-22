"use client";

import { Coffee, Star, ShoppingBag, Filter, Heart, ArrowDownAZ, ArrowUpZA, ArrowDown10, ArrowUp01, Search, ArrowRight, LayoutGrid, List, Columns2, Grid2X2, Grid3X3, ChevronDown, Check } from "lucide-react";
import { useAppContext } from "@/context/CartContext";
import { useState, useMemo, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, VARIANTS } from "@/lib/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type SortOption = "featured" | "best-selling" | "name-asc" | "name-desc" | "price-asc" | "price-desc" | "date-old" | "date-new";

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

      switch(sortBy) {
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
    { cols: 3, icon: LayoutGrid },
    { cols: 4, icon: Grid2X2 },
    { cols: 5, icon: Grid3X3 },
  ];

  return (
    <div className="pt-12 pb-20 px-6 md:px-12 container mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">Our <span className="gradient-text italic">Collection</span></h1>
            <p className="text-muted text-sm max-w-xl">Artisan-roasted beans, sourced from the finest farms around the globe.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative group w-full md:w-72">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search our collection..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-black/5 border border-black/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/40 focus:bg-white transition-all shadow-sm"
               />
             </div>
          </div>
        </div>
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

             <div className="flex items-center gap-2 p-1 bg-black/5 rounded-xl overflow-hidden self-end md:self-auto">
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
               gridCols === 1 && "grid-cols-1",
               gridCols === 2 && "grid-cols-1 md:grid-cols-2",
               gridCols === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
               gridCols === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
               gridCols === 5 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-5",
             )}>
               {processedProducts.map((product) => {
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
                    className="glass rounded-2xl overflow-hidden group flex flex-col h-full relative border border-black/5"
                  >
                    <button 
                      className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/50 backdrop-blur-md hover:bg-white/80 transition-colors shadow-lg"
                      aria-label="Toggle favorite"
                      onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
                    >
                      <Heart className={cn("w-4 h-4 transition-colors", isFav ? "fill-red-500 text-red-500" : "text-foreground")} />
                    </button>

                    <Link href={`/shop/${product.id}`} className="h-56 bg-coffee-medium/10 relative flex items-center justify-center p-8 overflow-hidden group-hover:bg-coffee-medium/20 transition-colors duration-500 block">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <Coffee className="w-24 h-24 text-primary/30 group-hover:scale-110 group-hover:text-primary/50 transition-all duration-700 z-0" />
                      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-primary border border-primary/20">
                        {product.category}
                      </div>
                      
                      {/* Out of Stock Overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-30 flex items-center justify-center">
                           <span className="bg-white/90 text-black py-1 px-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl">Out of Stock</span>
                        </div>
                      )}

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
                        <span className="font-bold text-lg text-primary shrink-0">${displayPrice.toFixed(0)}</span>
                      </div>
                      <p className="text-xs text-muted flex-grow mb-4 leading-relaxed line-clamp-2">{product.notes}</p>
                      
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
                          disabled={!product.inStock}
                          onClick={() => addToCart({ 
                            id: product.id,
                            name: product.name,
                            basePrice: product.basePrice,
                            price: displayPrice,
                            quantity: 1,
                            variant: currentVariantStr,
                            image: ""
                          })}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 group/btn border",
                            product.inStock 
                              ? "bg-black/5 hover:bg-primary text-foreground hover:text-white border-black/10 hover:border-transparent" 
                              : "bg-black/5 text-muted cursor-not-allowed border-black/10"
                          )}
                        >
                          <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" /> {product.inStock ? "Add" : "Sold"}
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
