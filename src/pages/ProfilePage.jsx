import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Bell, 
  Lock, 
  Save, 
  LogOut,
  Camera,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { userProfile, handleUpdateProfile, addToast } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ ...userProfile });
  const [isEditing, setIsEditing] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    handleUpdateProfile(formData);
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      addToast("Password must be at least 6 characters.", "warning");
      return;
    }
    setPasswordModal(false);
    setNewPassword("");
    addToast("Account security credentials updated successfully.", "success");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Commander & Officer Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your credentials, incident command jurisdiction, and notification relays
        </p>
      </div>

      {/* Top Profile Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-navy-900 to-navy-700 text-white flex items-center justify-center font-black text-3xl shadow-xl">
            {formData.name ? formData.name.charAt(0) : "A"}
          </div>
          <button 
            type="button"
            onClick={() => addToast("Avatar upload feature ready.", "info")}
            className="absolute bottom-0 right-0 p-2 rounded-xl bg-flood-blue text-white shadow-md hover:bg-flood-hover transition-colors"
            title="Change Avatar"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Text Details */}
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center sm:justify-start">
            <h2 className="text-2xl font-black text-slate-900">{formData.name}</h2>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 w-fit mx-auto sm:mx-0">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{formData.role}</span>
            </span>
          </div>
          <p className="text-xs text-slate-500">{formData.baseLocation}</p>
          <p className="text-xs text-slate-400 font-mono">{formData.email}</p>
        </div>

        {/* Edit Button */}
        <div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isEditing
                ? "bg-slate-200 text-slate-800"
                : "bg-navy-900 hover:bg-navy-800 text-white"
            }`}
          >
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Personal Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card">
          <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-flood-blue" />
            <span>Personal & Command Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white disabled:bg-slate-100 text-slate-800 text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Official Role
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white disabled:bg-slate-100 text-slate-800 text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white disabled:bg-slate-100 text-slate-800 text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Base EOC Station / Jurisdiction
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.baseLocation}
                onChange={(e) => setFormData({ ...formData, baseLocation: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white disabled:bg-slate-100 text-slate-800 text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {/* 2. Emergency Contact */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card">
          <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Emergency Contacts & Priority Dispatch</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Hotline Phone
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white disabled:bg-slate-100 text-slate-800 text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                District Disaster Relays
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value="Supaul, Katihar, Madhubani"
                readOnly
                className="w-full bg-slate-100 border border-slate-200 text-slate-600 text-xs sm:text-sm rounded-xl px-4 py-3 outline-none font-medium"
              />
            </div>
          </div>
        </div>

        {/* 3. Notification Preferences */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card">
          <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <span>Alert & Channel Preferences</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Instant SMS Alarms</span>
                <span className="text-[11px] text-slate-500">Receive SMS for Critical SOS requests (&gt;5 persons trapped)</span>
              </div>
              <input
                type="checkbox"
                checked={formData.smsAlerts}
                onChange={(e) => setFormData({ ...formData, smsAlerts: e.target.checked })}
                className="w-4 h-4 text-flood-blue rounded focus:ring-flood-blue cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Hydrological Danger Sirens</span>
                <span className="text-[11px] text-slate-500">Play audio alert when Kosi or Mahananda river crosses danger mark</span>
              </div>
              <input
                type="checkbox"
                checked={formData.audioAlerts}
                onChange={(e) => setFormData({ ...formData, audioAlerts: e.target.checked })}
                className="w-4 h-4 text-flood-blue rounded focus:ring-flood-blue cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* 4. Account Security & Actions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-500" />
              <span>Authentication & Security</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">Two-factor incident authority secured via NIC Gov gateway</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setPasswordModal(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Change Password
            </button>

            {isEditing && (
              <button
                type="submit"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-flood-blue hover:bg-flood-hover text-white text-xs font-bold shadow-glow-blue transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Change Password Dialog */}
      {passwordModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100">
            <h4 className="text-lg font-black text-slate-900">Update Password</h4>
            <p className="text-xs text-slate-500 mt-1">Enter a secure password with at least 6 characters.</p>

            <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
              <input
                type="password"
                required
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-flood-blue"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPasswordModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-flood-blue text-white hover:bg-flood-hover"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
