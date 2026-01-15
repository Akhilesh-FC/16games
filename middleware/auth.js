import db from "../config/database.js";

export async function autoAuth(req, res, next) {

  // allow login & assets
  if (req.path === "/login" || req.path.startsWith("/assets")) {
    return next();
  }

  if (!req.session.admin) {
    return res.redirect("/login");
  }

  try {
    const [rows] = await db.query(
      "SELECT session_token, password_version FROM adminuser WHERE id = ?",
      [req.session.admin.id]
    );

    if (rows.length === 0) {
      req.session.destroy(() => {});
      return res.redirect("/login");
    }

    const dbAdmin = rows[0];

    // ❌ another login happened
    if (dbAdmin.session_token !== req.session.admin.session_token) {
      req.session.destroy(() => {});
      return res.redirect("/login");
    }

    // ❌ password changed
    if (dbAdmin.password_version !== req.session.admin.password_version) {
      req.session.destroy(() => {});
      return res.redirect("/login");
    }

    next();

  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.redirect("/login");
  }
}
