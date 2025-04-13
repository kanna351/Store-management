const db = require("../utils/db");

class Product {
//   static async createProduct(product) {
//     const [result] = await db.execute(
//       "INSERT INTO products (title, subtitle, properties, ingredients, note, howtouse, price, distributed_price, active_status, available_quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//       [
//         product.title,
//         product.subtitle,
//         JSON.stringify(product.properties),
//         JSON.stringify(product.ingredients),
//         JSON.stringify(product.note),
//         JSON.stringify(product.howtouse),
//         product.price,
//         product.distributed_price,
//         product.active_status === 'true' ? 1 : 0,,
//         product.available_quantity,
//         product.image,
//       ]
//     );

//     return result.insertId;
//   }

static async createProduct(product) {
    try {
        const {
            title,
            subtitle,
            properties,
            ingredients,
            note,
            howtouse,
            price,
            distributed_price,
            active_status,
            available_quantity,
            image
        } = product;

        console.log('Parameters:', title, subtitle, properties, ingredients, note, howtouse, price, distributed_price, active_status, available_quantity, image);

        const [result] = await db.execute(
            'INSERT INTO products (title, subtitle, properties, ingredients, note, howtouse, price, distributed_price, active_status, available_quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                title,
                subtitle,
                properties,
                ingredients,
                note,
                howtouse,
                price,
                distributed_price,
                active_status === 'true' ? 1 : 0,
                available_quantity,
                image
            ]
        );

        return result.insertId;
    } catch (error) {
        console.error('Error in createProduct:', error);
        throw error; // Rethrow the error to be caught in the controller
    }
}

  static async getAllProducts() {
    const [rows] = await db.execute("SELECT * FROM products");
    return rows;
  }

  static async getProductById(productId) {
    const [rows] = await db.execute(
      "SELECT * FROM products WHERE product_id = ?",
      [productId]
    );
    return rows[0];
  }

  static async updateProductById(productId, product) {
    await db.execute(
      "UPDATE products SET title=?, subtitle=?, properties=?, ingredients=?, note=?, howtouse=?, price=?, distributed_price=?, active_status=?, available_quantity=?, image=? WHERE product_id=?",
      [
        product.title,
        product.subtitle,
        JSON.stringify(product.properties),
        JSON.stringify(product.ingredients),
        JSON.stringify(product.note),
        JSON.stringify(product.howtouse),
        product.price,
        product.distributed_price,
        product.active_status,
        product.available_quantity,
        product.image,
        productId,
      ]
    );
  }

  static async deleteProductById(productId) {
    await db.execute("DELETE FROM products WHERE product_id = ?", [productId]);
  }
}

module.exports = Product;