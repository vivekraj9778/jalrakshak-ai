const express = require("express");
const Notification = require("../models/Notification");

const router = express.Router();

// Seed initial notifications if MongoDB is empty
const seedNotificationsIfEmpty = async () => {
  const count = await Notification.countDocuments();

  if (count === 0) {
    const initialNotifications = [
      {
        id: "notif-001",
        title: "Ganga Water Level Alert",
        message:
          "Water level near Patna is rising. Monitoring is active.",
        category: "Critical",
        timestamp: "10 min ago",
        unread: true,
        district: "Patna",
        actionUrl: "/dashboard",
      },
      {
        id: "notif-002",
        title: "Emergency SOS Received",
        message:
          "A new emergency SOS request has been received and requires attention.",
        category: "Emergency",
        timestamp: "20 min ago",
        unread: true,
        district: "Patna",
        actionUrl: "/emergency",
      },
      {
        id: "notif-003",
        title: "Rescue Team Dispatched",
        message:
          "Rescue team has been dispatched to the affected location.",
        category: "Emergency",
        timestamp: "35 min ago",
        unread: true,
        district: "Vaishali",
        actionUrl: "/emergency",
      },
      {
        id: "notif-004",
        title: "Relief Resources Available",
        message:
          "Additional food, water and medical resources are available for dispatch.",
        category: "Resource",
        timestamp: "1 hour ago",
        unread: true,
        district: "Patna",
        actionUrl: "/resources",
      },
      {
        id: "notif-005",
        title: "Weather Update",
        message:
          "Heavy rainfall is expected in several flood-prone districts.",
        category: "Weather",
        timestamp: "2 hours ago",
        unread: false,
        district: "Bihar",
        actionUrl: "/analytics",
      },
      {
        id: "notif-006",
        title: "System Update",
        message:
          "JalRakshak AI monitoring system is operating normally.",
        category: "System",
        timestamp: "3 hours ago",
        unread: false,
        district: "Bihar",
        actionUrl: "/dashboard",
      },
    ];

    await Notification.insertMany(initialNotifications);

    console.log("Initial notifications seeded.");
  }
};

// GET all notifications
router.get("/", async (req, res) => {
  try {
    await seedNotificationsIfEmpty();

    const notifications = await Notification.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Mark one notification as read
router.put("/:id/read", async (req, res) => {
  try {
    const notification =
      await Notification.findOneAndUpdate(
        { id: req.params.id },
        { unread: false },
        { new: true }
      );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    const notifications = await Notification.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error("Mark Notification Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Mark all notifications as read
router.put("/read-all", async (req, res) => {
  try {
    await Notification.updateMany(
      {},
      { unread: false }
    );

    const notifications = await Notification.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error(
      "Mark All Notifications Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete notification
router.delete("/:id", async (req, res) => {
  try {
    const deleted =
      await Notification.findOneAndDelete({
        id: req.params.id,
      });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    const notifications = await Notification.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error(
      "Delete Notification Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create notification
router.post("/", async (req, res) => {
  try {
    const notification = new Notification({
      id:
        req.body.id ||
        `notif-${Date.now()}`,
      title: req.body.title,
      message: req.body.message,
      category:
        req.body.category || "System",
      timestamp:
        req.body.timestamp || "Just now",
      unread:
        req.body.unread !== undefined
          ? req.body.unread
          : true,
      district:
        req.body.district || "",
      actionUrl:
        req.body.actionUrl || "",
    });

    const saved = await notification.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    console.error(
      "Create Notification Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;