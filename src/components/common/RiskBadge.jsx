import React from "react";

export const RiskBadge = ({ level, size = "md", showDot = true }) => {
  const normalized = (level || "").toLowerCase();

  let colors = "bg-slate-100 text-slate-700 border-slate-200";
  let dotColor = "bg-slate-400";

  if (normalized.includes("critical")) {
    colors = "bg-red-50 text-red-600 border-red-200";
    dotColor = "bg-red-500 animate-pulse";
  } else if (normalized.includes("high")) {
    colors = "bg-orange-50 text-orange-600 border-orange-200";
    dotColor = "bg-orange-500";
  } else if (normalized.includes("moderate") || normalized.includes("medium")) {
    colors = "bg-amber-50 text-amber-600 border-amber-200";
    dotColor = "bg-amber-500";
  } else if (normalized.includes("low") || normalized.includes("safe") || normalized.includes("resolved") || normalized.includes("operational")) {
    colors = "bg-emerald-50 text-emerald-600 border-emerald-200";
    dotColor = "bg-emerald-500";
  }

  const sizeClasses = size === "sm" 
    ? "px-2 py-0.5 text-xs font-semibold" 
    : "px-2.5 py-1 text-xs font-bold tracking-wide uppercase";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${colors}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      {level}
    </span>
  );
};
