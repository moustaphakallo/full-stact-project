import User from "../models/User.models.js";
import AppError from "../utils/AppError.js";
import { parseIdentifier } from "../utils/parseIdentifier.js";

export const profile = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      username: req.user.username,
      phone: req.user.phone,
      role: req.user.role,
      balance: req.user.balance,
    },
  });
};

export const lookupUser = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    throw new AppError("Phone or username is required", 400);
  }

  const identifier = parseIdentifier(q);
  const user = await User.findOne(identifier);

  if (!user) {
    throw new AppError("No user found", 404);
  }

  res.json({
    user: {
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      phone: user.phone,
    },
  });
};
