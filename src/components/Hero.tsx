import React from "react";
import { MessageCircle, ArrowRight, ShieldCheck, Award, ThumbsUp, HelpCircle, Sun } from "lucide-react";
import { motion } from "motion/react";
import solarHomeImg from "../assets/images/solar_home_1781318242090.jpg";

interface HeroProps {
  phoneNumber: string;
  phoneNumber2: string;
  phoneNumber3: string;
}

export default function Hero({ phoneNumber, phoneNumber2, phoneNumber3 }: HeroProps) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappMsg = "Hello Save Energy, I am interested in seeking a Rooftop Solar consultation. Please guide me regarding the Government Subsidy and financing options.";
  const waUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsg)}`;
  const waUrl2 = `https://wa.me/${phoneNumber2.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsg)}`;
  const waUrl3 = `https://wa.me/${phoneNumber3.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-emerald-50/10 via-sky-50/5 to-white">
      {/* Decorative clean ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-sky-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text section (Left) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs sm:text-sm font-semibold tracking-wide uppercase"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-600 animate-pulse" />
              <span>Government Approved Solar Partner</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-lecturis font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 leading-tight"
              >
                Switch to Solar and <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600">
                  Save Thousands
                </span>{" "}
                Every Month
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl"
              >
                Get Government Subsidy, Easy Financing, and Professional Solar Installation for Your Home. Join thousands of happy Indian homes.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => handleScrollTo("lead-form")}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-bold text-base sm:text-lg tracking-wide shadow-lg shadow-emerald-200 transition-all duration-200 hover:translate-y-[-2px] flex items-center justify-center space-x-3 cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border-2 border-gray-200/80 hover:border-emerald-600 bg-white hover:bg-emerald-50/20 text-gray-800 font-bold px-4 h-14 rounded-2xl transition-all duration-200 hover:translate-y-[-2px]"
                title="Chat with Agent 1 on WhatsApp"
              >
                <MessageCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mr-2" />
                <span className="text-sm font-bold text-gray-700">WhatsApp 1</span>
              </a>

              <a
                href={waUrl2}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border-2 border-gray-200/80 hover:border-emerald-600 bg-white hover:bg-emerald-50/20 text-gray-800 font-bold px-4 h-14 rounded-2xl transition-all duration-200 hover:translate-y-[-2px]"
                title="Chat with Agent 2 on WhatsApp"
              >
                <MessageCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mr-2" />
                <span className="text-sm font-bold text-gray-700">WhatsApp 2</span>
              </a>

              <a
                href={waUrl3}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border-2 border-gray-200/80 hover:border-emerald-600 bg-white hover:bg-emerald-50/20 text-gray-800 font-bold px-4 h-14 rounded-2xl transition-all duration-200 hover:translate-y-[-2px]"
                title="Chat with Agent 3 on WhatsApp"
              >
                <MessageCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mr-2" />
                <span className="text-sm font-bold text-gray-700">WhatsApp 3</span>
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100"
            >
              <div className="flex items-start space-x-2">
                <div className="mt-1 bg-emerald-50 text-emerald-600 p-1 rounded-lg">
                  <Award className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-gray-900 text-sm sm:text-base leading-tight">500+</h4>
                  <p className="text-xs text-gray-500">Installations</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <div className="mt-1 bg-emerald-50 text-emerald-600 p-1 rounded-lg">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-gray-900 text-sm sm:text-base leading-tight">5+ Years</h4>
                  <p className="text-xs text-gray-500">Experience</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <div className="mt-1 bg-emerald-50 text-emerald-600 p-1 rounded-lg">
                  <ThumbsUp className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-gray-900 text-sm sm:text-base leading-tight">98%</h4>
                  <p className="text-xs text-gray-500">Satisfaction</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <div className="mt-1 bg-emerald-50 text-emerald-600 p-1 rounded-lg">
                  <HelpCircle className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-gray-900 text-sm sm:text-base leading-tight">Subsidy</h4>
                  <p className="text-xs text-gray-500">Assistance</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Graphics Section (Right) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-square max-w-md mx-auto"
            >
              <img
                src={solarHomeImg}
                alt="Solar Powered Modern Smart Luxury Home"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent" />
            </motion.div>

            {/* Overlapping Glassmorphism indicators for high trust */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 sm:left-4 glass-card p-4 rounded-2xl shadow-xl max-w-[210px] hidden sm:block border border-white/60"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-500 text-white p-2 rounded-xl">
                  <Sun className="h-5 w-5 animate-spin-slow" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Save Every Month</p>
                  <p className="font-display text-base font-extrabold text-gray-900">Up to 95% Off</p>
                  <p className="text-[10px] text-gray-500">Electricity Bills</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -top-4 -right-2 sm:right-4 glass-card p-4 rounded-2xl shadow-xl max-w-[210px] hidden sm:block border border-white/60"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-sky-500 text-white p-2 rounded-xl">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-sky-700 tracking-wider">Product Warranty</p>
                  <p className="font-display text-base font-extrabold text-gray-900">27 Years</p>
                  <p className="text-[10px] text-gray-500">Panel Lifespan</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
