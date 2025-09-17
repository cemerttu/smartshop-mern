const Product = require('../models/Product');

exports.listProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ msg: 'Not found' });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.status(201).json(p);
};

exports.updateProduct = async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};
