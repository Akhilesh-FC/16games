import db from "../config/database.js";

class Bet {

  /* ===== CREATE BET ===== */
  static async create(data) {
    const {
      user_id,
      game_id,
      games_no,
      amount,
      commission,
      trade_amount,
      order_id
    } = data;

    const [result] = await db.query(
      `INSERT INTO bets 
       (user_id, game_id, games_no, amount, commission, trade_amount, order_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        game_id,
        games_no,
        amount,
        commission,
        trade_amount,
        order_id
      ]
    );

    return result.insertId;
  }

  /* ===== GET USER BETS ===== */
  static async getByUser(user_id) {
    const [rows] = await db.query(
      `SELECT 
         id, games_no, amount, win_amount, status, created_at
       FROM bets
       WHERE user_id = ?
       ORDER BY id DESC`,
      [user_id]
    );
    return rows;
  }

  /* ===== UPDATE RESULT ===== */
  static async updateResult(id, data) {
    const { status, win_amount, win_number } = data;

    const [result] = await db.query(
      `UPDATE bets
       SET status = ?, win_amount = ?, win_number = ?
       WHERE id = ?`,
      [status, win_amount, win_number, id]
    );

    return result.affectedRows > 0;
  }

}

export default Bet;
