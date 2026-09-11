import React, { useState } from "react";
import { districtsData } from "../../data/districts";
import { RiskBadge } from "../common/RiskBadge";
import { MapPin, Droplets, AlertTriangle, Users, Shield, ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DistrictRiskMap = ({ onSelectDistrict }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(districtsData[0]); // default Patna / Supaul
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const navigate = useNavigate();

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    if (onSelectDistrict) onSelectDistrict(district);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card flex flex-col h-full">
      {/* Section Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Flood Risk by District</h3>
          <p className="text-xs text-slate-500">Interactive Bihar inundation risk monitoring</p>
        </div>

        {/* District Quick-Select Dropdown & Legend */}
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={selectedDistrict?.id}
            onChange={(e) => {
              const found = districtsData.find(d => d.id === e.target.value);
              if (found) handleDistrictClick(found);
            }}
            className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-3 py-1.5 outline-none cursor-pointer hover:border-flood-blue shadow-xs"
          >
            {districtsData.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.riskLevel})
              </option>
            ))}
          </select>

          {/* Legend matching reference image */}
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span>High</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Visualizer + Tooltip Overlay */}
      <div className="relative flex-1 min-h-[340px] flex items-center justify-center p-2">
        <svg
          viewBox="0 0 320 270"
          className="w-full h-full max-h-[350px] drop-shadow-md select-none transition-all"
        >
          {/* River Paths */}
          <path
            d="M 170,10 Q 160,80 180,140 T 210,240"
            fill="none"
            stroke="#087ED1"
            strokeWidth="4"
            strokeDasharray="4 2"
            opacity="0.6"
          />
          <path
            d="M 100,20 Q 110,90 130,170 T 150,250"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
            opacity="0.4"
          />

          {/* District Polygons */}
          {districtsData.slice(0, 10).map((district) => {
            const isSelected = selectedDistrict?.id === district.id;
            const isHovered = hoveredDistrict?.id === district.id;

            return (
              <g key={district.id}>
                <path
                  d={district.svgPath}
                  fill={district.highlightColor}
                  fillOpacity={isSelected ? 0.95 : isHovered ? 0.85 : 0.72}
                  stroke={isSelected ? "#06233D" : "#ffffff"}
                  strokeWidth={isSelected ? 3 : 1.5}
                  className="cursor-pointer transition-all duration-200 hover:filter hover:brightness-110"
                  onMouseEnter={() => setHoveredDistrict(district)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => handleDistrictClick(district)}
                />
                <text
                  x={
                    district.id === "supaul" ? 165 :
                    district.id === "katihar" ? 245 :
                    district.id === "madhubani" ? 100 :
                    district.id === "araria" ? 230 :
                    district.id === "darbhanga" ? 75 :
                    district.id === "purnia" ? 230 :
                    district.id === "saharsa" ? 148 :
                    district.id === "patna" ? 135 : 155
                  }
                  y={
                    district.id === "supaul" ? 80 :
                    district.id === "katihar" ? 200 :
                    district.id === "madhubani" ? 65 :
                    district.id === "araria" ? 85 :
                    district.id === "darbhanga" ? 125 :
                    district.id === "purnia" ? 145 :
                    district.id === "saharsa" ? 135 :
                    district.id === "patna" ? 165 : 195
                  }
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="bold"
                  className="pointer-events-none drop-shadow select-none font-sans"
                >
                  {district.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip Card matching reference image */}
        {selectedDistrict && (
          <div className="absolute top-4 right-4 bg-navy-900/95 text-white p-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur pointer-events-auto min-w-[190px] animate-fade-in">
            <div className="flex items-center justify-between gap-2">
              <span className="font-black text-sm text-white">{selectedDistrict.name}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                selectedDistrict.riskLevel === "Critical" ? "bg-red-500 text-white" :
                selectedDistrict.riskLevel === "High" ? "bg-orange-500 text-white" :
                selectedDistrict.riskLevel === "Moderate" ? "bg-amber-500 text-slate-900" : "bg-emerald-500 text-white"
              }`}>
                {selectedDistrict.riskLevel.toUpperCase()}
              </span>
            </div>
            <div className="mt-2.5 space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Risk Score:</span>
                <span className="font-bold text-white">{selectedDistrict.riskScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span>Active SOS:</span>
                <span className="font-bold text-red-400">{selectedDistrict.activeSOS}</span>
              </div>
              <div className="flex justify-between">
                <span>Water Level:</span>
                <span className="font-bold text-cyan-300">{selectedDistrict.waterLevel} m</span>
              </div>
              <div className="flex justify-between">
                <span>River Basin:</span>
                <span className="font-semibold text-slate-200 truncate max-w-[100px]">{selectedDistrict.river}</span>
              </div>
            </div>
            <button
              onClick={() => navigate(`/map?district=${selectedDistrict.name}`)}
              className="mt-3 w-full text-center py-1.5 rounded-xl bg-flood-blue hover:bg-flood-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <span>View On Live Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Selected District Quick Metrics Strip */}
      {selectedDistrict && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 bg-slate-50/70 p-3 rounded-xl mt-2">
          <div>
            <span className="text-[10px] text-slate-500 block">Affected Population</span>
            <span className="text-xs font-bold text-slate-800">{selectedDistrict.affectedPeople.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Rescue Teams</span>
            <span className="text-xs font-bold text-flood-blue">{selectedDistrict.rescueTeams} Active</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">River Embankment</span>
            <span className="text-xs font-bold text-slate-800 truncate block">{selectedDistrict.river}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Relief Shelters</span>
            <span className="text-xs font-bold text-emerald-600">{selectedDistrict.reliefCenters} Camps</span>
          </div>
        </div>
      )}
    </div>
  );
};
