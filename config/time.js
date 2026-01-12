import db from "./database.js";

export async function getCurrentDBTime() {
  try {
    const [t] = await db.query("SELECT NOW() AS nowTime");
    return t[0].nowTime; 
  } catch (err) {
    console.log("Time Fetch Error:", err.message);
    return null;
  }
}
