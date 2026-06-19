import React from "react";
import { MessageCircle, Mail, MapPin, Heart } from "lucide-react";
import { motion } from "motion/react";
import Logo from "./Logo";

interface FooterProps {
  phoneNumber: string;
  phoneNumber2: string;
  phoneNumber3: string;
}

export default function Footer({ phoneNumber, phoneNumber2, phoneNumber3 }: FooterProps) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappMsgEnv = "Hello Save Energy, I am interested in seeking a Rooftop Solar consultation. Please guide me regarding the Government Subsidy and financing options.";
  const waUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsgEnv)}`;
  const waUrl2 = `https://wa.me/${phoneNumber2.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsgEnv)}`;
  const waUrl3 = `https://wa.me/${phoneNumber3.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsgEnv)}`;

  return (
    <footer className="bg-slate-900 text-gray-350 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-800 pb-12">
          
          {/* Brand block (col-span-4) */}
          <div className="md:col-span-4 space-y-5">
            <div
              className="flex items-center cursor-pointer inline-flex"
              onClick={() => handleScrollTo("hero")}
            >
              <Logo size="lg" inverse={true} />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering Indian households and business enterprises with top-tier high-efficiency rooftop solar installations, pre-approved bank loans, and simplified government subsidies.
            </p>
          </div>

          {/* Quick links block (col-span-2) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleScrollTo("hero")} className="hover:text-emerald-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("benefits")} className="hover:text-emerald-400 transition-colors">
                  Our Benefits
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("how-it-works")} className="hover:text-emerald-400 transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("faq")} className="hover:text-emerald-400 transition-colors">
                  Support FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Services block (col-span-3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white">Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleScrollTo("services")} className="hover:text-emerald-400 transition-colors">
                  Residential Solar
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("services")} className="hover:text-emerald-400 transition-colors">
                  Commercial Systems
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("services")} className="hover:text-emerald-400 transition-colors">
                  On-Grid / Off-Grid Solar
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("services")} className="hover:text-emerald-400 transition-colors">
                  Solar Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* Contact block (col-span-3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white">Contact Info</h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li className="flex items-center space-x-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-bold text-white hover:underline"
                >
                  +91 88553 66932
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={waUrl2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-bold text-white hover:underline"
                >
                  +91 70687 18118
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={waUrl3}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-bold text-white hover:underline"
                >
                  +91 73887 11502
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="mailto:saveenerysolarcare@gmail.com" className="hover:text-emerald-400 transition-colors">
                  saveenerysolarcare@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  SAVE ENERGY , NEAR SPL HOSPITAL ,<br />
                  BHUDDHESWER , LUCKNOW ,<br />
                  UTTAR PRADESH 226017
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom micro lines */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 Save Energy. All rights reserved. Government Approved Solar Facilitator.</p>
          <div className="flex items-center space-x-1.5">
            <span>Made with Clean Power & Solar Support</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-current" />
          </div>
        </div>

      </div>
    </footer>
  );
}
