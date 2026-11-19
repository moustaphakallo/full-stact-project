import dns from "node:dns";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import app from "./app.js";
import { connectDatabase } from "./config/database.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: resolve(__dirname, "../.env"),
});

if (!process.env.JWT_SECRET?.trim()) {
  throw new Error("JWT_SECRET manquant dans server/.env");
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur de démarrage :", error.message);
    process.exit(1);
  }
};

startServer();