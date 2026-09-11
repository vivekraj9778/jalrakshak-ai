import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  AlertTriangle, 
  Layers, 
  BarChart3, 
  Bell, 
  User, 
  LogOut,
  X
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export const Sidebar = ({ isMobile = false, onClose }) => {
  const { emergencies, unreadNotifCount, addToast } = useApp();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const pendingSOSCount = emergencies.filter(e => e.status === "Pending").length;

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/map", label: "Live Map", icon: MapIcon },
    { to: "/emergency", label: "SOS Requests", icon: AlertTriangle, badge: pendingSOSCount > 0 ? pendingSOSCount : null, badgeColor: "bg-red-500" },
    { to: "/resources", label: "Resources", icon: Layers },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/notifications", label: "Notifications", icon: Bell, badge: unreadNotifCount > 0 ? unreadNotifCount : null, badgeColor: "bg-flood-blue" },
    { to: "/profile", label: "Profile", icon: User },
  ];

 const handleLogout = async () => {
  try {
    await logout();

    addToast(
      "Logged out successfully.",
      "info"
    );

    setShowLogoutConfirm(false);

    navigate("/login", {
      replace: true,
    });
  } catch (error) {
    console.error(
      "Logout failed:",
      error
    );

    setShowLogoutConfirm(false);

    navigate("/login", {
      replace: true,
    });
  }
};

  return (
    <aside className="w-64 bg-navy-900 text-slate-300 flex flex-col h-full select-none border-r border-navy-850">
      {/* Brand Header with Custom JalRakshak Logo */}
      <div className="p-5 flex items-center justify-between border-b border-navy-850/60">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="JalRakshak AI" 
              className="w-full h-full object-contain rounded-lg" 
            />
          </div>
          <div>
            <h1 className="font-black text-lg text-white tracking-tight flex items-center gap-1.5">
              JalRakshak <span className="text-xs bg-flood-blue/40 text-flood-glow px-1.5 py-0.5 rounded font-mono">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Bihar Flood Command</p>
          </div>
        </NavLink>

        {isMobile && (
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation list */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => isMobile && onClose && onClose()}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-flood-blue text-white shadow-glow-blue font-bold"
                    : "text-slate-300 hover:bg-navy-850 hover:text-white"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full text-white font-bold ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Logout */}
      <div className="p-4 border-t border-navy-850/60">
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-slate-900">
            <h4 className="text-lg font-bold">Exit Command Center?</h4>
            <p className="text-sm text-slate-500 mt-2">
              You will return to the public landing page. Your active local changes are safely persisted.
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-700 text-white shadow"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
