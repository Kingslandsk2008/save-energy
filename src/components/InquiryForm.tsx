import React, { useState, useEffect } from "react";
import { Star, CheckCircle, ShieldCheck, MessageCircle, Sparkles, User, Smartphone, MapPin, FileSpreadsheet, ArrowRight, Download, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../firebase";

// Dynamically load EmailJS from CDN
function loadEmailJS(publicKey: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const extWindow = window as any;
    if (extWindow.emailjs) {
      extWindow.emailjs.init(publicKey);
      return resolve(extWindow.emailjs);
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.onload = () => {
      extWindow.emailjs.init(publicKey);
      resolve(extWindow.emailjs);
    };
    script.onerror = () => reject(new Error("EmailJS library could not be loaded dynamically."));
    document.head.appendChild(script);
  });
}

interface InquiryFormProps {
  phoneNumber: string;
  phoneNumber2: string;
  phoneNumber3: string;
}

export default function InquiryForm({ phoneNumber, phoneNumber2, phoneNumber3 }: InquiryFormProps) {
  const whatsappMsgEnv = "Hello Save Energy, I am interested in seeking a Rooftop Solar consultation. Please guide me regarding the Government Subsidy and financing options.";
  const waUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsgEnv)}`;
  const waUrl2 = `https://wa.me/${phoneNumber2.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsgEnv)}`;
  const waUrl3 = `https://wa.me/${phoneNumber3.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMsgEnv)}`;

  // Interactive 3D mouse alignment coordinates
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // range: -0.5 to 0.5
    setCoords({ x, y });
  };

  // Form fields
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [bill, setBill] = useState("");
  const [address, setAddress] = useState("");
  
  // Submit state
  const [submitted, setSubmitted] = useState(false);
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [calculatedSystem, setCalculatedSystem] = useState<any>(null);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [emailResultMsg, setEmailResultMsg] = useState("");

  // Interactive reviews state
  const [reviews, setReviews] = useState<any[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Review Form values
  const [reviewName, setReviewName] = useState("");
  const [reviewRole, setReviewRole] = useState("Residential Owner");
  const [reviewCity, setReviewCity] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewBillBefore, setReviewBillBefore] = useState("");
  const [reviewBillAfter, setReviewBillAfter] = useState("");

  // Fetch inquiries from LocalStorage and sync reviews from Firestore in real-time
  useEffect(() => {
    const list = localStorage.getItem("solar_inquiries");
    if (list) {
      setRecentInquiries(JSON.parse(list));
    }

    // Subscribe to Firestore collection of reviews
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, orderBy("createdAt", "desc"));

    const unsubscribeReviews = onSnapshot(
      q,
      (snapshot) => {
        const loadedReviews = snapshot.docs.map((doc) => {
          const data = doc.data();
          let createdAtVal = new Date();
          if (data.createdAt) {
            if (typeof data.createdAt.toDate === "function") {
              createdAtVal = data.createdAt.toDate();
            } else {
              createdAtVal = new Date(data.createdAt);
            }
          }
          return {
            id: doc.id,
            ...data,
            createdAt: createdAtVal,
          };
        });
        setReviews(loadedReviews);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "reviews");
      }
    );

    return () => {
      unsubscribeReviews();
    };
  }, []);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment || !reviewCity) {
      alert("Please fill in Name, City, and Review Comment.");
      return;
    }

    try {
      const reviewPayload = {
        name: reviewName,
        role: reviewRole || "Residential Owner",
        city: reviewCity,
        rating: reviewRating,
        billBefore: reviewBillBefore ? `₹${reviewBillBefore}` : "N/A",
        billAfter: reviewBillAfter ? `₹${reviewBillAfter}` : "N/A",
        comment: reviewComment,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "reviews"), reviewPayload);

      // Reset Review fields on successful Firebase addition
      setReviewName("");
      setReviewRole("Residential Owner");
      setReviewCity("");
      setReviewRating(5);
      setReviewComment("");
      setReviewBillBefore("");
      setReviewBillAfter("");
      setShowReviewForm(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "reviews");
      alert("Failed to submit review. Please try again.");
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !city || !bill || !address) {
      alert("Please fill in all the standard fields correctly.");
      return;
    }

    setSubmittingInquiry(true);

    try {
      const billNum = Number(bill);

      // Compute custom plan metrics instantly
      let sysKw = 3;
      if (billNum <= 1500) sysKw = 1.5;
      else if (billNum <= 3000) sysKw = 2;
      else if (billNum <= 6000) sysKw = 3;
      else if (billNum <= 9000) sysKw = 5;
      else sysKw = 10;

      const baseCost = sysKw * 80000;
      let allowedSubsidy = 108000;
      if (sysKw === 1.5) allowedSubsidy = 54000;
      else if (sysKw === 2) allowedSubsidy = 90000;
      else allowedSubsidy = 108050; // capped as per guidelines max

      const subVal = Math.min(baseCost * 0.45, allowedSubsidy);
      const net = baseCost - subVal;
      const estEmi = Math.round(( (baseCost - (sysKw * 13333)) / 200000 ) * 2500);

      const newInquiry = {
        id: "SOLAR-" + Math.floor(Math.random() * 90000 + 10000),
        name,
        phone: mobile,
        city,
        address,
        monthlyBill: billNum,
        systemSize: sysKw,
        estCost: baseCost,
        subsidy: subVal,
        netCost: net,
        emi: estEmi,
        time: new Date().toLocaleString("en-IN"),
      };

      // 1. Write the inquiry securely into Firestore leads collection as a backup
      try {
        await addDoc(collection(db, "leads"), {
          inquiryId: newInquiry.id,
          name: newInquiry.name,
          phone: newInquiry.phone,
          city: newInquiry.city,
          address: newInquiry.address,
          monthlyBill: newInquiry.monthlyBill,
          systemSize: newInquiry.systemSize,
          estCost: newInquiry.estCost,
          subsidy: newInquiry.subsidy,
          netCost: newInquiry.netCost,
          emi: newInquiry.emi,
          createdAt: serverTimestamp(),
        });
      } catch (firestoreError) {
        console.error("Backup Firestore write failed:", firestoreError);
      }

      // 2. Transmit details to EmailJS directly from client side
      setEmailStatus("sending");
      setEmailResultMsg("");
      try {
        const CONFIG = {
          SERVICE_ID:  "service_5x1fyiq",
          TEMPLATE_ID: "template_hnmjelt",
          PUBLIC_KEY:  "jwrxWXoBcopCx-mVv",
          TO_EMAIL:    "tornadoff125@gmail.com",
        };

        const ejs = await loadEmailJS(CONFIG.PUBLIC_KEY);

        const compositeMessage = 
          `Hello Admin,\n\n` +
          `A new customer has filled out the Solar consultation request form!\n\n` +
          `── CUSTOMER DATA ──\n` +
          `• Customer Name: ${newInquiry.name}\n` +
          `• Phone Number: ${newInquiry.phone}\n` +
          `• Location City: ${newInquiry.city}\n` +
          `• Project Address: ${newInquiry.address}\n` +
          `• Regular Electricity Bill: ₹${newInquiry.monthlyBill}/month\n\n` +
          `── ESTIMATED INSTANT SOLAR PLAN ──\n` +
          `• Suggested Solar Plant Size: ${newInquiry.systemSize} kW Setup\n` +
          `• Market Setup Cost (approx): ₹${newInquiry.estCost.toLocaleString("en-IN")}\n` +
          `• Approved Govt Subsidy: ₹${newInquiry.subsidy.toLocaleString("en-IN")}\n` +
          `• Net Payable Capital Cost: ₹${newInquiry.netCost.toLocaleString("en-IN")}\n` +
          `• Estimated Easy EMI: ₹${newInquiry.emi}/month\n\n` +
          `Please contact this lead at the earliest!\n` +
          `Best regards,\nSave Energy System Automation`;

        await ejs.send(CONFIG.SERVICE_ID, CONFIG.TEMPLATE_ID, {
          to_email:    CONFIG.TO_EMAIL,
          from_name:   newInquiry.name,
          from_email:  `${newInquiry.phone}@saveenergy-lead.com`,
          phone:       newInquiry.phone,
          company:     "Residential Owner",
          address:     `${newInquiry.city}, ${newInquiry.address}`,
          message:     compositeMessage,
          sent_at:     new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });

        setEmailStatus("success");
        setEmailResultMsg("Email dispatched successfully via EmailJS!");
      } catch (emailJsError: any) {
        console.error("EmailJS dispatch failed:", emailJsError);
        setEmailStatus("error");
        setEmailResultMsg("EmailJS error: " + (emailJsError.message || emailJsError));
      }

      // 3. Save to localStorage & show state changes
      const updated = [newInquiry, ...recentInquiries];
      setRecentInquiries(updated);
      localStorage.setItem("solar_inquiries", JSON.stringify(updated));

      setCalculatedSystem(newInquiry);
      setSubmitted(true);
    } catch (error) {
      console.error("General submission error:", error);
      alert("Something went wrong while submitting. Please check your inputs and try again.");
    } finally {
      setSubmittingInquiry(false);
    }
  };

  const handleResetForm = () => {
    setName("");
    setMobile("");
    setCity("");
    setBill("");
    setAddress("");
    setSubmitted(false);
    setCalculatedSystem(null);
    setEmailStatus("idle");
    setEmailResultMsg("");
  };

  return (
    <section id="lead-form" className="py-24 bg-white relative">
      {/* Decorative clean circular accent */}
      <div className="absolute bottom-12 right-12 w-64 h-64 bg-emerald-50 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Testimonials Frame (Left column, 5 cols out of 12) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col">
            <div className="space-y-4">
              <span className="text-emerald-500 font-extrabold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full inline-block mt-1">
                Client Reviews
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight leading-tight">
                Verified Customer Success Stories
              </h2>
              <p className="text-gray-650 text-sm">
                Join 500+ households across India who already shifted and cut down utility charges with Save Energy.
              </p>

              {/* Dynamic Customer Review Trigger Button */}
              {!showReviewForm ? (
                <button
                  type="button"
                  id="btn-write-review"
                  onClick={() => setShowReviewForm(true)}
                  className="w-full sm:w-auto bg-emerald-50 hover:bg-emerald-100 text-emerald-750 font-bold px-5 py-3 rounded-xl inline-flex items-center justify-center space-x-2 border border-emerald-200 transition-colors text-xs uppercase tracking-wider cursor-pointer shadow-sm hover:scale-[1.02] duration-150"
                >
                  <Star className="w-4 h-4 text-emerald-600 fill-current" />
                  <span>Write a Customer Review</span>
                </button>
              ) : null}
            </div>

            {/* Interactive Review Writing Form */}
            <AnimatePresence>
              {showReviewForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <form onSubmit={handleAddReview} className="bg-emerald-50/75 p-5 rounded-2xl border border-emerald-100/80 space-y-3 shadow-md">
                    <div className="flex justify-between items-center pb-1 border-b border-emerald-100">
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Share Your Experience</span>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="text-xs text-red-500 hover:text-red-700 font-bold px-2 py-1"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 uppercase block mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="e.g. Ramesh K."
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 uppercase block mb-1">City / Town *</label>
                        <input
                          type="text"
                          required
                          value={reviewCity}
                          onChange={(e) => setReviewCity(e.target.value)}
                          placeholder="e.g. Pune"
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 uppercase block mb-1">Your Role / Segment</label>
                        <input
                          type="text"
                          value={reviewRole}
                          onChange={(e) => setReviewRole(e.target.value)}
                          placeholder="e.g. Residential Owner"
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 uppercase block mb-1">Rating *</label>
                        <div className="flex items-center space-x-1 py-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none transition-transform active:scale-125"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  star <= reviewRating ? "text-amber-450 fill-amber-400 stroke-amber-500" : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 uppercase block mb-1">Bill Before (₹)</label>
                        <input
                          type="number"
                          value={reviewBillBefore}
                          onChange={(e) => setReviewBillBefore(e.target.value)}
                          placeholder="e.g. 8000"
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 uppercase block mb-1">Bill After (₹)</label>
                        <input
                          type="number"
                          value={reviewBillAfter}
                          onChange={(e) => setReviewBillAfter(e.target.value)}
                          placeholder="e.g. 500"
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-700 uppercase block mb-1">Your Comment *</label>
                      <textarea
                        required
                        rows={2}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Write your brief honest feedback here..."
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-650 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                    >
                      Submit Verified Review
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Testimonials Loop List in standard stack of elegant transparent cards */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
              {reviews.length === 0 ? (
                <div className="bg-gray-50/50 p-6 rounded-xl border border-dashed border-gray-200 text-center py-8">
                  <Quote className="w-8 h-8 text-emerald-600/20 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">No reviews yet</p>
                  <p className="text-xs text-gray-500 mt-1">Be the first to share your experience with Save Energy!</p>
                </div>
              ) : (
                reviews.map((test, i) => (
                  <div
                    key={test.name + "-" + i}
                    className="bg-gray-50/70 p-4 rounded-xl border border-gray-150 relative hover:border-emerald-500/10 transition-colors duration-250 shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <h4 className="font-display font-bold text-gray-950 text-xs">{test.name}</h4>
                        <p className="text-[9px] text-gray-400 font-semibold">{test.role} • {test.city}</p>
                      </div>
                      <div className="flex text-amber-400 space-x-0.5">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-3 h-3 ${index < test.rating ? "fill-amber-400 stroke-amber-400" : "text-gray-200 stroke-gray-200"}`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 italic leading-relaxed mb-2.5">"{test.comment}"</p>

                    {(test.billBefore !== "N/A" || test.billAfter !== "N/A") && (
                      <div className="flex items-center space-x-6 pt-1.5 border-t border-gray-200/50 text-[10px] font-bold">
                        {test.billBefore && test.billBefore !== "N/A" && (
                          <span className="text-red-650">Avg. Bill Before: {test.billBefore}</span>
                        )}
                        {test.billAfter && test.billAfter !== "N/A" && (
                          <span className="text-emerald-600">Solar Adjusted: {test.billAfter}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Sub Guarantee callout */}
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center space-x-3 mt-auto">
              <span className="text-emerald-600 text-xl font-bold">★</span>
              <p className="text-[11px] text-emerald-800 leading-relaxed font-semibold">
                Approved Category-A solar components used exclusively. Tested on performance and structural reliability.
              </p>
            </div>
          </div>

          {/* Form and Quote Calculator Wrapper (Right column, 7 cols out of 12) with interactive 3D Mouse Tilt */}
          <motion.div 
            className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-150 relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false);
              setCoords({ x: 0, y: 0 });
            }}
            animate={{
              rotateX: hovering ? coords.y * -10 : 0,
              rotateY: hovering ? coords.x * 10 : 0,
              scale: hovering ? 1.01 : 1,
            }}
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="inquiry-form-input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="font-display font-extrabold text-2xl text-gray-900 leading-tight flex items-center space-x-2">
                      <Sparkles className="w-5.5 h-5.5 text-emerald-600" />
                      <span>Get Free Solar Consultation</span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Our certified solar advisors will reach out to you within 2 business hours.
                    </p>
                  </div>

                  <form onSubmit={handleApply} className="space-y-5">
                    {/* Full Name Block */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Full Name</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-450">
                          <User className="h-4 w-4 text-gray-400" />
                        </span>
                        <input
                          id="form-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full pl-10 pr-4 py-3.5 bg-gray-50/70 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Mobile Number Block */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Mobile Number</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-450">
                          <Smartphone className="h-4 w-4 text-gray-400" />
                        </span>
                        <input
                          id="form-mobile"
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="e.g. 9876543210 (10 digit)"
                          className="w-full pl-10 pr-4 py-3.5 bg-gray-50/70 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* City Block */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">City / Town</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-450">
                            <MapPin className="h-4 w-4 text-gray-400" />
                          </span>
                          <input
                            id="form-city"
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Gurugram, Delhi"
                            className="w-full pl-10 pr-4 py-3.5 bg-gray-50/70 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Monthly Electricity Bill Block */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Avg. Monthly Bill (₹)</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-450">
                            <FileSpreadsheet className="h-4 w-4 text-gray-400" />
                          </span>
                          <input
                            id="form-bill"
                            type="number"
                            required
                            min="200"
                            value={bill}
                            onChange={(e) => setBill(e.target.value)}
                            placeholder="e.g. 4500"
                            className="w-full pl-10 pr-4 py-3.5 bg-gray-50/70 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Full Address Block */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Full Address / Landmark</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-450">
                          <MapPin className="h-4 w-4 text-gray-400" />
                        </span>
                        <input
                          id="form-address"
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="e.g. House/Plot No, Ward, Area, Landmark"
                          className="w-full pl-10 pr-4 py-3.5 bg-gray-50/70 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 leading-normal">
                      By submitting, you authorize Save Energy to match you with low interest banks and request clean site feasibility checks. No spam guaranteed.
                    </p>

                    <motion.button
                      id="btn-get-consultation"
                      type="submit"
                      disabled={submittingInquiry}
                      whileHover={{ scale: 1.02, y: -4, boxShadow: "0px 10px 25px rgba(16, 185, 129, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 rounded-2xl block text-center shadow-lg uppercase tracking-wider text-sm transition-all duration-200 cursor-pointer ${
                        submittingInquiry ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      {submittingInquiry ? "Sending Details..." : "Get Free Solar Consultation"}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="inquiry-form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 text-center"
                >
                  <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-600 mb-2">
                    <CheckCircle className="w-12 h-12" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-2xl text-gray-900">Application Submitted Successfully!</h3>
                    <p className="text-sm text-gray-500 max-w-lg mx-auto">
                      Thank you, <strong>{calculatedSystem?.name}</strong>. Here is your instataneous estimated solar setup plan based on your monthly bill inputs:
                    </p>
                  </div>

                  {/* Email dispatch alert status banner */}
                  <div className="max-w-md mx-auto">
                    {emailStatus === "sending" && (
                      <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded-xl p-3 flex items-center justify-center space-x-2">
                        <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <span className="font-semibold">Forwarding full breakdown to tornadoff125@gmail.com...</span>
                      </div>
                    )}
                    {emailStatus === "success" && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl p-3 text-center font-medium">
                        📬 Email sent successfully to <strong>tornadoff125@gmail.com, ayushv3322@gmail.com</strong>!
                      </div>
                    )}
                    {emailStatus === "error" && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl p-3.5 text-left space-y-1">
                        <p className="font-bold">❌ Email Dispatch Error:</p>
                        <p className="text-[11px] font-mono leading-normal bg-white/60 p-2 rounded border text-rose-900 select-all">{emailResultMsg}</p>
                        <p className="text-[10px] text-gray-400 leading-normal">
                          Note: Your lead is still saved safely inside our cloud database. Ask admin to check/update SMTP password in system.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Dynamically created quote result */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-left space-y-4 max-w-md mx-auto">
                    <div className="border-b border-gray-200/60 pb-3 flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 font-mono">ESTIMATED PROPOSAL</span>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">{calculatedSystem?.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-gray-450 uppercase font-semibold text-[9px] tracking-wider">Recommended Plant Size</p>
                        <p className="text-base font-extrabold text-gray-800">{calculatedSystem?.systemSize} kW Solar System</p>
                      </div>
                      <div>
                        <p className="text-gray-450 uppercase font-semibold text-[9px] tracking-wider">Initial Downpayment</p>
                        <p className="text-base font-extrabold text-gray-800">₹{(calculatedSystem?.systemSize * 13333).toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-gray-450 uppercase font-semibold text-[9px] tracking-wider">Solar System Cost</p>
                        <p className="text-base font-bold text-gray-800">₹{calculatedSystem?.estCost.toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-gray-450 uppercase font-semibold text-[9px] tracking-wider">Approved Gov Subsidy</p>
                        <p className="text-base font-extrabold text-emerald-600">- ₹{calculatedSystem?.subsidy.toLocaleString("en-IN")}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-gray-450 font-bold uppercase">Estimated Monthly EMI</p>
                        <p className="text-xl font-display font-extrabold text-emerald-600">₹{calculatedSystem?.emi.toLocaleString("en-IN")} <span className="text-[10px] text-gray-400">/mo</span></p>
                      </div>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-650 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Lock This Price</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <p className="text-xs text-gray-450 leading-relaxed max-w-md mx-auto">
                      Our representative will call you on <strong>+91 {calculatedSystem?.phone}</strong> inside 2 hours to coordinate the free structural site feasibility review.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={handleResetForm}
                        className="text-xs font-semibold text-gray-500 hover:text-emerald-600 underline"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Display list of recent inquiries submitted locally */}
            {recentInquiries.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-500 mb-2.5 uppercase tracking-wider">Your Active Inquiries ({recentInquiries.length})</p>
                <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar pr-1">
                  {recentInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border text-xs"
                    >
                      <div>
                        <p className="font-extrabold text-gray-900">{inq.name} ({inq.city})</p>
                        <p className="text-[10px] text-gray-450">Estimated {inq.systemSize}kW plant • Submitted: {inq.time}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold text-[9px] uppercase tracking-wider">
                        Pending Feasibility Review
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>

        </div>
      </div>
    </section>
  );
}
