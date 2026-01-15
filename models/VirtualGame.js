import db from "../config/database.js";

class VirtualGame {

  /* ===== GET BY GAME ID (ONLY ACTIVE) ===== */
  static async getByGameId(game_id) {
    const [rows] = await db.query(
      `SELECT 
         id, game_id, name, number, actual_number, multiplier, type 
       FROM virtual_games
       WHERE game_id = ?`,
      [game_id]
    );
    return rows;
  }

  /* ===== GET SINGLE BY ID ===== */
  static async findById(id) {
    const [rows] = await db.query(
      `SELECT * 
       FROM virtual_games 
       WHERE id = ? 
       LIMIT 1`,
      [id]
    );
    return rows[0];
  }

  /* ===== CREATE ===== */
  static async create(data) {
    const { game_id, name, number, actual_number, multiplier, type } = data;

    const [result] = await db.query(
      `INSERT INTO virtual_games 
       (game_id, name, number, actual_number, multiplier, type)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [game_id, name, number, actual_number, multiplier, type]
    );

    return result.insertId;
  }

}

export default VirtualGame;
