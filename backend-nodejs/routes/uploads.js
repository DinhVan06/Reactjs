const fs = require("fs");
const express = require("express");
const router = express.Router();
const path = require("path");
// MULTER UPLOAD
const multer = require("multer");
const { updateDocument, findDocument } = require("../helpers/MongoDBHelpers");
// khi upload sẽ vào thư mục này
const UPLOAD_DIRECTORY = "./public/uploads";
var upload = multer({
  storage: multer.diskStorage({
    contentType: multer.AUTO_CONTENT_TYPE,
    destination: function (req, file, callback) {
      const { id, collectionName } = req.params;

      const PATH = `${UPLOAD_DIRECTORY}/${collectionName}/${id}`;
      //console.log("PATH", PATH);
      if (!fs.existsSync(PATH)) {
        // Create a directory
        fs.mkdirSync(PATH, { recursive: true });
      }
      callback(null, PATH);
    },
    filename: function (req, file, callback) {
      // Xử lý tên file cho chuẩn
      const fileInfo = path.parse(file.originalname);
      const safeFileName =
        fileInfo.name.replace(/[^a-z0-9]/gi, "_").toLowerCase() + fileInfo.ext;
      // return
      callback(null, safeFileName);
    },
  }),
}).single("file");
