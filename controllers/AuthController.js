import db from "../config/database.js";
import crypto from "crypto";

/* ================= LOGIN PAGE ================= */
export const loginPage = (req, res) => {
  res.render("login", {
    layout: false,
    error: null
  });
};

/* ================= LOGIN SUBMIT ================= */
export const loginSubmit = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM adminuser WHERE email = ? AND password = ? LIMIT 1",
      [email, password]
    );

    if (rows.length === 0) {
      return res.render("login", {
        layout: false,
        error: "Invalid email or password"
      });
    }

    const admin = rows[0];

    // 🔑 NEW session token (single login)
    const sessionToken = crypto.randomBytes(32).toString("hex");

    await db.query(
      "UPDATE adminuser SET session_token = ? WHERE id = ?",
      [sessionToken, admin.id]
    );

    // 🧠 store admin session
    req.session.admin = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      session_token: sessionToken,
      password_version: admin.password_version
    };

    return res.redirect("/dashboard");

  } catch (err) {
    console.error("Login Error:", err);
    return res.render("login", {
      layout: false,
      error: "Something went wrong"
    });
  }
};

/* ================= DASHBOARD ================= */
export const dashboard = (req, res) => {
  res.render("dashboard", {
    title: "Admin Dashboard",
    admin: req.session.admin
  });
};

/* ================= LOGOUT ================= */
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

/* ================= CHANGE PASSWORD ================= */
export const updatePassword = async (req, res) => {
  const { old_password, new_password } = req.body;
  const adminId = req.session.admin.id;

  try {
    // 🔍 check old password
    const [rows] = await db.query(
      "SELECT password FROM adminuser WHERE id = ?",
      [adminId]
    );

    if (rows.length === 0 || rows[0].password !== old_password) {
      return res.render("change-password", {
        error: "Old password is incorrect"
      });
    }

    // 🔄 update password
    await db.query(
      `UPDATE adminuser 
       SET password = ?, 
           password_version = password_version + 1,
           session_token = NULL
       WHERE id = ?`,
      [new_password, adminId]
    );

    // 🚪 logout after password change
    req.session.destroy(() => {
      res.redirect("/login");
    });

  } catch (err) {
    console.error("Password Change Error:", err);
    res.redirect("/dashboard");
  }
};



// export const updatePassword = async (req, res) => {
//   const { new_password } = req.body;
//   const adminId = req.session.admin.id;

//   try {
//     await db.query(
//       `UPDATE adminuser 
//       SET password = ?, 
//           password_version = password_version + 1,
//           session_token = NULL
//       WHERE id = ?`,
//       [new_password, adminId]
//     );

//     // logout current session also
//     req.session.destroy(() => {
//       res.redirect("/login");
//     });

//   } catch (err) {
//     console.error("Password Change Error:", err);
//     res.redirect("/dashboard");
//   }
// };


export const editProfile = async (req, res) => {
  const adminId = req.params.id;
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, image, password FROM adminuser WHERE id = ? LIMIT 1",
      [adminId]
    );

    if (rows.length === 0) {
      return res.send("Admin not found!");
    }

    return res.render("editProfile", {
      title: "Edit Profile",
      data: rows[0]
    });

  } catch (err) {
    console.log("Profile Fetch Error:", err);
    res.send("Error loading profile");
  }
};




export const updateProfile = async (req, res) => {
  const adminId = req.params.id;
  const { name, email, password } = req.body;

  const folderName = "profileImage";
  let newImage = null;

  if (req.file) {
    newImage = `${folderName}/${req.file.filename}`;
  }

  try {
    let sql = `
      UPDATE adminuser SET 
        name = ?, 
        email = ?, 
        password = ?
    `;

    const values = [name, email, password];

    if (newImage) {
      sql += `, image = ?`;
      values.push(newImage);
    }

    sql += ` WHERE id = ?`;
    values.push(adminId);

    await db.query(sql, values);

   
    req.session.admin.name = name;
    req.session.admin.email = email;
    if (newImage) {
      req.session.admin.image = newImage;
    }

    req.session.success = "Profile updated successfully!";

    return res.redirect(`/editProfile/${adminId}`);

  } catch (err) {
    console.log("Update Error:", err);
    req.session.error = "Something went wrong!";
    return res.redirect(`/editProfile/${adminId}`);
  }
};

