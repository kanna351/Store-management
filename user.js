const db = require("../utils/db");

class User {
  static async createUser(user) {
    const [result] = await db.execute(
      "INSERT INTO users (first_name, last_name, email, contact_number, password_hash, street, city, district, state, country, pincode, aadhar_number, pan_number, kyc_details, user_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user.first_name,
        user.last_name,
        user.email,
        user.contact_number,
        user.password_hash,
        user.street,
        user.city,
        user.district,
        user.state,
        user.country,
        user.pincode,
        user.aadhar_number,
        user.pan_number,
        user.kyc_details,
        user.user_type,
      ]
    );

    return result.insertId;
  }

  static async getUserByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async getUserByContactNumber(contactNumber) {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE contact_number = ?",
      [contactNumber]
    );
    return rows[0];
  }
}

module.exports = User;