import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  dateStrings: true,
});

const db = pool.promise();


db.getConnection()
  .then((connection) => {
    return connection.query(`SET time_zone = '${process.env.DB_TIMEZONE || "+05:30"}'`)
      .finally(() => connection.release());
  })
  .then(() => {
    console.log(`✅ Database timezone set to: ${process.env.DB_TIMEZONE || "+05:30"}`);
  })
  .catch((err) => {
    console.error("❌ Timezone setting failed:", err.message);
  });

export default db;