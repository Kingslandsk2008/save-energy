import React, { useState, useEffect } from "react";
import { MessageCircle, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

interface NavbarProps {
  phoneNumber: string;
  phoneNumber2: string;
  phoneNumber3: string;
}

export default function Navbar({ phoneNumber, phoneNumber2, phoneNumber3 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
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
    <>
      <nav
        id="app-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md py-3 border-b border-gray-100"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleScrollTo("hero")}
            >
              <Logo size="md" showText={true} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["services", "benefits", "subsidy", "how-it-works", "faq"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleScrollTo(item)}
                  className="font-medium text-sm text-gray-600 hover:text-emerald-600 uppercase tracking-wider transition-colors duration-200"
                >
                  {item.replace("-", " ")}
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center space-x-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-gray-700 font-semibold hover:text-emerald-600 transition-colors duration-200 bg-gray-50 border border-gray-200/80 px-2.5 py-1.5 rounded-xl text-xs xl:text-xs"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                <span>+91 88553 66932</span>
              </a>
              <a
                href={waUrl2}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-gray-700 font-semibold hover:text-emerald-600 transition-colors duration-200 bg-gray-50 border border-gray-200/80 px-2.5 py-1.5 rounded-xl text-xs xl:text-xs"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                <span>+91 70687 18118</span>
              </a>
              <a
                href={waUrl3}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-gray-700 font-semibold hover:text-emerald-600 transition-colors duration-200 bg-gray-50 border border-gray-200/80 px-2.5 py-1.5 rounded-xl text-xs xl:text-xs"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                <span>+91 73887 11502</span>
              </a>
              <button
                onClick={() => handleScrollTo("lead-form")}
                className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-155 text-white px-4 py-2.5 rounded-xl font-semibold text-xs xl:text-sm transition-all duration-200 flex items-center space-x-1.5 hover:translate-y-[-1px] flex-shrink-0"
              >
                <span>Free Quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-colors duration-200"
                aria-label="WhatsApp Us"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
            >
              <div className="px-4 pt-3 pb-6 space-y-3">
                {["services", "benefits", "subsidy", "how-it-works", "faq"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleScrollTo(item)}
                    className="block w-full text-left px-4 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 uppercase tracking-wider"
                  >
                    {item.replace("-", " ")}
                  </button>
                ))}
                <div className="pt-4 border-t border-gray-100 space-y-2.5">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-2.5 bg-gray-50 text-gray-800 font-semibold rounded-xl text-center border border-gray-200"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-500" />
                    <span>+91 88553 66932</span>
                  </a>
                  <a
                    href={waUrl2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-2.5 bg-gray-50 text-gray-800 font-semibold rounded-xl text-center border border-gray-200"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-500" />
                    <span>+91 70687 18118</span>
                  </a>
                  <a
                    href={waUrl3}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-2.5 bg-gray-50 text-gray-800 font-semibold rounded-xl text-center border border-gray-200"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-500" />
                    <span>+91 73887 11502</span>
                  </a>
                  <button
                    onClick={() => handleScrollTo("lead-form")}
                    className="block w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl text-center hover:bg-emerald-700 shadow-md transition-colors duration-200"
                  >
                    Get Free Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Spacer to prevent overlap in layout */}
      <div className="h-20"></div>
    </>
  );
}
