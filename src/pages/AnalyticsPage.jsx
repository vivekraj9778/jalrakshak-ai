import React, { useState } from "react";
import { WaterLevelChart } from "../components/analytics/WaterLevelChart";
import { RainfallChart } from "../components/analytics/RainfallChart";
import { RiskSummaryTable } from "../components/analytics/RiskSummaryTable";
import { ResourceDonut } from "../components/analytics/ResourceDonut";
import { districtsData } from "../data/districts";
import { Calendar, Download, RefreshCw, Filter } from "lucide-react";
import { useApp } from "../context/AppContext";

export const AnalyticsPage = () => {
  const { addToast } = useApp();
  const [timeRange, setTimeRange] = useState("24h"); // 24h | 7d | 30d
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const handleExportData = () => {
    addToast("Exporting Bihar Flood Hydrological Report (CSV)...", "info");
    setTimeout(() => {
      addToast("Report downloaded successfully.", "success");
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header & Global Filters matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Real-Time Graphs & Hydrological Data
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Precipitation telemetry, river barrage levels, and disaster asset allocations
          </p>
        </div>

        {/* Time filters & District Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          {/* District Select Filter */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-flood-blue transition-colors shadow-xs"
          >
            <option value="All">All Bihar Districts</option>
            {districtsData.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>

          {/* Time Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {[
              { id: "24h", label: "Last 24 Hours" },
              { id: "7d", label: "Last 7 Days" },
              { id: "30d", label: "Last 30 Days" }
            ].map(range => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  timeRange === range.id
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Export Report Button */}
          <button
            onClick={handleExportData}
            className="p-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 shadow-xs transition-colors"
            title="Export Report CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 2 Graphs Grid matching reference image panel 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Graph 1: River Water Level (Kosi River) */}
        <WaterLevelChart />

        {/* Graph 2: Rainfall (Last 24 Hours) */}
        <RainfallChart />
      </div>

      {/* Bottom 2 Cards Grid matching reference image panel 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Table: District-wise Risk Summary (7 cols) */}
        <div className="lg:col-span-7">
          <RiskSummaryTable filterText={selectedDistrict === "All" ? "" : selectedDistrict} />
        </div>

        {/* Donut Chart: Resource Availability (5 cols) */}
        <div className="lg:col-span-5">
          <ResourceDonut />
        </div>
      </div>
    </div>
  );
};
