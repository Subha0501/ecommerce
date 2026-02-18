const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'products.json');

function readProducts() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const products = readProducts();
  const p = products.find(x => String(x.id) === String(req.params.id));
  if (!p) return res.status(404).json({ error: 'Product not found' });
  res.json(p);
});

// Checkout endpoint - simulate order creation
app.post('/api/checkout', (req, res) => {
  const { cart, customer, payment } = req.body;
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  // simple validation for payment
  if (!payment || !payment.mode) {
    return res.status(400).json({ error: 'Payment mode required' });
  }

  const orderId = 'ORD-' + Date.now();

  // In a real app, you'd persist order to DB and process payment.
  return res.json({ success: true, orderId, message: 'Order placed (simulated)' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend API running on port ${PORT}`));
