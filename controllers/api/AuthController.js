import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.js";
import { success, error } from "../../utils/response.js";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  /* ---------- VALIDATION ---------- */
  if (!name || !email || !mobile || !password) {
    return error(res, "Validation error", 422, {
      name: !name ? "Name is required" : undefined,
      email: !email ? "Email is required" : undefined,
      mobile: !mobile ? "Mobile is required" : undefined,
      password: !password ? "Password is required" : undefined
    });
  }

  if (!email.includes("@")) {
    return error(res, "Validation error", 422, {
      email: "Invalid email format"
    });
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return error(res, "Validation error", 422, {
      mobile: "Invalid mobile number"
    });
  }

  if (password.length < 6) {
    return error(res, "Validation error", 422, {
      password: "Password must be at least 6 characters"
    });
  }

  try {
    const exists = await User.isEmailOrMobileExists(email, mobile);
    if (exists) {
      return error(res, "Email or Mobile already exists", 409);
    }

    await User.create({ name, email, mobile, password });

    return success(res, "Registration successful");

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return error(res, "Server error", 500);
  }
};

/* ================= LOGIN (EMAIL OR MOBILE) ================= */
export const login = async (req, res) => {
  const { identity, password } = req.body;

  /* ---------- VALIDATION ---------- */
  if (!identity || !password) {
    return error(res, "Validation error", 422, {
      identity: !identity ? "Email or Mobile is required" : undefined,
      password: !password ? "Password is required" : undefined
    });
  }

  try {
    // 🔹 EMAIL ya MOBILE dono se login
    const user = await User.findByIdentity(identity);

    if (!user || user.password !== password) {
      return error(res, "Invalid credentials", 401);
    }

    const token = jwt.sign(
      {
        id: user.id,
        identity: user.email || user.mobile
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    return success(res, "Login successful", { token });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return error(res, "Server error", 500);
  }
};
