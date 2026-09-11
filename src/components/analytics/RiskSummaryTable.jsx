import React from "react";
import { districtsData } from "../../data/districts";
import { RiskBadge } from "../common/RiskBadge";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const RiskSummaryTable = ({ filterText = "" }) => {
  const navigate = useNavigate();

  const filtered = districtsData.filter(d => 
    d.name.toLowerCase().includes(filterText.toLowerCase()) ||
    d.riskLevel.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">District-wise Risk Summary</h3>
          <p className="text-xs text-slate-500">Live water levels & active emergency load</p>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          {filtered.length} Districts
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100">
              <th className="py-3 px-2">District</th>
              <th className="py-3 px-2">Risk Level</th>
              <th className="py-3 px-2 text-right">Water Level (m)</th>
              <th className="py-3 px-2 text-right">SOS Requests</th>
              <th className="py-3 px-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filtered.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-3 px-2 font-bold text-slate-900">
                  {d.name}
                </td>
                <td className="py-3 px-2">
                  <RiskBadge level={d.riskLevel} size="sm" />
                </td>
                <td className="py-3 px-2 text-right font-bold text-slate-800">
                  <span className={d.waterLevel > d.dangerMark ? 'text-red-600' : 'text-slate-800'}>
                    {d.waterLevel.toFixed(1)}
                  </span>
                  <span className="text-slate-400 font-normal ml-0.5">m</span>
                </td>
                <td className="py-3 px-2 text-right">
                  <span className={`font-bold px-2 py-0.5 rounded-full ${
                    d.activeSOS > 50 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {d.activeSOS}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <button
                    onClick={() => navigate(`/map?district=${d.name}`)}
                    className="p-1 rounded-lg text-slate-400 hover:text-flood-blue hover:bg-blue-50 transition-colors"
                    title={`View ${d.name} on map`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
