import User from "../models/User.models.js";
import Product from "../models/Product.models.js";
import Order from "../models/Order.models.js";
import Transaction from "../models/Transaction.models.js";

export const stats = async (req, res) => {
  const [users, products, orders, paidOrders, transactions] = await Promise.all(
    [
      User.countDocuments({ role: "customer" }),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: "paid" }),
      Transaction.countDocuments(),
    ],
  );

  res.json({
    stats: { users, products, orders, paidOrders, transactions },
  });
};

export const users = async (req, res) => {
  const users = await User.find()
    .select("fullName username phone role balance createdAt")
    .sort({ createdAt: -1 });

  res.json({ users });
};

export const orders = async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const orders = await Order.find(filter)
    .populate("user", "fullName username phone")
    .sort({ createdAt: -1 });

  res.json({ orders });
};

export const transactions = async (req, res) => {
  const transactions = await Transaction.find()
    .populate("sender", "fullName username")
    .populate("receiver", "fullName username")
    .sort({ createdAt: -1 });

  res.json({ transactions });
};
