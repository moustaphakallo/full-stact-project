import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getBalance,
  fundWallet,
  getTransactions,
  transferMoney,
} from "../controllers/wallet.Controller.js";

const router = express.Router();

router.get("/balance", auth, getBalance);
router.post("/fund", auth, fundWallet);
router.get("/transactions", auth, getTransactions);
router.post("/transfer", auth, transferMoney);
export default router;