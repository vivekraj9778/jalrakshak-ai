import React from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let icon = <Info className="w-5 h-5 text-flood-blue" />;
        let borderClass = "border-blue-200 bg-white text-slate-800";

        if (toast.type === "success") {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
          borderClass = "border-emerald-200 bg-emerald-50/95 text-emerald-900";
        } else if (toast.type === "emergency" || toast.type === "error") {
          icon = <AlertCircle className="w-5 h-5 text-red-600 animate-pulse" />;
          borderClass = "border-red-300 bg-red-50/95 text-red-900 shadow-glow-red";
        } else if (toast.type === "warning") {
          icon = <AlertTriangle className="w-5 h-5 text-amber-600" />;
          borderClass = "border-amber-200 bg-amber-50/95 text-amber-900";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur transition-all duration-300 transform translate-y-0 ${borderClass}`}
          >
            <div className="flex-shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 text-sm font-medium leading-snug">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
