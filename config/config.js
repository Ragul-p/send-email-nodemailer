const aws = require("@aws-sdk/client-ses");

const ses = new aws.SES({
  apiVersion: process.env.API_Version,
  region: process.env.API_Region,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

module.exports = ses;
