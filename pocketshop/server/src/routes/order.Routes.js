import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createOrder,
  getMyOrders,
  getOrder,
  payOrder,
  cancelOrder,
} from "../controllers/order.Controller.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getMyOrders);
router.get("/:id", auth, getOrder);
router.post("/:id/pay", auth, payOrder);
router.patch("/:id/cancel", auth, cancelOrder);

export default router;