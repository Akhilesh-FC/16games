import db from "../config/database.js";

export const loginPage = (req, res) => {
  res.render("login", {
    layout: false,
    title: "Login Page",
    error: null      
  });
};



export const loginSubmit = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM adminuser WHERE email = ? AND password = ? LIMIT 1",
      [email, password]
    );

    if (!rows || rows.length === 0) {
      return res.render("login", {
        layout: false,
        error: "Invalid email or password"
      });
    }

    // ⭐ Store complete admin info in session
    req.session.admin = {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      image: rows[0].image
    };

    return res.redirect("/dashboard");

  } catch (err) {
    console.error("Login Error:", err);
    return res.render("login", {
      layout: false,
      error: "Something went wrong!"
    });
  }
};



export const dashboard = (req, res) => {
  res.render("dashboard", {
    title: "Dashboard",
    // you can show admin name on dashboard
    admin_name: req.session?.admin_name || "Admin"
  });
};

export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log("Logout Error:", err);
      return res.redirect("/dashboard");
    }
    res.redirect("/login");
  });
};



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

