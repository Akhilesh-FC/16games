import Game from "../../models/Game.js";
import { success, error } from "../../utils/response.js";

/* ================= GET ACTIVE GAMES ================= */
export const getAllActiveGames = async (req, res) => {
  try {
    const games = await Game.getActive();

    return success(res, "Active games list", games);

  } catch (err) {
    console.error("GET ACTIVE GAMES ERROR:", err);
    return error(res, "Server error", 500);
  }
};
