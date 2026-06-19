import React, { useState } from "react";
import { MapPin, Navigation, Compass, CheckCircle2, Locate, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MapSection() {
  const OFFICE_LAT = 26.8373;
  const OFFICE_LON = 80.8492;
  const OFFICE_ADDRESS = "SAVE ENERGY, NEAR SPL HOSPITAL, BHUDDHESWER, LUCKNOW, UTTAR PRADESH 226017";

  const [liveLocation, setLiveLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [trackingStatus, setTrackingStatus] = useState<"idle" | "requesting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Haversine formula to compute distance in km
  const computeDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setTrackingStatus("error");
      setErrorMessage("Geolocation is not supported by your browser.");
      return;
    }

    setTrackingStatus("requesting");
    setErrorMessage("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLiveLocation({ lat: latitude, lon: longitude });
        const dist = computeDistance(latitude, longitude, OFFICE_LAT, OFFICE_LON);
        setDistance(dist);
        setTrackingStatus("success");
      },
      (error) => {
        console.error("Geolocation error:", error);
        setTrackingStatus("error");
        let msg = "Could not access location. Please check your system/browser permissions.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission denied. Please enable location services in your browser.";
        }
        setErrorMessage(msg);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Google Maps navigation link
  const getNavUrl = () => {
    if (liveLocation) {
      return `https://www.google.com/maps/dir/?api=1&origin=${liveLocation.lat},${liveLocation.lon}&destination=SPL+Hospital+Buddheshwar+Lucknow&travelmode=driving`;
    }
    return `https://www.google.com/maps/search/?api=1&query=SPL+Hospital+Buddheshwar+Lucknow+Save+Energy`;
  };

  return (
    <section id="map-section" className="py-20 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 poiter-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-3 border border-emerald-100"
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Find Us Nearest To You</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight"
          >
            Our Regional <span className="text-emerald-650">Energy Hub</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-base text-neutral-600 font-sans"
          >
            Visit Lucknow's landmark green tech facility for a direct live demo of premium on-grid solar plant operations, subsidy documentation approvals, and instant processing support.
          </motion.p>
        </div>

        {/* Bento Grid layout for Map and Live coordinates checker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Information & Live GPS Panel (Left Column, 5 grid spans) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Main Address Information Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-150 shadow-md flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="bg-emerald-500 text-white p-3 rounded-2xl shadow-md shadow-emerald-100">
                    <MapPin className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 leading-tight">Registered HQ Address</h3>
                    <p className="text-xs text-slate-450 uppercase font-bold tracking-wider mt-0.5">Save Energy</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-sm font-semibold text-slate-850 leading-relaxed font-sans">
                      {OFFICE_ADDRESS}
                    </p>
                  </div>

                  <div className="text-xs text-slate-550 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span><strong>Landmark:</strong> Near SPL Hospital, Buddheshwer Crossing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span><strong>City:</strong> Lucknow, Uttar Pradesh</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span><strong>Postal PIN Code:</strong> 226017</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span><strong>Office Email:</strong> saveenerysolarcare@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-450 font-mono">
                <span>LATITUDE: {OFFICE_LAT}° N</span>
                <span>LONGITUDE: {OFFICE_LON}° E</span>
              </div>
            </motion.div>

            {/* Live GPS distance widget (Interactive Geolocation tracking) */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-slate-900 text-white p-6 sm:p-7 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-550 opacity-10 rounded-full blur-2xl pointer-events-none" />
              
              <h4 className="font-display font-medium text-base text-teal-200 mb-2 flex items-center gap-2">
                <Locate className="w-4 h-4 text-emerald-4 animate-pulse" />
                Live GPS Location Matcher
              </h4>
              <p className="text-xs text-slate-350 leading-relaxed mb-5 font-sans">
                Determine your exact current distance to the Save Energy landmark using your browser's present coordinates.
              </p>

              <AnimatePresence mode="wait">
                {trackingStatus === "idle" && (
                  <motion.button
                    onClick={handleLocateMe}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <span>Fetch My present coordinates</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </motion.button>
                )}

                {trackingStatus === "requesting" && (
                  <motion.div
                    key="requesting"
                    className="bg-slate-800 p-4 rounded-xl border border-slate-700/50 flex items-center justify-center gap-3"
                  >
                    <div className="border-2 border-emerald-400 border-t-transparent w-4 h-4 rounded-full animate-spin" />
                    <span className="text-xs text-slate-300 font-mono">Waiting for browser coordinates approval...</span>
                  </motion.div>
                )}

                {trackingStatus === "success" && liveLocation && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-slate-805/90 p-4 rounded-xl border border-emerald-950/40 grid grid-cols-2 gap-3 font-mono text-xs">
                      <div>
                        <div className="text-[10px] text-slate-450 uppercase mb-0.5">Your Latitude</div>
                        <div className="text-emerald-400 font-bold">{liveLocation.lat.toFixed(5)}° N</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-450 uppercase mb-0.5">Your Longitude</div>
                        <div className="text-emerald-400 font-bold">{liveLocation.lon.toFixed(5)}° E</div>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-900/30 flex items-center justify-between">
                      <span className="text-xs text-slate-350">Straight-line Distance:</span>
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        {distance !== null ? `${distance.toFixed(2)} km` : "calculating..."}
                      </span>
                    </div>

                    <a
                      href={getNavUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
                    >
                      <span>Open Live GPS Navigation Route</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    </a>
                  </motion.div>
                )}

                {trackingStatus === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-red-950/30 border border-red-500/30 p-3.5 rounded-xl text-xs text-red-350">
                      ⚠️ {errorMessage}
                    </div>

                    <button
                      onClick={handleLocateMe}
                      className="w-full bg-slate-850 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs cursor-pointer transition-all"
                    >
                      Try Geolocation Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

          {/* Map Embed Container (Right Column, 7 grid spans) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 bg-white p-3 rounded-3xl border border-slate-150 shadow-lg relative min-h-[350px] sm:min-h-[480px] flex flex-col overflow-hidden"
          >
            {/* Top address bar inside map */}
            <div className="bg-slate-900 text-white px-5 py-3.5 rounded-2xl flex items-center justify-between mb-3 z-10 shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-slate-300">HQ ACTIVE PRESENCE: LUCKNOW, UP</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=SPL+Hospital+Buddheshwar+Lucknow"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-emerald-400 uppercase font-bold hover:underline flex items-center gap-1.5"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Iframe styled exquisitely with modern gray overlay and border masks */}
            <div className="flex-1 rounded-2xl overflow-hidden border border-slate-100 relative">
              <iframe
                title="Save Energy Lucknow map coordinates"
                src="https://maps.google.com/maps?q=SPL%20Hospital%20Buddheshwar%20Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full rounded-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
