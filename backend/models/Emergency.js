const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    district: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    coords: {
      type: [Number],
      default: [],
    },

    peopleCount: {
      type: Number,
      default: 1,
    },

    emergencyType: {
      type: String,
      required: true,
    },

    vulnerableGroups: {
      type: [String],
      default: [],
    },

    details: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Critical", "High", "Moderate", "Low"],
      default: "Moderate",
    },

    status: {
      type: String,
      enum: ["Pending", "Assigned", "Rescue In Progress", "Resolved"],
      default: "Pending",
    },

    assignedTeam: {
      type: String,
      default: "Unassigned",
    },

    photoUrl: {
      type: String,
      default: "",
    },

    distanceFromBoat: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Emergency", emergencySchema);