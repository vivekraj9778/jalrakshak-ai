import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
  Legend
} from "recharts";
import { riverWaterData } from "../../data/analyticsData";
import { AlertCircle } from "lucide-react";

export const WaterLevelChart = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-navy-900 text-white p-3 rounded-xl shadow-xl border border-white/20 text-xs">
          <p className="font-bold mb-1 text-slate-300">{label}</p>
          {data.level !== null && (
            <p className="text-white font-extrabold flex items-center justify-between gap-4">
              <span>Observed Level:</span>
              <span className="text-cyan-300">{data.level} m</span>
            </p>
          )}
          {data.forecast !== null && (
            <p className="text-slate-300 flex items-center justify-between gap-4">
              <span>AI Forecast:</span>
              <span className="text-amber-300 font-bold">{data.forecast} m</span>
            </p>
          )}
          <p className="text-red-400 text-[10px] mt-1 pt-1 border-t border-white/10">
            Danger Mark: 6.0 m | Warning: 5.0 m
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card flex flex-col h-full">
      {/* Title & Peak badge matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">River Water Level (Kosi River)</h3>
          <p className="text-xs text-slate-500">Birpur Barrage Telemetry Hydrological Station</p>
        </div>

        {/* Peak Callout Badge matching reference */}
        <div className="inline-flex items-center gap-2 bg-navy-900 text-white px-3 py-1.5 rounded-xl shadow-sm text-xs">
          <span className="text-base font-extrabold text-cyan-300">6.2 m</span>
          <span className="text-[10px] bg-red-600/90 text-white px-1.5 py-0.5 rounded font-bold uppercase">
            Above Danger Level
          </span>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={riverWaterData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="waterLevelGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#087ED1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#087ED1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis domain={[0, 8]} stroke="#94A3B8" fontSize={11} tickLine={false} unit="m" />
            <Tooltip content={<CustomTooltip />} />

            {/* Danger mark reference line at 6.0m (Red dashed) */}
            <ReferenceLine
              y={6.0}
              stroke="#EF4444"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{ value: "Danger Level (6.0m)", fill: "#EF4444", fontSize: 10, position: "insideTopLeft" }}
            />

            {/* Warning mark reference line at 5.0m (Orange dotted) */}
            <ReferenceLine
              y={5.0}
              stroke="#F59E0B"
              strokeDasharray="2 2"
              strokeWidth={1.5}
              label={{ value: "Warning Level (5.0m)", fill: "#F59E0B", fontSize: 10, position: "insideBottomLeft" }}
            />

            {/* Current observed level */}
            <Area
              type="monotone"
              dataKey="level"
              stroke="#087ED1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#waterLevelGradient)"
              name="Current Level"
            />

            {/* Forecast projection line */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#F59E0B"
              strokeWidth={2.5}
              strokeDasharray="4 4"
              dot={false}
              name="Forecast"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend below chart matching reference */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-flood-blue rounded" />
          <span>Current Level</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-b-2 border-red-500 border-dashed" />
          <span>Danger Level</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-b-2 border-amber-500 border-dotted" />
          <span>Warning Level</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-b-2 border-amber-500 border-dashed" />
          <span>Forecast</span>
        </div>
      </div>
    </div>
  );
};
