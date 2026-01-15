import express from "express";
import {
  loginPage,
  loginSubmit,
  dashboard,
  logout,
  updatePassword
} from "../controllers/AuthController.js";

import { autoAuth } from "../middleware/autoAuth.js";

const router = express.Router();

/* ---------- ADMIN LOGIN ---------- */
router.get("/login", loginPage);
router.post("/login", loginSubmit);
router.get("/logout", logout);

/* ---------- PROTECTED ADMIN ---------- */
router.use(autoAuth);

router.get("/dashboard", dashboard);
router.post("/change-password", updatePassword);
// change password
router.get("/change-password", (req, res) => {
  if (!req.session.admin) return res.redirect("/login");
  res.render("change-password", { error: null });
});

export default router;
