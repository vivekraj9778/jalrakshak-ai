import React from "react";
import { Search, X } from "lucide-react";

export const SearchBar = ({ value, onChange, onClear, placeholder = "Search district, location...", className = "" }) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl pl-10 pr-9 py-2 outline-none transition-all placeholder:text-slate-400"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
