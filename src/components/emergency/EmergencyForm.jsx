import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { districtsData } from "../../data/districts";
import {
  MapPin,
  Compass,
  Upload,
  ShieldAlert,
  CheckCircle2,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

export const EmergencyForm = ({ onSOSCreated }) => {
  const { handleCreateSOS, addToast } = useApp();

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    name: "Flood Resident",
    phone: "",
    district: "Patna",
    location: "Patna Central, Bihar",
    coords: [25.5941, 85.1376],
    emergencyType: "Rescue (Trapped)",
    peopleCount: "",
    vulnerableGroups: ["Elderly", "Children"],
    details: "",
    photoUrl: "",
  });

  const [locating, setLocating] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedSOS, setSubmittedSOS] = useState(null);

  // ==========================================
  // HELP TYPES
  // ==========================================

  const helpTypes = [
    "Rescue (Trapped)",
    "Medical Emergency",
    "Food & Clean Water",
    "Emergency Shelter",
    "Boat Required",
    "Evacuation",
    "Other",
  ];

  // ==========================================
  // VULNERABLE GROUPS
  // ==========================================

  const vulnerableOptions = [
    "Children",
    "Elderly",
    "Pregnant",
    "Disabled",
    "Injured",
  ];

  // ==========================================
  // DISTRICT CHANGE
  // ==========================================

  const handleDistrictChange = (districtName) => {
    const found = districtsData.find(
      (d) => d.name === districtName
    );

    if (found) {
      setFormData((prev) => ({
        ...prev,
        district: found.name,
        location: `${found.name} Flood Relief Sector, Bihar`,
        coords: found.centerCoords,
      }));
    }
  };

  // ==========================================
  // USE CURRENT LOCATION - FIXED
  // ==========================================

  const handleUseCurrentLocation = () => {
    if (locating) return;

    if (!navigator.geolocation) {
      addToast(
        "GPS is not supported by this browser.",
        "warning"
      );
      return;
    }

    setLocating(true);

    console.log("Requesting current location...");

    navigator.geolocation.getCurrentPosition(
      // ==========================================
      // SUCCESS
      // ==========================================
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        console.log("=================================");
        console.log("CURRENT GPS LOCATION");
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);
        console.log("Accuracy:", accuracy, "meters");
        console.log("=================================");

        setFormData((prev) => ({
          ...prev,
          location: `Current GPS Location (${lat.toFixed(
            4
          )}, ${lng.toFixed(4)})`,
          coords: [lat, lng],
        }));

        setLocating(false);

        addToast(
          `Current location detected successfully. Accuracy: ${Math.round(
            accuracy
          )} meters.`,
          "success"
        );
      },

      // ==========================================
      // ERROR
      // ==========================================
      (error) => {
        console.error("=================================");
        console.error("GPS LOCATION ERROR");
        console.error("Code:", error.code);
        console.error("Message:", error.message);
        console.error("=================================");

        setLocating(false);

        switch (error.code) {
          case 1:
            addToast(
              "Location permission denied. Please allow Location access for this site in Chrome.",
              "warning"
            );
            break;

          case 2:
            addToast(
              "Current location is unavailable. Please turn on Windows Location Services and try again.",
              "warning"
            );
            break;

          case 3:
            addToast(
              "Location request timed out. Please try again.",
              "warning"
            );
            break;

          default:
            addToast(
              "Unable to get your current location.",
              "warning"
            );
        }
      },

      // ==========================================
      // GPS OPTIONS
      // ==========================================
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // ==========================================
  // IMAGE UPLOAD + STRONG AUTO COMPRESSION
  // ==========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      addToast(
        "Please select a valid image file.",
        "warning"
      );

      e.target.value = "";
      return;
    }

    // Maximum ORIGINAL file size = 10 MB
    const MAX_ORIGINAL_SIZE = 10 * 1024 * 1024;

    if (file.size > MAX_ORIGINAL_SIZE) {
      addToast(
        "Image is too large. Please choose an image smaller than 10 MB.",
        "warning"
      );

      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        // ==========================================
        // RESIZE IMAGE
        // ==========================================

        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;

        let width = img.width;
        let height = img.height;

        if (
          width > MAX_WIDTH ||
          height > MAX_HEIGHT
        ) {
          const ratio = Math.min(
            MAX_WIDTH / width,
            MAX_HEIGHT / height
          );

          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        // ==========================================
        // CREATE CANVAS
        // ==========================================

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          addToast(
            "Unable to process the selected image.",
            "error"
          );

          e.target.value = "";
          return;
        }

        // White background
        ctx.fillStyle = "#ffffff";

        ctx.fillRect(
          0,
          0,
          width,
          height
        );

        // Draw image
        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        // ==========================================
        // STRONG JPEG COMPRESSION
        // ==========================================

        let compressedImage =
          canvas.toDataURL(
            "image/jpeg",
            0.45
          );

        // If image is still larger than 700 KB
        if (
          compressedImage.length > 700000
        ) {
          compressedImage =
            canvas.toDataURL(
              "image/jpeg",
              0.30
            );
        }

        // If image is still larger than 500 KB
        if (
          compressedImage.length > 500000
        ) {
          compressedImage =
            canvas.toDataURL(
              "image/jpeg",
              0.20
            );
        }

        // ==========================================
        // FINAL SAFETY CHECK
        // ==========================================

        if (
          compressedImage.length > 600000
        ) {
          addToast(
            "Unable to compress this image enough. Please choose another photo.",
            "warning"
          );

          e.target.value = "";
          return;
        }

        // ==========================================
        // SAVE PREVIEW
        // ==========================================

        setPhotoPreview(
          compressedImage
        );

        // ==========================================
        // SAVE COMPRESSED IMAGE
        // ==========================================

        setFormData((prev) => ({
          ...prev,
          photoUrl: compressedImage,
        }));

        // ==========================================
        // DEBUG INFORMATION
        // ==========================================

        console.log(
          "================================="
        );

        console.log(
          "Original image size:",
          (
            file.size /
            1024 /
            1024
          ).toFixed(2),
          "MB"
        );

        console.log(
          "Compressed image size:",
          (
            compressedImage.length /
            1024
          ).toFixed(2),
          "KB"
        );

        console.log(
          "Image dimensions:",
          `${width} x ${height}`
        );

        console.log(
          "================================="
        );

        addToast(
          "Photo uploaded and compressed successfully.",
          "success"
        );
      };

      // Image processing error
      img.onerror = () => {
        addToast(
          "Unable to process this image.",
          "error"
        );

        e.target.value = "";
      };

      img.src = event.target.result;
    };

    // FileReader error
    reader.onerror = () => {
      addToast(
        "Failed to read the selected image.",
        "error"
      );

      e.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  // ==========================================
  // VULNERABLE GROUP TOGGLE
  // ==========================================

  const toggleVulnerable = (item) => {
    setFormData((prev) => {
      const exists =
        prev.vulnerableGroups.includes(item);

      return {
        ...prev,

        vulnerableGroups: exists
          ? prev.vulnerableGroups.filter(
              (v) => v !== item
            )
          : [
              ...prev.vulnerableGroups,
              item,
            ],
      };
    });
  };

  // ==========================================
  // SUBMIT SOS
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ==========================================
    // LOCATION VALIDATION
    // ==========================================

    if (!formData.location.trim()) {
      addToast(
        "Please provide your location.",
        "warning"
      );

      return;
    }

    // ==========================================
    // PEOPLE COUNT VALIDATION
    // ==========================================

    if (
      formData.peopleCount === "" ||
      Number(formData.peopleCount) < 1
    ) {
      addToast(
        "Please enter the number of people.",
        "warning"
      );

      return;
    }

    setSubmitting(true);

    try {
      // ==========================================
      // CALCULATE PRIORITY
      // ==========================================

      let calculatedPriority =
        "Moderate";

      if (
        formData.emergencyType ===
          "Rescue (Trapped)" ||
        formData.emergencyType ===
          "Medical Emergency" ||
        Number(formData.peopleCount) > 5
      ) {
        calculatedPriority = "Critical";
      } else if (
        formData.vulnerableGroups.length >
          0 ||
        formData.emergencyType ===
          "Boat Required"
      ) {
        calculatedPriority = "High";
      }

      // ==========================================
      // CREATE SOS
      // ==========================================

      const created =
        await handleCreateSOS({
          ...formData,

          peopleCount: Number(
            formData.peopleCount
          ),

          priority: calculatedPriority,

          phone:
            formData.phone ||
            "+91 98000 00000",
        });

      // ==========================================
      // SUCCESS
      // ==========================================

      setSubmittedSOS(created);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: {
          y: 0.6,
        },
      });

      if (onSOSCreated) {
        onSOSCreated(created);
      }
    } catch (err) {
      console.error(
        "SOS Submit Error:",
        err
      );

      addToast(
        err?.message ||
          "Failed to create SOS request.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      {/* ==========================================
          FORM
      ========================================== */}

      <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card">

        {/* HEADER */}

        <div className="mb-6 pb-4 border-b border-slate-100">

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Report an Emergency
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Your request will be sent to the nearest
            rescue team and volunteers.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ==========================================
              DISTRICT + LOCATION
          ========================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* DISTRICT */}

            <div>

              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                District
              </label>

              <select
                value={formData.district}
                onChange={(e) =>
                  handleDistrictChange(
                    e.target.value
                  )
                }
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl px-4 py-3 outline-none transition-all cursor-pointer font-bold"
              >

                {districtsData.map((d) => (
                  <option
                    key={d.id}
                    value={d.name}
                  >
                    {d.name}
                  </option>
                ))}

              </select>

            </div>

            {/* LOCATION */}

            <div className="sm:col-span-2">

              <div className="flex items-center justify-between mb-2">

                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Detailed Location
                </label>

                <button
                  type="button"
                  onClick={
                    handleUseCurrentLocation
                  }
                  disabled={locating}
                  className="text-xs font-bold text-flood-blue hover:text-flood-hover flex items-center gap-1.5 transition-colors"
                >

                  <Compass
                    className={`w-3.5 h-3.5 ${
                      locating
                        ? "animate-spin"
                        : ""
                    }`}
                  />

                  <span>
                    {locating
                      ? "Detecting GPS..."
                      : "Use Current Location"}
                  </span>

                </button>

              </div>

              <div className="relative">

                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />

                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location:
                        e.target.value,
                    })
                  }
                  placeholder="Village/Ward, Landmark, District, Bihar"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all"
                />

              </div>

            </div>

          </div>

          {/* ==========================================
              HELP TYPE + PEOPLE
          ========================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* HELP TYPE */}

            <div>

              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Type of Help Needed
              </label>

              <select
                value={
                  formData.emergencyType
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyType:
                      e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl px-4 py-3 outline-none transition-all cursor-pointer font-medium"
              >

                {helpTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}

              </select>

            </div>

            {/* NUMBER OF PEOPLE */}

            <div>

              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Number of People
              </label>

              <input
                type="number"
                min="1"
                max="500"
                value={
                  formData.peopleCount
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    peopleCount:
                      e.target.value,
                  })
                }
                placeholder="Enter number of people"
                className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl px-4 py-3 outline-none transition-all font-bold"
              />

            </div>

          </div>

          {/* ==========================================
              VULNERABLE PEOPLE
          ========================================== */}

          <div>

            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Vulnerable People Present
            </label>

            <div className="flex flex-wrap gap-2">

              {vulnerableOptions.map(
                (item) => {
                  const isSelected =
                    formData.vulnerableGroups.includes(
                      item
                    );

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        toggleVulnerable(
                          item
                        )
                      }
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-navy-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60"
                      }`}
                    >
                      {item}{" "}
                      {isSelected
                        ? "✓"
                        : "+"}
                    </button>
                  );
                }
              )}

            </div>

          </div>

          {/* ==========================================
              ADDITIONAL DETAILS
          ========================================== */}

          <div>

            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Additional Details
            </label>

            <textarea
              rows="3"
              value={formData.details}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details:
                    e.target.value,
                })
              }
              placeholder="E.g., Elderly people and 2 children. Water level rising fast, stranded on roof."
              className="w-full bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white text-slate-800 text-sm rounded-xl p-4 outline-none transition-all resize-none"
            />

          </div>

          {/* ==========================================
              PHOTO UPLOAD
          ========================================== */}

          <div>

            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Upload Photo (Optional)
            </label>

            <div className="flex items-center gap-4">

              <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer border border-slate-200 transition-colors">

                <Upload className="w-4 h-4 text-slate-500" />

                <span>
                  Choose File
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                  className="hidden"
                />

              </label>

              {/* PHOTO PREVIEW */}

              {photoPreview && (
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm group">

                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setPhotoPreview("");

                      setFormData(
                        (prev) => ({
                          ...prev,
                          photoUrl: "",
                        })
                      );
                    }}
                    className="absolute inset-0 bg-slate-900/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >

                    <X className="w-4 h-4" />

                  </button>

                </div>
              )}

            </div>

          </div>

          {/* ==========================================
              SUBMIT BUTTON
          ========================================== */}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white text-base font-extrabold shadow-glow-red hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >

            <ShieldAlert className="w-5 h-5" />

            <span>
              {submitting
                ? "Transmitting SOS Emergency..."
                : "Submit SOS Request"}
            </span>

          </button>

        </form>

      </div>

      {/* ==========================================
          RIGHT SIDE
      ========================================== */}

      <div className="space-y-6">

        {/* STAY SAFE */}

        <div className="bg-gradient-to-b from-blue-50/80 to-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-card text-center relative overflow-hidden">

          <div className="w-16 h-16 rounded-3xl bg-flood-blue/10 text-flood-blue flex items-center justify-center mx-auto mb-4 shadow-sm">

            <ShieldAlert className="w-8 h-8 text-flood-blue" />

          </div>

          <h3 className="text-xl font-extrabold text-slate-900">
            Stay Safe!
          </h3>

          <p className="text-sm font-semibold text-flood-blue mt-0.5 mb-6">
            Help is on the way.
          </p>

          <div className="space-y-4 text-left">

            <div className="flex items-center gap-3.5">

              <div className="w-8 h-8 rounded-full bg-flood-blue text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                1
              </div>

              <p className="text-xs font-bold text-slate-800">
                Submit your request
              </p>

            </div>

            <div className="flex items-center gap-3.5">

              <div className="w-8 h-8 rounded-full bg-flood-blue text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                2
              </div>

              <p className="text-xs font-bold text-slate-800">
                We notify nearest teams
              </p>

            </div>

            <div className="flex items-center gap-3.5">

              <div className="w-8 h-8 rounded-full bg-flood-blue text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                3
              </div>

              <p className="text-xs font-bold text-slate-800">
                Get real-time updates
              </p>

            </div>

          </div>

        </div>

        {/* PHONE DISPATCH */}

        <div className="bg-navy-900 text-white rounded-3xl p-6 border border-navy-850 shadow-card">

          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Immediate Phone Dispatch
          </h4>

          <div className="space-y-2 text-xs">

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-850">

              <span className="font-semibold text-slate-200">
                NDRF Control
              </span>

              <a
                href="tel:1078"
                className="font-mono font-bold text-cyan-300 hover:underline"
              >
                1078
              </a>

            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-850">

              <span className="font-semibold text-slate-200">
                Bihar SDMA Helpline
              </span>

              <a
                href="tel:1070"
                className="font-mono font-bold text-cyan-300 hover:underline"
              >
                1070
              </a>

            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-850">

              <span className="font-semibold text-slate-200">
                Police Emergency
              </span>

              <a
                href="tel:112"
                className="font-mono font-bold text-cyan-300 hover:underline"
              >
                112
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          SUCCESS MODAL
      ========================================== */}

      {submittedSOS && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">

          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center animate-scale-up">

            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">

              <CheckCircle2 className="w-9 h-9" />

            </div>

            <h3 className="text-2xl font-black text-slate-900">
              SOS Request Submitted!
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Your request has been forwarded
              to nearby rescue teams and boat
              units in{" "}
              {submittedSOS.district}.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-left">

              <div className="flex justify-between">

                <span className="text-slate-500">
                  SOS Ticket ID:
                </span>

                <span className="font-mono font-black text-slate-900 text-sm">
                  {submittedSOS.id}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  District:
                </span>

                <span className="font-bold text-slate-800">
                  {submittedSOS.district}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Estimated Response Time:
                </span>

                <span className="font-bold text-emerald-600">
                  15 – 30 mins
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Nearest Boat Distance:
                </span>

                <span className="font-bold text-slate-800">
                  {submittedSOS.distanceFromBoat ||
                    "Distance unavailable"}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Priority Assigned:
                </span>

                <span className="font-bold text-red-600 uppercase">
                  {submittedSOS.priority}
                </span>

              </div>

            </div>

            <button
              onClick={() =>
                setSubmittedSOS(null)
              }
              className="mt-6 w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold shadow-md transition-colors"
            >
              Track Request in Queue
            </button>

          </div>

        </div>
      )}

    </div>
  );
};