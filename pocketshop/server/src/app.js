import express from "express";
import cors from "cors";
import helmet from "helmet";
import walletRoutes from "./routes/wallet.Routes.js";
import orderRoutes from "./routes/order.Routes.js";
import authRoutes from "./routes/auth.Routes.js";
import userRoutes from "./routes/user.Routes.js";
import productRoutes from "./routes/product.Routes.js";
import adminRoutes from "./routes/admin.Routes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(cors({
  origin(origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ].filter(Boolean);

    callback(null, !origin || allowedOrigins.includes(origin));
  },
  credentials: true,
}));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/admin", adminRoutes);

app.route(["/api/v1/health", "/api/v1/healthCheck", "/api/health"])
  .get((_req, res) => {
    res.json({ status: "ok" });
  })
  .post((_req, res) => {
    res.json({ status: "ok" });
  });
app.use(notFound);
app.use(errorHandler);

export default app;