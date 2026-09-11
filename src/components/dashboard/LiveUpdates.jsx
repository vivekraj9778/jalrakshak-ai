import React, { useState } from "react";
import { Link } from "react-router-dom";
import { liveUpdatesData } from "../../data/dashboardData";
import { LifeBuoy, HeartPulse, AlertTriangle, Users, Package, RefreshCw, CheckCircle2 } from "lucide-react";

export const LiveUpdates = () => {
  const [updates, setUpdates] = useState(liveUpdatesData);
  const [refreshing, setRefreshing] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case "boat":
        return <LifeBuoy className="w-4 h-4 text-flood-blue" />;
      case "medical":
        return <HeartPulse className="w-4 h-4 text-emerald-600" />;
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-red-600 animate-pulse" />;
      case "rescue":
        return <Users className="w-4 h-4 text-teal-600" />;
      default:
        return <Package className="w-4 h-4 text-amber-600" />;
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">Live Updates</h3>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="Refresh Feed"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-flood-blue' : ''}`} />
          </button>
          <Link
            to="/notifications"
            className="text-xs font-semibold text-flood-blue hover:text-flood-hover transition-colors"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1">
        {updates.map((item) => (
          <div key={item.id} className="flex items-start gap-3.5 group">
            {/* Icon avatar */}
            <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${item.iconBg}`}>
              {getIcon(item.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-400">{item.time}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-1.5 py-0.2 rounded">
                  {item.district}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-800 mt-0.5 leading-snug group-hover:text-flood-blue transition-colors">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
