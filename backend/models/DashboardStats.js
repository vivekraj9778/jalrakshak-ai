const mongoose = require("mongoose");

const dashboardStatsSchema = new mongoose.Schema(
  {
    reliefCenters: {
      type: Number,
      default: 215,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DashboardStats", dashboardStatsSchema);