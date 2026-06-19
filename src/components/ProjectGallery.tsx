import React, { useState, useEffect } from "react";
import { Eye, MapPin, Grid, Camera, Zap, CheckCircle2, Sliders, Lock, Plus, X, Upload, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { db, auth, ensureAnonymousAuth, handleFirestoreError, OperationType } from "../firebase";
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";

const residentImg = "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=85&w=800";
const commercialImg = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=85&w=800";
const industrialImg = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=85&w=800";

interface DynamicProject {
  id: string;
  title: string;
  category: string;
  location: string;
  systemSize: string;
  saving: string;
  img: string;
  desc: string;
  createdAt: string;
}

const compressAndConvertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800; // Optimal width for card images
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75); // 75% quality JPEG
          resolve(compressedBase64);
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = (err) => {
        reject(err);
      };
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
};

export default function ProjectGallery() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [dynamicProjects, setDynamicProjects] = useState<DynamicProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin and form states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Residential");
  const [formLocation, setFormLocation] = useState("");
  const [formSystemSize, setFormSystemSize] = useState("");
  const [formSaving, setFormSaving] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImg, setFormImg] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["All", "Residential", "Commercial", "Industrial"];

  const defaultProjects: any[] = [];

  // Realtime subscription
  useEffect(() => {
    // Start anonymous auth fallback
    ensureAnonymousAuth();

    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loaded: DynamicProject[] = [];
        snapshot.forEach((doc) => {
          loaded.push({ id: doc.id, ...doc.data() } as DynamicProject);
        });
        setDynamicProjects(loaded);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore loading error:", error);
        handleFirestoreError(error, OperationType.LIST, "projects");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const allProjects = [...dynamicProjects, ...defaultProjects];
  const filteredProjects = activeTab === "All" ? allProjects : allProjects.filter((p) => p.category === activeTab);

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "saur@2008") {
      setIsAdminMode(true);
      setShowPasswordModal(false);
      setPasswordInput("");
      setPasswordError("");
      setShowAddModal(true);
    } else {
      setPasswordError("Incorrect Admin Password!");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await compressAndConvertToBase64(file);
      setFormImg(base64);
    } catch (err) {
      console.error(err);
      setFormError("Failed to encode/compress chosen photo.");
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formLocation || !formSystemSize || !formSaving || !formDesc || !formImg) {
      setFormError("Please fill in all details, and select a project photo.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      await addDoc(collection(db, "projects"), {
        title: formTitle,
        category: formCategory,
        location: formLocation,
        systemSize: formSystemSize,
        saving: formSaving,
        img: formImg,
        desc: formDesc,
        createdAt: new Date().toISOString(),
      });

      // Reset form on success
      setFormTitle("");
      setFormCategory("Residential");
      setFormLocation("");
      setFormSystemSize("");
      setFormSaving("");
      setFormDesc("");
      setFormImg("");
      setShowAddModal(false);
    } catch (err) {
      console.error("Failed adding dynamic project:", err);
      setFormError("Error while writing database transaction.");
      handleFirestoreError(err, OperationType.CREATE, "projects");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    const confirmPass = prompt("Enter Admin Password (saur@2008) to delete this project study:");
    if (!confirmPass) return;
    if (confirmPass !== "saur@2008") {
      alert("Unauthorized! Invalid administrative credentials.");
      return;
    }

    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Error deleting record.");
      handleFirestoreError(err, OperationType.DELETE, `projects/${id}`);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Action Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-emerald-500 font-extrabold text-sm uppercase tracking-wider bg-emerald-50 px-4 py-1.5 rounded-full inline-block">
              Case Studies
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
              Crafted Projects Across India
            </h2>
            <p className="text-gray-650">
              Explore our pristine rooftop engineering and high-efficiency installations bringing financial prosperity to homeowners and corporate entities.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => {
                if (isAdminMode) {
                  setShowAddModal(true);
                } else {
                  setShowPasswordModal(true);
                }
              }}
              className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-3.5 rounded-2xl shadow-lg border border-slate-700/50 hover:translate-y-[-1px] transition-all duration-200 text-sm"
              id="btn-add-project"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Add Project Detail</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-250 border flex-shrink-0 ${
                activeTab === cat
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100"
                  : "bg-white text-gray-650 hover:bg-gray-100 border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Dynamic representation */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => {
              const isDefault = "isDefault" in proj && proj.isDefault;
              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-150 hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative"
                >
                  {/* Photo Frame Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-md">
                      {proj.category}
                    </span>

                    {/* Dynamic Project Manager Badge */}
                    {!isDefault && (
                      <span className="absolute top-4 right-4 bg-slate-900/90 text-emerald-400 text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-md border border-emerald-500/30">
                        Dynamic Study
                      </span>
                    )}
                  </div>

                  {/* In-depth details */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-1 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{proj.location}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-xl text-gray-900 group-hover:text-emerald-600">
                        {proj.title}
                      </h3>
                      <p className="text-gray-650 text-sm leading-relaxed">{proj.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Installed System Size</p>
                        <p className="font-display font-extrabold text-sm text-gray-800">{proj.systemSize}</p>
                      </div>
                      <div className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl font-bold text-xs self-start border border-emerald-100">
                        {proj.saving}
                      </div>
                    </div>

                    {/* Deletion control (Only for newly verified dynamic projects) */}
                    {!isDefault && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="inline-flex items-center space-x-1.5 text-xs text-red-500 font-semibold hover:text-red-700 hover:underline py-1"
                          title="Remove project case study"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Block</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-gray-150 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-md">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-800 mb-1">No Real Installations Added Yet</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Use the authorized <strong className="text-slate-700">"Add Project Detail"</strong> button on the top right to dynamically load real, verified solar cases in Lucknow.
            </p>
          </div>
        )}

        {/* Before & After comparison card */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-gray-150 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <span className="inline-flex items-center space-x-1 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-bold font-mono">
              <Camera className="w-3.5 h-3.5" />
              <span>Visible Transform</span>
            </span>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900">
              Before & After Solar Transformation
            </h3>
            <p className="text-gray-650 text-sm sm:text-base leading-relaxed">
              Witness how we optimize unused space. This representative residential rooftop was converted from a bare, dusty roof exposed to intense heating to a premium energy generating shield protecting the house and eliminating bills.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <span className="text-red-500 bg-red-50 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">Before</span>
                <span className="font-semibold text-gray-600">Bare hot concrete roof, costly monthly power grid bills.</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <span className="text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">After</span>
                <span className="font-semibold text-gray-800">Cooled roof temperature, complete bill reduction, and solid power backup.</span>
              </div>
            </div>
          </div>

          {/* Quick interactive toggle simulation */}
          <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden aspect-video group shadow-md border">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600"
                alt="Bare traditional rooftop before solar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                <p className="font-display font-black text-white text-lg sm:text-l tracking-wider uppercase bg-red-600/90 px-4 py-1.5 rounded-xl border border-red-500">
                  BEFORE SOLAR
                </p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video group shadow-lg border">
              <img
                src={residentImg}
                alt="Rooftop integrated with neat solar arrays"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <p className="font-display font-black text-white text-lg sm:text-xl tracking-wider uppercase bg-emerald-600/90 px-4 py-1.5 rounded-xl border border-emerald-500">
                  AFTER SAVE ENERGY
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal Prompt */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full border border-gray-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-emerald-400" />
                <h3 className="font-display font-extrabold text-lg">Admin Authentication</h3>
              </div>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordError("");
                  setPasswordInput("");
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleVerifyPassword} className="p-6 space-y-4">
              <p className="text-xs text-gray-500 leading-normal">
                Please enter your Save Energy configuration code to gain case study design tools.
              </p>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-800"
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs font-bold block">{passwordError}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm shadow-md flex justify-center items-center"
              >
                Verify Code
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Project Form Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-gray-150 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 bg-emerald-600 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <h3 className="font-display font-extrabold text-lg">Add New Case Study</h3>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setFormError("");
                }}
                className="text-emerald-100 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="p-6 md:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-semibold leading-normal">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Project Name / Title</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. 10kW Smart On-Grid System"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Plant Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Location (City, State)</label>
                  <input
                    type="text"
                    required
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Lucknow, UP"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                {/* System Size */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Plant System Size</label>
                  <input
                    type="text"
                    required
                    value={formSystemSize}
                    onChange={(e) => setFormSystemSize(e.target.value)}
                    placeholder="e.g. 10kW Monocrystalline"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                {/* Savings */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Financial Monthly Savings</label>
                  <input
                    type="text"
                    required
                    value={formSaving}
                    onChange={(e) => setFormSaving(e.target.value)}
                    placeholder="e.g. saves ~₹14,500/month"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Write-Up / Description</label>
                  <textarea
                    rows={3}
                    required
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Provide highlights of the rooftop engineering, customer gains, and government subsidy clearance..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white leading-relaxed resize-none"
                  />
                </div>

                {/* Photo uploader */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider block">Project Installation Picture</label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-7">
                      <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-emerald-500 transition-colors mb-2" />
                        <span className="text-xs font-bold text-gray-700">Choose Installation Photo</span>
                        <span className="text-[10px] text-gray-400 mt-1 block">Supports JPG, PNG, WEBP (autoresizes)</span>
                      </div>
                    </div>
                    
                    <div className="md:col-span-5 flex items-center justify-center border border-gray-150 bg-gray-50 rounded-2xl h-32 overflow-hidden relative">
                      {formImg ? (
                        <img src={formImg} alt="Chosen Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-4">
                          <ImageIcon className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                          <span className="text-[10px] text-gray-400 block font-semibold uppercase tracking-wider">No Photo Selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Action Row */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-3 border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Case Study</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
