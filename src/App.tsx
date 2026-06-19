/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Benefits from "./components/Benefits";
import SubsidySection from "./components/SubsidySection";
import HowItWorks from "./components/HowItWorks";
import ProjectGallery from "./components/ProjectGallery";
import InquiryForm from "./components/InquiryForm";
import FAQ from "./components/FAQ";
import MapSection from "./components/MapSection";
import Footer from "./components/Footer";
import FloatActions from "./components/FloatActions";

export default function App() {
  const phoneNumber = "+918855366932";
  const phoneNumber2 = "+917068718118";
  const phoneNumber3 = "+917388711502";

  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Sticky Top Header Navigation */}
      <Navbar phoneNumber={phoneNumber} phoneNumber2={phoneNumber2} phoneNumber3={phoneNumber3} />

      {/* Hero Header Presentation */}
      <Hero phoneNumber={phoneNumber} phoneNumber2={phoneNumber2} phoneNumber3={phoneNumber3} />

      {/* Premium Services Category Grid */}
      <Services />

      {/* Structured core benefits list */}
      <Benefits />

      {/* Government Subsidy highlighting */}
      <SubsidySection />

      {/* Step by Step Timeline and Document checklists */}
      <HowItWorks />

      {/* Portfolio Gallery showing transformations */}
      <ProjectGallery />

      {/* Verified Reviews & High Converting Lead Capture Form */}
      <InquiryForm phoneNumber={phoneNumber} phoneNumber2={phoneNumber2} phoneNumber3={phoneNumber3} />

      {/* Smart Accordion FAQ list */}
      <FAQ />

      {/* Interactive Map and Live GPS Distance Tracker */}
      <MapSection />

      {/* Secondary Contacts and Links Footer */}
      <Footer phoneNumber={phoneNumber} phoneNumber2={phoneNumber2} phoneNumber3={phoneNumber3} />

      {/* Fixed Sticky Call and WhatsApp Chat utilities */}
      <FloatActions phoneNumber={phoneNumber} phoneNumber2={phoneNumber2} phoneNumber3={phoneNumber3} />
    </div>
  );
}
