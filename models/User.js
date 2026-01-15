import db from "../config/database.js";

class User {

  /* ===== REGISTER DUPLICATE CHECK ===== */
  static async isEmailOrMobileExists(email, mobile) {
    const [rows] = await db.query(
      `SELECT id 
       FROM users 
       WHERE email = ? OR mobile = ?
       LIMIT 1`,
      [email, mobile]
    );
    return rows.length > 0;
  }

  /* ===== LOGIN : EMAIL OR MOBILE ===== */
  static async findByIdentity(identity) {
    const [rows] = await db.query(
      `SELECT * 
       FROM users 
       WHERE email = ? OR mobile = ?
       LIMIT 1`,
      [identity, identity]
    );
    return rows[0];
  }

  /* ===== CREATE USER ===== */
  static async create({ name, email, mobile, password }) {
    const [result] = await db.query(
      `INSERT INTO users (name, email, mobile, password)
       VALUES (?, ?, ?, ?)`,
      [name, email, mobile, password]
    );
    return result.insertId;
  }
}

export default User;
