import multer from "multer";
import fs from "fs";
import path from "path";
import os from "os";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use the system's temporary directory
    const uploadPath = path.join(os.tmpdir(), "uploads");

    // Check if directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      try {
        fs.mkdirSync(uploadPath, { recursive: true });
      } catch (err) {
        return cb(new Error("Failed to create upload directory"), null);
      }
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Use a unique suffix to avoid overwriting files with the same name
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname); // Use the original filename
  },
  // destination: function (req, file, cb) {
  //   cb(null, "./public/temp");
  // },
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // },
});
export const upload = multer({ storage });
