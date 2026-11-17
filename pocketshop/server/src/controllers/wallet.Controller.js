import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.models.js";
import Transaction from "../models/Transaction.models.js";
import AppError from "../utils/AppError.js";
import { LIMITS } from "../config/constants.js";
import { generateReference } from "../utils/generateReference.js";
import { parseIdentifier } from "../utils/parseIdentifier.js";

export const getBalance = async (req, res) => {
  res.json({ balance: req.user.balance });
};

export const fundWallet = async (req, res) => {
  const amount = Number(req.body.amount);

  if (!Number.isInteger(amount))
    throw new AppError("Amount must be an integer", 400);
  if (amount < LIMITS.FUND_MIN || amount > LIMITS.FUND_MAX) {
    throw new AppError(
      `Funding must be between ${LIMITS.FUND_MIN} and ${LIMITS.FUND_MAX}`,
      400,
    );
  }

  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      const user = await User.findById(req.user._id).session(session);
      user.balance += amount;
      await user.save({ session });

      const transaction = await Transaction.create(
        [
          {
            reference: generateReference(),
            type: "funding",
            amount,
            receiver: user._id,
            direction: "credit",
          },
        ],
        { session },
      );

      result = { balance: user.balance, transaction: transaction[0] };
    });

    res.status(201).json({ message: "Wallet funded successfully", ...result });
  } finally {
    await session.endSession();
  }
};

export const getTransactions = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;
  const filter = {
    $or: [{ sender: req.user._id }, { receiver: req.user._id }],
  };
  const [transactions, total] = await Promise.all([
    Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "username fullName")
      .populate("receiver", "username fullName"),
    Transaction.countDocuments(filter),
  ]);

  res.json({
    transactions,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
};

export const transferMoney = async (req, res) => {
  const { recipient, amount, pin, note } = req.body;
  const transferAmount = Number(amount);

  if (!Number.isInteger(transferAmount))
    throw new AppError("Amount must be an integer", 400);
  if (
    transferAmount < LIMITS.TRANSFER_MIN ||
    transferAmount > LIMITS.TRANSFER_MAX
  ) {
    throw new AppError(
      `Transfer must be between ${LIMITS.TRANSFER_MIN} and ${LIMITS.TRANSFER_MAX}`,
      400,
    );
  }
  if (!pin) throw new AppError("PIN is required", 400);

  const senderWithPin = await User.findById(req.user._id).select("+pin");
  if (!(await bcrypt.compare(pin, senderWithPin.pin)))
    throw new AppError("Incorrect PIN", 400);

  const receiver = await User.findOne(parseIdentifier(recipient));
  if (!receiver) throw new AppError("No user found", 404);
  if (receiver._id.toString() === req.user._id.toString()) {
    throw new AppError("You cannot send money to yourself", 400);
  }

  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      const sender = await User.findById(req.user._id).session(session);
      const target = await User.findById(receiver._id).session(session);

      if (sender.balance < transferAmount)
        throw new AppError("Insufficient balance", 400);

      sender.balance -= transferAmount;
      target.balance += transferAmount;
      await sender.save({ session });
      await target.save({ session });

      const reference = generateReference();
      await Transaction.create(
        [
          {
            reference,
            type: "transfer",
            amount: transferAmount,
            sender: sender._id,
            receiver: target._id,
            direction: "debit",
            note: note || "",
          },
          {
            reference,
            type: "transfer",
            amount: transferAmount,
            sender: sender._id,
            receiver: target._id,
            direction: "credit",
            note: note || "",
          },
        ],
        { session },
      );

      result = {
        reference,
        balance: sender.balance,
        recipient: { fullName: target.fullName, username: target.username },
      };
    });

    res.status(201).json({ message: "Transfer successful", ...result });
  } finally {
    await session.endSession();
  }
};
