"use client";

import { motion } from "framer-motion";
import { User, Package, Ticket, Settings, LogOut, Clock, MapPin, CreditCard, Award, CheckCircle2, Leaf, Coffee } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { clearSession, getStoredSession, type AuthUser } from "@/lib/auth";

const ORDERS = [
  { id: "AURA-2024-089", date: "Today, 09:42 AM", status: "Roasting", total: "$56.00", items: "Midnight Onyx, Colombian Supremo", steps: ["Received", "Roasting", "Packaging", "Shipped", "Delivered"], currentStep: 1 },
  { id: "AURA-2024-042", date: "Sep 12, 2024", status: "Delivered", total: "$28.00", items: "Ethiopian Yirgacheffe", steps: ["Received", "Roasting", "Packaging", "Shipped", "Delivered"], currentStep: 4 },
];

const COUPONS = [
  { code: "AURA20", discount: "20% OFF", expiry: "Valid until Dec 2024", description: "Holiday special valid on all single origin roasts." },
  { code: "FREESHIP", discount: "FREE SHIPPING", expiry: "Valid on next order", description: "Complimentary shipping for our loyal members." },
];

// User's aggregated taste profile stats
const USER_STATS = { acidity: 4, body: 2, sweetness: 5, complexity: 4, finish: 3 };

const UserTasteRadar = () => {
  const getPoint = (val: number, angleIndex: number) => {
    const r = (val / 5) * 40; 
    const angle = -Math.PI / 2 + (angleIndex * 2 * Math.PI / 5);
    return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
  };

  const a = USER_STATS.acidity;
  const s = USER_STATS.sweetness;
  const f = USER_STATS.finish;
  const b = USER_STATS.body;
  const c = USER_STATS.complexity;

  const points = `${getPoint(a, 0)} ${getPoint(s, 1)} ${getPoint(f, 2)} ${getPoint(b, 3)} ${getPoint(c, 4)}`;

  return (
    <div className="relative w-full aspect-square max-w-[220px] mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
         {[1, 2, 3, 4, 5].map(level => {
            const webPoints = [0, 1, 2, 3, 4].map(i => getPoint(level, i)).join(" ");
            return <polygon key={level} points={webPoints} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
         })}
         {[0, 1, 2, 3, 4].map(i => (
           <line key={i} x1="50" y1="50" x2={getPoint(5, i).split(',')[0]} y2={getPoint(5, i).split(',')[1]} stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
         ))}

         <motion.polygon 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          points={points}
          fill="rgba(198, 156, 109, 0.3)" 
          stroke="rgb(198, 156, 109)" 
          strokeWidth="1.5"
          className="origin-center"
        />
      </svg>
      {/* Labels */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-[8px] font-bold text-primary tracking-widest uppercase">Acidity</div>
      <div className="absolute top-[30%] -right-4 translate-x-3 text-[8px] font-bold text-primary tracking-widest uppercase">Sweetness</div>
      <div className="absolute bottom-[5%] right-0 translate-x-3 translate-y-3 text-[8px] font-bold text-primary tracking-widest uppercase">Finish</div>
      <div className="absolute bottom-[5%] left-0 -translate-x-3 translate-y-3 text-[8px] font-bold text-primary tracking-widest uppercase">Body</div>
      <div className="absolute top-[30%] -left-4 -translate-x-3 text-[8px] font-bold text-primary tracking-widest uppercase">Complexity</div>
    </div>
  );
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [currentUser] = useState<AuthUser | null>(() => getStoredSession()?.user ?? null);
  const router = useRouter();

  useEffect(() => {
    if (!getStoredSession()?.token) {
      router.replace("/login");
    }
  }, [router]);

  if (!currentUser) {
    return (
      <div className="container mx-auto min-h-screen px-6 pt-32 pb-24 md:px-12">
        <div className="glass rounded-[2rem] border border-black/5 bg-white/60 p-10 text-center shadow-xl">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary">Preparing account</p>
          <h1 className="mt-4 font-serif text-3xl font-bold text-foreground">Loading your profile...</h1>
          <p className="mt-3 text-sm text-muted">You will be redirected to login if no session is found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 container mx-auto min-h-screen">
      
      {/* Command Center Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* User Identity Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[2rem] p-10 lg:col-span-4 flex flex-col items-center justify-center text-center relative overflow-hidden border border-black/5 shadow-xl bg-white/50"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -z-10" />
          <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-tr from-primary to-coffee-light p-1.5 flex items-center justify-center relative overflow-hidden shadow-2xl mb-6 rotate-3">
             <div className="absolute inset-0 bg-black/10 rounded-[2.5rem]" />
             <User className="w-12 h-12 text-white relative z-10 -rotate-3" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-2 text-foreground">{currentUser.name}</h1>
          <p className="text-muted text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            Verified {currentUser.phoneNumber}
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-primary/20 bg-primary/5 text-primary font-bold text-xs tracking-wider shadow-inner">
            <Award className="w-4 h-4" /> Aura Elite Tier
          </div>
        </motion.div>

        {/* Evolving Taste Profile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-[2rem] p-10 lg:col-span-4 flex flex-col items-center justify-center relative border border-black/5 shadow-xl bg-white/50"
        >
          <h3 className="text-xl font-serif font-bold mb-1 w-full text-center text-foreground">Aura Signature</h3>
          <p className="text-[10px] text-muted font-bold tracking-widest uppercase mb-8 w-full text-center">Your evolving taste profile</p>
          <UserTasteRadar />
        </motion.div>

        {/* Holographic Loyalty Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-[2rem] p-10 lg:col-span-4 flex flex-col justify-center relative overflow-hidden border border-black/5 shadow-xl bg-white/50"
        >
          <h3 className="text-xl font-serif font-bold mb-8 text-foreground">Milestones</h3>
          <div className="space-y-5 w-full">
            {/* Active Badge */}
            <div className="flex items-center gap-5 p-5 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden group shadow-sm transition-all hover:bg-primary/10">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Leaf className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Harvest Tier</h4>
                <p className="text-[10px] text-primary font-bold tracking-widest uppercase">1,240 Ritual Points</p>
              </div>
            </div>
            
            {/* Locked Badge */}
            <div className="flex items-center gap-5 p-5 rounded-3xl bg-black/5 border border-black/5 opacity-50 contrast-75 hover:opacity-80 transition-all cursor-not-allowed">
              <div className="w-14 h-14 rounded-2xl bg-black/10 flex items-center justify-center border border-black/10">
                <Coffee className="w-7 h-7 text-muted" />
              </div>
              <div>
                <h4 className="font-bold text-muted">Master Roaster</h4>
                <p className="text-[10px] text-muted font-bold tracking-widest uppercase">760 to next tier</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-72 shrink-0"
        >
          <div className="glass rounded-[2rem] p-4 flex flex-col gap-2 border border-black/5 shadow-xl bg-white/50 sticky top-32">
            {[
              { id: "orders", icon: Package, label: "Order History" },
              { id: "coupons", icon: Ticket, label: "Exclusive Offers" },
              { id: "address", icon: MapPin, label: "Vault Addresses" },
              { id: "payment", icon: CreditCard, label: "Secure Payment" },
              { id: "settings", icon: Settings, label: "Account Rituals" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm tracking-wide text-left group",
                  activeTab === item.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted hover:bg-black/5 hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5 transition-transform", activeTab === item.id ? "scale-110" : "group-hover:scale-110")} />
                {item.label}
              </button>
            ))}
            <div className="h-px bg-black/5 my-4 mx-4" />
            <button
              onClick={() => {
                clearSession({ resetGuestSession: true });
                router.push("/login");
              }}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 font-bold text-sm tracking-wide hover:bg-red-50 transition-all text-left"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-grow min-w-0"
        >
          {activeTab === "orders" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">Active <span className="gradient-text italic">Shipments</span></h2>
              {ORDERS.map((order) => (
                <div key={order.id} className="glass p-8 md:p-10 rounded-[2.5rem] flex flex-col gap-10 border border-black/5 shadow-xl bg-white/50 hover:border-primary/20 transition-all">
                  
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b border-black/5 pb-8">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                         <span className="font-bold text-2xl text-foreground">{order.id}</span>
                         <span className={cn(
                           "text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest",
                           order.status === "Delivered" ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-primary/10 text-primary border border-primary/20 animate-pulse"
                         )}>{order.status}</span>
                      </div>
                      <p className="text-muted text-sm font-medium flex items-center gap-2"><Clock className="w-4 h-4 opacity-50" /> {order.date} • {order.items}</p>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                      <span className="font-bold text-3xl text-foreground">{order.total}</span>
                      <button className="text-primary font-bold text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Digital Invoice</button>
                    </div>
                  </div>

                  {/* Animated Timeline */}
                  <div className="relative py-8 px-4">
                    {/* Background Track */}
                    <div className="absolute top-1/2 left-0 w-full h-1.5 bg-black/5 -translate-y-1/2 rounded-full" />
                    
                    {/* Progress Track */}
                     <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(order.currentStep / (order.steps.length - 1)) * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-1/2 left-0 h-1.5 bg-primary -translate-y-1/2 rounded-full shadow-[0_0_20px_rgba(198,156,109,0.4)]" 
                    />

                    {/* Nodes */}
                    <div className="relative z-10 flex justify-between">
                      {order.steps.map((step, stepIdx) => {
                        const isCompleted = stepIdx <= order.currentStep;
                        const isCurrent = stepIdx === order.currentStep;
                        
                        return (
                          <div key={step} className="flex flex-col items-center gap-4 w-20">
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: stepIdx * 0.15 }}
                              className={cn(
                                "w-10 h-10 rounded-2xl flex items-center justify-center border-4 transition-all duration-500",
                                isCompleted ? "bg-primary border-white shadow-xl" : "bg-white border-black/5",
                                isCurrent && order.status !== "Delivered" && "shadow-[0_0_30px_rgba(198,156,109,0.5)] scale-125"
                              )}
                            >
                              {isCompleted ? <CheckCircle2 className="w-5 h-5 text-white" /> : <div className="w-2.5 h-2.5 rounded-full bg-black/10" />}
                            </motion.div>
                            <span className={cn(
                              "text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] text-center",
                              isCompleted ? "text-foreground" : "text-muted",
                              isCurrent && "text-primary"
                            )}>{step}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {activeTab === "coupons" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">Aura <span className="gradient-text italic">Benefits</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {COUPONS.map((coupon, i) => (
                  <div key={i} className="glass rounded-[2rem] overflow-hidden relative group border border-black/5 shadow-xl bg-white/50 hover:border-primary/30 transition-all">
                    <div className="absolute top-0 left-0 w-2.5 h-full bg-primary" />
                    <div className="p-10 ml-2">
                      <div className="flex items-start justify-between mb-6">
                        <span className="bg-primary/5 text-primary font-mono font-black text-lg px-4 py-2 rounded-xl border border-primary/20 select-all tracking-wider shadow-inner">
                          {coupon.code}
                        </span>
                        <Ticket className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-4xl font-black mb-4 text-foreground tracking-tight">{coupon.discount}</h3>
                      <p className="text-sm text-muted mb-8 leading-relaxed font-medium">{coupon.description}</p>
                      
                      <div className="flex flex-col gap-6">
                         <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                           <Clock className="w-3.5 h-3.5" /> {coupon.expiry}
                         </p>
                         <button className="w-full py-4.5 bg-black/5 hover:bg-primary text-foreground hover:text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 border border-black/5 hover:border-transparent shadow-sm">
                           Lock In Reward
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab !== "orders" && activeTab !== "coupons") && (
            <div className="glass p-20 rounded-[2.5rem] flex flex-col items-center justify-center text-center border border-black/5 shadow-xl bg-white/50 h-[400px]">
              <Settings className="w-16 h-16 text-primary/20 mb-8 animate-spin-slow" style={{ animationDuration: '12s' }} />
              <h3 className="text-2xl font-serif font-bold mb-3 text-foreground">Syncing Module...</h3>
              <p className="text-muted text-sm max-w-xs mx-auto leading-relaxed">We&apos;re updating your secure vault. This section will be accessible shortly.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
