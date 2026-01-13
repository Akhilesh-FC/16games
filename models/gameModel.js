const db = require('../config/db');

const GameModel = {

  // 🔹 Get all games
  getAllGames: (callback) => {
    const sql = "SELECT * FROM games";
    db.query(sql, callback);
  },

  // 🔹 Get active games
  getActiveGames: (callback) => {
    const sql = "SELECT * FROM games WHERE status='active'";
    db.query(sql, callback);
  },

  // 🔹 Get game by ID
  getGameById: (id, callback) => {
    const sql = "SELECT * FROM games WHERE id=?";
    db.query(sql, [id], callback);
  },

  // 🔹 Add new game
  addGame: (data, callback) => {
    const sql = "INSERT INTO games SET ?";
    db.query(sql, data, callback);
  },

  // 🔹 Update game
  updateGame: (id, data, callback) => {
    const sql = "UPDATE games SET ? WHERE id=?";
    db.query(sql, [data, id], callback);
  },

  // 🔹 Change Status
  changeStatus: (id, status, callback) => {
    const sql = "UPDATE games SET status=? WHERE id=?";
    db.query(sql, [status, id], callback);
  }

};

module.exports = GameModel;
