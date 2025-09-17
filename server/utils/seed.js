require('dotenv').config();
const connectDB = require('../config/db');
const Product = require('../models/Product');

connectDB();

const products = [
  { title: 'Sample Tshirt', description: 'A nice tshirt', price: 19.99, images: [], stock: 10, category: 'apparel' },
  { title: 'Wireless Mouse', description: 'Ergonomic', price: 34.5, images: [], stock: 25, category: 'electronics' }
];

const run = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Seeded products');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
