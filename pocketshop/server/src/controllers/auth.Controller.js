import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.models.js";
import AppError from "../utils/AppError.js";


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const safeUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  username: user.username,
  phone: user.phone,
  role: user.role,
  balance: user.balance,
});

export const register = async (req, res) => {
  const { fullName, username, phone, password, pin } = req.body;

  if (!fullName || !username || !phone || !password || !pin) {
    throw new AppError("All fields are required", 400);
  }

  if (password.length < 6) {
    throw new AppError("Password must contain at least 6 characters", 400);
  }

  if (!/^\d{4}$/.test(pin)) {
    throw new AppError("PIN must contain exactly 4 digits", 400);
  }

  const normalizedUsername = username.toLowerCase().trim();

  if (!/^[a-z0-9_]{3,20}$/.test(normalizedUsername)) {
    throw new AppError(
      "Username must be 3-20 characters and contain only letters, numbers, and underscores",
      400,
    );
  }

  if (await User.findOne({ username: normalizedUsername })) {
    throw new AppError("Username already exists", 409);
  }

  if (await User.findOne({ phone })) {
    throw new AppError("Phone already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPin = await bcrypt.hash(pin, 10);

  const user = await User.create({
    fullName,
    username: normalizedUsername,
    phone,
    password: hashedPassword,
    pin: hashedPin,
  });

  const token = createToken(user._id);

  res.status(201).json({
    message: "Registration successful",
    token,
    user: safeUser(user),
  });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new AppError("Username and password are required", 400);
  }

  const user = await User.findOne({
    username: username.toLowerCase().trim(),
  }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Invalid username or password", 400);
  }

  const token = createToken(user._id);

  res.json({
    message: "Login successful",
    token,
    user: safeUser(user),
  });
};

export const me = async (req, res) => {
  res.json({
    user: safeUser(req.user),
  });
};
