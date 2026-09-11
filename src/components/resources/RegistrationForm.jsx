import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Users, Building2, Anchor, CheckCircle2, ShieldCheck, Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export const RegistrationForm = ({ onRegistered }) => {
  const { handleRegisterResource, addToast } = useApp();

  const [activeTab, setActiveTab] = useState("Volunteer"); // Volunteer | NGO | Resource Provider
  const [formData, setFormData] = useState({
    name: "Aarav Sharma",
    phone: "+91 9876543210",
    email: "aarav.sharma@example.com",
    location: "Patna, Bihar",
    district: "Patna",
    supportType: "Rescue Operations",
    availability: "Next 7 days",
    resourcesCount: "1 boat / 2 staff"
  });

  const [submitting, setSubmitting] = useState(false);
  const [registeredItem, setRegisteredItem] = useState(null);

  const supportTypes = [
    "Rescue Operations",
    "Medical Support",
    "Food Distribution",
    "Shelter & Logistics",
    "Transportation",
    "Boats & Marine Fleet",
    "Relief Supplies",
    "Volunteer Support"
  ];

  const availabilityOptions = [
    "Today",
    "Next 7 days",
    "Weekends",
    "Emergency Only"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      addToast("Please fill in your name and contact number.", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const reg = await handleRegisterResource({
        type: activeTab,
        ...formData
      });
      setRegisteredItem(reg);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      if (onRegistered) onRegistered(reg);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Left 2 Columns: Form Card matching reference image panel 6 */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card">
        {/* Title */}
        <div className="mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Register as a Volunteer / NGO
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Join hands to help flood-affected communities.
          </p>
        </div>

        {/* 3 Tabs matching reference */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl mb-6 max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab("Volunteer")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "Volunteer"
                ? "bg-flood-blue text-white shadow-glow-blue"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Volunteer</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("NGO")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "NGO"
                ? "bg-flood-blue text-white shadow-glow-blue"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>NGO</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("Resource Provider")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "Resource Provider"
                ? "bg-flood-blue text-white shadow-glow-blue"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Anchor className="w-3.5 h-3.5" />
            <span>Resource Provider</span>
          </button>
        </div>

        {/* Form Fields matching reference */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {activeTab === "NGO" ? "Organization / NGO Name" : "Full Name"}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Aarav Sharma"
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Contact Number
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Location / District Base
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Patna, Bihar"
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Type of Support
              </label>
              <select
                value={formData.supportType}
                onChange={(e) => setFormData({ ...formData, supportType: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl px-4 py-3 outline-none transition-all cursor-pointer font-medium"
              >
                {supportTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Availability
            </label>
            <select
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl px-4 py-3 outline-none transition-all cursor-pointer font-medium"
            >
              {availabilityOptions.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Submit Button matching reference */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-2xl bg-flood-blue hover:bg-flood-hover text-white text-base font-extrabold shadow-glow-blue hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {submitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>

      {/* Right Column: "Together We Are Stronger" card matching reference image panel 6 */}
      <div className="bg-gradient-to-b from-blue-50/70 to-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-card text-center">
        <div className="w-16 h-16 rounded-3xl bg-flood-blue/10 text-flood-blue flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Users className="w-8 h-8 text-flood-blue" />
        </div>

        <h3 className="text-sm font-semibold text-slate-500">Together</h3>
        <p className="text-xl font-black text-flood-blue mt-0.5 mb-8">
          We Are Stronger
        </p>

        {/* Benefits list with check icons matching reference */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-blue-100/60 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-flood-blue flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">Be the bridge of hope</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-blue-100/60 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-flood-blue flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">Support your community</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-blue-100/60 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-flood-blue flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">Make a real impact</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-blue-100 text-xs text-slate-500">
          <p>Over <strong className="text-slate-800 font-black">320+</strong> verified responders and <strong className="text-slate-800 font-black">18</strong> NGOs actively deployed.</p>
        </div>
      </div>
    </div>
  );
};
