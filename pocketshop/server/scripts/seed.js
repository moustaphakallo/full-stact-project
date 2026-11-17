import "dotenv/config";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { connectDatabase } from "../src/config/db.js";
import User from "../src/models/User.models.js";
import Product from "../src/models/Product.models.js";
import sampleProducts from "../src/config/sampleProducts.js";

const seed = async () => {
  try {
    const requiredEnv = ["SHOP_USERNAME", "SHOP_PHONE", "ADMIN_PASSWORD", "ADMIN_PIN"];
    const missingEnv = requiredEnv.filter((key) => !process.env[key]);
    if (missingEnv.length) {
      throw new Error(`Missing required environment variables: ${missingEnv.join(", ")}`);
    }
    if (!/^[a-z0-9_]{3,20}$/i.test(process.env.SHOP_USERNAME)) {
      throw new Error("SHOP_USERNAME must contain 3 to 20 letters, numbers, or underscores");
    }
    if (!/^\d{8,15}$/.test(process.env.SHOP_PHONE)) {
      throw new Error("SHOP_PHONE must contain 8 to 15 digits");
    }
    if (process.env.ADMIN_PASSWORD.length < 6) {
      throw new Error("ADMIN_PASSWORD must contain at least 6 characters");
    }
    if (!/^\d{4}$/.test(process.env.ADMIN_PIN)) {
      throw new Error("ADMIN_PIN must contain exactly 4 digits");
    }

    await connectDatabase();

    const adminUsername = process.env.SHOP_USERNAME.toLowerCase();
    let admin = await User.findOne({ username: adminUsername });

    if (!admin) {
      const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const pin = await bcrypt.hash(process.env.ADMIN_PIN, 10);

      admin = await User.create({
        fullName: "PocketShop Admin",
        username: adminUsername,
        phone: process.env.SHOP_PHONE,
        password,
        pin,
        role: "admin",
        balance: 0,
      });

      console.log("Admin created");
    } else {
      if (admin.role !== "admin") {
        throw new Error("SHOP_USERNAME already belongs to a non-admin user");
      }
      console.log("Admin already exists");
    }

    for (const product of sampleProducts) {
      const result = await Product.updateOne(
        { name: product.name },
        { $setOnInsert: product },
        { upsert: true },
      );
      if (result.upsertedCount) console.log(`Created: ${product.name}`);
    }

    console.log("Seed terminé");
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seed();