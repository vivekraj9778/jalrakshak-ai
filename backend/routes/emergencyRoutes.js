const express = require("express");
const Emergency = require("../models/Emergency");
const DashboardStats = require("../models/DashboardStats");

const router = express.Router();

// GET all emergencies
router.get("/", async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: emergencies.length,
      data: emergencies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET single emergency
router.get("/:id", async (req, res) => {
  try {
    const emergency = await Emergency.findOne({
      id: req.params.id,
    });

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency not found",
      });
    }

    res.json({
      success: true,
      data: emergency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE emergency
router.post("/", async (req, res) => {
  try {
    const emergency = new Emergency({
      id: `JR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: req.body.name,
      phone: req.body.phone || "",
      district: req.body.district,
      location: req.body.location,
      coords: req.body.coords || [],
      peopleCount: req.body.peopleCount || 1,
      emergencyType: req.body.emergencyType,
      vulnerableGroups: req.body.vulnerableGroups || [],
      details: req.body.details || "",
      priority: req.body.priority || "Moderate",
      status: "Pending",
      assignedTeam: "Unassigned",
      photoUrl: req.body.photoUrl || "",
      distanceFromBoat: req.body.distanceFromBoat || "",
    });

    // Save emergency
    const savedEmergency = await emergency.save();

    // ============================================
    // AUTOMATIC RELIEF CENTER COUNT INCREMENT
    // ============================================

    // Find dashboard statistics
    let stats = await DashboardStats.findOne();

    // If dashboard stats don't exist, start from 216
    if (!stats) {
      stats = new DashboardStats({
        reliefCenters: 216,
      });
    }

    // Random increase between 2 and 10
    const increaseBy = Math.floor(Math.random() * 9) + 2;

    // Increase relief center count
    stats.reliefCenters =
      Number(stats.reliefCenters || 0) + increaseBy;

    // Save updated dashboard stats
    await stats.save();

    console.log(
      `Relief Centers increased by ${increaseBy}. New count: ${stats.reliefCenters}`
    );

    // ============================================

    res.status(201).json({
      success: true,
      message: "Emergency created successfully",
      data: savedEmergency,
    });
  } catch (error) {
    console.error("Create Emergency Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE emergency status
router.put("/:id/status", async (req, res) => {
  try {
    const emergency = await Emergency.findOne({
      id: req.params.id,
    });

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency not found",
      });
    }

    if (req.body.status) {
      emergency.status = req.body.status;
    }

    if (req.body.assignedTeam !== undefined) {
      emergency.assignedTeam = req.body.assignedTeam;
    }

    const updatedEmergency = await emergency.save();

    res.json({
      success: true,
      message: "Emergency updated successfully",
      data: updatedEmergency,
    });
  } catch (error) {
    console.error("Update Emergency Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE emergency
router.delete("/:id", async (req, res) => {
  try {
    const emergency = await Emergency.findOneAndDelete({
      id: req.params.id,
    });

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency not found",
      });
    }

    res.json({
      success: true,
      message: "Emergency deleted successfully",
    });
  } catch (error) {
    console.error("Delete Emergency Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;