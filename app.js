const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('src/uploads'));
app.use('/uploads', (req, res, next) => {
  res.setHeader('Content-Type', 'application/octet-stream');
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Server configuration
const PORT = process.env.PORT || 8080;
const IP_ADDRESS = process.env.IP_ADDRESS || '0.0.0.0';

app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
});
