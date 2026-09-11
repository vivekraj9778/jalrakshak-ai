const mongoose = require("mongoose");

const reliefCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    capacity: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Open", "Closed", "Full"],
      default: "Open",
    },

    contact: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ReliefCenter",
  reliefCenterSchema
);