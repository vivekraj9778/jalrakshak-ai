const express = require("express");
const Emergency = require("../models/Emergency");
const DashboardStats = require("../models/DashboardStats");
const ReliefCenter = require("../models/ReliefCenter");

const router = express.Router();

// ==========================================
// GET DASHBOARD STATS
// ==========================================

router.get("/", async (req, res) => {
  try {
    // ------------------------------------------
    // Get all emergencies
    // ------------------------------------------

    const emergencies = await Emergency.find();

    // ------------------------------------------
    // Flood Affected People
    // ------------------------------------------

    const affectedPeople = emergencies.reduce(
      (total, emergency) => {
        return total + (Number(emergency.peopleCount) || 0);
      },
      0
    );

    // ------------------------------------------
    // Active SOS
    // ------------------------------------------

    const activeSOS = emergencies.filter(
      (emergency) => emergency.status !== "Resolved"
    ).length;

    // ------------------------------------------
    // Rescue Teams Deployed
    // ------------------------------------------

    // Count UNIQUE assigned rescue teams
    const deployedTeams = new Set(
      emergencies
        .filter(
          (emergency) =>
            emergency.assignedTeam &&
            emergency.assignedTeam.trim() !== "" &&
            emergency.assignedTeam !== "Unassigned"
        )
        .map((emergency) => emergency.assignedTeam.trim())
    );

    const rescueTeamsDeployed = deployedTeams.size;

    // ------------------------------------------
    // Relief Centers
    // ------------------------------------------

    // Get actual relief centers from database
    const actualReliefCenters =
      await ReliefCenter.countDocuments({
        status: {
          $ne: "Closed",
        },
      });

    // Get dashboard statistics
    let stats = await DashboardStats.findOne();

    // If DashboardStats does not exist,
    // initialize it using actual relief center count
    if (!stats) {
      stats = new DashboardStats({
        reliefCenters: actualReliefCenters,
      });

      await stats.save();
    }

    // If actual relief centers are greater than
    // dashboard value, sync the dashboard upward.
    //
    // Example:
    // Actual = 216
    // Dashboard = 215
    // Result = 216
    //
    // But if dashboard is already 223 because of SOS,
    // it will remain 223.
    if (
      Number(stats.reliefCenters || 0) <
      actualReliefCenters
    ) {
      stats.reliefCenters = actualReliefCenters;
      await stats.save();
    }

    const reliefCenters = Number(
      stats.reliefCenters || actualReliefCenters
    );

    // ------------------------------------------
    // Send Dashboard Data
    // ------------------------------------------

    res.json({
      success: true,
      data: {
        affectedPeople,
        activeSOS,
        rescueTeamsDeployed,
        reliefCenters,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ==========================================
// UPDATE DASHBOARD MANUAL STATS
// ==========================================

router.put("/", async (req, res) => {
  try {
    let stats = await DashboardStats.findOne();

    if (!stats) {
      // If stats don't exist, initialize with
      // actual relief center count
      const actualReliefCenters =
        await ReliefCenter.countDocuments({
          status: {
            $ne: "Closed",
          },
        });

      stats = new DashboardStats({
        reliefCenters: actualReliefCenters,
      });
    }

    // Update relief centers if provided
    if (req.body.reliefCenters !== undefined) {
      stats.reliefCenters = Number(
        req.body.reliefCenters
      );
    }

    await stats.save();

    res.json({
      success: true,
      message:
        "Dashboard statistics updated successfully",
      data: stats,
    });
  } catch (error) {
    console.error(
      "Dashboard Update Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ==========================================
// DELETE DASHBOARD STATS
// ==========================================

router.delete("/", async (req, res) => {
  try {
    await DashboardStats.deleteMany({});

    res.json({
      success: true,
      message:
        "Dashboard statistics deleted successfully",
    });
  } catch (error) {
    console.error(
      "Dashboard Delete Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;