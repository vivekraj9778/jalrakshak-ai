import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { resourceAvailability } from "../../data/analyticsData";

export const ResourceDonut = () => {
  const totalCount = resourceAvailability.reduce((sum, item) => sum + item.count, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-navy-900 text-white p-2.5 rounded-xl shadow-xl text-xs border border-white/10">
          <p className="font-bold">{data.name}</p>
          <p className="text-cyan-300 font-extrabold text-sm">
            {data.count} units ({((data.count / totalCount) * 100).toFixed(0)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card flex flex-col h-full">
      <div className="pb-3 border-b border-slate-100 mb-2">
        <h3 className="text-base font-bold text-slate-900">Resource Availability</h3>
        <p className="text-xs text-slate-500">Live operational disaster response assets</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-1">
        {/* Donut Chart with center label */}
        <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex-shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={resourceAvailability}
                dataKey="count"
                nameKey="name"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                stroke="none"
              >
                {resourceAvailability.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text matching reference image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
              {totalCount}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-0.5">
              Total Resources
            </span>
          </div>
        </div>

        {/* Legend list matching reference image */}
        <div className="flex-1 w-full space-y-2.5 text-xs font-semibold">
          {resourceAvailability.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.fill }} />
                <span className="text-slate-700">{item.name}</span>
              </div>
              <span className="font-extrabold text-slate-900 text-sm">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
