import db from "../../config/database.js";

export async function profile(req, res) {
  const userId = req.params.id;

  if (!userId) {
    return res.status(200).json({
      success: false,
      message: "userid is required"
    });
  }

  try {
    const sql = `
      SELECT 
        id,
        device_id,
        first_name,
        last_name,
        email,
        type,
        phone,
        status,
        wallet,
        fcm,
        gst_number,
        gst_address,
        created_at,
        updated_at,
        image
      FROM users
      WHERE id = ?
    `;

    const [rows] = await db.query(sql, [userId]);

    if (rows.length === 0) {
      return res.status(200).json({
        success: false,
        message: "User not found"
      });
    }

    const BASE_URL = process.env.BASE_URL || "";
    const user = rows[0];

    // full image URL apply
    user.image = user.image ? `${BASE_URL}/${user.image}` : null;

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user
    });

  } catch (err) {
    console.log("Profile Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
