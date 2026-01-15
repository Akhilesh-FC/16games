import express from "express";
import { jwtAuth } from "../middleware/jwtAuth.js";
import { register, login } from "../controllers/api/AuthController.js";
import { getAllActiveGames } from "../controllers/api/GameController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/games_list", jwtAuth, getAllActiveGames);


export default router;
