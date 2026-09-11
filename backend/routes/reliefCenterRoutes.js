const express = require("express");
const ReliefCenter = require("../models/ReliefCenter");

const router = express.Router();

// ========================================
// GET ALL RELIEF CENTERS
// ========================================

router.get("/", async (req, res) => {
  try {
    const centers = await ReliefCenter.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: centers.length,
      data: centers,
    });
  } catch (error) {
    console.error(
      "Get Relief Centers Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ========================================
// ADD RELIEF CENTER
// ========================================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      district,
      location,
      capacity,
      status,
      contact,
    } = req.body;

    if (
      !name ||
      !district ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, district and location are required",
      });
    }

    const center =
      await ReliefCenter.create({
        name,
        district,
        location,
        capacity: Number(capacity) || 0,
        status: status || "Open",
        contact: contact || "",
      });

    res.status(201).json({
      success: true,
      message:
        "Relief center added successfully",
      data: center,
    });
  } catch (error) {
    console.error(
      "Add Relief Center Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ========================================
// UPDATE RELIEF CENTER
// ========================================

router.put("/:id", async (req, res) => {
  try {
    const center =
      await ReliefCenter.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Relief center not found",
      });
    }

    res.json({
      success: true,
      message:
        "Relief center updated successfully",
      data: center,
    });
  } catch (error) {
    console.error(
      "Update Relief Center Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ========================================
// DELETE RELIEF CENTER
// ========================================

router.delete("/:id", async (req, res) => {
  try {
    const center =
      await ReliefCenter.findByIdAndDelete(
        req.params.id
      );

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Relief center not found",
      });
    }

    res.json({
      success: true,
      message:
        "Relief center deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Relief Center Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;