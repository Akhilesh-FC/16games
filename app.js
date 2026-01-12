import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import { autoAuth } from "./middleware/auth.js";
import { requestTime } from "./middleware/requestTime.js";   

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session || {};
  next();
});

app.use((req, res, next) => {
  res.locals.success = req.session.success || null;
  res.locals.error = req.session.error || null;

  delete req.session.success;
  delete req.session.error;

  next();
});

// ⭐⭐ GLOBAL TIME MIDDLEWARE
app.use(requestTime);    // <----- IMPORTANT

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "administrator/main");

app.locals.BASE_URL = process.env.BASE_URL;

import apiRoutes from "./routes/api.js";
import webRoutes from "./routes/web.js";

app.use("/api", apiRoutes);
app.use("/", autoAuth, webRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at ${process.env.APP_URL}`);
});
