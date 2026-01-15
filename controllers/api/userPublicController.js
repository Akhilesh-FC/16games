import db from "../../config/database.js";


let Current_time; 


export async function loginPolicy(req, res) {
  const policyId = req.params.id;

  if (!policyId) {
    return res.status(400).json({
      success: false,
      message: "Policy id is required",
      data: null,
      errors: null
    });
  }

  try {
    const sql = `
      SELECT 
        id,
        title,
        description,
        type,
        created_at
      FROM login_policy
      WHERE id = ?
    `;

    const [rows] = await db.query(sql, [policyId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Policy not found",
        data: null,
        errors: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Policy fetched successfully",
      data: rows[0],
      errors: null
    });

  } catch (err) {
    console.log("loginPolicy Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      errors: err.message
    });
  }
}

export async function loginAdds(req, res) {
  try {
    const BASE_URL = process.env.BASE_URL || "";
    const sql = `
      SELECT 
        id,
        heading,
        sub_heading,
        image,
        created_at
      FROM loginadds
      ORDER BY id ASC
    `;

    const [rows] = await db.query(sql);

    const data = rows.map(item => ({
      ...item,
      image: item.image ? `${BASE_URL}/${item.image}` : null
    }));

    return res.status(200).json({
      success: true,
      message: "Login adds fetched successfully",
      data: data,
      errors: null
    });

  } catch (err) {
    console.log("loginAdds Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      errors: err.message
    });
  }
}

export async function userLogin(req, res) {
  const { phone, fcm_token, device_id } = req.body;
  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required",
      data: null,
      errors: null,
    });
  }
   
   Current_time = req.Current_time; 
   


  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE phone = ? LIMIT 1",
      [phone]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        errors: null,
      });
    }

    const user = rows[0];

    await db.query(
      `
        UPDATE users 
        SET fcm_token = ?, device_id = ?, updated_at = Current_time
        WHERE id = ?
      `,
      [fcm_token || user.fcm_token, device_id || user.device_id, user.id]
    );

    const [updatedUserData] = await db.query(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [user.id]
    );

    const BASE_URL = process.env.BASE_URL || "";
    const updatedUser = updatedUserData[0];

    updatedUser.image = updatedUser.image
      ? `${BASE_URL}/${updatedUser.image}`
      : null;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: updatedUser,
      errors: null,
    });

  } catch (err) {
    console.log("Login Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      errors: err.message,
    });
  }
}

