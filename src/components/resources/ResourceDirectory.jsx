import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Search, Filter, Phone, MapPin, CheckCircle, Clock, Shield, Award } from "lucide-react";

export const ResourceDirectory = () => {
  const { resources } = useApp();
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = resources.filter((item) => {
    if (filterType !== "All" && item.type !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.supportType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card mt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black text-slate-900">Verified Relief Directory</h3>
          <p className="text-xs text-slate-500">Live network of community volunteers, NGOs, and boat providers</p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, skill, base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs rounded-xl pl-8 pr-3 py-2 outline-none focus:border-flood-blue w-48 sm:w-56"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {["All", "Volunteer", "NGO", "Resource Provider"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterType === type ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-flood-blue/40 hover:bg-white hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-flood-blue">
                  {res.type}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 mt-1.5 group-hover:text-flood-blue transition-colors">
                  {res.name}
                </h4>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{res.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="font-semibold text-slate-800">{res.supportType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Available: <strong>{res.availability}</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <a
                href={`tel:${res.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-flood-blue hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{res.phone}</span>
              </a>
              <span className="text-[10px] text-slate-400 font-mono">ID: {res.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
