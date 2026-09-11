import React, { useState } from "react";
import { StatCard } from "../components/common/StatCard";
import { DistrictRiskMap } from "../components/dashboard/DistrictRiskMap";
import { LiveUpdates } from "../components/dashboard/LiveUpdates";
import { EmergencyPriority } from "../components/dashboard/EmergencyPriority";
import { SystemStatus } from "../components/dashboard/SystemStatus";
import { useOutletContext } from "react-router-dom";
import { useApp } from "../context/AppContext";

export const DashboardPage = () => {
  const { globalSearch } = useOutletContext() || {};
  const { dashboardStats } = useApp();

  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Safe fallback while dashboard data is loading
  const stats = dashboardStats || {
    affectedPeople: 0,
    activeSOS: 0,
    rescueTeamsDeployed: 0,
    reliefCenters: 0,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">

      {/* Title & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Flood Response Dashboard
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time overview of flood conditions, emergencies and available resources.
          </p>
        </div>

        {/* System Live */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold w-fit">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Live</span>
        </div>
      </div>

      {/* 4 Dashboard Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        <StatCard
          title="Flood Affected People"
          value={Number(stats.affectedPeople || 0).toLocaleString()}
          change="Live from database"
          trend="up"
          icon="Users"
        />

        <StatCard
          title="Active SOS Requests"
          value={Number(stats.activeSOS || 0).toLocaleString()}
          change="Live from database"
          trend="up"
          icon="AlertTriangle"
          isEmergency={true}
        />

        <StatCard
          title="Rescue Teams Deployed"
          value={Number(stats.rescueTeamsDeployed || 0).toLocaleString()}
          change="Live from database"
          trend="up"
          icon="LifeBuoy"
        />

        <StatCard
          title="Relief Centers"
          value={Number(stats.reliefCenters || 0).toLocaleString()}
          change="Live from database"
          trend="up"
          icon="Home"
        />

      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        <div className="lg:col-span-7">
          <DistrictRiskMap
            onSelectDistrict={setSelectedDistrict}
          />
        </div>

        <div className="lg:col-span-5">
          <LiveUpdates />
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        <div className="lg:col-span-7">
          <EmergencyPriority />
        </div>

        <div className="lg:col-span-5">
          <SystemStatus />
        </div>

      </div>

    </div>
  );
};