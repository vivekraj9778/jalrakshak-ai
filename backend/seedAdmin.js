const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("./models/User");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ||
  "command.bihar@jalrakshak.gov.in";

const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ||
  "Commander@12345";

const ADMIN_NAME = "JalRakshak Commander";

async function seedAdmin() {
  try {
    if (!MONGO_URI) {
      throw new Error(
        "MONGO_URI is missing in backend/.env"
      );
    }

    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected.");

    const passwordHash =
      await bcrypt.hash(ADMIN_PASSWORD, 12);

    let admin = await User.findOne({
      email: ADMIN_EMAIL.toLowerCase(),
    });

    if (admin) {
      admin.name = ADMIN_NAME;
      admin.passwordHash = passwordHash;
      admin.role = "admin";

      await admin.save();

      console.log("=================================");
      console.log("Admin account updated successfully.");
      console.log("Email:", ADMIN_EMAIL);
      console.log("Role:", admin.role);
      console.log("=================================");
    } else {
      admin = await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL.toLowerCase(),
        phone: "",
        passwordHash,
        role: "admin",
      });

      console.log("=================================");
      console.log("Admin account created successfully.");
      console.log("Email:", ADMIN_EMAIL);
      console.log("Role:", admin.role);
      console.log("=================================");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("=================================");
    console.error("Admin seed failed");
    console.error("=================================");
    console.error(error.message);

    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

seedAdmin();