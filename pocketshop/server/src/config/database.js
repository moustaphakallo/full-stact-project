import mongoose from "mongoose";
import Product from "../models/Product.models.js";
import sampleProducts from "./sampleProducts.js";

let seedHasRun = false;

async function seedProducts() {
  if (seedHasRun) {
    return;
  }

  seedHasRun = true;

  let added = 0;

  for (const product of sampleProducts) {
    const existing = await Product.findOne({
      name: product.name,
      $or: [
        { imageUrl: "" },
        { imageUrl: { $regex: "^https://images\\.unsplash\\.com/" } },
      ],
    });

    if (existing) {
      existing.imageUrl = product.imageUrl;
      await existing.save();
    } else {
      const result = await Product.updateOne(
        { name: product.name },
        { $setOnInsert: product },
        { upsert: true },
      );
      added += result.upsertedCount;
    }
  }

  if (added > 0) {
    console.log(`${added} produits de démonstration ajoutés`);
  }
}

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    await seedProducts();
    return;
  }

  const mongoUri = process.env.MONGODB_URI?.trim();

  if (!mongoUri) {
    throw new Error("MONGODB_URI est manquant dans l'environnement");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Atlas connecté avec succès");

    await seedProducts();
  } catch (error) {
    console.error("Erreur de connexion MongoDB Atlas :", error.message);
    throw error;
  }
}
