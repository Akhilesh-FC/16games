export function autoAuth(req, res, next) {

  // login page allowed
  if (req.path === "/login" || req.path === "/login/") {
    return next();
  }

  // static assets allowed
  if (req.path.startsWith("/assets/")) {
    return next();
  }

  // ✔ session.admin exists → user logged in
  if (req.session?.admin) {
    return next();
  }

  // otherwise → redirect to login
  return res.redirect("/login");
}
