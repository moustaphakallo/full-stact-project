import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Order from "../models/Order.models.js";
import Product from "../models/Product.models.js";
import User from "../models/User.models.js";
import Transaction from "../models/Transaction.models.js";
import AppError from "../utils/AppError.js";
import { generateReference } from "../utils/generateReference.js";
import { sendOrderNotification } from "../utils/sendOrderNotification.js";

export const createOrder = async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0)
    throw new AppError("Cart is empty", 400);

  const orderItems = [];
  let total = 0;

  for (const item of items) {
    const product = await Product.findOne({
      _id: item.product,
      isActive: true,
    });
    if (!product) throw new AppError("Product not found", 404);

    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1)
      throw new AppError("Invalid quantity", 400);
    if (product.stock < quantity) throw new AppError("Out of stock", 400);

    total += product.price * quantity;
    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl,
    });
  }

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    total,
    status: "pending",
  });

  try {
    await sendOrderNotification(order, req.user);
  } catch (error) {
    console.error("Could not send order notification email:", error.message);
  }

  res.status(201).json({ message: "Order created", order });
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json({ orders });
};

export const getOrder = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("user", "fullName username phone");
  if (!order) throw new AppError("Order not found", 404);
  res.json({ order });
};

export const payOrder = async (req, res) => {
  const { pin } = req.body;
  const session = await mongoose.startSession();

  try {
    let paidOrder;
    await session.withTransaction(async () => {
      const order = await Order.findOne({
        _id: req.params.id,
        user: req.user._id,
      }).session(session);
      if (!order) throw new AppError("Order not found", 404);
      if (order.status === "paid")
        throw new AppError("This order is already paid", 400);
      if (order.status === "cancelled")
        throw new AppError("Cancelled order cannot be paid", 400);

      const user = await User.findById(req.user._id)
        .select("+pin")
        .session(session);
      if (!(await bcrypt.compare(pin, user.pin)))
        throw new AppError("Incorrect PIN", 400);
      if (user.balance < order.total)
        throw new AppError("Insufficient balance", 400);

      const shopUsername = process.env.SHOP_USERNAME?.trim().toLowerCase();
      if (!shopUsername) {
        throw new AppError("Shop account is not configured", 500);
      }
      const shop = await User.findOne({ username: shopUsername }).session(session);
      if (!shop) throw new AppError("Shop account not found", 500);

      for (const item of order.items) {
        const product = await Product.findById(item.product).session(session);
        if (!product || !product.isActive)
          throw new AppError(`${item.name} is unavailable`, 400);
        if (product.stock < item.quantity)
          throw new AppError(`${item.name} is out of stock`, 400);

        product.stock -= item.quantity;
        await product.save({ session });
      }

      user.balance -= order.total;
      shop.balance += order.total;
      await user.save({ session });
      await shop.save({ session });

      const reference = generateReference();
      await Transaction.create(
        [
          {
            reference,
            type: "purchase",
            amount: order.total,
            sender: user._id,
            receiver: shop._id,
            direction: "debit",
          },
          {
            reference,
            type: "purchase",
            amount: order.total,
            sender: user._id,
            receiver: shop._id,
            direction: "credit",
          },
        ],
        { session },
      );

      order.status = "paid";
      order.paidAt = new Date();
      await order.save({ session });
      paidOrder = order;
    });

    res.json({ message: "Payment successful", order: paidOrder });
  } finally {
    await session.endSession();
  }
};

export const cancelOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) throw new AppError("Order not found", 404);
  if (order.status === "paid")
    throw new AppError("Paid order cannot be cancelled", 400);

  order.status = "cancelled";
  await order.save();
  res.json({ message: "Order cancelled", order });
};
