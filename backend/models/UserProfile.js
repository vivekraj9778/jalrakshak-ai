const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    profileKey: {
      type: String,
      unique: true,
      default: "commander",
    },

    name: {
      type: String,
      default: "Commander A. Verma",
    },

    role: {
      type: String,
      default: "Incident Commander",
    },

    badge: {
      type: String,
      default: "Admin",
    },

    email: {
      type: String,
      default: "command.bihar@jalrakshak.gov.in",
    },

    phone: {
      type: String,
      default: "+91 94311 02934",
    },

    baseLocation: {
      type: String,
      default: "Patna State Disaster EOC",
    },

    smsAlerts: {
      type: Boolean,
      default: true,
    },

    audioAlerts: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "UserProfile",
  userProfileSchema
);