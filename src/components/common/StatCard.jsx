import React from "react";
import {
  Users,
  AlertTriangle,
  LifeBuoy,
  Home,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const iconMap = {
  Users,
  AlertTriangle,
  LifeBuoy,
  Home,
};

export const StatCard = ({
  title,
  value,
  change,
  trend = "up",
  trendColor,
  icon,
  isEmergency = false,
}) => {
  const IconComponent = iconMap[icon] || AlertTriangle;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-card hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
      
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>

        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
            isEmergency
              ? "bg-red-50 text-red-600"
              : "bg-blue-50 text-flood-blue"
          }`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Main value */}
      <div className="flex items-baseline gap-2 mb-2">
        <h3
          className={`text-3xl font-extrabold tracking-tight ${
            isEmergency ? "text-red-600" : "text-slate-900"
          }`}
        >
          {value}
        </h3>
      </div>

      {/* Change badge */}
      <div className="flex items-center gap-1.5">
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
            trendColor ||
            (trend === "up"
              ? "text-emerald-700 bg-emerald-50"
              : "text-slate-600 bg-slate-50")
          }`}
        >
          {trend === "up" ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}

          {change}
        </span>
      </div>

      {/* Accent corner line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 transition-all ${
          isEmergency
            ? "bg-red-500"
            : "bg-transparent group-hover:bg-flood-blue"
        }`}
      />
    </div>
  );
};