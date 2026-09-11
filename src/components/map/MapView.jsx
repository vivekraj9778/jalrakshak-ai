import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { useApp } from "../../context/AppContext";
import { mapFacilities, floodedRoads } from "../../data/resources";
import { districtsData } from "../../data/districts";
import { RiskBadge } from "../common/RiskBadge";
import { 
  AlertTriangle, 
  LifeBuoy, 
  Home, 
  HeartPulse, 
  Ship, 
  Layers, 
  Compass, 
  Search,
  Send,
  MapPin,
  X
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Helper component to center map on selection
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center.length === 2) {
      map.flyTo(center, zoom || 11, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
};

// Custom SVG HTML DivIcons
const createCustomIcon = (type, priority = "High") => {
  let bgColor = "#087ED1";
  let iconSvg = "";
  let pulseClass = "";

  if (type === "sos") {
    bgColor = "#EF4444";
    pulseClass = "pulse-marker-sos";
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  } else if (type === "rescue") {
    bgColor = "#087ED1";
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>`;
  } else if (type === "shelter") {
    bgColor = "#10B981";
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
  } else if (type === "medical") {
    bgColor = "#F97316";
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
  } else if (type === "boat") {
    bgColor = "#0EA5E9";
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><line x1="12" y1="2" x2="12" y2="10"/></svg>`;
  } else if (type === "district") {
    bgColor = "#06233D";
    iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
  }

  return L.divIcon({
    className: `custom-map-icon ${pulseClass}`,
    html: `<div style="background-color: ${bgColor}; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 2.5px solid white;">
      ${iconSvg}
    </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -20]
  });
};

export const MapView = () => {
  const { emergencies, handleUpdateSOSStatus, addToast } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Layer toggles
  const [layers, setLayers] = useState({
    floodedAreas: true,
    sosRequests: true,
    rescueTeams: true,
    shelters: true,
    medicalCenters: true,
    boats: true,
    roadStatus: true,
  });

  const [mapType, setMapType] = useState("satellite"); // 'satellite' | 'terrain'
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [mapCenter, setMapCenter] = useState([25.5941, 85.1376]); // Default center Bihar / Patna
  const [mapZoom, setMapZoom] = useState(9);
  const [locationSearch, setLocationSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Check URL query params for initial focus
  useEffect(() => {
    const districtQuery = searchParams.get("district");
    if (districtQuery) {
      const match = districtsData.find(d => d.name.toLowerCase().includes(districtQuery.toLowerCase()));
      if (match) {
        setMapCenter(match.centerCoords);
        setMapZoom(12);
        setLocationSearch(match.name);
      }
    }
  }, [searchParams]);

  // Autocomplete matching districts
  const matchingDistricts = locationSearch.trim()
    ? districtsData.filter(d => d.name.toLowerCase().includes(locationSearch.toLowerCase()))
    : [];

  const handleSelectDistrict = (district) => {
    setLocationSearch(district.name);
    setShowSuggestions(false);
    setMapCenter(district.centerCoords);
    setMapZoom(12);
    addToast(`Focused on ${district.name} (${district.riskLevel} Risk - Water: ${district.waterLevel}m)`, "info");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!locationSearch.trim()) return;

    const match = districtsData.find(d => d.name.toLowerCase().includes(locationSearch.toLowerCase()));
    if (match) {
      handleSelectDistrict(match);
    } else {
      addToast(`District "${locationSearch}" not found. Try searching Patna, Supaul, Katihar, Gaya...`, "warning");
    }
  };

  const handleLocateMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapCenter([pos.coords.latitude, pos.coords.longitude]);
          setMapZoom(13);
          addToast("Centered to your location.", "info");
        },
        () => {
          setMapCenter([25.5941, 85.1376]); // Patna
          setMapZoom(11);
          addToast("Centered to Patna State Disaster EOC.", "info");
        }
      );
    }
  };

  const handleDispatchBoat = (sosId) => {
    handleUpdateSOSStatus(sosId, "Assigned", "NDRF Quick Boat Alpha");
    addToast(`Rescue Boat Alpha assigned to SOS #${sosId}!`, "success");
  };

  const filteredEmergencies = emergencies.filter(e => {
    if (priorityFilter !== "All" && e.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="relative w-full h-[calc(100vh-5.5rem)] rounded-2xl overflow-hidden shadow-card border border-slate-200">
      {/* Top Search & Autocomplete Filter Bar on Map */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col sm:flex-row items-start sm:items-center gap-2 max-w-xl">
        <div className="relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search Patna, Supaul, Katihar, Gaya..."
              value={locationSearch}
              onChange={(e) => {
                setLocationSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-64 sm:w-80 bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-xs sm:text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-flood-blue transition-all"
            />
            {locationSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocationSearch("");
                  setShowSuggestions(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Autocomplete Dropdown List */}
          {showSuggestions && matchingDistricts.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-h-56 overflow-y-auto z-50 animate-scale-up">
              {matchingDistricts.map((d) => (
                <div
                  key={d.id}
                  onClick={() => handleSelectDistrict(d)}
                  className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-slate-100 last:border-none transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-flood-blue" />
                    <span className="font-bold text-xs text-slate-800">{d.name}</span>
                    <span className="text-[10px] text-slate-400">({d.river})</span>
                  </div>
                  <RiskBadge level={d.riskLevel} size="sm" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority Filter Pills */}
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-lg border border-slate-200 text-xs font-bold">
          {["All", "Critical", "High", "Moderate"].map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                priorityFilter === p ? "bg-navy-900 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Locate Me button */}
        <button
          onClick={handleLocateMe}
          className="p-2.5 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 text-slate-700 hover:text-flood-blue transition-colors"
          title="Current GPS Location"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Right Floating Layers Panel matching reference image */}
      <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200 w-52 text-slate-800 text-xs select-none">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 font-bold text-slate-900 text-sm">
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-flood-blue" />
            Layers
          </span>
        </div>

        <div className="space-y-2 font-medium">
          <label className="flex items-center gap-2 cursor-pointer hover:text-flood-blue transition-colors">
            <input
              type="checkbox"
              checked={layers.floodedAreas}
              onChange={() => setLayers(prev => ({ ...prev, floodedAreas: !prev.floodedAreas }))}
              className="w-3.5 h-3.5 rounded text-flood-blue focus:ring-flood-blue cursor-pointer"
            />
            <span>Flooded Areas</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-flood-blue transition-colors">
            <input
              type="checkbox"
              checked={layers.sosRequests}
              onChange={() => setLayers(prev => ({ ...prev, sosRequests: !prev.sosRequests }))}
              className="w-3.5 h-3.5 rounded text-flood-blue focus:ring-flood-blue cursor-pointer"
            />
            <span>SOS Requests</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-flood-blue transition-colors">
            <input
              type="checkbox"
              checked={layers.rescueTeams}
              onChange={() => setLayers(prev => ({ ...prev, rescueTeams: !prev.rescueTeams }))}
              className="w-3.5 h-3.5 rounded text-flood-blue focus:ring-flood-blue cursor-pointer"
            />
            <span>Rescue Teams</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-flood-blue transition-colors">
            <input
              type="checkbox"
              checked={layers.shelters}
              onChange={() => setLayers(prev => ({ ...prev, shelters: !prev.shelters }))}
              className="w-3.5 h-3.5 rounded text-flood-blue focus:ring-flood-blue cursor-pointer"
            />
            <span>Shelters</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-flood-blue transition-colors">
            <input
              type="checkbox"
              checked={layers.medicalCenters}
              onChange={() => setLayers(prev => ({ ...prev, medicalCenters: !prev.medicalCenters }))}
              className="w-3.5 h-3.5 rounded text-flood-blue focus:ring-flood-blue cursor-pointer"
            />
            <span>Medical Centers</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-flood-blue transition-colors">
            <input
              type="checkbox"
              checked={layers.boats}
              onChange={() => setLayers(prev => ({ ...prev, boats: !prev.boats }))}
              className="w-3.5 h-3.5 rounded text-flood-blue focus:ring-flood-blue cursor-pointer"
            />
            <span>Boats</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-flood-blue transition-colors">
            <input
              type="checkbox"
              checked={layers.roadStatus}
              onChange={() => setLayers(prev => ({ ...prev, roadStatus: !prev.roadStatus }))}
              className="w-3.5 h-3.5 rounded text-flood-blue focus:ring-flood-blue cursor-pointer"
            />
            <span>Road Status</span>
          </label>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100">
          <span className="block font-bold text-slate-700 mb-2">Map Type</span>
          <div className="space-y-1.5 font-medium">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mapType"
                value="satellite"
                checked={mapType === "satellite"}
                onChange={() => setMapType("satellite")}
                className="text-flood-blue focus:ring-flood-blue"
              />
              <span>Satellite</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mapType"
                value="terrain"
                checked={mapType === "terrain"}
                onChange={() => setMapType("terrain")}
                className="text-flood-blue focus:ring-flood-blue"
              />
              <span>Terrain</span>
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Left Legend */}
      <div className="absolute bottom-6 left-4 z-[400] bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-slate-200 text-xs hidden md:flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="font-semibold text-slate-700">SOS</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600" />
          <span className="font-semibold text-slate-700">Rescue Team</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-700">Shelter</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="font-semibold text-slate-700">Medical / Boat</span>
        </div>
      </div>

      {/* The Interactive Map */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <MapController center={mapCenter} zoom={mapZoom} />

        {/* Tile Layers based on selection */}
        {mapType === "satellite" ? (
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={18}
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
        )}

        {/* District Center Markers */}
        {districtsData.map(dist => (
          <Marker
            key={dist.id}
            position={dist.centerCoords}
            icon={createCustomIcon("district")}
          >
            <Popup>
              <div className="p-2.5 text-xs min-w-[190px]">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-black text-sm text-slate-900">{dist.name}</h4>
                  <RiskBadge level={dist.riskLevel} size="sm" />
                </div>
                <div className="mt-2 space-y-1 text-slate-600">
                  <p>River Basin: <strong>{dist.river}</strong></p>
                  <p>Water Level: <strong className={dist.waterLevel > dist.dangerMark ? 'text-red-600' : 'text-slate-800'}>{dist.waterLevel}m</strong> (Danger: {dist.dangerMark}m)</p>
                  <p>Active SOS Calls: <strong className="text-red-600">{dist.activeSOS}</strong></p>
                  <p>Nearby Teams: <strong>{dist.rescueTeams} teams</strong></p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Flooded Roads */}
        {layers.roadStatus && floodedRoads.map(road => (
          <Polyline
            key={road.id}
            positions={road.coords}
            pathOptions={{
              color: road.passable ? "#EAB308" : "#EF4444",
              weight: 4,
              dashArray: road.passable ? "6 6" : undefined
            }}
          >
            <Popup>
              <div className="p-2 text-xs">
                <p className="font-bold text-slate-900">{road.name}</p>
                <p className={`font-semibold mt-1 ${road.passable ? 'text-amber-600' : 'text-red-600'}`}>
                  {road.status}
                </p>
              </div>
            </Popup>
          </Polyline>
        ))}

        {/* SOS Request Markers (Red) matching reference image */}
        {layers.sosRequests && filteredEmergencies.map(sos => (
          <Marker
            key={sos.id}
            position={sos.coords}
            icon={createCustomIcon("sos", sos.priority)}
          >
            <Popup className="custom-sos-popup">
              <div className="p-3 min-w-[210px] text-slate-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <h4 className="font-black text-sm text-slate-900">SOS Request</h4>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="font-bold text-red-600">{sos.peopleCount} people trapped</p>
                  <p className="text-slate-700 font-medium">{sos.location}</p>
                  <p className="text-slate-500 text-[11px]">{sos.distanceFromBoat} from nearest boat</p>
                </div>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold bg-red-500 text-white px-2 py-0.5 rounded">
                    {sos.priority} Priority
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    sos.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {sos.status}
                  </span>
                </div>

                {sos.status !== "Resolved" && (
                  <button
                    onClick={() => handleDispatchBoat(sos.id)}
                    className="mt-3 w-full py-1.5 rounded-lg bg-flood-blue hover:bg-flood-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Rescue Boat</span>
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Rescue Teams (Blue) */}
        {layers.rescueTeams && mapFacilities.filter(f => f.type === "Rescue Team").map(team => (
          <Marker
            key={team.id}
            position={team.coords}
            icon={createCustomIcon("rescue")}
          >
            <Popup>
              <div className="p-2.5 text-xs min-w-[190px]">
                <div className="flex items-center gap-1.5 text-flood-blue font-bold">
                  <LifeBuoy className="w-4 h-4" />
                  <span>{team.name}</span>
                </div>
                <p className="text-slate-600 mt-1">Personnel: <strong>{team.personnel} responders</strong></p>
                <p className="text-slate-500 text-[11px] mt-0.5">{team.equipment}</p>
                <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
                  <span className="font-semibold text-slate-700">{team.contact}</span>
                  <span className="bg-blue-50 text-flood-blue px-1.5 py-0.5 rounded font-bold">{team.status}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Shelters (Green) */}
        {layers.shelters && mapFacilities.filter(f => f.type === "Shelter").map(sh => (
          <Marker
            key={sh.id}
            position={sh.coords}
            icon={createCustomIcon("shelter")}
          >
            <Popup>
              <div className="p-2.5 text-xs min-w-[200px]">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <Home className="w-4 h-4" />
                  <span>{sh.name}</span>
                </div>
                <div className="mt-2 space-y-1 text-slate-600">
                  <p>Capacity: <strong>{sh.capacity}</strong></p>
                  <p>Occupied: <span className="font-bold text-amber-600">{sh.occupied}</span></p>
                  <p className="text-[11px] text-slate-500">Ration Supplies: {sh.foodAvailable}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
                  <span className="text-slate-600">{sh.contact}</span>
                  <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold">Open</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Medical Centers (Orange) */}
        {layers.medicalCenters && mapFacilities.filter(f => f.type === "Medical Center").map(med => (
          <Marker
            key={med.id}
            position={med.coords}
            icon={createCustomIcon("medical")}
          >
            <Popup>
              <div className="p-2.5 text-xs min-w-[200px]">
                <div className="flex items-center gap-1.5 text-orange-600 font-bold">
                  <HeartPulse className="w-4 h-4" />
                  <span>{med.name}</span>
                </div>
                <p className="text-slate-600 mt-1.5">Staff: <strong>{med.doctors} Trauma Doctors</strong></p>
                <p className="text-[11px] text-slate-500 mt-0.5">{med.supplies}</p>
                <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
                  <span className="text-slate-600">{med.contact}</span>
                  <span className="bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded font-bold">24/7 Ward</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Boats (Teal/Blue) */}
        {layers.boats && mapFacilities.filter(f => f.type === "Boat").map(boat => (
          <Marker
            key={boat.id}
            position={boat.coords}
            icon={createCustomIcon("boat")}
          >
            <Popup>
              <div className="p-2.5 text-xs min-w-[190px]">
                <div className="flex items-center gap-1.5 text-cyan-600 font-bold">
                  <Ship className="w-4 h-4" />
                  <span>{boat.name}</span>
                </div>
                <p className="text-slate-600 mt-1">Capacity: <strong>{boat.capacity}</strong></p>
                <p className="text-slate-500 text-[11px]">Speed: {boat.speed}</p>
                <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-700">{boat.nearestSOS}</span>
                  <span className="bg-cyan-50 text-cyan-700 px-1.5 py-0.5 rounded font-bold">{boat.status}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
