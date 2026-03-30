"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, User, Heart } from "lucide-react";
import { useState, useEffect, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBar from "@/components/home/AnnouncementBar";

const NAV_LINKS = [
  { name: "Home", href: "/#hero" },
  { name: "Arrivals", href: "/#arrivals" },
  { name: "Magic", href: "/#categories" },
  { name: "Press", href: "/#story" },
  { name: "Craft", href: "/#brew" },
  { name: "Club", href: "/#club" },
  { name: "Shop", href: "/shop" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {pathname === "/" && <AnnouncementBar />}
      <nav className={cn(
      "sticky top-0 w-full z-50 py-6 px-6 md:px-12 flex items-center justify-between transition-all duration-500 border-none bg-background/95 backdrop-blur-md",
      isScrolled ? "shadow-sm py-4" : "shadow-none"
    )}>
      <div className="flex items-center gap-2">
        <Link href="/" className="text-3xl font-bold gradient-text tracking-[-0.05em]">
          AURA
        </Link>
      </div>

      {/* Desktop Links - Blue Tokai Style (Airy & Uppercase) */}
      <div className="hidden lg:flex items-center gap-2">
        {NAV_LINKS.map((link) => (
          <Link 
            key={link.name}
            href={link.href}
            onClick={(e) => scrollToSection(e, link.href)}
            className="px-5 py-2 text-[13px] font-bold uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-all duration-300 relative group"
          >
            {link.name}
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/4 opacity-0 group-hover:opacity-100" />
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/profile" className="p-2.5 hover:bg-black/5 rounded-2xl transition-all duration-300 text-foreground/70 hover:text-primary group">
          <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </Link>
        <Link href="/favorites" className="p-2.5 hover:bg-black/5 rounded-2xl transition-all duration-300 text-foreground/70 hover:text-primary group">
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </Link>
        <Link href="/cart" className="p-2.5 hover:bg-black/5 rounded-2xl transition-all duration-300 text-foreground/70 hover:text-primary group relative">
          <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] flex items-center justify-center rounded-full font-black shadow-lg">
              {cartCount}
            </span>
          )}
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2.5 hover:bg-black/5 rounded-2xl transition-all duration-300 text-foreground/70"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl flex flex-col pt-8 px-8 pb-12"
          >
            <div className="flex justify-between items-center w-full mb-12">
               <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold gradient-text tracking-tighter block">
                 AURA
               </Link>
               <button 
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="p-3 bg-black/5 hover:bg-black/10 rounded-2xl transition-all text-foreground"
               >
                 <X className="w-8 h-8" />
               </button>
            </div>

            <div className="flex-1 flex flex-col gap-4 w-full overflow-y-auto pr-4 border-none">
               {NAV_LINKS.map((link, idx) => (
                 <motion.div 
                   key={link.href}
                   initial={{ x: 20, opacity: 0 }} 
                   animate={{ x: 0, opacity: 1 }} 
                   transition={{ delay: 0.1 + idx * 0.05 }}
                 >
                    <Link 
                      href={link.href} 
                      onClick={(e) => scrollToSection(e, link.href)} 
                      className="text-4xl font-bold hover:text-primary transition-all duration-300 block py-1"
                    >
                      {link.name}
                    </Link>
                 </motion.div>
               ))}
               
               <motion.div 
                 initial={{ x: 20, opacity: 0 }} 
                 animate={{ x: 0, opacity: 1 }} 
                 transition={{ delay: 0.5 }}
                 className="mt-6"
               >
                  <Link 
                    href="/subscribe" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
                  >
                    Join Aura Club <ArrowRight className="w-4 h-4" />
                  </Link>
               </motion.div>
            </div>
            
            <div className="mt-auto border-t border-black/5 pt-10 flex justify-between px-2">
               <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-muted font-bold uppercase tracking-widest text-[10px] hover:text-foreground transition-colors">
                  <User className="w-5 h-5 text-primary" /> Profile
               </Link>
               <Link href="/favorites" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-muted font-bold uppercase tracking-widest text-[10px] hover:text-foreground transition-colors">
                  <Heart className="w-5 h-5 text-primary" /> Saves
               </Link>
               <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-muted font-bold uppercase tracking-widest text-[10px] hover:text-foreground transition-colors">
                  <ShoppingCart className="w-5 h-5 text-primary" /> Cart
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
}

function ArrowRight(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
