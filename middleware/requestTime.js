import { getCurrentDBTime } from "../config/time.js";

export async function requestTime(req, res, next) {
  try {
    // DB se time fetch
    req.Current_time = await getCurrentDBTime();
  } catch (err) {
    req.Current_time = null;
  }
  next();
}
