const multer = require("multer");
const path = require("path");
const { promisify } = require("util");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/users_images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const fileName = uniqueSuffix + fileExtension;
    req.modifiedFileName = fileName;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [".png", ".jpg", ".gif", ".jpeg"];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  const isFileTypeAllowed = allowedFileTypes.includes(fileExtension);
  if (isFileTypeAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Allowed types are .png, .jpg, .gif, .jpeg"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
const uploadSingleAsync = promisify(upload.single("myFile"));

const monkeyUpload = async (req, fieldName, destination) => {
  try {
    await uploadSingleAsync(req, null);
    const data = {
      fileName: destination + req.modifiedFileName,
    };
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = { monkeyUpload };
