import React from "react";
import { Home, Building2, Factory, Zap, BatteryCharging, Combine, Settings, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function Services() {
  const servicesList = [
    {
      icon: <Home className="w-10 h-10 text-emerald-600" />,
      title: "Residential Solar",
      description: "Custom solar plant installations designed to fit your house roof size, style, and energy load needs. Complete with easy government subsidy processing.",
      tag: "Popular",
    },
    {
      icon: <Building2 className="w-10 h-10 text-emerald-600" />,
      title: "Commercial Solar Systems",
      description: "Scale down your corporate office overheads, factories, hospitals, and educational institutions with smart grid-interactive rooftop facilities.",
      tag: "High ROI",
    },
    {
      icon: <Factory className="w-10 h-10 text-emerald-600" />,
      title: "Industrial Solar Solutions",
      description: "Heavy-duty engineering modules for cold storage units, manufacturing plants, and warehouses looking to achieve 100% clean energy independence.",
      tag: "Customizable",
    },
    {
      icon: <Zap className="w-10 h-10 text-emerald-600" />,
      title: "On-Grid Solar Systems",
      description: "Export surplus generated power directly back to the state electricity utility grid via Net-Metering, and earn credits that offset your bills to zero.",
      tag: "Best for Cities",
    },
    {
      icon: <BatteryCharging className="w-10 h-10 text-emerald-600" />,
      title: "Off-Grid Solar Systems",
      description: "Standalone installations equipped with premium batteries. Store clean solar power generated during the day to power your systems throughout the night.",
      tag: "Remote Area",
    },
    {
      icon: <Combine className="w-10 h-10 text-emerald-600" />,
      title: "Hybrid Solar Systems",
      description: "The ultimate solution combining state grid connectivity and dedicated battery backup systems. Never experience a power outage again.",
      tag: "All-in-One",
    },
    {
      icon: <Settings className="w-10 h-10 text-emerald-600" />,
      title: "Solar Maintenance & Support",
      description: "In-depth health verification checks, solar panel chemical washing, inverter optimization, and immediate system repair assistance.",
      tag: "Guaranteed UPTime",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-500 font-extrabold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-1.5 rounded-full inline-block">
            Our Expertise
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Comprehensive Solar Services Specifically Designed For You
          </h2>
          <p className="text-gray-600 text-lg">
            Whether you want to reduce household utility expenses or power an industrial facility, we carry full-scale expertise to satisfy your specific objectives.
          </p>
        </div>

        {/* Dynamic Bento Style Grid for the 7 Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const isFirstThree = index < 3;
            return (
              <div
                key={service.title}
                className={`group relative bg-gray-50/50 hover:bg-white rounded-3xl p-6 sm:p-8 transition-all duration-300 border border-gray-100 hover:border-emerald-500/10 hover:shadow-2xl flex flex-col justify-between ${
                  index === 6 ? "lg:col-span-3 !flex-row max-md:!flex-col items-center gap-6" : ""
                }`}
              >
                {/* Decorative card background hover element */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className={index === 6 ? "flex-1 space-y-4" : "space-y-4"}>
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-white group-hover:bg-emerald-50 rounded-2xl shadow-sm border border-gray-100 transition-colors duration-300 inline-block">
                      {service.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/40">
                      {service.tag}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-xl text-gray-950 group-hover:text-emerald-600 transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className={index === 6 ? "flex-shrink-0 pt-4 md:pt-0" : "pt-6"}>
                  <button
                    onClick={() => {
                      const el = document.getElementById("lead-form");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center space-x-2 text-xs font-extrabold text-emerald-600 hover:text-emerald-700 hover:underline tracking-wider uppercase transition-all duration-200"
                  >
                    <span>Inquire Now</span>
                    <span className="group-hover:translate-x-1.5 transition-transform duration-200">➔</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
