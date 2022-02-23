const multer = require("multer");
var fs = require("fs");

var dir = "./public/images";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  acl: 'public-read',
  filename: (req, file, cb) => {
    console.log('Esto es el file',file)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;