import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ShieldAlert,
  Map,
  Bell,
  LifeBuoy,
  LogOut,
  User,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export const UserDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

          <Link
            to="/user-dashboard"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-white rounded-xl shadow border p-1">
              <img
                src="/logo.png"
                alt="JalRakshak AI"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h1 className="font-black text-slate-900">
                JalRakshak AI
              </h1>

              <p className="text-[10px] text-slate-400">
                Citizen Emergency Portal
              </p>
            </div>
          </Link>

          {/* USER + LOGOUT */}
          <div className="flex items-center gap-3">

            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-900">
                {user?.name || "Citizen"}
              </p>

              <p className="text-[10px] text-slate-400">
                Citizen
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* WELCOME */}
        <div className="mb-8">

          <p className="text-sm text-flood-blue font-bold">
            Welcome back
          </p>

          <h2 className="text-3xl font-black text-slate-900 mt-1">
            {user?.name || "Citizen"}
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Report emergencies and access flood response services.
          </p>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* SOS */}
          <Link
            to="/user-emergency"
            className="group bg-red-600 hover:bg-red-700 text-white rounded-3xl p-7 shadow-xl transition-all"
          >
            <ShieldAlert className="w-10 h-10 mb-5" />

            <h3 className="text-2xl font-black">
              Send SOS
            </h3>

            <p className="text-sm text-red-100 mt-2">
              Report a flood emergency, share your location and
              request rescue assistance.
            </p>

            <span className="inline-block mt-6 font-bold text-sm">
              Report Emergency →
            </span>
          </Link>

          {/* MAP */}
          <Link
            to="/user-map"
            className="bg-white hover:bg-blue-50 rounded-3xl p-7 border border-slate-200 shadow-sm transition-all"
          >
            <Map className="w-9 h-9 text-flood-blue mb-5" />

            <h3 className="text-xl font-black text-slate-900">
              Live Flood Map
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              View flood-prone areas and response locations.
            </p>
          </Link>

          {/* NOTIFICATIONS */}
          <Link
            to="/user-notifications"
            className="bg-white hover:bg-blue-50 rounded-3xl p-7 border border-slate-200 shadow-sm transition-all"
          >
            <Bell className="w-9 h-9 text-flood-blue mb-5" />

            <h3 className="text-xl font-black text-slate-900">
              Flood Alerts
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              View important emergency and weather notifications.
            </p>
          </Link>

          {/* PROFILE */}
          <Link
            to="/profile"
            className="bg-white hover:bg-blue-50 rounded-3xl p-7 border border-slate-200 shadow-sm transition-all"
          >
            <User className="w-9 h-9 text-flood-blue mb-5" />

            <h3 className="text-xl font-black text-slate-900">
              My Profile
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Manage your account details.
            </p>
          </Link>

        </div>

        {/* EMERGENCY ASSISTANCE */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-3">

          <LifeBuoy className="w-5 h-5 text-flood-blue flex-shrink-0" />

          <div>

            <p className="text-sm font-bold text-slate-900">
              Emergency Assistance
            </p>

            <p className="text-xs text-slate-600 mt-1">
              If you are in immediate danger, use the SOS button
              and allow location access when prompted.
            </p>

          </div>

        </div>

      </main>
    </div>
  );
};