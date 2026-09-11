import React from "react";
import { Link } from "react-router-dom";
import { emergencyPriorities } from "../../data/dashboardData";
import { Sparkles, ArrowRight, AlertCircle } from "lucide-react";

export const EmergencyPriority = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-navy-900 text-flood-glow flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">AI Emergency Priority</h3>
            <p className="text-[11px] text-slate-500">Autonomous multi-factor triage ranking</p>
          </div>
        </div>
        <span className="text-[10px] bg-blue-50 text-flood-blue font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Live Triage
        </span>
      </div>

      <div className="mt-4 space-y-2.5">
        {emergencyPriorities.map((item) => (
          <div
            key={item.rank}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 hover:bg-blue-50/40 border border-slate-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono font-extrabold text-sm text-slate-400 group-hover:text-flood-blue transition-colors">
                {item.rank}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">{item.district}</span>
                  <span className="text-[11px] text-slate-500 font-medium">({item.count} SOS)</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate max-w-[200px] sm:max-w-xs">{item.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs ${item.badgeColor}`}>
                {item.status}
              </span>
              <Link
                to={`/emergency?district=${item.district}`}
                className="text-slate-400 hover:text-flood-blue p-1 rounded-lg"
                title={`Inspect ${item.district} emergencies`}
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
