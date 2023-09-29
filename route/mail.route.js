const express = require("express");
const multer = require("multer");
const route = express.Router();
const { sendTextMail, sendHtmlMail, sendAttachmentMail, sendMultipleAttachmentMail, } = require("../controller/mail.controller");

const storage = multer.diskStorage({
  destination: function (req, file, callback) { callback(null, "./"); },
  filename: function (req, file, callback) { callback(null, file.originalname); },
});

const upload = multer({ storage });


route.post("/text", sendTextMail);
route.post("/html", sendHtmlMail);
route.post("/attachment", upload.single("file"), sendAttachmentMail);
route.post("/multi-attachment", upload.array("files"), sendMultipleAttachmentMail);

module.exports = route;
