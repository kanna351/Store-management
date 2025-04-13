// controllers/cartController.js
const Cart = require('../models/cart');

class CartController {
  static async addToCart(req, res) {
    const { userId, productId, quantity } = req.body;

    try {
      const result = await Cart.addToCart(userId, productId, quantity);
      res.json({ success: true, cartItemId: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  static async updateCartItem(req, res) {
    const { userId, productId, quantity } = req.body;

    try {
      await Cart.updateCartItem(userId, productId, quantity);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  static async removeCartItem(req, res) {
    const { userId, productId } = req.body;

    try {
      await Cart.removeCartItem(userId, productId);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  static async getCartItems(req, res) {
    const { userId } = req.params;

    try {
      const cartItems = await Cart.getCartItems(userId);
      res.json({ success: true, cartItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
}

module.exports = CartController;