const express = require("express");
require("dotenv").config();
const app = express();

const port = process.env.PORT;

app.use("/api/mail", require("./route/mail.route"));

app.listen(port, function () {
  console.log(`server is listening on port ${port}`);
});
