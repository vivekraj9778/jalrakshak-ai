import React, { useState } from "react";
import { EmergencyForm } from "../components/emergency/EmergencyForm";
import { SOSManagement } from "../components/emergency/SOSManagement";
import { ShieldAlert, ListFilter, AlertOctagon } from "lucide-react";

export const EmergencyPage = () => {
  const [activeView, setActiveView] = useState("report"); // 'report' | 'manage'

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top View Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShieldAlert className="w-7 h-7 text-red-600" />
            <span>Emergency SOS & Rescue Operations</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Broadcast emergency distress alerts or coordinate team assignments across Bihar districts
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => setActiveView("report")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === "report"
                ? "bg-red-600 text-white shadow-glow-red"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Report Emergency Form</span>
          </button>

          <button
            onClick={() => setActiveView("manage")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === "manage"
                ? "bg-navy-900 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Command SOS Queue</span>
          </button>
        </div>
      </div>

      {/* Conditionally Render View */}
      {activeView === "report" ? (
        <>
          <EmergencyForm onSOSCreated={() => setActiveView("manage")} />
          {/* Also show mini queue below */}
          <div className="pt-6">
            <SOSManagement />
          </div>
        </>
      ) : (
        <SOSManagement />
      )}
    </div>
  );
};
