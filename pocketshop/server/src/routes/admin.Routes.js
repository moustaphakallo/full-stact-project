import express from "express";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { stats, users, orders, transactions } from "../controllers/admin.Controller.js";

const router = express.Router();

router.use(auth, requireAdmin);
router.get("/stats", stats);
router.get("/users", users);
router.get("/orders", orders);
router.get("/transactions", transactions);

export default router;