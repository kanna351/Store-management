// routes/cartRoutes.js
const express = require('express');
const CartController = require('../controllers/cartController');

const router = express.Router();

router.post('/add-to-cart', CartController.addToCart);
router.put('/update-cart-item', CartController.updateCartItem);
router.delete('/remove-cart-item', CartController.removeCartItem);
router.get('/get-cart-items/:userId', CartController.getCartItems);

module.exports = router;