import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from "recharts";
import { rainfallData24h } from "../../data/analyticsData";

export const RainfallChart = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-900 text-white p-2.5 rounded-xl shadow-xl text-xs border border-white/10">
          <p className="font-bold text-slate-300">{label}</p>
          <p className="font-extrabold text-cyan-300 text-sm mt-0.5">
            {payload[0].value} mm
          </p>
          {payload[0].payload.isPeak && (
            <span className="inline-block mt-1 text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.2 rounded">
              Peak Downpour
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card flex flex-col h-full">
      {/* Header & Peak Callout */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Rainfall (Last 24 Hours)</h3>
          <p className="text-xs text-slate-500">Hourly catchment area precipitation (mm)</p>
        </div>

        {/* Peak indicator matching reference image */}
        <div className="bg-navy-900 text-white px-3 py-1.5 rounded-xl shadow-sm text-xs text-right">
          <span className="font-black text-white text-sm">42 mm</span>
          <span className="text-[10px] text-slate-400 block font-medium">11:00 AM Peak</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rainfallData24h} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="hour" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis domain={[0, 50]} stroke="#94A3B8" fontSize={11} tickLine={false} unit="mm" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="rainfall" radius={[6, 6, 0, 0]}>
              {rainfallData24h.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isPeak ? "#087ED1" : "#60A5FA"}
                  opacity={entry.isPeak ? 1 : 0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <span>Cumulative 24h: <strong className="text-slate-800">267 mm</strong></span>
        <span className="text-flood-blue font-semibold">IMD Doppler Radar Active</span>
      </div>
    </div>
  );
};
