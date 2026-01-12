import express from "express";
import { loginPage, loginSubmit, dashboard ,logout, editProfile, updateProfile} from "../controllers/AuthController.js";

import { uploadProfileImage } from "../middleware/upload.js";

const router = express.Router();

router.get("/login", loginPage);
router.post("/login", loginSubmit);
router.get("/logout", logout);
router.get("/dashboard", dashboard);
router.get("/editProfile/:id", editProfile);
router.post(
  "/updateProfile/:id",
  uploadProfileImage().single("image"),
  updateProfile
);

export default router;
