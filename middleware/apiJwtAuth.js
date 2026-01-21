import jwt from "jsonwebtoken";

export const apiJwtAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: false,
      message: "Token required"
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Invalid token format"
    });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token"
    });
  }
};
