const express = require("express");
const UserProfile = require("../models/UserProfile");

const router = express.Router();

const defaultProfile = {
  profileKey: "commander",
  name: "Commander A. Verma",
  role: "Incident Commander",
  badge: "Admin",
  email: "command.bihar@jalrakshak.gov.in",
  phone: "+91 94311 02934",
  baseLocation: "Patna State Disaster EOC",
  smsAlerts: true,
  audioAlerts: true,
};

// GET profile
router.get("/", async (req, res) => {
  try {
    let profile = await UserProfile.findOne({
      profileKey: "commander",
    });

    if (!profile) {
      profile = await UserProfile.create(
        defaultProfile
      );
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE profile
router.put("/", async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "role",
      "badge",
      "email",
      "phone",
      "baseLocation",
      "smsAlerts",
      "audioAlerts",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const profile =
      await UserProfile.findOneAndUpdate(
        {
          profileKey: "commander",
        },
        {
          $set: updates,
          $setOnInsert: {
            profileKey: "commander",
          },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;