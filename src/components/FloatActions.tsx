import React from "react";
import { MessageCircle } from "lucide-react";

interface FloatActionsProps {
  phoneNumber: string;
  phoneNumber2: string;
  phoneNumber3: string;
}

export default function FloatActions({ phoneNumber, phoneNumber2, phoneNumber3 }: FloatActionsProps) {
  // Setup clean link coordinates
  // WhatsApp link format: https://wa.me/<number>?text=<encoded_text>
  const whatsappMsgEnv = "Hello Save Energy, I am interested in seeking a Rooftop Solar consultation. Please guide me regarding the Government Subsidy and financing options.";
  const encodedMsg = encodeURIComponent(whatsappMsgEnv);
  const waUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMsg}`;
  const waUrl2 = `https://wa.me/${phoneNumber2.replace(/[^0-9]/g, "")}?text=${encodedMsg}`;
  const waUrl3 = `https://wa.me/${phoneNumber3.replace(/[^0-9]/g, "")}?text=${encodedMsg}`;

  return (
    <>
      {/* Laptop / Large Display Float Triggers */}
      <div className="hidden md:block">
        {/* Floating WhatsApp trigger */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 p-4 rounded-full text-white shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          id="float-whatsapp"
          title="Chat on WhatsApp"
        >
          {/* Subtle green pulse aura around whatsapp icon */}
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 -z-10 group-hover:opacity-40" />
          {/* WhatsApp Custom styled render or SVG or Messenger code icon */}
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.114-2.877-6.974C16.591 1.905 14.121.87 11.487.87 6.059.87 1.633 5.293 1.631 10.724c-.001 1.64.453 3.241 1.314 4.675L1.947 21.9l6.7-1.746zM17.56 14.54c-.307-.154-1.82-.9-2.1-.1-.28-.1-.483-.154-.7.154-.21.308-.83 1.04-.1.154-.154-.42-.644-.43-.7-.5-.656-.63-.43-.307-.14 0-.1.08-.24.08-.14-.04-.57-.208-2.18-1.647-1.252-1.114-2.1-2.488-2.346-2.9-.244-.41-.026-.633.178-.836.183-.182.4-.47.6-.7.197-.24.263-.41.4-.68.13-.27.06-.5-.03-.7-.1-.2-.83-2.01-1.14-2.73-.31-.73-.62-.63-.85-.64-.22 0-.47-.01-.73-.01-.25 0-.68.1-1.03.48-.36.38-1.37 1.34-1.37 3.27 0 1.93 1.4 3.79 1.6 4.06.2.27 2.76 4.22 6.7 5.92.937.397 1.67.635 2.24.81.94.3 1.8.26 2.48.15.76-.11 2.33-.95 2.66-1.87.33-.93.33-1.72.23-1.88-.1-.16-.38-.26-.68-.41z" />
          </svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-semibold text-sm whitespace-nowrap group-hover:ml-2">
            Chat on WhatsApp
          </span>
        </a>

        {/* Sticky Call Now floating buttons (left bottom corner) */}
        <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-emerald-600 to-teal-650 p-4 rounded-full text-white shadow-2xl flex items-center justify-center group border border-emerald-500/30 font-semibold"
            id="float-call"
          >
            <MessageCircle className="w-6 h-6 animate-pulse" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-semibold text-sm whitespace-nowrap group-hover:ml-2 text-white">
              WhatsApp +91 88553 66932
            </span>
          </a>
          <a
            href={waUrl2}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-emerald-600 to-teal-650 p-4 rounded-full text-white shadow-2xl flex items-center justify-center group border border-emerald-500/30 font-semibold"
            id="float-call-2"
          >
            <MessageCircle className="w-6 h-6 animate-pulse" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-semibold text-sm whitespace-nowrap group-hover:ml-2 text-white">
              WhatsApp +91 70687 18118
            </span>
          </a>
          <a
            href={waUrl3}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-emerald-600 to-teal-650 p-4 rounded-full text-white shadow-2xl flex items-center justify-center group border border-emerald-500/30 font-semibold"
            id="float-call-3"
          >
            <MessageCircle className="w-6 h-6 animate-pulse" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-semibold text-sm whitespace-nowrap group-hover:ml-2 text-white">
              WhatsApp +91 73887 11502
            </span>
          </a>
        </div>
      </div>

      {/* Mobile Sticky Bar (Visible on small screens only) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/80 p-2.5 flex gap-2">
        
        {/* Contact Team 1 */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-650 text-white font-extrabold text-[10px] py-2.5 rounded-xl flex flex-col items-center justify-center shadow-md active:translate-y-[1px]"
        >
          <MessageCircle className="w-3.5 h-3.5 mb-0.5" />
          <span>WhatsApp 1</span>
        </a>

        {/* Contact Team 2 */}
        <a
          href={waUrl2}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-650 text-white font-extrabold text-[10px] py-2.5 rounded-xl flex flex-col items-center justify-center shadow-md active:translate-y-[1px]"
        >
          <MessageCircle className="w-3.5 h-3.5 mb-0.5" />
          <span>WhatsApp 2</span>
        </a>

        {/* Contact Team 3 */}
        <a
          href={waUrl3}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-650 text-white font-extrabold text-[10px] py-2.5 rounded-xl flex flex-col items-center justify-center shadow-md active:translate-y-[1px]"
        >
          <MessageCircle className="w-3.5 h-3.5 mb-0.5" />
          <span>WhatsApp 3</span>
        </a>

      </div>
    </>
  );
}
