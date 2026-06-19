import React, { useState } from "react";
import { FileText, CheckCircle, Search, HelpCircle, ShieldAlert, Sparkles, Building, UserCheck } from "lucide-react";
import { motion } from "motion/react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Submit Inquiry",
      desc: "Fill in the quick lead-generation form with your monthly bill details or call us directly.",
    },
    {
      num: "02",
      title: "Free Site Inspection",
      desc: "Our solar engineers visit your home or business, review roof feasibility, and confirm orientation.",
    },
    {
      num: "03",
      title: "Document Verification",
      desc: "Quickly verify your supporting national documents to proceed with immediate planning.",
      hasDocs: true,
    },
    {
      num: "04",
      title: "Loan Processing",
      desc: "We assist in securing pre-approved low-rate bank loans backed by national energy policies.",
    },
    {
      num: "05",
      title: "Solar Installation",
      desc: "Our certified installation mechanics setup panels, structures, wiring, and premium inverters in <3 days.",
    },
    {
      num: "06",
      title: "Subsidy Processing",
      desc: "We submit Net-Meter records to complete your up to ₹108,000 cash back post-install approval.",
    },
    {
      num: "07",
      title: "EMI Activation",
      desc: "Start your low monthly bank installments, fully offset by your immediate power bill savings.",
    },
  ];

  const requiredDocuments = [
    { name: "PAN Card", desc: "Proof of Identification" },
    { name: "Aadhaar Card", desc: "Proof of Address & Net-Metering link" },
    { name: "Electricity Bill", desc: "Latest month grid utility statement" },
    { name: "House Tax Receipt", desc: "Rooftop property ownership validation" },
    { name: "Bank Passbook", desc: "For direct subsidy cashback bank transfer" },
    { name: "Registered Mobile Number", desc: "Aadhaar-linked number for OTPs & web portal setup" },
    { name: "Gmail / Email Address", desc: "For official digital communications & monitoring logs" },
    { name: "Company Documents", desc: "For corporate/commercial connection registrations only" },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-500 font-extrabold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-1.5 rounded-full inline-block">
            Seamless Execution
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Our 7-Step Journey To Free Electricity
          </h2>
          <p className="text-gray-600 text-lg">
            From design to commissioning and subsidy processing — we handle all engineering, authorization permits, and financing approvals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Timeline Steps (col-span-7) */}
          <div className="lg:col-span-7 space-y-8 relative before:absolute before:top-4 before:bottom-4 before:left-6 before:w-0.5 before:bg-gray-100 before:hidden sm:before:block">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="relative flex flex-col sm:flex-row items-start sm:space-x-6 gap-4 bg-gray-50/40 p-4 sm:p-6 rounded-2xl border border-gray-100 hover:border-emerald-500/10 transition-colors duration-200"
              >
                {/* Visual Circle Indicator */}
                <div className="flex-shrink-0 z-10 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 font-extrabold font-mono text-base border-2 border-white shadow-md">
                  {step.num}
                </div>

                {/* Mobile visual number count */}
                <div className="sm:hidden inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 font-mono font-bold text-xs uppercase mb-1">
                  Step {step.num}
                </div>

                <div className="space-y-2 flex-1">
                  <h3 className="font-display font-bold text-gray-950 text-lg">{step.title}</h3>
                  <p className="text-gray-650 text-sm leading-relaxed">{step.desc}</p>

                  {/* Inline Documents reminder helper if it's step 3 */}
                  {step.hasDocs && (
                    <div className="mt-3 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/60 max-w-md">
                      <p className="text-[11px] font-bold text-emerald-800 flex items-center space-x-1">
                        <span className="text-emerald-500">📎</span>
                        <span>Documents verified in less than 24 hours</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Required Documents Section Side Box (col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-gray-50/80 rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-lg space-y-6">
              <div className="flex items-center space-x-3 border-b border-gray-200/50 pb-4">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-gray-900 leading-tight">Required Documents</h3>
                  <p className="text-xs text-gray-500">Must prepare for site verification audit</p>
                </div>
              </div>

              <div className="space-y-3">
                {requiredDocuments.map((doc, idx) => (
                  <div
                    key={doc.name}
                    className="flex justify-between items-center p-3.5 bg-white rounded-2xl shadow-sm border border-gray-100"
                  >
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{doc.name}</p>
                      <p className="text-[10px] text-gray-400">{doc.desc}</p>
                    </div>
                    <span className="text-emerald-500 bg-emerald-50 p-1.5 rounded-lg text-xs font-bold">✔ Ready</span>
                  </div>
                ))}
              </div>

              {/* Secure message indicator */}
              <div className="bg-sky-50 border border-sky-100/60 rounded-2xl p-4 flex items-start space-x-3">
                <span className="text-sky-500 mt-1">🔒</span>
                <p className="text-xs text-sky-850 leading-relaxed">
                  <strong>Privacy Guaranteed:</strong> Aadhaar and utility bills are handled strictly in compliance with government net-metering portal data privacy mandates. No information is stored on unauthorized public registries.
                </p>
              </div>

              {/* Direct Booking CTA */}
              <button
                onClick={() => {
                  const el = document.getElementById("lead-form");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-xl text-sm transition-all shadow-md hover:shadow-emerald-100 hover:translate-y-[-1px] flex items-center justify-center space-x-2"
              >
                <span>Upload & Start Booking Process</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
