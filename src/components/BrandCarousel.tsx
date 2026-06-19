import React, { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Award, Zap, Sun, Star, Cpu, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  alias: string;
  description: string;
  primaryColor: string;
  accentBg: string;
  badgeText: string;
  highlightTag: string;
  lucideIcon: React.ReactNode;
}

export default function BrandCarousel() {
  const brands: Brand[] = [
    {
      id: "tata",
      name: "TATA SOLAR",
      alias: "Tata Power Solar",
      description: "India's most trusted solar module system with robust performance on rooftop structures.",
      primaryColor: "from-blue-600 via-sky-600 to-emerald-600",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
      badgeText: "Tata Power Authorized",
      highlightTag: "Government Subsidy Approved",
      lucideIcon: (
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-400 text-white shadow-lg overflow-hidden animate-pulse">
          <Cpu className="w-6 h-6 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent)]" />
        </div>
      ),
    },
    {
      id: "adani",
      name: "ADANI SOLAR",
      alias: "Adani Energies",
      description: "Tier-1 premium heavy-duty high-wattage panels delivering up to 22.5% ultra conversion efficiency.",
      primaryColor: "from-cyan-600 via-teal-600 to-emerald-600",
      accentBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
      badgeText: "Adani Solar Authorized",
      highlightTag: "Tier-1 Cell Quality",
      lucideIcon: (
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-700 to-emerald-400 text-white shadow-lg overflow-hidden">
          <Zap className="w-6 h-6 z-10 animate-bounce" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
    },
    {
      id: "luminus",
      name: "LUMINOUS",
      alias: "Luminous Grid Solar",
      description: "Smart grid-connect hybrid inverter systems with real-time app-based live mobile monitoring.",
      primaryColor: "from-indigo-600 via-sky-600 to-blue-500",
      accentBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      badgeText: "Authorized Partner",
      highlightTag: "Intelligent Inverters",
      lucideIcon: (
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-750 to-blue-400 text-white shadow-lg overflow-hidden">
          <Sun className="w-6 h-6 z-10 animate-spin-slow text-yellow-300" />
          <div className="absolute top-0 right-0 w-4 h-4 bg-orange-550 rounded-full animate-ping opacity-30" />
        </div>
      ),
    },
    {
      id: "utl",
      name: "UTL SOLAR",
      alias: "UTL Heavy Duty",
      description: "Rugged high-load bearing hybrid solar power systems optimized for extreme backup situations.",
      primaryColor: "from-red-600 via-orange-600 to-yellow-600",
      accentBg: "bg-rose-50 text-rose-700 border-rose-200",
      badgeText: "UTL Premium Distributor",
      highlightTag: "Offline/Hybrid Champion",
      lucideIcon: (
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 text-white shadow-lg overflow-hidden">
          <Star className="w-6 h-6 z-10 text-white" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full blur-sm opacity-50" />
        </div>
      ),
    },
    {
      id: "waaree",
      name: "WAAREE",
      alias: "Waaree Energies",
      description: "Global quality-tested ultra high efficiency mono-PERC half-cut modules for maximum solar absorption.",
      primaryColor: "from-amber-500 via-orange-500 to-teal-600",
      accentBg: "bg-amber-50 text-amber-800 border-amber-200",
      badgeText: "Certified Waaree Integrator",
      highlightTag: "Extreme Durability Panels",
      lucideIcon: (
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-900 shadow-lg overflow-hidden">
          <Award className="w-6 h-6 z-10 text-slate-950 animate-pulse" />
          <div className="absolute inset-0 bg-white/20" />
        </div>
      ),
    },
  ];

  // Double the array to guarantee seamless looping transitions
  const doubleBrands = [...brands, ...brands, ...brands];

  const [hoveredBrand, setHoveredBrand] = useState<Brand | null>(null);

  return (
    <section id="brands-section" className="py-14 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      {/* Decorative radial background grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Inline Header layout emphasizing auth partnership */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/55 border border-emerald-800/40 text-emerald-400 rounded-full text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Multi-Brand Authorized Sales & System Integration</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Exclusive Solar Brand <span className="text-emerald-400">Power Partners</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl font-sans">
              Save Energy supplies, commissions, and supports India's leading tier-1 equipment portfolios. Complete on-site performance warranties.
            </p>
          </div>

          <div className="text-xs bg-slate-800/80 border border-slate-700 p-3 rounded-2xl max-w-xs font-mono text-slate-300">
            💡 <strong className="text-emerald-400">Pro-Tip:</strong> Select any solar partner logo below to instantly view system profiles and approved modules.
          </div>
        </div>

        {/* Master Scrolling Auto Ticker Container */}
        <div className="relative w-full overflow-hidden bg-slate-950/60 border border-slate-820/55 rounded-3xl py-6 px-4 backdrop-blur-sm -mx-1">
          
          {/* Subtle fade-gradient masks on both edges for beautiful visual look */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          {/* Scrolling continuous row */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6 whitespace-nowrap"
              animate={{ x: ["0%", "-33.3333%"] }}
              transition={{
                ease: "linear",
                duration: 22,
                repeat: Infinity,
              }}
              whileHover={{ animationPlayState: "paused" }} // pause ticker on hover for incredible luxury touch
            >
              {doubleBrands.map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  onClick={() => setHoveredBrand(brand)}
                  className={`inline-flex items-center gap-4 bg-slate-900/90 hover:bg-slate-850 border hover:border-emerald-500/40 p-4 rounded-2xl w-72 transition-all cursor-pointer select-none group ${
                    hoveredBrand?.id === brand.id ? "border-emerald-500 shadow-md shadow-emerald-500/10" : "border-slate-800"
                  }`}
                >
                  {/* Highly animated icon box */}
                  <div className="transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {brand.lucideIcon}
                  </div>

                  {/* Brand labeling */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-display font-black text-sm tracking-wide text-white block truncate">
                        {brand.name}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-900/40 flex-shrink-0 animate-pulse">
                        ACTIVE
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block font-sans truncate">
                      {brand.alias}
                    </span>
                    <span className="text-[9px] text-slate-500 tracking-wide font-mono block uppercase mt-0.5 mt-1">
                      {brand.highlightTag}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Selected Brand Context Detail Panel */}
        <div className="mt-8">
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Quick interactive view state toggle */}
            {!hoveredBrand ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-950/70 text-emerald-400 p-2.5 rounded-xl border border-emerald-900">
                    <Zap className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-200">Interactive Dynamic Spec Guide</h4>
                    <p className="text-xs text-slate-400">Click any scrolling brand logo above to load direct compatibility specs.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {brands.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setHoveredBrand(b)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-300 transition-all cursor-pointer"
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                key={hoveredBrand.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Visual Accent */}
                <div className="md:col-span-4 flex items-center gap-4 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-6">
                  {hoveredBrand.lucideIcon}
                  <div>
                    <span className="text-emerald-400 font-mono text-[9px] uppercase tracking-widest font-black block">
                      Save Energy Authorized Partner
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-white mt-0.5 tracking-tight">
                      {hoveredBrand.name}
                    </h3>
                    <span className={`inline-block text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border mt-1.5 ${hoveredBrand.accentBg}`}>
                      {hoveredBrand.badgeText}
                    </span>
                  </div>
                </div>

                {/* Technical Overview */}
                <div className="md:col-span-8 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Technology & Subsidy Eligibility</h4>
                    <p className="text-sm sm:text-base text-slate-200 mt-1.5 leading-relaxed font-sans">
                      {hoveredBrand.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-3 py-1 rounded-xl">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approved in PM Surya Ghar Subsidy Scheme</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-sky-450 bg-sky-950/40 border border-sky-900 px-3 py-1 rounded-xl">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Fully Compatible with Net-Metering Systems</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-450 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Supported by Save Energy Warranty Protection</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
