const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [String],
  stock: { type: Number, default: 0 },
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
