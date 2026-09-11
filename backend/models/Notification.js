const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Critical",
        "Emergency",
        "Resource",
        "Weather",
        "System",
      ],
      default: "System",
    },

    timestamp: {
      type: String,
      default: "Just now",
    },

    unread: {
      type: Boolean,
      default: true,
    },

    district: {
      type: String,
      default: "",
    },

    actionUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);