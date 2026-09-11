const express = require("express");
const Resource = require("../models/Resource");

const router = express.Router();

// ==========================================
// INITIAL RESOURCE DATA
// ==========================================

const initialResources = [
  {
    id: "RES-001",
    type: "Volunteer",
    name: "Bihar Flood Volunteers",
    phone: "+91 9876543210",
    email: "volunteers@jalrakshak.org",
    location: "Patna, Bihar",
    district: "Patna",
    supportType: "Rescue Operations",
    availability: "Next 7 days",
    resourcesCount: "25 Volunteers",
    status: "Active",
    verified: true,
    joinedAt: "Today",
  },
  {
    id: "RES-002",
    type: "NGO",
    name: "Bihar Relief Foundation",
    phone: "+91 9876543211",
    email: "relief@brf.org",
    location: "Patna, Bihar",
    district: "Patna",
    supportType: "Food & Medical",
    availability: "24/7",
    resourcesCount: "500 Kits",
    status: "Active",
    verified: true,
    joinedAt: "Today",
  },
  {
    id: "RES-003",
    type: "Resource Provider",
    name: "Ganga Emergency Supplies",
    phone: "+91 9876543212",
    email: "supplies@gangarescue.org",
    location: "Vaishali, Bihar",
    district: "Vaishali",
    supportType: "Boats & Equipment",
    availability: "Next 7 days",
    resourcesCount: "12 Boats",
    status: "Active",
    verified: true,
    joinedAt: "Today",
  },
  {
    id: "RES-004",
    type: "Volunteer",
    name: "Patna Rescue Volunteers",
    phone: "+91 9876543213",
    email: "patnarescue@example.com",
    location: "Patna, Bihar",
    district: "Patna",
    supportType: "Rescue Operations",
    availability: "Next 7 days",
    resourcesCount: "40 Volunteers",
    status: "Active",
    verified: true,
    joinedAt: "Today",
  },
];

// ==========================================
// SEED INITIAL RESOURCES
// ==========================================

const seedResourcesIfEmpty = async () => {
  const count = await Resource.countDocuments();

  if (count === 0) {
    await Resource.insertMany(
      initialResources
    );

    console.log(
      "Initial resources seeded successfully."
    );
  }
};

// ==========================================
// GET ALL RESOURCES
// ==========================================

router.get("/", async (req, res) => {
  try {
    await seedResourcesIfEmpty();

    const resources = await Resource.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    console.error(
      "Get Resources Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================================
// REGISTER RESOURCE
// ==========================================

router.post("/", async (req, res) => {
  try {
    const resource = new Resource({
      id:
        req.body.id ||
        `RES-${Date.now()}`,

      type: req.body.type,

      name: req.body.name,

      phone: req.body.phone || "",

      email: req.body.email || "",

      location: req.body.location || "",

      district: req.body.district || "",

      supportType:
        req.body.supportType || "",

      availability:
        req.body.availability || "",

      resourcesCount:
        req.body.resourcesCount || "",

      status: "Active",

      verified: true,

      joinedAt: "Today",
    });

    const saved = await resource.save();

    res.status(201).json({
      success: true,
      message:
        "Resource registered successfully",
      data: saved,
    });
  } catch (error) {
    console.error(
      "Create Resource Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================================
// UPDATE RESOURCE STATUS
// ==========================================

router.put("/:id/status", async (req, res) => {
  try {
    const resource =
      await Resource.findOneAndUpdate(
        {
          id: req.params.id,
        },
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.json({
      success: true,
      message:
        "Resource status updated successfully",
      data: resource,
    });
  } catch (error) {
    console.error(
      "Update Resource Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;