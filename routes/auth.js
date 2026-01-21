import express from "express";
import {
  loginPage,
  loginSubmit,
  dashboard,
  logout,
  changePassword
} from "../controllers/AuthController.js";

import { autoAuth } from "../middleware/autoAuth.js";

const router = express.Router();

router.get("/login", loginPage);
router.post("/login", loginSubmit);
router.get("/logout", logout);

// protect everything below
router.use(autoAuth);

router.get("/dashboard", dashboard);
router.post("/change-password", changePassword);

export default router;
