const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses");
const fs = require("fs");
const path = require("path");
const ses = require("../config/config");
const { OTP_Template } = require("../template/otp.emil.template");

var dirName = __dirname;
dirName = dirName.split("\\");
dirName.pop();
dirName = dirName.join("/");

const transported = nodemailer.createTransport({ SES: { ses, aws }, });



async function sendTextMail(req, res) {
  try {
    var to = process.env.TO_MAIL;
    transported.sendMail({
      from: { name: "no-replay", address: process.env.FROM_MAIL },
      to: to,
      subject: "SES Text Mail",
      text: "Sample Text Mail",
    });

    res.status(200).json({ message: "successfully text mail send" });
  } catch (error) {
    res.status(500).json({ message: "errror mail send" });
  }
}



async function sendHtmlMail(req, res) {
  try {
    var to = process.env.TO_MAIL;
    transported.sendMail({
      from: { name: "no-replay", address: process.env.FROM_MAIL },
      to: to,
      subject: "SES Html Mail",
      html: OTP_Template,
    });

    res.status(200).json({ message: "successfully html mail send" });
  } catch (error) {
    res.status(500).json({ message: "errror mail send" });
  }
}



async function sendAttachmentMail(req, res) {
  try {
    let mailAttachement = path.join(dirName, req.file.path);

    var to = process.env.TO_MAIL;
    await transported.sendMail({
      from: { name: "no-replay", address: process.env.FROM_MAIL },
      to: to,
      subject: "SES Html Mail",
      text: "Attachment Mail Testing",
      attachments: [{ path: mailAttachement }],
    });

    //delete file
    await fs.unlinkSync(mailAttachement);

    return res.status(200).json({ message: "successfully html mail send" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "errror mail send" });
  }
}




async function sendMultipleAttachmentMail(req, res) {
  try {
    const multipleFileUpload = req.files.map(function (file) {
      let mailAttachement = path.join(dirName, file.path);
      return { path: mailAttachement };
    });

    var to = process.env.TO_MAIL;

    await transported.sendMail({
      from: { name: "no-replay", address: process.env.FROM_MAIL },
      to: to,
      subject: "SES Html Mail",
      text: "MultipleAttachment Mail Testing",
      attachments: multipleFileUpload,
    });

    //delete file
    multipleFileUpload.forEach(async function (data) {
      await fs.unlinkSync(data.path);
    });

    return res.status(200).json({ message: "successfully html mail send" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "errror mail send" });
  }
}

module.exports = { sendTextMail, sendHtmlMail, sendAttachmentMail, sendMultipleAttachmentMail, };
