import React from "react";
import { TrendingDown, Coins, Home, Leaf, Shield, HeartPulse, Zap, Award } from "lucide-react";
import { motion } from "motion/react";

export default function Benefits() {
  const benefitsList = [
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: "Reduce Electricity Bills",
      description: "Slash your monthly electricity statement immediately by up to 95%. Safeguard your budget against commercial grid tariff hikes.",
      color: "from-emerald-500 to-green-600 bg-emerald-50 text-emerald-600",
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Government Subsidy Benefits",
      description: "Receive ready-to-claim direct cashback subsidies up to ₹108,000 processed straight into your savings account post-installation.",
      color: "from-teal-500 to-emerald-600 bg-teal-50 text-teal-600",
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Increase Property Value",
      description: "Properties with integrated clean energy plants sell up to 4% faster and command higher valuation premiums on the open real estate market.",
      color: "from-sky-500 to-blue-600 bg-sky-50 text-sky-600",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Eco-Friendly Energy Solution",
      description: "Displace metric tons of carbon emissions. A standard 3kW system is equivalent to planting 150+ full-grown mature trees every single year.",
      color: "from-green-500 to-emerald-700 bg-green-50 text-emerald-600",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Low Maintenance Cost",
      description: "No moving parts mean practically zero wear-and-tear. An occasional spray cleanup with plain water is all that is ever required.",
      color: "from-blue-500 to-indigo-600 bg-blue-50 text-blue-600",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "27+ Years Panel Life",
      description: "Highly robust monocrystalline modules backed by solid 27-Year performance warranty guarantees ensuring multi-decade returns.",
      color: "from-pink-500 to-rose-600 bg-pink-50 text-pink-600",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Energy Independence",
      description: "Safeguard your family from unpredictable rolling grid load-sheddings, brownouts, voltage instabilities, and local transmission cuts.",
      color: "from-amber-500 to-yellow-650 bg-amber-50 text-amber-600",
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: "Long-Term Savings",
      description: "Turn utility expenses into direct compound wealth investments. Achieve comprehensive system break-even paybacks in as short as 3 years.",
      color: "from-purple-500 to-indigo-600 bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-b from-white via-sky-50/10 to-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-500 font-extrabold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-1.5 rounded-full inline-block">
            Why Switch to Solar?
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            The Smartest Investment For Your Home & Business
          </h2>
          <p className="text-gray-600 text-lg">
            Solar energy isn't just an eco-conscious alternative — it's an incredible financial asset that returns compounding value year after year.
          </p>
        </div>

        {/* 2-column on mobile, 4-column on desktop structured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefitsList.map((benefit, index) => (
            <div
              key={benefit.title}
              className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-emerald-500/15 shadow-md hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`p-3 rounded-2xl inline-block ${benefit.color.split(" ").slice(2).join(" ")}`}>
                  {benefit.icon}
                </div>
                <h3 className="font-display font-bold text-gray-950 text-lg group-hover:text-emerald-600 transition-colors duration-200">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100/60">
                <span className="text-[10px] font-bold text-emerald-600 flex items-center space-x-1 uppercase tracking-wider">
                  <span>Guaranteed Value</span>
                  <span>✔</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
