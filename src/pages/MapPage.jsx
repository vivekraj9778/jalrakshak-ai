import React from "react";
import { MapView } from "../components/map/MapView";

export const MapPage = () => {
  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Interactive Live Flood Map</h1>
          <p className="text-xs text-slate-500">Real-time GIS geospatial layer of North Bihar flood inundation, rescue boats, and active SOS calls</p>
        </div>
      </div>
      <MapView />
    </div>
  );
};
