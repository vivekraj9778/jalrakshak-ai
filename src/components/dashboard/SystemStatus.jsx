import React, { useState } from "react";
import { systemStatusData } from "../../data/dashboardData";
import { CheckCircle2, ShieldCheck, RefreshCw, Cpu } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const SystemStatus = () => {
  const { addToast } = useApp();
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("2 minutes ago");

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSync("Just now");
      addToast("Central telemetry and river telemetry re-synchronized.", "success");
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">System Status</h3>
            <p className="text-[11px] text-slate-500">Telemetry & relay pipelines</p>
          </div>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin text-flood-blue' : ''}`} />
          <span>{syncing ? 'Syncing...' : 'Sync'}</span>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {systemStatusData.map((item) => (
          <div
            key={item.name}
            className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-slate-800">{item.name}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50">
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                {item.status}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{item.ping}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Last synchronized: <strong className="text-slate-600">{lastSync}</strong></span>
        <span className="text-emerald-600 font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> 100% Uptime
        </span>
      </div>
    </div>
  );
};
