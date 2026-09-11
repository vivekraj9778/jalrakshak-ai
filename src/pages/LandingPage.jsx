import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AIAssistant } from "../components/ai/AIAssistant";
import { ToastContainer } from "../components/common/Toast";
import { 
  Users, 
  HandHeart, 
  Home, 
  MapPin, 
  ShieldAlert, 
  ArrowRight, 
  Waves, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  PhoneCall, 
  Compass,
  Radio
} from "lucide-react";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-flood-blue selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section matching Panel 1 of Reference Image */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image - Natural / Clear */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=2000&q=85')`,
          }}
        >
          {/* Very light overlay only for text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Main Typography & CTAs */}
            <div className="lg:col-span-8 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-flood-blue/20 border border-flood-blue/40 text-flood-glow text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-flood-glow animate-pulse" />
                <span>AI-Powered Flood Emergency Command System</span>
              </div>

              {/* Heading matching reference image */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
                Bridging Help,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400">
                  In Times of Flood.
                </span>
              </h1>

              {/* Subtitle matching reference */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
                JalRakshak connects flood-affected people with real-time support, resources and relief services across Bihar.
              </p>

              {/* Working Action Buttons matching reference */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {/* Button 1: Report Emergency -> /emergency */}
                <Link
                  to="/emergency"
                  className="px-8 py-4 rounded-full bg-flood-blue hover:bg-flood-hover text-white text-sm sm:text-base font-extrabold shadow-glow-blue hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5"
                >
                  <ShieldAlert className="w-5 h-5 text-white" />
                  <span>Report Emergency</span>
                </Link>

                {/* Button 2: View Live Map -> /map */}
                <Link
                  to="/map"
                  className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-bold border border-white/25 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2.5"
                >
                  <Compass className="w-5 h-5 text-cyan-300" />
                  <span>View Live Map</span>
                </Link>
              </div>
            </div>

            {/* Right Col: Handwritten cursive callout matching reference image */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl text-center lg:text-right max-w-sm">
                <div className="font-handwriting text-4xl sm:text-5xl text-cyan-300 font-bold leading-tight drop-shadow">
                  Safer<br />
                  Stronger<br />
                  Together
                </div>
                <div className="flex items-center justify-center lg:justify-end gap-1 text-amber-300 mt-2">
                  <Sparkles className="w-4 h-4" />
                  <Sparkles className="w-3 h-3" />
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Connecting over 28 flood-prone districts with automated rapid-dispatch logistics.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Hero Statistics Bar matching reference image */}
          <div className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Stat 1: 12,846 People Rescued */}
            <div className="glass-panel-dark p-4 sm:p-5 rounded-2xl flex items-center gap-3.5 border border-white/10 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-white">12,846</span>
                <span className="text-xs text-slate-300 font-medium">People Rescued</span>
              </div>
            </div>

            {/* Stat 2: 320 Active Volunteers */}
            <div className="glass-panel-dark p-4 sm:p-5 rounded-2xl flex items-center gap-3.5 border border-white/10 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                <HandHeart className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-white">320</span>
                <span className="text-xs text-slate-300 font-medium">Active Volunteers</span>
              </div>
            </div>

            {/* Stat 3: 145 Relief Centers */}
            <div className="glass-panel-dark p-4 sm:p-5 rounded-2xl flex items-center gap-3.5 border border-white/10 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-white">145</span>
                <span className="text-xs text-slate-300 font-medium">Relief Centers</span>
              </div>
            </div>

            {/* Stat 4: 28 Districts Covered */}
            <div className="glass-panel-dark p-4 sm:p-5 rounded-2xl flex items-center gap-3.5 border border-white/10 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-white">28</span>
                <span className="text-xs text-slate-300 font-medium">Districts Covered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: About JalRakshak */}
      <section id="about" className="py-20 bg-[#06233D] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-flood-glow uppercase tracking-widest bg-flood-blue/20 px-3 py-1 rounded-full">
              Mission & Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">
              A Unified Crisis Network for Bihar Floods
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              Every monsoon season, millions along the Kosi, Bagmati, and Mahananda river basins face severe inundation. JalRakshak AI solves the coordination bottleneck by synchronizing water gauge telemetry, stranded citizen SOS alerts, and emergency NDRF/SDRF boat flotillas in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-navy-850 border border-navy-800 shadow-xl hover:border-flood-blue/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Instant Emergency SOS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                One-tap GPS distress transmission without complex logins. Automatically identifies nearest available motorized boats and community volunteers.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-navy-850 border border-navy-800 shadow-xl hover:border-flood-blue/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Hydrological Alarms</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Live stream monitoring of Birpur Barrage and river gauges. Automatically computes danger mark breaches and generates predictive evacuation zones.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-navy-850 border border-navy-800 shadow-xl hover:border-flood-blue/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <HandHeart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">NGO & Volunteer Dispatch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verified roster of community boats, medical trauma doctors, and emergency rations ensuring aid reaches cut-off hamlets without duplication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Features & Capabilities */}
      <section id="features" className="py-20 bg-navy-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-flood-glow uppercase tracking-widest bg-flood-blue/20 px-3 py-1 rounded-full">
                Core Features
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Command Center Intelligence at Your Fingertips
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Designed for field commanders, district collectors, and first responders to make split-second life-saving decisions during heavy downpours and embankment breaches.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  "Live GIS satellite overlays with submerged road routing",
                  "AI triage ranking priority for pregnant, elderly, and trapped children",
                  "Verified relief shelter capacities with food supply counters",
                  "Interactive district-wise risk scores updated every 15 minutes"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="px-6 py-3 rounded-full bg-flood-blue hover:bg-flood-hover text-white text-xs font-bold shadow-glow-blue transition-all flex items-center gap-2"
                >
                  <span>Launch Command Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Preview Box */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-navy-900 p-6">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-400 font-mono ml-2">JalRakshak AI Live Telemetry</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded">
                  28 BARRAGES ONLINE
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-navy-850 border border-white/10 flex items-center justify-between">
                  <span className="font-bold text-white">Supaul (Kosi River)</span>
                  <span className="font-mono text-red-400 font-bold">6.2m ↑ DANGER MARK</span>
                </div>
                <div className="p-3 rounded-xl bg-navy-850 border border-white/10 flex items-center justify-between">
                  <span className="font-bold text-white">Katihar (Mahananda River)</span>
                  <span className="font-mono text-orange-400 font-bold">6.1m HIGH ALERT</span>
                </div>
                <div className="p-3 rounded-xl bg-navy-850 border border-white/10 flex items-center justify-between">
                  <span className="font-bold text-white">Active Boat Flotillas</span>
                  <span className="font-mono text-cyan-300 font-bold">18 Deployed / 8 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Emergency Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-950 via-navy-950 to-blue-950 border-t border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            Immediate Life-Safety Response
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Stranded or Need Immediate Rescue?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Do not wait for water levels to rise higher. Submit an SOS with your GPS coordinates now or dial the state disaster control helpline directly.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/emergency"
              className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-black text-sm sm:text-base shadow-glow-red hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>Report Emergency SOS Now</span>
            </Link>

            <a
              href="tel:1078"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <span>Call NDRF Helpline 1078</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating AI Assistant */}
      <AIAssistant />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};
