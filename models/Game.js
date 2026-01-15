import db from "../config/database.js";

class Game {

  /* ===== ONLY ACTIVE GAMES ===== */
  static async getActive() {
    const [rows] = await db.query(
      `SELECT id, name, status, game_link, image
       FROM games_list
       WHERE status = 1`
    );

    return rows;
  }

}

export default Game;
