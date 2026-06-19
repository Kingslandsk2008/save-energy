import React, { useState } from "react";
import { Plus, Minus, ArrowRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      question: "How much subsidy can I get?",
      answer: "Under the PM Surya Ghar national scheme guidelines, eligible domestic residential houses can secure up to ₹108,000 in immediate financial subsidy. The exact breakdown is ₹36,000 for a 1 kW system, ₹90,000 for a 2 kW system, and capped at ₹108,000 for standard residential plants 3 kW and higher. Commercial installations do not qualify for cash subsidies but can access up to 40% accelerated tax depreciation benefits.",
    },
    {
      question: "What documents are required?",
      answer: "To finalize grid net-metering synchronization and government subsidy cashback clearance, you will need to prepare: (1) PAN Card, (2) Aadhaar Card matching your electricity bill details, (3) Your latest monthly utility electricity invoice, and (4) Your house tax receipt or rooftop ownership validation document. Commercial setups require standard institutional registration tax certificates.",
    },
    {
      question: "How long does installation take?",
      answer: "The structural physical on-roof physical assembly of panels and wiring takes only 1 to 2 business days under normal weather conditions. The state net-metering inspection and full grid synchronization usually follow in 10 to 14 days, handled entirely by our in-house engineering and verification team.",
    },
    {
      question: "What is the EMI process?",
      answer: "We partner with leading public and private sector banks (including SBI, PNB, ICICI, and HDFC) to provide customized low-interest solar financing. For example, for a standard 3kW system priced around ₹240,000, you pay an initial downpayment of ₹40,000 to initiate, and the remaining is converted into flexible EMI options starting at around ₹2,500 per month.",
    },
    {
      question: "Is maintenance required?",
      answer: "Solar photovoltaic panels have no moving parts, so they are incredibly easy to preserve. Under normal conditions, they only require occasional spraying with clean water every 2 weeks to clear off dust and debris. We also provide dedicated annual contract packages where our technicians handle automated cleaning and structural health optimization reviews.",
    },
    {
      question: "What warranty is provided?",
      answer: "All our high-precision monocrystalline solar modules carry an industry-leading 27-Year performance warranty, guaranteeing at least 85% linear output at Year 27. The core grid solar inverters are covered under 5 to 10-Year product defect replacement warranties, and we include a standard 1-Year fully free comprehensive on-site service backup guarantee.",
    },
  ];

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-500 font-extrabold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-1.5 rounded-full inline-block">
            Common Questions
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Got queries regarding solar engineering, government schemes, or down payments? We have summarized detailed guidance here.
          </p>
        </div>

        {/* Elegant Accordion Stack */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center bg-transparent group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-[15px] sm:text-lg text-gray-950 group-hover:text-emerald-600 transition-colors duration-200">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                    isOpen ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                  }`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-gray-650 leading-relaxed border-t border-gray-100/60 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic CTA box below FAQ */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-emerald-100">
          <div className="space-y-1">
            <h4 className="font-display font-extrabold text-xl">Still Have Any Unresolved Queries?</h4>
            <p className="text-xs text-emerald-50/90 max-w-md">Our solar consultants are live to assist with any technical or financial planning hurdles.</p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("lead-form");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto bg-white hover:bg-emerald-50 text-emerald-700 font-extrabold text-sm px-6 py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-md hover:translate-y-[-1px] transition-all duration-200 cursor-pointer"
          >
            <span>Ask Our Experts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
