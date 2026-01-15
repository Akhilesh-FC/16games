import db from "../config/database.js";

class BetResult {

  /* ===== CREATE RESULT ===== */
  static async create(data) {
    const {
      game_id,
      games_no,
      number,
      win_number,
      multiplier,
      card_id,
      card_name,
      image,
      random_card,
      json,
      status = 0
    } = data;

    const [result] = await db.query(
      `INSERT INTO bet_result
       (game_id, games_no, number, win_number, multiplier,
        card_id, card_name, image, random_card, json, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        game_id,
        games_no,
        number,
        win_number,
        multiplier,
        card_id,
        card_name,
        image,
        random_card,
        JSON.stringify(json),
        status
      ]
    );

    return result.insertId;
  }

  /* ===== GET LATEST RESULT BY GAME ===== */
  static async getLatestByGame(game_id) {
    const [rows] = await db.query(
      `SELECT *
       FROM bet_result
       WHERE game_id = ?
       ORDER BY id DESC
       LIMIT 1`,
      [game_id]
    );
    return rows[0];
  }

  /* ===== UPDATE RESULT STATUS ===== */
  static async updateStatus(id, status) {
    const [result] = await db.query(
      `UPDATE bet_result
       SET status = ?
       WHERE id = ?`,
      [status, id]
    );

    return result.affectedRows > 0;
  }

}

export default BetResult;
