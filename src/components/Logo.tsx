import React from "react";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "free";
  className?: string;
  inverse?: boolean;
}

export default function Logo({ showText = true, size = "md", className = "", inverse = false }: LogoProps) {
  // Determine SVG height and class
  const dims = {
    sm: "h-8",
    md: "h-11",
    lg: "h-16",
    xl: "h-24",
    free: "h-auto w-full"
  };

  const selectedSizeClass = dims[size] || dims.md;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon Illustration */}
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${selectedSizeClass} aspect-square flex-shrink-0`}
      >
        <defs>
          {/* Radiant Sun Gradient */}
          <linearGradient id="sun-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="40%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#F57C00" />
          </linearGradient>

          {/* Symmetrical Solar Blue Gradient */}
          <linearGradient id="solar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4FC3F7" />
            <stop offset="50%" stopColor="#0288D1" />
            <stop offset="100%" stopColor="#01579B" />
          </linearGradient>

          {/* Swoosh Blue-Green Transition */}
          <linearGradient id="swoosh-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D47A1" />
            <stop offset="50%" stopColor="#00897B" />
            <stop offset="100%" stopColor="#43A047" />
          </linearGradient>

          {/* Leaf 1 Vibrant Green */}
          <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#81C784" />
            <stop offset="100%" stopColor="#2E7D32" />
          </linearGradient>

          {/* Subtle Drop Shadow on Panel */}
          <filter id="panel-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#0d1b2a" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. THE BRIGHT GLORIOUS SUN (Rear Top Left) */}
        <g id="sun-group">
          {/* Sun Core */}
          <circle cx="115" cy="100" r="34" fill="url(#sun-grad)" />
          
          {/* Sun Rays */}
          <path d="M 115,50 L 115,58 M 115,142 L 115,150" stroke="url(#sun-grad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 65,100 L 73,100 M 157,100 L 165,100" stroke="url(#sun-grad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 80,65 L 86,71 M 144,129 L 150,135" stroke="url(#sun-grad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 80,135 L 86,129 M 144,71 L 150,65" stroke="url(#sun-grad)" strokeWidth="4.5" strokeLinecap="round" />
          
          {/* Triangular Rays for extra high dynamic range feel */}
          <polygon points="115,48 111,58 119,58" fill="url(#sun-grad)" />
          <polygon points="115,152 111,142 119,142" fill="url(#sun-grad)" />
          <polygon points="63,100 73,96 73,104" fill="url(#sun-grad)" />
          <polygon points="167,100 157,96 157,104" fill="url(#sun-grad)" />
          
          <polygon points="78,63 88,69 83,74" fill="url(#sun-grad)" />
          <polygon points="152,137 142,131 147,126" fill="url(#sun-grad)" />
          <polygon points="78,137 88,131 83,126" fill="url(#sun-grad)" />
          <polygon points="152,63 142,69 147,74" fill="url(#sun-grad)" />
        </g>

        {/* 2. CHROME BLUE SOLAR PANELS GRID ON A ROOF (Preserve-3D perspective alignment) */}
        <g id="solar-panels-roof" filter="url(#panel-shadow)">
          {/* Main Panel Boundary */}
          <polygon points="120,120 230,105 190,165 72,180" fill="url(#solar-grad)" stroke="#FFFFFF" strokeWidth="2.5" />
          
          {/* Matrix Grid Lines for Solar Cell Units */}
          <line x1="148" y1="116" x2="102" y2="176" stroke="#E0F7FA" strokeWidth="1.8" />
          <line x1="175" y1="112" x2="132" y2="172" stroke="#E0F7FA" strokeWidth="1.8" />
          <line x1="202" y1="108" x2="162" y2="168" stroke="#E0F7FA" strokeWidth="1.8" />
          
          <line x1="96" y1="149" x2="210" y2="134" stroke="#E0F7FA" strokeWidth="1.8" strokeDasharray="1.5" />
          <line x1="84" y1="165" x2="199" y2="150" stroke="#E0F7FA" strokeWidth="1.8" />
        </g>

        {/* 3. SOLID HOME HOUSE TRIM FRAME (Fits beautifully under the solar panel roof) */}
        <g id="house-base">
          {/* Front Roof Pitch Trim */}
          <polyline points="72,180 135,125 190,165" stroke="#0D47A1" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Cozy House Front Wall Boundary */}
          <path d="M 85,178 L 85,205 C 85,209 88,212 92,212 L 175,212 C 179,212 182,209 182,205 L 182,170" stroke="#0D47A1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Square 4-Pane Window */}
          <rect x="120" y="168" width="22" height="22" rx="2" fill="#FFFFFF" stroke="#0D47A1" strokeWidth="3" />
          <line x1="131" y1="168" x2="131" y2="190" stroke="#0D47A1" strokeWidth="2.5" />
          <line x1="120" y1="179" x2="142" y2="179" stroke="#0D47A1" strokeWidth="2.5" />
        </g>

        {/* 4. CIRCULAR ECO SWOOSH WRAP (Intertwined orbits of energy) */}
        <path
          d="M 102,225 C 60,195 55,120 120,80 C 185,40 245,60 252,140 C 255,175 240,215 195,232"
          stroke="url(#swoosh-grad)"
          strokeWidth="6.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* 5. VIBRANT ECO LEAVES (Vibrant integration showing clean power growth) */}
        {/* Leaf 1: Major Leaf */}
        <g id="leaf1">
          <path
            d="M 230,135 C 245,110 270,110 282,130 C 294,150 265,175 230,135 Z"
            fill="url(#leaf-grad)"
            stroke="#1B5E20"
            strokeWidth="1"
          />
          {/* Vein */}
          <path d="M 230,135 Q 255,138 282,130" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* Leaf 2: Minor Leaf */}
        <g id="leaf2">
          <path
            d="M 215,165 C 210,145 232,135 248,150 C 264,165 235,180 215,165 Z"
            fill="url(#leaf-grad)"
            stroke="#1B5E20"
            strokeWidth="1"
          />
          {/* Vein */}
          <path d="M 215,165 Q 230,163 248,150" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        </g>
      </svg>

      {/* 6. LOGO BRAND TYPOGRAPHY BLOCK */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline">
            <span className={`font-display font-black tracking-tight text-xl sm:text-2xl ${inverse ? "text-white" : "text-slate-900"}`}>
              SAVE
            </span>
            <span className="font-display font-black tracking-tight text-xl sm:text-2xl text-emerald-600 ml-1">
              ENERGY
            </span>
          </div>

          <span className={`font-sans font-bold text-[7.5px] uppercase tracking-[0.08em] mt-1 ${inverse ? "text-emerald-400" : "text-emerald-750"}`}>
            Save Today, Power Tomorrow
          </span>
        </div>
      )}
    </div>
  );
}
