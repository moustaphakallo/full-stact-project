import express from "express";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  hideProduct,
  showProduct,
  adminProducts,
} from "../controllers/product.Controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", auth, requireAdmin, createProduct);
router.get("/admin/all", auth, requireAdmin, adminProducts);
router.patch("/:id/show", auth, requireAdmin, showProduct);
router.delete("/:id", auth, requireAdmin, hideProduct);
router.patch("/:id", auth, requireAdmin, updateProduct);
router.get("/:id", getProduct);

export default router;