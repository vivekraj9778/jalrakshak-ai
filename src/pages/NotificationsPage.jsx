import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Bell,
  AlertTriangle,
  CheckCheck,
  Trash2,
  ShieldAlert,
  CloudRain,
  Cpu,
  LifeBuoy,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotificationsPage = () => {
  const {
    notifications,
    handleMarkNotifRead,
    handleMarkAllNotifsRead,
    handleDeleteNotif,
    unreadNotifCount,
  } = useApp();

  const [activeCategory, setActiveCategory] =
    useState("All");

  const navigate = useNavigate();

  const categories = [
    "All",
    "Critical",
    "Emergency",
    "Resource",
    "Weather",
    "System",
  ];

  // ==========================================
  // FILTER NOTIFICATIONS
  // ==========================================

  const filtered = notifications.filter((notification) => {
    if (activeCategory === "All") {
      return true;
    }

    return (
      notification.category === activeCategory
    );
  });

  // ==========================================
  // CATEGORY ICON
  // ==========================================

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Critical":
        return (
          <AlertTriangle className="w-5 h-5 text-red-600" />
        );

      case "Emergency":
        return (
          <ShieldAlert className="w-5 h-5 text-red-500" />
        );

      case "Weather":
        return (
          <CloudRain className="w-5 h-5 text-blue-500" />
        );

      case "Resource":
        return (
          <LifeBuoy className="w-5 h-5 text-emerald-600" />
        );

      case "System":
        return (
          <Cpu className="w-5 h-5 text-indigo-500" />
        );

      default:
        return (
          <Bell className="w-5 h-5 text-slate-500" />
        );
    }
  };

  // ==========================================
  // TAKE ACTION
  // ==========================================

  const handleTakeAction = async (notification) => {
    try {
      // Mark notification as read first
      if (notification.unread) {
        await handleMarkNotifRead(notification.id);
      }

      // Make sure an action URL exists
      if (!notification.actionUrl) {
        console.warn(
          "No action URL for notification:",
          notification
        );
        return;
      }

      console.log(
        "Taking action:",
        notification.title,
        "→",
        notification.actionUrl
      );

      // Navigate to the required page
      navigate(notification.actionUrl);
    } catch (error) {
      console.error(
        "Take Action failed:",
        error
      );
    }
  };

  // ==========================================
  // CATEGORY BADGE
  // ==========================================

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "Critical":
        return "bg-red-100 text-red-700";

      case "Emergency":
        return "bg-orange-100 text-orange-700";

      case "Weather":
        return "bg-blue-100 text-blue-700";

      case "Resource":
        return "bg-emerald-100 text-emerald-700";

      case "System":
        return "bg-indigo-100 text-indigo-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>Notification Center</span>

            {unreadNotifCount > 0 && (
              <span className="text-xs bg-flood-blue text-white font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                {unreadNotifCount} Unread
              </span>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time hydrological alarms, emergency SOS
            alerts, and resource dispatches
          </p>
        </div>

        <button
          type="button"
          onClick={handleMarkAllNotifsRead}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-bold shadow-xs transition-colors"
        >
          <CheckCheck className="w-4 h-4 text-flood-blue" />

          <span>Mark All as Read</span>
        </button>
      </div>

      {/* ==========================================
          CATEGORY FILTER
      ========================================== */}

      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() =>
              setActiveCategory(category)
            }
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === category
                ? "bg-navy-900 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ==========================================
          NOTIFICATIONS LIST
      ========================================== */}

      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-card divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-40" />

            <p className="text-sm font-semibold">
              No notifications found in this category.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors rounded-2xl ${
                item.unread
                  ? "bg-blue-50/40"
                  : "hover:bg-slate-50"
              }`}
            >
              {/* ==========================================
                  ICON
              ========================================== */}

              <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm flex-shrink-0">
                {getCategoryIcon(item.category)}
              </div>

              {/* ==========================================
                  CONTENT
              ========================================== */}

              <div className="flex-1 min-w-0">
                {/* TOP ROW */}

                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${getCategoryBadgeClass(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>

                  {item.district && (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.district}
                    </span>
                  )}

                  <span className="text-[11px] text-slate-400 ml-auto">
                    {item.timestamp}
                  </span>
                </div>

                {/* TITLE */}

                <h4 className="font-extrabold text-sm text-slate-900 mt-1">
                  {item.title}
                </h4>

                {/* MESSAGE */}

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.message}
                </p>

                {/* ==========================================
                    ACTIONS
                ========================================== */}

                <div className="mt-3 flex items-center gap-3">
                  {/* TAKE ACTION */}

                  {item.actionUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        handleTakeAction(item)
                      }
                      className="inline-flex items-center gap-1 text-xs font-bold text-flood-blue hover:text-blue-700 hover:underline transition-colors cursor-pointer"
                    >
                      <span>Take Action</span>

                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}

                  {/* MARK AS READ */}

                  {item.unread && (
                    <button
                      type="button"
                      onClick={() =>
                        handleMarkNotifRead(item.id)
                      }
                      className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
                    >
                      Mark as read
                    </button>
                  )}

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteNotif(item.id)
                    }
                    className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 font-semibold ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />

                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};