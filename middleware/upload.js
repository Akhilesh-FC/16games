import multer from "multer";
import fs from "fs";
import path from "path";

export function uploadProfileImage() {
  const folderName = "profileImage";    // ← fixed folder
  const uploadPath = `public/${folderName}`;

  // Create folder if not exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const unique = Date.now() + path.extname(file.originalname);
      cb(null, unique);
    }
  });

  return multer({ storage });
}
