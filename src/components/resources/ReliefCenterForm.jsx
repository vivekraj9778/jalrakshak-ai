import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Building2,
  MapPin,
  Users,
  Phone,
  PlusCircle,
} from "lucide-react";

export const ReliefCenterForm = () => {
  const { handleCreateReliefCenter, addToast } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    location: "",
    capacity: "",
    contact: "",
    status: "Open",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.district.trim() ||
      !formData.location.trim() ||
      !formData.capacity
    ) {
      addToast("Please fill all required fields", "error");
      return;
    }

    try {
      setLoading(true);

      await handleCreateReliefCenter({
        name: formData.name.trim(),
        district: formData.district.trim(),
        location: formData.location.trim(),
        capacity: Number(formData.capacity),
        contact: formData.contact.trim(),
        status: formData.status,
      });

      setFormData({
        name: "",
        district: "",
        location: "",
        capacity: "",
        contact: "",
        status: "Open",
      });

      addToast(
        "Relief center registered successfully",
        "success"
      );
    } catch (error) {
      console.error(
        "Relief center registration error:",
        error
      );

      addToast(
        "Failed to register relief center",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card mt-8">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-flood-blue flex items-center justify-center">
          <Building2 className="w-5 h-5" />
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-900">
            Register Relief Center
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Add a new relief center to the live emergency
            response network.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Center Name *
            </label>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Patna Relief Center"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm outline-none focus:border-flood-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              District *
            </label>

            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="e.g. Patna"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-flood-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Location *
            </label>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Gandhi Maidan"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm outline-none focus:border-flood-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Capacity *
            </label>

            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="number"
                name="capacity"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm outline-none focus:border-flood-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Contact Number
            </label>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm outline-none focus:border-flood-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-flood-blue"
            >
              <option value="Open">Open</option>
              <option value="Full">Full</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex items-center justify-center gap-2 bg-flood-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          <PlusCircle className="w-4 h-4" />

          {loading
            ? "Registering..."
            : "Register Relief Center"}
        </button>
      </form>
    </div>
  );
};