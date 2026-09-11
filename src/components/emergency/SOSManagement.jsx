import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { RiskBadge } from "../common/RiskBadge";
import { Modal } from "../common/Modal";
import {
  Search,
  Filter,
  ShieldAlert,
  CheckCircle2,
  LifeBuoy,
  Clock,
  ArrowRight,
  UserCheck,
  Eye,
} from "lucide-react";
import confetti from "canvas-confetti";

// =====================================================
// CALCULATE DISTANCE BETWEEN SOS LOCATION AND RESCUE BASE
// =====================================================

const calculateDistance = (coords) => {
  // Check coordinates
  if (
    !Array.isArray(coords) ||
    coords.length !== 2 ||
    coords[0] === undefined ||
    coords[1] === undefined
  ) {
    return null;
  }

  const lat = Number(coords[0]);
  const lon = Number(coords[1]);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }

  // ===================================================
  // RESCUE BOAT / COMMAND BASE LOCATION
  // Patna, Bihar
  // ===================================================

  const boatLat = 25.5941;
  const boatLon = 85.1376;

  // Earth radius in kilometers
  const R = 6371;

  const lat1 = (boatLat * Math.PI) / 180;
  const lat2 = (lat * Math.PI) / 180;

  const dLat =
    ((lat - boatLat) * Math.PI) / 180;

  const dLon =
    ((lon - boatLon) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  const distance = R * c;

  return distance.toFixed(1);
};

// =====================================================
// FORMAT DISTANCE
// =====================================================

const getDistanceText = (coords) => {
  const distance = calculateDistance(coords);

  if (distance === null) {
    return "Distance unavailable";
  }

  return `${distance} km away`;
};

// =====================================================
// SOS MANAGEMENT COMPONENT
// =====================================================

export const SOSManagement = () => {
  const {
    emergencies,
    handleUpdateSOSStatus,
    addToast,
  } = useApp();

  const [filterPriority, setFilterPriority] =
    useState("All");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedSOS, setSelectedSOS] =
    useState(null);

  const [assignTeamInput, setAssignTeamInput] =
    useState("");

  // ===================================================
  // FILTER SOS REQUESTS
  // ===================================================

  const filtered = emergencies.filter((item) => {
    if (
      filterPriority !== "All" &&
      item.priority !== filterPriority &&
      item.status !== filterPriority
    ) {
      return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();

      return (
        item.id
          .toLowerCase()
          .includes(q) ||
        item.name
          .toLowerCase()
          .includes(q) ||
        item.location
          .toLowerCase()
          .includes(q) ||
        item.district
          .toLowerCase()
          .includes(q)
      );
    }

    return true;
  });

  // ===================================================
  // CHANGE STATUS
  // ===================================================

  const handleStatusChange = (
    id,
    newStatus
  ) => {
    handleUpdateSOSStatus(
      id,
      newStatus
    );

    if (newStatus === "Resolved") {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: {
          y: 0.7,
        },
      });
    }
  };

  // ===================================================
  // ASSIGN RESCUE TEAM
  // ===================================================

  const handleAssignTeam = (id) => {
    if (!assignTeamInput.trim()) {
      return;
    }

    const teamName =
      assignTeamInput.trim();

    handleUpdateSOSStatus(
      id,
      "Assigned",
      teamName
    );

    setAssignTeamInput("");

    if (selectedSOS) {
      setSelectedSOS((prev) => ({
        ...prev,
        assignedTeam: teamName,
        status: "Assigned",
      }));
    }

    addToast(
      `Assigned ${teamName} to SOS #${id}`,
      "success"
    );
  };

  // ===================================================
  // UI
  // ===================================================

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card mt-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">

        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">

            <span>
              Incident Command SOS Queue
            </span>

            <span className="text-xs bg-red-100 text-red-700 font-extrabold px-2.5 py-0.5 rounded-full">
              {
                emergencies.filter(
                  (e) =>
                    e.status !== "Resolved"
                ).length
              }{" "}
              Active
            </span>

          </h3>

          <p className="text-xs text-slate-500 mt-0.5">
            Real-time triage, team assignment,
            and rescue progress monitoring
          </p>
        </div>

        {/* =================================================
            FILTER + SEARCH
        ================================================= */}

        <div className="flex flex-wrap items-center gap-3">

          <div className="relative">

            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search ID, person, district..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="bg-slate-50 border border-slate-200 text-xs rounded-xl pl-8 pr-3 py-2 outline-none focus:border-flood-blue w-48 sm:w-56"
            />

          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">

            {[
              "All",
              "Critical",
              "High",
              "Resolved",
            ].map((p) => (
              <button
                key={p}
                onClick={() =>
                  setFilterPriority(p)
                }
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filterPriority === p
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {p}
              </button>
            ))}

          </div>

        </div>
      </div>

      {/* =================================================
          SOS TABLE
      ================================================= */}

      <div className="overflow-x-auto mt-4">

        <table className="w-full text-left text-xs">

          <thead>

            <tr className="text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100">

              <th className="py-3 px-3">
                Ticket ID
              </th>

              <th className="py-3 px-3">
                Person / Caller
              </th>

              <th className="py-3 px-3">
                Location
              </th>

              <th className="py-3 px-3">
                People Trapped
              </th>

              <th className="py-3 px-3">
                Priority
              </th>

              <th className="py-3 px-3">
                Assigned Unit
              </th>

              <th className="py-3 px-3">
                Status
              </th>

              <th className="py-3 px-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100 font-medium">

            {filtered.map((sos) => (

              <tr
                key={sos.id}
                className="hover:bg-slate-50 transition-colors"
              >

                {/* TICKET ID */}

                <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                  {sos.id}
                </td>

                {/* PERSON */}

                <td className="py-3.5 px-3">

                  <span className="font-bold text-slate-900 block">
                    {sos.name}
                  </span>

                  <span className="text-[11px] text-slate-500">
                    {sos.phone}
                  </span>

                </td>

                {/* LOCATION */}

                <td className="py-3.5 px-3 max-w-[180px]">

                  <span className="font-bold text-slate-800 truncate block">
                    {sos.location}
                  </span>

                  <span className="text-[10px] text-slate-400">
                    {sos.district}
                  </span>

                </td>

                {/* PEOPLE */}

                <td className="py-3.5 px-3">

                  <span className="font-extrabold text-slate-900 text-sm">
                    {sos.peopleCount}
                  </span>

                  <span className="text-[10px] text-slate-500 block">
                    people
                  </span>

                </td>

                {/* PRIORITY */}

                <td className="py-3.5 px-3">

                  <RiskBadge
                    level={sos.priority}
                    size="sm"
                  />

                </td>

                {/* ASSIGNED UNIT + REAL DISTANCE */}

                <td className="py-3.5 px-3">

                  <span className="font-semibold text-slate-700 block">
                    {sos.assignedTeam}
                  </span>

                  <span className="text-[10px] text-slate-400">
                    {getDistanceText(
                      sos.coords
                    )}
                  </span>

                </td>

                {/* STATUS */}

                <td className="py-3.5 px-3">

                  <select
                    value={sos.status}
                    onChange={(e) =>
                      handleStatusChange(
                        sos.id,
                        e.target.value
                      )
                    }
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
                      sos.status ===
                      "Resolved"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : sos.status ===
                          "Rescue In Progress"
                        ? "bg-blue-50 text-flood-blue border-blue-200"
                        : sos.status ===
                          "Assigned"
                        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Assigned">
                      Assigned
                    </option>

                    <option value="Rescue In Progress">
                      Rescue In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                  </select>

                </td>

                {/* ACTION */}

                <td className="py-3.5 px-3 text-center">

                  <button
                    onClick={() =>
                      setSelectedSOS(sos)
                    }
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    title="View full details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* =================================================
          SOS DETAILS MODAL
      ================================================= */}

      {selectedSOS && (

        <Modal
          isOpen={true}
          onClose={() =>
            setSelectedSOS(null)
          }
          title={`SOS Ticket #${selectedSOS.id}`}
          subtitle={`Reported ${selectedSOS.createdAt} from ${selectedSOS.district}`}
        >

          <div className="space-y-4 text-xs">

            {/* BASIC INFORMATION */}

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">

              <div>
                <span className="text-slate-500 block">
                  Caller Name
                </span>

                <span className="font-bold text-slate-900 text-sm">
                  {selectedSOS.name}
                </span>
              </div>

              <div>

                <span className="text-slate-500 block">
                  Contact Phone
                </span>

                <a
                  href={`tel:${selectedSOS.phone}`}
                  className="font-bold text-flood-blue text-sm"
                >
                  {selectedSOS.phone}
                </a>

              </div>

              <div className="col-span-2">

                <span className="text-slate-500 block">
                  Full Location
                </span>

                <span className="font-bold text-slate-900">
                  {selectedSOS.location}
                </span>

              </div>

            </div>

            {/* DETAILS */}

            <div>

              <span className="text-slate-500 block font-semibold mb-1">
                Details & Special Requirements
              </span>

              <p className="p-3 bg-slate-50 rounded-xl text-slate-800 leading-relaxed font-medium">
                {selectedSOS.details ||
                  "No extra details provided."}
              </p>

            </div>

            {/* PHOTO */}

            {selectedSOS.photoUrl && (

              <div>

                <span className="text-slate-500 block font-semibold mb-1">
                  Attached Situation Photo
                </span>

                <img
                  src={selectedSOS.photoUrl}
                  alt="Flood scene"
                  className="w-full h-48 object-cover rounded-xl border border-slate-200"
                />

              </div>

            )}

            {/* QUICK DISPATCH */}

            <div className="pt-3 border-t border-slate-100">

              <label className="block font-bold text-slate-800 mb-1">
                Assign Rescue Unit
              </label>

              <div className="flex gap-2">

                <input
                  type="text"
                  placeholder="e.g. NDRF Motorboat 05, SDRF Raft..."
                  value={assignTeamInput}
                  onChange={(e) =>
                    setAssignTeamInput(
                      e.target.value
                    )
                  }
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-flood-blue"
                />

                <button
                  onClick={() =>
                    handleAssignTeam(
                      selectedSOS.id
                    )
                  }
                  className="px-4 py-2 bg-flood-blue hover:bg-flood-hover text-white font-bold rounded-xl"
                >
                  Assign Unit
                </button>

              </div>

            </div>

          </div>

        </Modal>

      )}

    </div>
  );
};