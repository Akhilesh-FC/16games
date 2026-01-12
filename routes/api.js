import express from "express";
import { profile } from "../controllers/api/UserController.js";

import { loginPolicy, loginAdds, userLogin } from "../controllers/api/userPublicController.js";

const router = express.Router();

// User Profile API
router.get("/profile/:id", profile);



router.get("/loginPolicy/:id", loginPolicy);
router.get("/loginAdds", loginAdds);
router.post("/user_login",userLogin);
export default router;


