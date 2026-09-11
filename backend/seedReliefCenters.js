const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ReliefCenter = require("./models/ReliefCenter");

dotenv.config();

const districts = [
  "Patna",
  "Supaul",
  "Katihar",
  "Gaya",
  "Madhubani",
  "Darbhanga",
  "Purnia",
  "Saharsa",
  "Araria",
  "Bhagalpur",
  "Muzaffarpur",
  "Samastipur",
  "Begusarai",
  "Khagaria",
  "Vaishali",
  "Nalanda",
  "Buxar",
  "Bhojpur",
  "Rohtas",
  "Kaimur",
];

const centerTypes = [
  "Flood Relief Center",
  "Emergency Shelter",
  "Community Relief Center",
  "Disaster Response Center",
  "Temporary Relief Camp",
];

const locations = [
  "Government School",
  "Community Hall",
  "Panchayat Bhawan",
  "Government College",
  "Sports Complex",
  "Community Center",
  "Town Hall",
  "High School",
];

const createCenters = () => {
  const centers = [];

  for (let i = 1; i <= 215; i++) {
    const district =
      districts[(i - 1) % districts.length];

    const type =
      centerTypes[(i - 1) % centerTypes.length];

    const location =
      locations[(i - 1) % locations.length];

    centers.push({
      name: `${district} ${type} ${i}`,
      district,
      location: `${location}, ${district}`,
      capacity: 200 + ((i * 37) % 801),
      status: "Open",
      contact: `9${String(700000000 + i).slice(-9)}`,
    });
  }

  return centers;
};

const seedReliefCenters = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Check existing records
    const existingCount =
      await ReliefCenter.countDocuments();

    console.log(
      `Existing relief centers: ${existingCount}`
    );

    if (existingCount > 0) {
      console.log(
        "Relief centers already exist. Nothing was added."
      );

      await mongoose.disconnect();
      process.exit(0);
    }

    const centers = createCenters();

    await ReliefCenter.insertMany(centers);

    const finalCount =
      await ReliefCenter.countDocuments({
        status: { $ne: "Closed" },
      });

    console.log(
      `Successfully seeded ${finalCount} relief centers.`
    );

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error(
      "Relief center seed error:",
      error
    );

    await mongoose.disconnect();

    process.exit(1);
  }
};

seedReliefCenters();