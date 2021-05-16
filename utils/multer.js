// const multer = require("multer")
// const path = require("path");

// module.exports = multer ({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error ("File type is not supported"), false);
//       return;
//     }
//     cb(null, true)
//   }
// })

// la cb te 2 arguments, error i si  accepta el file o no (segons l'extensio 
// i es boolean). Si accepta el file, error = null, i 2a arg  is true