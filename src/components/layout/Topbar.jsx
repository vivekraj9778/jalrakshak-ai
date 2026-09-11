import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, ChevronDown, ShieldCheck, User, LogOut, MapPin, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { districtsData } from "../../data/districts";
import { RiskBadge } from "../common/RiskBadge";

export const Topbar = () => {
  const { userProfile, unreadNotifCount, notifications, handleMarkNotifRead, setMobileMenuOpen } = useApp();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const navigate = useNavigate();

  const matchingDistricts = searchQuery.trim()
    ? districtsData.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSelectDistrict = (d) => {
    setSearchQuery("");
    setShowSearchSuggestions(false);
    navigate(`/map?district=${d.name}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = districtsData.find(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (match) {
      handleSelectDistrict(match);
    } else {
      navigate(`/map`);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3 flex items-center justify-between gap-4 transition-all">
      {/* Left: Mobile hamburger + search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search District / Location with Autocomplete */}
        <div className="relative w-full max-w-md">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Patna, Supaul, Katihar, Gaya..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchSuggestions(true);
              }}
              onFocus={() => setShowSearchSuggestions(true)}
              className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl pl-10 pr-8 py-2 outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchSuggestions(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Autocomplete Dropdown */}
          {showSearchSuggestions && matchingDistricts.length > 0 && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowSearchSuggestions(false)} 
              />
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-h-60 overflow-y-auto z-50 animate-scale-up">
                <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                  Districts ({matchingDistricts.length})
                </div>
                {matchingDistricts.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => handleSelectDistrict(d)}
                    className="px-3.5 py-2 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-slate-100 last:border-none transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-flood-blue" />
                      <div>
                        <span className="font-bold text-xs text-slate-800">{d.name}</span>
                        <span className="text-[10px] text-slate-400 block">{d.river}</span>
                      </div>
                    </div>
                    <RiskBadge level={d.riskLevel} size="sm" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* System Health Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>All systems operational</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifDropdown(!notifDropdown)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Quick Notifications Dropdown */}
          {notifDropdown && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setNotifDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-scale-up">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">Alerts & Updates</span>
                    {unreadNotifCount > 0 && (
                      <span className="bg-flood-blue text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                        {unreadNotifCount}
                      </span>
                    )}
                  </div>
                  <Link
                    to="/notifications"
                    onClick={() => setNotifDropdown(false)}
                    className="text-xs text-flood-blue font-semibold hover:underline"
                  >
                    View All
                  </Link>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.slice(0, 4).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        handleMarkNotifRead(notif.id);
                        if (notif.actionUrl) {
                          setNotifDropdown(false);
                          navigate(notif.actionUrl);
                        }
                      }}
                      className={`p-3.5 cursor-pointer transition-colors ${
                        notif.unread ? "bg-blue-50/40 hover:bg-blue-50/80" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900">{notif.title}</span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-full hover:bg-slate-100 transition-all border border-slate-200/80"
          >
            <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden">
              <img src="/logo.png" alt="Commander" className="w-full h-full object-cover p-0.5" onError={(e) => { e.target.style.display = 'none'; }} />
              <span className="hidden">A</span>
            </div>
            <span className="text-xs font-bold text-slate-800 hidden sm:inline-block">
              {userProfile.name.split(" ")[0]} ({userProfile.badge || "Admin"})
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileDropdown && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setProfileDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 p-2 text-slate-700 animate-scale-up">
                <div className="px-3 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900 truncate">{userProfile.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{userProfile.role}</p>
                </div>

                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    Profile & Settings
                  </Link>
                  <Link
                    to="/notifications"
                    onClick={() => setProfileDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <Bell className="w-4 h-4 text-slate-500" />
                    Alert Preferences
                  </Link>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <Link
                    to="/"
                    onClick={() => setProfileDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    Return to Public Home
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
