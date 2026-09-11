import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShieldAlert } from "lucide-react";

export const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/#about" },
    { label: "Features", to: "/#features" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Contact", to: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/85 backdrop-blur-md border-b border-white/10 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Official JalRakshak Emblem */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="JalRakshak AI" 
              className="w-full h-full object-contain rounded-xl" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-white flex items-center gap-1.5">
              JalRakshak <span className="text-xs bg-flood-blue/40 text-flood-glow px-1.5 py-0.5 rounded font-mono">AI</span>
            </span>
            <span className="text-[10px] text-slate-300 font-medium tracking-wide">Emergency Flood Response System</span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.to}
              className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/emergency"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-red-600/90 hover:bg-red-600 text-white shadow-glow-red transition-all transform hover:-translate-y-0.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Report SOS</span>
          </Link>

          <Link
            to="/dashboard"
            className="px-6 py-2 rounded-full text-xs font-bold bg-flood-blue hover:bg-flood-hover text-white shadow-glow-blue transition-all transform hover:-translate-y-0.5"
          >
            Command Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-xl text-slate-300 hover:text-white md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="md:hidden bg-navy-900 border-b border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.to}
              onClick={() => setMobileNavOpen(false)}
              className="block text-base font-semibold text-slate-200 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              to="/emergency"
              onClick={() => setMobileNavOpen(false)}
              className="w-full text-center py-2.5 rounded-full text-sm font-bold bg-red-600 text-white"
            >
              Report Emergency SOS
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileNavOpen(false)}
              className="w-full text-center py-2.5 rounded-full text-sm font-bold bg-flood-blue text-white"
            >
              Command Login / Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
