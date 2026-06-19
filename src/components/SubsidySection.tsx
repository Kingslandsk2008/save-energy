import React, { useState, useEffect } from "react";
import { 
  Award, 
  CheckCircle2, 
  Percent, 
  ArrowLeft, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Building, 
  Zap, 
  Info, 
  ShieldCheck, 
  Sun, 
  DollarSign, 
  Layers,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SubsidyOption {
  id: string;
  title: string;
  capacity: string;
  totalCost: string;
  subsidyAmount: string;
  effectiveCost: string;
  panelsCount: string;
  roofArea: string;
  suitability: string;
  features: string[];
  badgeColor: string;
  accentGradient: string;
  icon: React.ReactNode;
}

export default function SubsidySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolledIndex, setScrolledIndex] = useState(0);

  const subsidyOptions: SubsidyOption[] = [
    {
      id: "opt-2kw",
      title: "Eco Domestic Essential",
      capacity: "2 kW Solar Setup",
      totalCost: "₹1,40,000",
      subsidyAmount: "₹90,000 (₹60k + ₹30k)",
      effectiveCost: "₹50,000",
      panelsCount: "4 Panels (Mono PERC)",
      roofArea: "108 Sq. Ft. Area",
      suitability: "Best choice for independent floors, starter homes, and low-usage setups.",
      features: [
        "₹90,000 Direct Bank Rebate (₹60k Central + ₹30k State)",
        "Perfect for standard lights, fans & TV base loads",
        "Net-metering integration and certified installation"
      ],
      badgeColor: "bg-teal-400 text-slate-950",
      accentGradient: "from-teal-400 via-teal-600 to-teal-900",
      icon: <Layers className="w-6 h-6 text-teal-300" />
    },
    {
      id: "opt-3kw",
      title: "Classic Domestic Powerhouse",
      capacity: "3 kW Solar Setup",
      totalCost: "₹1,90,000",
      subsidyAmount: "₹1,08,000 (₹78k + ₹30k)",
      effectiveCost: "₹82,000",
      panelsCount: "6 Panels (Mono PERC)",
      roofArea: "162 Sq. Ft. Area",
      suitability: "Most popular choice for average 2-3 BHK domestic households with AC setups.",
      features: [
        "₹1,08,000 Direct Cash Subsidy (₹78k Central + ₹30k State)",
        "Easily powers refrigerator, 1.5-ton split AC & Geysers",
        "Export surplus electricity back to DISCOM grid"
      ],
      badgeColor: "bg-emerald-400 text-slate-950",
      accentGradient: "from-emerald-400 via-teal-600 to-cyan-900",
      icon: <Zap className="w-6 h-6 text-emerald-300" />
    },
    {
      id: "opt-4kw",
      title: "Premier Standard Smart Plant",
      capacity: "4 kW Solar Setup",
      totalCost: "₹2,50,000",
      subsidyAmount: "₹1,08,000 (₹78k + ₹30k)",
      effectiveCost: "₹1,42,000",
      panelsCount: "8 Panels (Mono PERC)",
      roofArea: "216 Sq. Ft. Area",
      suitability: "Excellent fallback power and high efficiency for larger multi-story buildings.",
      features: [
        "₹1,08,000 Flat Subsidy Support direct to your account",
        "High generation rate of ~16-20 units daily",
        "Fully remote app analytics monitoring pre-configured"
      ],
      badgeColor: "bg-cyan-400 text-slate-900",
      accentGradient: "from-cyan-400 via-indigo-700 to-slate-900",
      icon: <Sun className="w-6 h-6 text-cyan-300" />
    },
    {
      id: "opt-5kw",
      title: "High Performance Elite Grid",
      capacity: "5 kW Solar Setup",
      totalCost: "₹3,05,000",
      subsidyAmount: "₹1,08,000 (₹78k + ₹30k)",
      effectiveCost: "₹1,97,000",
      panelsCount: "10 Panels (Bi-facial Tech)",
      roofArea: "270 Sq. Ft. Area",
      suitability: "Perfect for large residences with continuous dual AC running and EV chargers.",
      features: [
        "Substantial ₹1,08,000 flat Government cash support",
        "Generates ~20-25 clean units every single day",
        "Full support for continuous EV smart charger integration"
      ],
      badgeColor: "bg-blue-400 text-slate-900",
      accentGradient: "from-blue-400 via-violet-750 to-slate-950",
      icon: <Award className="w-6 h-6 text-blue-300" />
    },
    {
      id: "opt-6kw",
      title: "Ultra Power Mansion Estate",
      capacity: "6 kW Solar Setup",
      totalCost: "₹3,60,000",
      subsidyAmount: "₹1,08,000 (₹78k + ₹30k)",
      effectiveCost: "₹2,52,000",
      panelsCount: "12 Panels (Bi-facial Tech)",
      roofArea: "324 Sq. Ft. Area",
      suitability: "Ideal for high load villas, premium bungalows, and multi-motor pumps setup.",
      features: [
        "Wipes out ₹8,000 - ₹12,000 monthly utility payments completely",
        "Includes industrial-grade hybrid inverter technology",
        "Maximize passive income credits online via net-meter grid"
      ],
      badgeColor: "bg-indigo-400 text-white",
      accentGradient: "from-indigo-400 via-purple-700 to-slate-950",
      icon: <Building className="w-6 h-6 text-indigo-300" />
    },
    {
      id: "opt-7kw",
      title: "Luxury Estate Clean Energy",
      capacity: "7 kW Solar Setup",
      totalCost: "₹4,20,000",
      subsidyAmount: "₹1,08,000 (₹78k + ₹30k)",
      effectiveCost: "₹3,12,000",
      panelsCount: "14 Panels (Mono PERC)",
      roofArea: "378 Sq. Ft. Area",
      suitability: "Prestige power density for heavy appliance setups and multi-floor families.",
      features: [
        "Favorable return on investment (ROI) within 4 years",
        "Weatherproof, hail-resistant structural premium brackets",
        "Direct DISCOM priority approval desk processing"
      ],
      badgeColor: "bg-purple-400 text-slate-950",
      accentGradient: "from-purple-550 via-purple-700 to-slate-950",
      icon: <Building className="w-6 h-6 text-purple-300" />
    },
    {
      id: "opt-8kw",
      title: "Ultimate Grand Villa Plant",
      capacity: "8 kW Solar Setup",
      totalCost: "₹4,85,000",
      subsidyAmount: "₹1,08,000 (₹78k + ₹30k)",
      effectiveCost: "₹3,77,000",
      panelsCount: "16 Panels (Mono PERC)",
      roofArea: "432 Sq. Ft. Area",
      suitability: "Our flagship clean residential powerhouse. Experience complete off-grid style comfort.",
      features: [
        "Saves ₹15,000+ per month in direct energy invoices",
        "High redundancy design for uninterrupted premium backup",
        "Dedicated remote site engineering manager allocated free"
      ],
      badgeColor: "bg-fuchsia-400 text-slate-950",
      accentGradient: "from-fuchsia-550 via-purple-750 to-slate-950",
      icon: <Building className="w-6 h-6 text-fuchsia-300" />
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % subsidyOptions.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + subsidyOptions.length) % subsidyOptions.length);
  };

  return (
    <section 
      id="subsidy" 
      className="py-24 bg-gradient-to-tr from-slate-950 via-slate-900 to-teal-950 text-white relative overflow-hidden"
    >
      {/* Dynamic Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Subsidy Calculator & Tiers</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            PM Surya Ghar Scheme Tiers
          </h2>
          <p className="text-teal-100/70 text-sm sm:text-base max-w-2xl mx-auto">
            Explore standard configurations eligible for up to <strong className="text-emerald-400">₹78,000 Direct Subsidy</strong> under the national scheme inside India. Navigate our 3D system deck below.
          </p>
        </div>

        {/* 3D Scroll System & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 16:9 Carousel Navigator & Card list */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs text-emerald-400 font-extrabold uppercase tracking-wide">
              Selected Configuration Menu
            </p>
            <div className="space-y-3">
              {subsidyOptions.map((opt, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                      isActive 
                        ? "bg-gradient-to-r from-teal-900/80 to-slate-900/90 border-emerald-500/60 shadow-lg shadow-emerald-900/10"
                        : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/75 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className={`p-2.5 rounded-xl transition-all duration-200 ${isActive ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-emerald-400 group-hover:bg-slate-750"}`}>
                        {opt.icon}
                      </div>
                      <div>
                        <p className={`text-xs font-bold tracking-wider uppercase ${isActive ? "text-emerald-400" : "text-gray-400"}`}>
                          {opt.capacity}
                        </p>
                        <p className={`text-sm sm:text-base font-bold transition-colors ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                          {opt.title}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? "text-emerald-400 translate-x-1" : "text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3D Rendered Perspective Interactive Deck */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[440px] md:min-h-[500px]">
            
            {/* Perspective Wrap Container */}
            <div className="w-full max-w-lg aspect-[5/4] sm:aspect-square relative flex items-center justify-center [perspective:1200px]">
              
              <AnimatePresence mode="popLayout">
                {subsidyOptions.map((opt, idx) => {
                  const offset = idx - activeIndex;
                  const isActive = offset === 0;
                  const isVisible = Math.abs(offset) <= 1 || (activeIndex === 0 && idx === subsidyOptions.length - 1) || (activeIndex === subsidyOptions.length - 1 && idx === 0);
                  
                  // Adjust cyclic offset index for circular rendering
                  let displayOffset = offset;
                  if (offset < -1 && activeIndex === subsidyOptions.length - 1 && idx === 0) displayOffset = 1;
                  if (offset > 1 && activeIndex === 0 && idx === subsidyOptions.length - 1) displayOffset = -1;

                  if (Math.abs(displayOffset) > 1) return null;

                  // 3D Matrix Calculations
                  const rotateY = displayOffset * -30;
                  const rotateZ = displayOffset * -2;
                  const translateX = displayOffset * 220;
                  const translateZ = isActive ? 100 : -180;
                  const scale = isActive ? 1.0 : 0.82;
                  const opacity = isActive ? 1.0 : 0.45;
                  const zIndex = isActive ? 20 : 10;

                  return (
                    <motion.div
                      key={opt.id}
                      style={{
                        transformStyle: "preserve-3d",
                        zIndex,
                      }}
                      initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                      animate={{
                        opacity,
                        scale,
                        x: translateX,
                        rotateY,
                        rotateZ,
                        z: translateZ,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 24,
                      }}
                      onClick={() => !isActive && setActiveIndex(idx)}
                      className={`absolute w-full max-w-[380px] sm:max-w-[420px] rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border transition-shadow duration-300 ${
                        isActive 
                          ? "border-emerald-500/50 shadow-[0_20px_50px_rgba(16,185,129,0.15)] cursor-default" 
                          : "border-slate-800 shadow-lg cursor-pointer hover:border-slate-700"
                      }`}
                    >
                      {/* Active State Ribbon/Header */}
                      <div className="flex items-center justify-between mb-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${opt.badgeColor}`}>
                          {opt.capacity}
                        </span>
                        <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/10">
                          <Zap className="w-3.5 h-3.5" />
                          <span>Direct Bank Rebate</span>
                        </div>
                      </div>

                      {/* Subsidy Big Show */}
                      <div className="space-y-1 mb-6">
                        <p className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">Government Cash Rebate</p>
                        <p className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-300">
                          {opt.subsidyAmount}
                        </p>
                      </div>

                      {/* Visual Details Divider */}
                      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 text-left text-xs">
                        <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimated Cost</p>
                          <p className="text-white font-extrabold mt-0.5">{opt.totalCost}</p>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Required Panels</p>
                          <p className="text-white font-extrabold mt-0.5">{opt.panelsCount}</p>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Required Roof</p>
                          <p className="text-white font-extrabold mt-0.5">{opt.roofArea}</p>
                        </div>
                        <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-550/20">
                          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Price after Subsidy</p>
                          <p className="text-emerald-300 font-black mt-0.5">{opt.effectiveCost}</p>
                        </div>
                      </div>

                      {/* Key features list */}
                      <div className="py-5 space-y-3.5 text-left text-xs sm:text-sm">
                        <p className="text-[10px] text-teal-300/80 uppercase font-black tracking-wider block">Configuration Bulletins</p>
                        <p className="text-[11px] sm:text-xs text-gray-300 italic mb-1 bg-teal-950/20 px-3 py-1.5 rounded-lg border border-teal-800/10 block">
                          💡 {opt.suitability}
                        </p>
                        {opt.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start space-x-2 text-teal-100/90 leading-tight">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs font-medium">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Active Action Helper */}
                      {isActive && (
                        <div className="pt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const el = document.getElementById("lead-form");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-650 text-slate-950 font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
                          >
                            Proceed to Site Survey Inquiry
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

            </div>

            {/* Slide Navigation Buttons */}
            <div className="flex items-center justify-between w-full max-w-sm mt-4 gap-6 relative z-30">
              <button
                onClick={prevSlide}
                className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 text-teal-400 transition-all hover:scale-105"
                title="Previous Option"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              {/* Pagination indicators */}
              <div className="flex items-center space-x-2">
                {subsidyOptions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx 
                        ? "w-8 bg-emerald-400" 
                        : "w-2.5 bg-slate-800 hover:bg-slate-700"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 text-teal-400 transition-all hover:scale-105"
                title="Next Option"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

        {/* 3D Scroll System Step-by-Step claimant section */}
        <div id="subsidy-guide" className="mt-20 pt-16 border-t border-slate-850 text-left">
          <div className="max-w-2xl mb-12">
            <span className="text-xs text-emerald-400 font-extrabold bg-teal-950 px-3.5 py-1.5 rounded-full uppercase border border-teal-500/10">
              How To Claim Cash Incentives
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white mt-4">
              Step-by-Step Subsidy Approval Journey
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">
              We guide you from registration to direct bank account transfers with complete paperwork management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-850 space-y-4 hover:border-teal-500/30 transition-colors relative group">
              <span className="absolute top-4 right-4 font-display font-black text-3xl text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors">01</span>
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
                <Layers className="w-5 h-5" />
              </div>
              <p className="font-display font-extrabold text-white text-base">Portal Registration</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Submit an initial domestic request on the National Portal with your DISCOM consumer number.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-850 space-y-4 hover:border-teal-500/30 transition-colors relative group">
              <span className="absolute top-4 right-4 font-display font-black text-3xl text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors">02</span>
              <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="font-display font-extrabold text-white text-base">Certified Vendor Choice</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Select <strong>Save Energy</strong> as your certified installer. We conduct professional roof surveys and mount smart modules.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-850 space-y-4 hover:border-teal-500/30 transition-colors relative group">
              <span className="absolute top-4 right-4 font-display font-black text-3xl text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors">03</span>
              <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl w-fit">
                <Zap className="w-5 h-5" />
              </div>
              <p className="font-display font-extrabold text-white text-base">Net-Metering Install</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Government DISCOM board officers install a dual direction solar meter, granting power synchronization safely.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-850 space-y-4 hover:border-teal-500/30 transition-colors relative group">
              <span className="absolute top-4 right-4 font-display font-black text-3xl text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors">04</span>
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl w-fit">
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="font-display font-extrabold text-white text-base">Direct Rebate Credit</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Rebate amount is wired straight to your physical bank account within 30 days of completion!
              </p>
            </div>

          </div>

          {/* Quick FAQ summary link */}
          <div className="mt-8 p-4 bg-emerald-950/20 border border-emerald-800/20 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
            <div className="flex items-center space-x-2 text-teal-300">
              <Info className="w-4 h-4 flex-shrink-0" />
              <span>Are you a commercial or industrial user? Direct subsidies are replaced by 40% tax depreciation.</span>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("faq");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-emerald-400 font-extrabold hover:underline whitespace-nowrap"
            >
              Learn commercial rules in FAQs →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
