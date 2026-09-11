import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { AIAssistant } from "../ai/AIAssistant";
import { ToastContainer } from "../common/Toast";
import { useApp } from "../../context/AppContext";

export const DashboardLayout = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useApp();
  const [globalSearch, setGlobalSearch] = useState("");

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F4F8FB] text-slate-800">
      {/* Desktop Sidebar (Fixed Dark Navy) */}
      <div className="hidden md:flex flex-shrink-0 z-20">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay & Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-72 h-full">
            <Sidebar isMobile onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onSearch={setGlobalSearch} searchQuery={globalSearch} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
          <Outlet context={{ globalSearch }} />
        </main>
      </div>

      {/* Global AI Floating Assistant */}
      <AIAssistant />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};
