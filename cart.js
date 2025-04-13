// models/cart.js
const db = require('../utils/db');

class Cart {
  static async addToCart(userId, productId, quantity) {
    const [result] = await db.execute(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [userId, productId, quantity]
    );

    return result.insertId;
  }

  static async updateCartItem(userId, productId, quantity) {
    await db.execute(
      'UPDATE cart SET quantity=? WHERE user_id=? AND product_id=?',
      [quantity, userId, productId]
    );
  }

  static async removeCartItem(userId, productId) {
    await db.execute('DELETE FROM cart WHERE user_id=? AND product_id=?', [userId, productId]);
  }

  static async getCartItems(userId) {
    const [rows] = await db.execute(
      'SELECT cart.id, cart.quantity, products.title, products.price FROM cart INNER JOIN products ON cart.product_id = products.product_id WHERE cart.user_id=?',
      [userId]
    );
    return rows;
  }
}

module.exports = Cart;