import express from "express";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { profile, lookupUser } from "../controllers/user.Controller.js";
import { users as listUsers } from "../controllers/admin.Controller.js";

const router = express.Router();

router.get("/", auth, requireAdmin, listUsers);
router.get("/profile", auth, profile);
router.get("/lookup", auth, lookupUser);

export default router;