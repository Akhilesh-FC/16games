import db from "../config/database.js";

class BetLog {

  /* ===== CREATE BET ===== */
  static async create(data) {
    const { game_id, games_no, amount, status = 0 } = data;

    const [result] = await db.query(
      `INSERT INTO betlogs 
       (game_id, games_no, amount, status)
       VALUES (?, ?, ?, ?)`,
      [game_id, games_no, amount, status]
    );

    return result.insertId;
  }

  /* ===== GET BETS BY GAME ===== */
  static async getByGame(game_id) {
    const [rows] = await db.query(
      `SELECT 
         id, games_no, amount, status, created_at 
       FROM betlogs
       WHERE game_id = ?
       ORDER BY id DESC`,
      [game_id]
    );

    return rows;
  }

  /* ===== UPDATE BET STATUS ===== */
  static async updateStatus(id, status) {
    const [result] = await db.query(
      `UPDATE betlogs 
       SET status = ?
       WHERE id = ?`,
      [status, id]
    );

    return result.affectedRows > 0;
  }

}

export default BetLog;
