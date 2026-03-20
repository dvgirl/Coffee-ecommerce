"use client";

import { motion } from "framer-motion";
import { Coffee, Star, ShoppingBag, Heart, ArrowLeft, Thermometer, Clock, Droplets, MapPin, Globe2, Wind, Flame, Settings2 } from "lucide-react";
import { useAppContext } from "@/context/CartContext";
import { useState, use } from "react";
import { cn } from "@/lib/utils";
import { PRODUCTS, VARIANTS } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

// A 5-axis SVG Radar Chart for flavor profile
const FlavorRadar = ({ stats }: { stats: { acidity: number, body: number, sweetness: number, complexity?: number, finish?: number } }) => {
  const getPoint = (val: number, angleIndex: number) => {
    const r = (val / 5) * 40; // max radius 40
    const angle = -Math.PI / 2 + (angleIndex * 2 * Math.PI / 5);
    return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
  };

  const a = stats.acidity || 3;
  const s = stats.sweetness || 3;
  const f = stats.finish || 3;
  const b = stats.body || 3;
  const c = stats.complexity || 3;

  const points = `${getPoint(a, 0)} ${getPoint(s, 1)} ${getPoint(f, 2)} ${getPoint(b, 3)} ${getPoint(c, 4)}`;

  return (
    <div className="relative w-full aspect-square max-w-[280px] mx-auto mt-8 mb-8">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
         {[1, 2, 3, 4, 5].map(level => {
            const webPoints = [0, 1, 2, 3, 4].map(i => getPoint(level, i)).join(" ");
            return <polygon key={level} points={webPoints} fill="none" stroke="black" strokeOpacity="0.05" strokeWidth="0.5" />
         })}
         {[0, 1, 2, 3, 4].map(i => (
           <line key={i} x1="50" y1="50" x2={getPoint(5, i).split(',')[0]} y2={getPoint(5, i).split(',')[1]} stroke="black" strokeOpacity="0.1" strokeWidth="0.5" />
         ))}

         <motion.polygon 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          points={points}
          fill="rgba(198, 156, 109, 0.4)" 
          stroke="rgb(198, 156, 109)" 
          strokeWidth="1.5"
          className="origin-center"
        />
      </svg>
      {/* Labels */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-[10px] font-bold text-primary tracking-widest">ACIDITY</div>
      <div className="absolute top-[30%] -right-4 translate-x-4 text-[10px] font-bold text-primary tracking-widest">SWEETNESS</div>
      <div className="absolute bottom-[5%] right-0 translate-x-4 translate-y-4 text-[10px] font-bold text-primary tracking-widest">FINISH</div>
      <div className="absolute bottom-[5%] left-0 -translate-x-4 translate-y-4 text-[10px] font-bold text-primary tracking-widest">BODY</div>
      <div className="absolute top-[30%] -left-4 -translate-x-6 text-[10px] font-bold text-primary tracking-widest">COMPLEXITY</div>
    </div>
  );
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const productId = parseInt(unwrappedParams.id);
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) return notFound();

  const { addToCart, toggleFavorite, isFavorite } = useAppContext();
  const [selectedVariant, setSelectedVariant] = useState(VARIANTS[1]); // Default to 250g
  const [quantity, setQuantity] = useState(1);

  const displayPrice = product.basePrice * selectedVariant.multiplier;
  const isFav = isFavorite(product.id);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 container mx-auto min-h-screen">
      <Link href="/shop" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-12 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Collection
      </Link>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left Column - Imagery and Radar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2 space-y-8 lg:sticky lg:top-32"
        >
          <div className="glass rounded-[2.5rem] overflow-hidden aspect-square relative flex items-center justify-center p-12 bg-white/50 border border-black/5 shadow-xl">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-coffee-light/30 via-transparent to-white" />
            
            <button 
              onClick={() => toggleFavorite(product)}
              className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/60 backdrop-blur-md hover:bg-white/90 transition-colors shadow-lg border border-black/5"
            >
              <Heart className={cn("w-6 h-6 transition-colors", isFav ? "fill-red-500 text-red-500" : "text-foreground")} />
            </button>

            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative z-20 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-coffee-light to-white flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-primary/20"
            >
              <Coffee className="w-24 h-24 md:w-32 md:h-32 text-primary drop-shadow-[0_0_15px_rgba(198,156,109,0.3)]" />
            </motion.div>
          </div>

          <div className="glass p-8 rounded-3xl border border-black/5 shadow-lg">
            <h3 className="text-xl font-serif font-bold text-center mb-10">Flavor Profile Radar</h3>
            <FlavorRadar stats={product.stats || { acidity: 3, body: 3, sweetness: 3 }} />
          </div>
        </motion.div>

        {/* Right Column - Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2 flex flex-col pt-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary font-bold text-xs tracking-wider uppercase w-max mb-6">
            <MapPin className="w-3 h-3" /> {product.origin}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4 text-foreground">{product.name}</h1>
          <p className="text-primary font-medium text-lg mb-6">{product.category} • {product.notes}</p>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex bg-black/5 rounded-full px-4 py-2 text-sm font-medium border border-black/10 text-foreground">
              <Star className="w-4 h-4 fill-primary text-primary mr-1.5" /> {product.rating} / 5.0
            </div>
            <span className="text-3xl font-bold text-foreground">${displayPrice.toFixed(2)}</span>
          </div>

          <div className="prose prose-p:text-muted prose-p:leading-relaxed mb-10 border-b border-black/10 pb-10">
            <p className="text-lg">{product.description}</p>
          </div>

          {/* Configuration */}
          <div className="space-y-8 mb-10">
            <div>
              <h3 className="text-sm font-bold tracking-wider text-muted uppercase mb-4">Select Size</h3>
              <div className="flex gap-4">
                {VARIANTS.map(v => (
                  <button
                    key={v.weight}
                    onClick={() => setSelectedVariant(v)}
                    className={cn(
                      "flex-1 py-4 text-sm font-bold rounded-xl transition-all border-2",
                      selectedVariant.weight === v.weight 
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                        : "border-black/5 text-muted hover:border-black/20 hover:text-foreground"
                    )}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-wider text-muted uppercase mb-4">Quantity</h3>
              <div className="flex items-center gap-6 glass w-max p-2 rounded-xl border border-black/5 shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 text-muted hover:text-foreground transition-colors font-bold text-xl"
                >-</button>
                <span className="w-6 text-center font-bold text-lg text-foreground">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 text-muted hover:text-foreground transition-colors font-bold text-xl"
                >+</button>
              </div>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <button 
            onClick={() => addToCart({ 
              id: product.id,
              name: product.name,
              basePrice: product.basePrice,
              price: displayPrice,
              quantity,
              variant: selectedVariant.weight,
            })}
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-foreground transition-all duration-300 shadow-[0_20px_40px_rgba(198,156,109,0.2)] flex items-center justify-center gap-3 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <ShoppingBag className="w-5 h-5 relative z-10" /> 
            <span className="relative z-10">Add {quantity} bag{quantity > 1 ? 's' : ''} to Cart • ${(displayPrice * quantity).toFixed(2)}</span>
          </button>

          {/* Coffee Details Mini-Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 bg-black/5 p-6 rounded-3xl border border-black/5">
            <div className="flex flex-col items-center text-center space-y-2">
              <Thermometer className="w-6 h-6 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted">Process</span>
              <span className="text-sm font-medium text-foreground">{product.process}</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 border-x border-black/10 px-4">
              <Droplets className="w-6 h-6 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted">Altitude</span>
              <span className="text-sm font-medium text-foreground">{product.altitude}</span>
            </div>
             <div className="flex flex-col items-center text-center space-y-2">
              <Clock className="w-6 h-6 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted">Roast</span>
              <span className="text-sm font-medium text-foreground">{product.category}</span>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Immersive Product Experience Sections */}
      <div className="mt-32 space-y-24">
        {/* Interactive Origin Map */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Source & <span className="gradient-text italic">Terroir</span></h2>
              <p className="text-muted leading-relaxed">Every lot has a story dictated by its environment. Explore the specific climatic conditions and geographical nuances that give this {product.category.toLowerCase()} its unique character.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="glass p-6 rounded-2xl border border-black/5 shadow-sm">
                  <MapPin className="w-5 h-5 text-primary mb-3" />
                  <p className="text-xs text-muted font-bold tracking-wider uppercase mb-1">Region</p>
                  <p className="font-bold text-foreground">{product.origin}</p>
                </div>
                <div className="glass p-6 rounded-2xl border border-black/5 shadow-sm">
                  <Wind className="w-5 h-5 text-primary mb-3" />
                  <p className="text-xs text-muted font-bold tracking-wider uppercase mb-1">Altitude</p>
                  <p className="font-bold text-foreground">{product.altitude}</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative h-80 glass rounded-[2rem] overflow-hidden border border-black/5 shadow-xl flex items-center justify-center bg-coffee-light/20">
              <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-primary/5 z-10" />
              <Globe2 className="w-96 h-96 text-primary/10 absolute -right-12 -bottom-12 animate-[spin_60s_linear_infinite]" />
              
              {/* Glowing Map Pin */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative z-20 flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md border border-primary/50 shadow-[0_0_30px_rgba(198,156,109,0.3)]">
                  <MapPin className="w-5 h-5 text-primary fill-primary" />
                </div>
                <div className="w-2 h-2 rounded-full bg-primary mt-2 animate-ping" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Perfect Serve AR Simulator */}
        {(product as any).serve && (
          <section>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-[2.5rem] p-8 md:p-16 border border-black/5 shadow-xl relative overflow-hidden text-center bg-white/50"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">The Perfect <span className="gradient-text italic">Serve</span></h2>
              <p className="text-muted max-w-2xl mx-auto mb-12">Precision matters. We've dialed in the exact parameters to extract the optimal flavor profile from this lot.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-black/5 border border-black/5 hover:border-primary/50 transition-colors group">
                  <Coffee className="w-6 sm:w-8 h-6 sm:h-8 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] sm:text-xs font-bold text-muted uppercase tracking-widest mb-1">Vessel</span>
                  <span className="font-bold text-sm sm:text-lg text-foreground">{(product as any).serve.vessel}</span>
                </div>
                <div className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-black/5 border border-black/5 hover:border-primary/50 transition-colors group">
                  <Settings2 className="w-6 sm:w-8 h-6 sm:h-8 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] sm:text-xs font-bold text-muted uppercase tracking-widest mb-1">Grind</span>
                  <span className="font-bold text-sm sm:text-lg text-foreground">{(product as any).serve.grind}</span>
                </div>
                <div className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-black/5 border border-black/5 hover:border-primary/50 transition-colors group">
                  <Flame className="w-6 sm:w-8 h-6 sm:h-8 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] sm:text-xs font-bold text-muted uppercase tracking-widest mb-1">Temp</span>
                  <span className="font-bold text-sm sm:text-lg text-foreground">{(product as any).serve.temp}</span>
                </div>
                <div className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-black/5 border border-black/5 hover:border-primary/50 transition-colors group">
                  <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] sm:text-xs font-bold text-muted uppercase tracking-widest mb-1">Time</span>
                  <span className="font-bold text-sm sm:text-lg text-foreground">{(product as any).serve.time}</span>
                </div>
              </div>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
