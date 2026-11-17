import Product from "../models/Product.models.js";
import AppError from "../utils/AppError.js";

export const getProducts = async (req, res) => {
  const products = await Product.find({ isActive: true }).sort({
    createdAt: -1,
  });
  res.json({ products });
};

export const getProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id, isActive: true });

  if (!product) throw new AppError("Product not found", 404);

  res.json({ product });
};

export const createProduct = async (req, res) => {
  const { name, description, price, imageUrl, stock } = req.body;

  if (!name || !description || !imageUrl) {
    throw new AppError("Name, description and image are required", 400);
  }

  const product = await Product.create({
    name,
    description,
    price: Number(price),
    imageUrl,
    stock: Number(stock),
  });

  res.status(201).json({ message: "Product created", product });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError("Product not found", 404);

  const { name, description, price, imageUrl, stock } = req.body;
  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = Number(price);
  if (imageUrl !== undefined) product.imageUrl = imageUrl;
  if (stock !== undefined) product.stock = Number(stock);

  await product.save();
  res.json({ message: "Product updated", product });
};

export const hideProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError("Product not found", 404);

  product.isActive = false;
  await product.save();
  res.json({ message: "Product hidden" });
};

export const showProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError("Product not found", 404);

  product.isActive = true;
  await product.save();
  res.json({ message: "Product visible" });
};

export const adminProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json({ products });
};
