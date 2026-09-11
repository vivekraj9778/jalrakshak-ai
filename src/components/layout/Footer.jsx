import React from "react";
import { Link } from "react-router-dom";
import { Waves, Phone, ShieldAlert, Heart, ExternalLink, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-navy-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-flood-blue flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                JalRakshak <span className="text-flood-blue">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              "Bridging Help, In Times of Flood." Dedicated to saving lives, automating emergency triage, and coordinating flood relief resources across Bihar.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-4 h-4 text-flood-blue" />
              <span>State Emergency Operations Center, Patna, Bihar</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Command Dashboard</Link></li>
              <li><Link to="/map" className="hover:text-white transition-colors">Interactive Live Map</Link></li>
              <li><Link to="/emergency" className="hover:text-white transition-colors">Report SOS Emergency</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Volunteer & NGO Hub</Link></li>
              <li><Link to="/analytics" className="hover:text-white transition-colors">Hydrological Analytics</Link></li>
            </ul>
          </div>

          {/* Disaster Hotlines */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Emergency Helplines</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-slate-300">NDRF Control Room</span>
                <span className="font-bold text-white bg-navy-800 px-2 py-0.5 rounded text-xs">1078</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-300">Bihar SDMA Helpline</span>
                <span className="font-bold text-white bg-navy-800 px-2 py-0.5 rounded text-xs">1070</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-300">Police & Rescue</span>
                <span className="font-bold text-white bg-navy-800 px-2 py-0.5 rounded text-xs">112</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-300">Ambulance Emergency</span>
                <span className="font-bold text-white bg-navy-800 px-2 py-0.5 rounded text-xs">108</span>
              </li>
            </ul>
          </div>

          {/* Operational Status */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Command System</h4>
            <p className="text-xs text-slate-400 mb-3">
              JalRakshak AI coordinates with Bihar SDRF, NDRF 9th Battalion, and District Disaster Management Authorities (DDMAs).
            </p>
            <div className="p-3 bg-navy-900 rounded-xl border border-navy-800 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-xs font-bold text-white">System Status: Active</p>
                <p className="text-[10px] text-slate-400">All 28 district relays online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} JalRakshak AI — Disaster Management & Rescue Platform.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Built for resilient disaster response with <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
