const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "Volunteer",
        "NGO",
        "Resource Provider",
      ],
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    district: {
      type: String,
      default: "",
    },

    supportType: {
      type: String,
      default: "",
    },

    availability: {
      type: String,
      default: "",
    },

    resourcesCount: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Active",
    },

    verified: {
      type: Boolean,
      default: true,
    },

    joinedAt: {
      type: String,
      default: "Today",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Resource",
  resourceSchema
);